# Migration: Hugo Notes to Astro

## Summary

Successfully migrated 44 markdown files from Hugo's `content/notes` directory to Astro's `src/content/notes` directory with proper shortcode conversion and frontmatter updates.

## Changes Made

### 1. Content Collection Configuration

Added a `notes` collection to `src/content/config.ts`:

```typescript
const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    tags: z.array(z.string()).optional(),
    lastmod: z.coerce.date().optional(),
    date: z.coerce.date().optional(),
  }),
});
```

### 2. Directory Structure

Migrated from:
- `content/notes/` (Hugo)

To:
- `src/content/notes/` (Astro)

Preserved the entire directory structure with subdirectories like:
- `development/ai/`
- `development/go/`
- `development/powershell/`
- `development/tooling/`
- etc.

### 3. Shortcode Conversions

#### Admonition → Aside Component

**Hugo Format:**
```hugo
{{< admonition type="info" title="Example Title" open=true >}}
Content here
{{< /admonition >}}
```

**Astro Format:**
```mdx
<Aside type="info" title="Example Title">
Content here
</Aside>
```

**Type Mappings:**
- `note` → `note`
- `info` → `info`
- `tip` → `tip`
- `warning` → `warning`
- `danger` → `danger`
- `example` → `info`
- `success` → `success`
- `failure` → `danger`
- `bug` → `warning`

#### HTML Comments → MDX Comments

**Before:**
```html
<!-- This is a comment -->
```

**After:**
```mdx
{/* This is a comment */}
```

### 4. Frontmatter Cleanup

Removed Hugo-specific fields:
- `toc`
- `permalink`
- `comments`
- `summary`
- `layout`

Preserved fields:
- `title`
- `date`
- `lastmod`
- `slug`
- `tags`

### 5. MDX Handling

Files with Astro components were converted to `.mdx` extension (16 files), while others remained as `.md` (28 files).

For MDX files:
- Added explicit component imports at the top
- Escaped curly braces in code blocks using HTML entities (`&#123;` and `&#125;`)
- Calculated correct relative paths for component imports based on file depth

### 6. File Statistics

- **Total files migrated:** 44
- **MDX files (with components):** 16
- **Markdown files (no components):** 28
- **Conversion success rate:** 100%

## Build Verification

The Astro build completed successfully with all migrated content:

```bash
npm run build
# ✓ Completed in 14.03s.
# [build] Complete!
```

## Notes

1. **Curly Braces in Code:** MDX interprets `{variable}` as JavaScript expressions, so curly braces in code blocks (fenced and indented) are escaped with HTML entities.

2. **Component Imports:** Each MDX file that uses Astro components includes explicit imports with correct relative paths calculated based on file depth.

3. **Preserved Content:** All original content, including code examples, images, and formatting, was preserved during migration.

4. **Hugo Files:** The original Hugo files in `content/notes/` remain unchanged for reference.

## Migration Script

A Python migration script (`/tmp/migrate_notes.py`) was created to automate:
- Shortcode conversion
- Frontmatter cleaning
- HTML comment conversion
- MDX curly brace escaping
- Component import injection
- File extension determination

This script can be reused for future migrations or updates.
