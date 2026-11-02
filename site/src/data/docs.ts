// Docs helpers shared by the layout, the .md endpoint and llms.txt.
import { getCollection, type CollectionEntry } from 'astro:content';
import { docGroups } from './site';

export type Doc = CollectionEntry<'docs'>;

/** Every docs page in reading order: by group (docGroups order), then `order`. */
export async function getDocs(): Promise<Doc[]> {
  const g = (d: Doc) => docGroups.indexOf(d.data.group);
  return (await getCollection('docs')).sort((a, b) => g(a) - g(b) || a.data.order - b.data.order);
}

/** The introduction lives at /docs/; everything else at /docs/<slug>/ (trailing slash, as in canonical and sitemap). */
export const docHref = (id: string) => (id === 'introduction' ? '/docs/' : `/docs/${id}/`);

/** The page as plain Markdown, for the .md endpoint, "Copy page for AI" and llms-full.txt. */
export const docMarkdown = (d: Doc) => `# ${d.data.title}\n\n${d.data.description}\n\n${(d.body ?? '').trim()}\n`;
