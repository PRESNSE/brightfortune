import { allowedTopics } from './selectors';
import type { Topic } from './types';

export interface EnquiryInput {
  firstName: string; lastName: string; email: string; phone: string; topic: Topic;
  company: string; message: string; privacyAcknowledged: boolean; website: string;
}
export type FieldErrors = Partial<Record<keyof EnquiryInput, string>>;
export type ValidationResult = { ok: true; value: EnquiryInput } | { ok: false; fieldErrors: FieldErrors };

const len = (s: string) => [...s].length;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[+\d\s()\-.]*$/;

/** Shared by the browser form and the server endpoint so both agree. */
export function validateEnquiry(raw: unknown): ValidationResult {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const str = (k: string) => (typeof r[k] === 'string' ? (r[k] as string).trim() : '');
  const v: EnquiryInput = {
    firstName: str('firstName'), lastName: str('lastName'), email: str('email'), phone: str('phone'),
    topic: str('topic') as Topic, company: str('company'), message: str('message'),
    privacyAcknowledged: r.privacyAcknowledged === true, website: typeof r.website === 'string' ? r.website : '',
  };
  const e: FieldErrors = {};
  if (len(v.firstName) < 1) e.firstName = 'Enter your first name.';
  else if (len(v.firstName) > 80) e.firstName = 'First name must be 80 characters or fewer.';
  if (len(v.lastName) > 80) e.lastName = 'Last name must be 80 characters or fewer.';
  if (!v.email) e.email = 'Enter your email address.';
  else if (v.email.length > 254 || !EMAIL.test(v.email)) e.email = 'Enter an email address in the format name@example.com.';
  if (v.phone && (v.phone.length > 40 || !PHONE.test(v.phone))) e.phone = 'Use digits, spaces, + and brackets only (40 characters maximum).';
  if (!allowedTopics.includes(v.topic)) e.topic = 'Choose the topic closest to your enquiry.';
  if (len(v.company) > 120) e.company = 'Company must be 120 characters or fewer.';
  if (len(v.message) < 10) e.message = 'Tell us a little more (at least 10 characters).';
  else if (len(v.message) > 3000) e.message = 'Message must be 3,000 characters or fewer.';
  if (!v.privacyAcknowledged) e.privacyAcknowledged = 'Confirm that you have read the privacy notice.';
  return Object.keys(e).length ? { ok: false, fieldErrors: e } : { ok: true, value: v };
}

export const topicLabels: Record<Topic, string> = {
  'commercial-general': 'Commercial & general insurance',
  'property-fire': 'Property & fire insurance',
  marine: 'Marine insurance',
  'life-protection': 'Life & protection insurance',
  'medical-dental': 'Medical & dental insurance',
  claims: 'Claims',
  other: 'Something else',
};
export type EnquiryResponse =
  | { ok: true; reference: string }
  | { ok: false; code: 'VALIDATION'; fieldErrors: FieldErrors }
  | { ok: false; code: 'ORIGIN' | 'TOO_LARGE' | 'CONTENT_TYPE' | 'NOT_CONFIGURED' | 'PREVIEW_DISABLED' | 'TRANSPORT_UNAVAILABLE' | 'DELIVERY_UNCERTAIN' | 'REJECTED' | 'BAD_REQUEST' }
  | { ok: false; code: 'RATE_LIMITED'; retryAfter: number };
