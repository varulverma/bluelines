// Docs: one Markdown file per page in src/content/docs. The file name is the slug.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { docGroups } from './data/site';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    group: z.enum(docGroups),
    order: z.number(),
    video: z.string().optional(), // e.g. /video/01-install.mp4, shown only once the file is in public/
    next: z.string().optional(),  // slug of the page to suggest next; defaults to the next by order
  }),
});

export const collections = { docs };
