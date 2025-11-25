/**
 * Remove file extension from a path
 * @param path - Path with .md or .mdx extension
 * @returns Path without extension
 */
export function removeExtension(path: string): string {
  return path.replace(/\.(md|mdx)$/, '');
}
