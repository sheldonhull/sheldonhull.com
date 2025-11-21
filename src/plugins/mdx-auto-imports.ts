// Automatically inject imports into all MDX files
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

export function mdxAutoImports(): Plugin {
  return (tree: any, file: any) => {
    // Check if the file is MDX
    if (!file.history[0]?.endsWith('.mdx')) return;

    // Define the import statement we want to inject
    const importNode = {
      type: 'mdxjsEsm',
      value: '',
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: [
            {
              type: 'ImportDeclaration',
              specifiers: [
                {
                  type: 'ImportDefaultSpecifier',
                  local: { type: 'Identifier', name: 'GistWindow' }
                }
              ],
              source: {
                type: 'Literal',
                value: '../../../components/GistWindow.astro',
                raw: "'../../../components/GistWindow.astro'"
              }
            }
          ]
        }
      }
    };

    // Check if GistWindow is already imported
    let hasImport = false;
    visit(tree, 'mdxjsEsm', (node: any) => {
      if (node.data?.estree?.body?.[0]?.source?.value?.includes('GistWindow')) {
        hasImport = true;
      }
    });

    // Only inject if not already imported and if GistWindow is used
    if (!hasImport) {
      let usesGistWindow = false;
      visit(tree, 'mdxJsxFlowElement', (node: any) => {
        if (node.name === 'GistWindow') {
          usesGistWindow = true;
        }
      });

      if (usesGistWindow) {
        tree.children.unshift(importNode);
      }
    }
  };
}
