'use client';
import Link from 'next/link';

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="nf container">
      <h1>Something went wrong.</h1>
      <p>This page could not be displayed. Please try again, or contact Bright Fortune if the problem continues.</p>
      <div className="row">
        <button type="button" className="pill solid" onClick={() => reset()}>Try again</button>
        <Link href="/contact" className="pill">Contact us</Link>
      </div>
    </section>
  );
}
