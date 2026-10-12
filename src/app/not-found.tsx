import type { Metadata } from 'next';
import { Pill, Title } from '@/components/ui';

export const metadata: Metadata = { title: { absolute: 'Page not found | Bright Fortune' }, robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <section className="nf container">
      <Title as="h1" text="We couldn’t find that page." />
      <p>The address may have changed. Explore our insurance services or contact Bright Fortune for help.</p>
      <div className="row"><Pill href="/what-we-do" className="solid">Explore our services</Pill><Pill href="/contact">Contact us</Pill></div>
    </section>
  );
}
