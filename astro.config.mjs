// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import netlify from '@astrojs/netlify';

import tailwindcss from '@tailwindcss/vite';
import { mdxAutoImports } from './src/plugins/mdx-auto-imports.ts';

// https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables
const NETLIFY_PREVIEW_SITE = process.env.CONTEXT !== 'production' && process.env.DEPLOY_PRIME_URL;

// https://astro.build/config
export default defineConfig({
  site: NETLIFY_PREVIEW_SITE || 'https://www.sheldonhull.com/',
  outDir: '.artifacts/public',
  adapter: netlify(),
  integrations: [
    mdx({
      // Automatically inject imports for components like GistWindow
      remarkPlugins: [mdxAutoImports],
      smartypants: true,
      gfm: true,
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});