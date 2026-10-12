import { NextResponse, type NextRequest } from 'next/server';

/**
 * Adds X-Robots-Tag: noindex unless SITE_MODE=public and the request host matches SITE_URL.
 * Page-level meta robots is computed separately from the full release gate (lib/release.ts).
 */
export function proxy(req: NextRequest) {
  const res = NextResponse.next();
  let indexable = false;
  try {
    const host = new URL(process.env.SITE_URL ?? '').host;
    indexable = process.env.SITE_MODE === 'public' && !!host && req.headers.get('host') === host;
  } catch {
    indexable = false;
  }
  if (!indexable) res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return res;
}

export const config = { matcher: ['/((?!_next/static|_next/image|fonts/|images/).*)'] };
