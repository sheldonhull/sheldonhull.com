// Remark plugin to convert relative post links to root-relative paths
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

export function remarkRelativeLinks(): Plugin {
  return (tree: any) => {
    visit(tree, 'link', (node: any) => {
      const url = node.url;
      
      // Skip if already root-relative, external, or anchor
      if (!url || url.startsWith('/') || url.startsWith('http') || url.startsWith('#')) {
        return;
      }
      
      // Skip images
      if (/\.(jpg|jpeg|png|gif|svg|webp)$/i.test(url)) {
        return;
      }
      
      // Handle all relative paths:
      // - ./post-name/
      // - ../../../post-name
      // - post-name (bare relative)
      // - 2021-06-18-post-name/ (bare relative with date)
      
      // Check if it's a relative path (starts with ./ or ../ or is a bare filename)
      const isRelative = url.startsWith('./') || url.startsWith('../') || 
                        (/^[\w\d-]+/.test(url) && !url.includes('://'));
      
      if (isRelative) {
        // Extract the slug from the path
        const parts = url.split('/').filter(part => part && part !== '.' && part !== '..');
        
        if (parts.length > 0) {
          // Get the last non-empty part as the slug
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
