// /docs/<slug>.md: each page as raw Markdown (introduction included), for "Copy page for AI" and agents.
import type { APIRoute } from 'astro';
import { getDocs, docMarkdown, type Doc } from '../../data/docs';

export async function getStaticPaths() {
  return (await getDocs()).map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}

export const GET: APIRoute = ({ props }) =>
  new Response(docMarkdown(props.entry as Doc), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
