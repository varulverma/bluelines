// /llms.txt (llmstxt.org): every docs page, grouped, with its URL and description.
import type { APIRoute } from 'astro';
import { docGroups, site } from '../data/site';
import { getDocs, docHref } from '../data/docs';

export const GET: APIRoute = async ({ site: origin }) => {
  const docs = await getDocs();
  const url = (p: string) => new URL(p, origin ?? site.url).href;
  const sections = docGroups
    .map((g) => [g, docs.filter((d) => d.data.group === g)] as const)
    .filter(([, items]) => items.length)
    .map(([g, items]) => `## ${g}\n\n${items.map((d) => `- [${d.data.title}](${url(docHref(d.id))}): ${d.data.description}`).join('\n')}`);
  const body = [
    `# ${site.name}`,
    `> ${site.description}`,
    `Every page is also available as Markdown at ${url('/docs/')}<slug>.md, and all pages in one file at ${url('/llms-full.txt')}.`,
    ...sections,
  ].join('\n\n');
  return new Response(body + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
