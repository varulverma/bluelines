// /llms-full.txt: every docs page as Markdown, in reading order.
import type { APIRoute } from 'astro';
import { getDocs, docMarkdown } from '../data/docs';

export const GET: APIRoute = async () => {
  const body = (await getDocs()).map(docMarkdown).join('\n---\n\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
