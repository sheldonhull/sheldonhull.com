// Automatically inject imports into all MDX files
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

export function mdxAutoImports(): Plugin {
  return (tree: any, file: any) => {
    // Check if the file is MDX
    if (!file.history[0]?.endsWith('.mdx')) return;

    // Define components to auto-import
    const components = [
      {
        name: 'GistWindow',
        path: '../../../components/GistWindow.astro'
      },
      {
        name: 'Aside',
        path: '../../../components/Aside.astro'
      },
      {
        name: 'Gallery',
        path: '../../../components/Gallery.astro'
      },
      {
        name: 'Asciinema',
        path: '../../../components/Asciinema.astro'
      },
      {
        name: 'Conversation',
        path: '../../../components/Conversation.astro'
      },
      {
        name: 'TypeIt',
        path: '../../../components/TypeIt.astro'
      },
      {
        name: 'YouTube',
        path: '../../../components/YouTube.astro'
      },
      {
        name: 'FAIcon',
        path: '../../../components/FAIcon.astro'
      },
      {
        name: 'ComparisonCards',
        path: '../../../components/ComparisonCards.astro'
      }
    ];

    // Process each component
    components.forEach(component => {
      // Check if component is already imported
      let hasImport = false;
      visit(tree, 'mdxjsEsm', (node: any) => {
        if (node.data?.estree?.body?.[0]?.source?.value?.includes(component.name)) {
          hasImport = true;
        }
      });

      // Only inject if not already imported and if component is used
      if (!hasImport) {
        let usesComponent = false;
        // Check for both block-level (Flow) and inline (Text) elements
        visit(tree, 'mdxJsxFlowElement', (node: any) => {
          if (node.name === component.name) {
            usesComponent = true;
          }
        });
        visit(tree, 'mdxJsxTextElement', (node: any) => {
          if (node.name === component.name) {
            usesComponent = true;
          }
        });

        if (usesComponent) {
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
                        local: { type: 'Identifier', name: component.name }
                      }
                    ],
                    source: {
                      type: 'Literal',
                      value: component.path,
                      raw: `'${component.path}'`
                    }
                  }
                ]
              }
            }
          };
          tree.children.unshift(importNode);
        }
      }
    });
  };
}
