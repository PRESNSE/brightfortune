import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { getRelease } from '@/lib/release';
import '@/styles/tokens.css';
import '@/styles/site.css';

export function generateMetadata(): Metadata {
  const { origin, publicReady } = getRelease();
  return {
    ...(origin ? { metadataBase: new URL(origin) } : {}),
    robots: { index: publicReady, follow: publicReady },
    icons: { icon: '/images/favicon.svg' },
    applicationName: 'Bright Fortune',
  };
}
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#ffffff' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-HK">
      <head>
        <link rel="preload" href="/fonts/Figtree-Variable.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to main content</a>
        <Header />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
