import { NextResponse } from 'next/server';
import { validateEnquiry, type EnquiryResponse } from '@/lib/enquiry';
import { getFormMode, getRelease } from '@/lib/release';
import { getIdempotent, rateLimit, RejectedError, sendEnquiry, setIdempotent, UncertainError } from '@/lib/transport';

export const dynamic = 'force-dynamic';
const MAX_BYTES = 16 * 1024;
const UUID = /^[0-9a-f-]{16,64}$/i;

function reply(body: EnquiryResponse, status: number, headers: Record<string, string> = {}) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow', ...headers } });
}

export async function POST(req: Request) {
  const mode = getFormMode();
  if (mode === 'preview') return reply({ ok: false, code: 'PREVIEW_DISABLED' }, 503);
  if (mode === 'contact-only') return reply({ ok: false, code: 'NOT_CONFIGURED' }, 503);

  // Same-origin check: an absent Origin is rejected.
  const origin = req.headers.get('origin');
  const expected = getRelease().origin ?? new URL(req.url).origin;
  if (!origin || origin !== expected) return reply({ ok: false, code: 'ORIGIN' }, 403);
  if (!(req.headers.get('content-type') ?? '').toLowerCase().startsWith('application/json')) return reply({ ok: false, code: 'CONTENT_TYPE' }, 415);
  if (Number(req.headers.get('content-length') ?? 0) > MAX_BYTES) return reply({ ok: false, code: 'TOO_LARGE' }, 413);

  const text = await req.text();
  if (new TextEncoder().encode(text).length > MAX_BYTES) return reply({ ok: false, code: 'TOO_LARGE' }, 413);
  let json: unknown;
  try { json = JSON.parse(text); } catch { return reply({ ok: false, code: 'BAD_REQUEST' }, 400); }
  const requestId = typeof (json as { requestId?: unknown })?.requestId === 'string' ? (json as { requestId: string }).requestId : '';
  if (!UUID.test(requestId)) return reply({ ok: false, code: 'BAD_REQUEST' }, 400);

  const parsed = validateEnquiry(json);
  if (!parsed.ok) return reply({ ok: false, code: 'VALIDATION', fieldErrors: parsed.fieldErrors }, 400);
  if (parsed.value.website !== '') return reply({ ok: false, code: 'BAD_REQUEST' }, 400); // honeypot, neutral

  try {
    const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
    const rl = await rateLimit(ip);
    if (rl.limited) return reply({ ok: false, code: 'RATE_LIMITED', retryAfter: rl.retryAfter }, 429, { 'Retry-After': String(rl.retryAfter) });
    const prior = await getIdempotent(requestId);
    if (prior) return reply({ ok: true, reference: prior }, 200);
    const out = await sendEnquiry(parsed.value, requestId);
    if (!out.accepted) return reply({ ok: false, code: 'TRANSPORT_UNAVAILABLE' }, 503);
    await setIdempotent(requestId, out.reference).catch(() => undefined);
    return reply({ ok: true, reference: out.reference }, 200);
  } catch (err) {
    if (err instanceof UncertainError) return reply({ ok: false, code: 'DELIVERY_UNCERTAIN' }, 504);
    if (err instanceof RejectedError) return reply({ ok: false, code: 'REJECTED' }, 502);
    return reply({ ok: false, code: 'TRANSPORT_UNAVAILABLE' }, 503);
  }
}

export async function GET() {
  return reply({ ok: false, code: 'BAD_REQUEST' }, 405, { Allow: 'POST' });
}
