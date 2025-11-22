// Remark plugin to convert relative post links to root-relative paths
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

export function remarkRelativeLinks(): Plugin {
  return (tree: any) => {
    visit(tree, 'link', (node: any) => {
      const url = node.url;
      
      // Skip if not a relative path or if it's an image
      if (!url || url.startsWith('/') || url.startsWith('http') || url.startsWith('#')) {
        return;
      }
      
      // Skip images
      if (/\.(jpg|jpeg|png|gif|svg|webp)$/i.test(url)) {
        return;
      }
      
      // Handle relative paths like ./post-name/ or ../../../post-name
      if (url.startsWith('./') || url.startsWith('../')) {
        // Extract the slug from the path
        const parts = url.split('/').filter(part => part && part !== '.' && part !== '..');
        
        if (parts.length > 0) {
          // Get the last part as the slug
          let slug = parts[parts.length - 1];
          
          // Remove date prefix if present (YYYY-MM-DD-)
          slug = slug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
          
          // Remove file extensions
          slug = slug.replace(/\.(md|mdx)$/, '');
          
          // Convert to root-relative path
          node.url = `/${slug}`;
        }
      }
    });
  };
}
