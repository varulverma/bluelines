// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Set `site` to the production URL before deploying: canonical, OG and sitemap depend on it.
export default defineConfig({
  site: 'https://getbluelines.netlify.app',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'always' },
  // Docs code blocks: both themes as CSS variables; docs.css picks one from data-theme.
  markdown: { shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false } },
});
