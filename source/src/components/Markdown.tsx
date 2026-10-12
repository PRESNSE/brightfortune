import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import type { Heading } from '@/lib/content';

/** Raw HTML is disabled (react-markdown default). Heading ids come from the same pre-parse used for the TOC. */
export function Markdown({ body, headings }: { body: string; headings: Heading[] }) {
  let h = 0;
  const hid = () => headings[h++]?.id;
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => <h2>{children}</h2>,
        h2: ({ children }) => <h2 id={hid()}>{children}</h2>,
        h3: ({ children }) => <h3 id={hid()}>{children}</h3>,
        table: ({ children }) => (<div className="tablewrap" role="region" aria-label="Table" tabIndex={0}><table>{children}</table></div>),
        a: ({ href = '', children }) => (href.startsWith('/') ? <Link href={href}>{children}</Link> : <a href={href} rel="noopener noreferrer">{children}</a>),
      }}
    >
      {body}
    </ReactMarkdown>
  );
}
