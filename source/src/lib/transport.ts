import crypto from 'node:crypto';
import type { EnquiryInput } from './enquiry';
import { topicLabels } from './enquiry';

/** Server-only. Delivery + durable-state adapters. Credentials come from env and never reach the client. */
export type SendResult = { accepted: boolean; reference: string };
export class UncertainError extends Error {}
export class RejectedError extends Error {}

const mem = new Map<string, { n: number; exp: number }>();
const memIdem = new Map<string, { reference: string; exp: number }>();
const useMock = () => process.env.ENQUIRY_TRANSPORT === 'mock';

async function upstash(cmd: (string | number)[]): Promise<unknown> {
  const res = await fetch(process.env.UPSTASH_REDIS_REST_URL!, {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
    signal: AbortSignal.timeout(3000),
  });
  if (!res.ok) throw new Error('store unavailable');
  return ((await res.json()) as { result: unknown }).result;
}

/** 5 attempts per 10 minutes per salted IP hash. */
export async function rateLimit(ip: string): Promise<{ limited: boolean; retryAfter: number }> {
  const salt = process.env.RATE_LIMIT_SALT ?? 'preview-salt';
  const key = 'rl:' + crypto.createHash('sha256').update(salt + ip).digest('hex').slice(0, 32);
  const window = 600;
  if (useMock()) {
    const now = Date.now();
    const cur = mem.get(key);
    if (!cur || cur.exp < now) { mem.set(key, { n: 1, exp: now + window * 1000 }); return { limited: false, retryAfter: 0 }; }
    cur.n += 1;
    return cur.n > 5 ? { limited: true, retryAfter: Math.ceil((cur.exp - now) / 1000) } : { limited: false, retryAfter: 0 };
  }
  const n = Number(await upstash(['INCR', key]));
  if (n === 1) await upstash(['EXPIRE', key, window]);
  if (n > 5) {
    const ttl = Number(await upstash(['TTL', key]));
    return { limited: true, retryAfter: ttl > 0 ? ttl : window };
  }
  return { limited: false, retryAfter: 0 };
}

export async function getIdempotent(id: string): Promise<string | null> {
  if (useMock()) { const v = memIdem.get(id); return v && v.exp > Date.now() ? v.reference : null; }
  const v = await upstash(['GET', 'idem:' + id]);
  return typeof v === 'string' ? v : null;
}
export async function setIdempotent(id: string, reference: string): Promise<void> {
  if (useMock()) { memIdem.set(id, { reference, exp: Date.now() + 3600_000 }); return; }
  await upstash(['SET', 'idem:' + id, reference, 'EX', 3600]);
}

export async function sendEnquiry(v: EnquiryInput, requestId: string): Promise<SendResult> {
  const reference = 'BF-' + crypto.createHash('sha256').update(requestId).digest('hex').slice(0, 8).toUpperCase();
  if (useMock()) {
    // Deterministic test double: no network, no logging of content.
    if (v.message.includes('MOCK_REJECT')) throw new RejectedError('rejected');
    if (v.message.includes('MOCK_UNCERTAIN')) throw new UncertainError('timeout');
    if (v.message.includes('MOCK_UNAVAILABLE')) throw new Error('unavailable');
    return { accepted: true, reference };
  }
  const text = [
    `Topic: ${topicLabels[v.topic]}`, `Name: ${v.firstName} ${v.lastName}`.trim(), `Email: ${v.email}`,
    v.phone ? `Phone: ${v.phone}` : false, v.company ? `Company: ${v.company}` : false, '', v.message, '', `Request: ${requestId}`,
  ].filter((x) => x !== false).join('\n');
  let res: Response;
  try {
    res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': requestId },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM, to: [process.env.ENQUIRY_TO], reply_to: v.email,
        subject: `Website enquiry: ${topicLabels[v.topic]} (${reference})`, text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    throw new UncertainError('timeout');
  }
  if (res.status >= 500) throw new Error('provider unavailable');
  if (!res.ok) throw new RejectedError('provider rejected');
  return { accepted: true, reference };
}
