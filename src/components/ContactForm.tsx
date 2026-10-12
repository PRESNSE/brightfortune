'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { topicLabels, validateEnquiry, type EnquiryResponse, type FieldErrors } from '@/lib/enquiry';
import { allowedTopics } from '@/lib/selectors';
import type { Topic } from '@/lib/types';

interface Copy { heading: string; privacyNotice: string; sensitiveDataNote: string; acknowledgement: string; success: string; preview: string; failure: string; timeout: string }
type Phase = 'idle' | 'submitting' | 'success' | 'failure' | 'uncertain' | 'rate' | 'previewed';
const FIELD_LABELS: Record<string, string> = { firstName: 'First name', lastName: 'Last name', email: 'Email', phone: 'Phone', topic: 'Topic', company: 'Company', message: 'Message', privacyAcknowledged: 'Privacy acknowledgement' };

export function ContactForm({ mode, initialTopic, copy }: { mode: 'preview' | 'live'; initialTopic: Topic; copy: Copy }) {
  const [values, setValues] = useState({ firstName: '', lastName: '', email: '', phone: '', topic: initialTopic as string, company: '', message: '', privacyAcknowledged: false, website: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [phase, setPhase] = useState<Phase>('idle');
  const [reference, setReference] = useState('');
  const [retryAfter, setRetryAfter] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const requestId = useRef<string>('');
  const inFlight = useRef(false);

  const set = (k: keyof typeof values, v: string | boolean) => setValues((s) => ({ ...s, [k]: v }));
  const focusField = (k: string) => document.getElementById(`f-${k}`)?.focus();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (inFlight.current) return;
    const result = validateEnquiry(values);
    if (!result.ok) {
      setErrors(result.fieldErrors);
      setPhase('idle');
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setErrors({});
    if (mode === 'preview') { setPhase('previewed'); return; } // never calls any endpoint
    if (values.website) return;
    inFlight.current = true;
    setPhase('submitting');
    if (!requestId.current) requestId.current = crypto.randomUUID();
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 15000);
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: ctl.signal, cache: 'no-store',
        body: JSON.stringify({ ...result.value, requestId: requestId.current }),
      });
      const data = (await res.json().catch(() => null)) as EnquiryResponse | null;
      if (res.ok && data && data.ok) {
        setReference(data.reference); setPhase('success'); requestId.current = '';
        setValues((s) => ({ ...s, firstName: '', lastName: '', email: '', phone: '', company: '', message: '', privacyAcknowledged: false }));
      } else if (data && !data.ok && data.code === 'VALIDATION') { setErrors(data.fieldErrors); setPhase('idle'); requestAnimationFrame(() => summaryRef.current?.focus()); }
      else if (data && !data.ok && data.code === 'RATE_LIMITED') { setRetryAfter(data.retryAfter); setPhase('rate'); }
      else if (data && !data.ok && data.code === 'DELIVERY_UNCERTAIN') setPhase('uncertain');
      else setPhase('failure');
    } catch (err) {
      setPhase((err as Error).name === 'AbortError' ? 'uncertain' : 'failure');
    } finally {
      clearTimeout(timer);
      inFlight.current = false;
    }
  }

  const errKeys = Object.keys(errors) as (keyof FieldErrors)[];
  const fieldProps = (k: keyof FieldErrors) => ({ id: `f-${k}`, 'aria-invalid': errors[k] ? true : undefined, 'aria-describedby': errors[k] ? `e-${k}` : undefined });
  const Err = ({ k }: { k: keyof FieldErrors }) => (errors[k] ? <p className="err" id={`e-${k}`}>{errors[k]}</p> : null);

  return (
    <form className="form" onSubmit={onSubmit} noValidate aria-labelledby="form-title">
      <h2 id="form-title">{copy.heading}</h2>
      <p className="note" style={{ marginTop: 0 }}>{copy.privacyNotice} <Link href="/privacy">Read the privacy notice</Link>.</p>
      <p className="note"><strong>{copy.sensitiveDataNote}</strong></p>
      {mode === 'preview' && <p className="previewnote note">Preview mode: you can complete and check this form, but nothing is transmitted.</p>}

      {errKeys.length > 0 && (
        <div className="errsum" ref={summaryRef} tabIndex={-1} role="alert" aria-labelledby="errsum-t">
          <h3 id="errsum-t">Please correct {errKeys.length === 1 ? 'this field' : 'these fields'}</h3>
          <ul>{errKeys.map((k) => (<li key={k}><a href={`#f-${k}`} onClick={(e) => { e.preventDefault(); focusField(k); }}>{FIELD_LABELS[k]}: {errors[k]}</a></li>))}</ul>
        </div>
      )}

      <div className="fgrid">
        <div className="field"><label htmlFor="f-firstName">First name</label><input {...fieldProps('firstName')} name="firstName" autoComplete="given-name" value={values.firstName} onChange={(e) => set('firstName', e.target.value)} maxLength={120} required aria-required="true" /><Err k="firstName" /></div>
        <div className="field"><label htmlFor="f-lastName">Last name <span className="opt">(optional)</span></label><input {...fieldProps('lastName')} name="lastName" autoComplete="family-name" value={values.lastName} onChange={(e) => set('lastName', e.target.value)} maxLength={120} /><Err k="lastName" /></div>
        <div className="field"><label htmlFor="f-email">Email</label><input {...fieldProps('email')} type="email" name="email" autoComplete="email" value={values.email} onChange={(e) => set('email', e.target.value)} required aria-required="true" /><Err k="email" /></div>
        <div className="field"><label htmlFor="f-phone">Phone <span className="opt">(optional)</span></label><input {...fieldProps('phone')} type="tel" name="phone" autoComplete="tel" value={values.phone} onChange={(e) => set('phone', e.target.value)} /><Err k="phone" /></div>
        <div className="field"><label htmlFor="f-topic">Topic</label>
          <select {...fieldProps('topic')} name="topic" value={values.topic} onChange={(e) => set('topic', e.target.value)} required aria-required="true">
            {allowedTopics.map((t) => (<option key={t} value={t}>{topicLabels[t]}</option>))}
          </select><Err k="topic" /></div>
        <div className="field"><label htmlFor="f-company">Company <span className="opt">(optional)</span></label><input {...fieldProps('company')} name="company" autoComplete="organization" value={values.company} onChange={(e) => set('company', e.target.value)} /><Err k="company" /></div>
        <div className="field full"><label htmlFor="f-message">Your message</label><textarea {...fieldProps('message')} name="message" value={values.message} onChange={(e) => set('message', e.target.value)} required aria-required="true" /><Err k="message" /></div>
        <div className="hp" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set('website', e.target.value)} /></label></div>
        <div className="field full">
          <div className="checkrow">
            <input {...fieldProps('privacyAcknowledged')} type="checkbox" name="privacyAcknowledged" checked={values.privacyAcknowledged} onChange={(e) => set('privacyAcknowledged', e.target.checked)} required aria-required="true" />
            <label htmlFor="f-privacyAcknowledged" style={{ fontWeight: 400 }}>{copy.acknowledgement} (<Link href="/privacy">privacy notice</Link>)</label>
          </div>
          <Err k="privacyAcknowledged" />
        </div>
      </div>

      <div style={{ marginTop: 28 }}>
        <button type="submit" className="pill solid" disabled={phase === 'submitting'} aria-disabled={phase === 'submitting'}>
          {phase === 'submitting' ? 'Sending…' : mode === 'preview' ? 'Check enquiry (preview)' : 'Send enquiry'}
        </button>
      </div>

      <div aria-live="polite" role="status">
        {phase === 'submitting' && <p className="status">Sending…</p>}
        {phase === 'previewed' && (<div className="status"><p><strong>{copy.preview}</strong></p><p>Your entries passed validation. <button type="button" className="tab" onClick={() => { setPhase('idle'); setValues((s) => ({ ...s, firstName: '', lastName: '', email: '', phone: '', company: '', message: '', privacyAcknowledged: false })); }}>Clear the form</button></p></div>)}
        {phase === 'success' && <div className="status ok"><p>{copy.success}</p><p>Reference: <strong>{reference}</strong>. Acceptance by our email provider is not confirmation that the message has been read.</p></div>}
        {phase === 'failure' && <div className="status bad"><p>{copy.failure}</p></div>}
        {phase === 'uncertain' && <div className="status bad"><p>{copy.timeout}</p></div>}
        {phase === 'rate' && <div className="status bad"><p>Too many attempts. Please try again in about {Math.max(1, Math.ceil(retryAfter / 60))} minute(s).</p></div>}
      </div>
    </form>
  );
}
