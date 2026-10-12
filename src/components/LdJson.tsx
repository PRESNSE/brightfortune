import { jsonLd } from '@/lib/seo';
import { buildSchema } from '@/lib/schema';

export function LdJson(props: Parameters<typeof buildSchema>[0]) {
  const items = buildSchema(props);
  if (!items.length) return null;
  return <>{items.map((o, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(o) }} />))}</>;
}
