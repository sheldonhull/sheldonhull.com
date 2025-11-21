// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';
import { mdxAutoImports } from './src/plugins/mdx-auto-imports.ts';

// https://astro.build/config
export default defineConfig({
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