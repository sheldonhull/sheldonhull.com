# sheldonhull.com

Personal blog and digital garden built with Astro, deployed on Netlify.

## Commands

```bash
task serve      # Start Astro dev server (yarn dev)
task build      # Production build → .artifacts/public
task preview    # Preview production build locally
task init       # Install dependencies (yarn install)
task list       # List all available tasks
```

## Architecture

**Stack**: Astro 5 + MDX + Tailwind CSS 4 + Netlify adapter

**Content** (`src/content/`):
- `posts/{year}/` — Blog posts as `.mdx` files (396 posts, 2013–2024)
- `notes/development/` — Technical documentation/digital garden (34 notes)
- Schema defined in `src/content/config.ts`

**Pages** (`src/pages/`):
- `index.astro`, `about.astro`, `brag.astro`, `level-up.astro`
- `posts.astro`, `notes.astro`, `tags.astro`
- Dynamic: `[slug].astro`, `notes/[...slug].astro`, `tags/[tag].astro`

**Components** (`src/components/`):
- All MDX components auto-imported via `src/plugins/mdx-auto-imports.ts`
- Gallery, GistWindow, Aside, YouTube, TypeIt, MermaidGraph, etc.

**Key files**:
- `astro.config.mjs` — Astro config with Netlify adapter, MDX, Tailwind
- `src/config/site.ts` — Site metadata and header quotes
- `src/data/levelUpData.ts` — RPG life achievement data
- `src/styles/global.css` — Global styles (Tailwind)
- `Taskfile.yml` — Task runner configuration

## Image Organization

**Convention**: Images for posts go in `public/posts/{year}/images/`
- Prefixed with post slug: `{year}-{month}-{day}-{slug}-{filename}.jpg`
- `.meta` files for captions alongside images
- Legacy images (pre-2023) served from `static/images/` as-is

**Gallery component** (auto-imported in MDX):
```mdx
<Gallery images={["2023-11-06-new-york-IMG_3085.jpg"]} year="2023" />
```

## Content Schema

Posts frontmatter: `title` (required), `date` (required), `slug`, `tags`, `authors`, `series`, `seriesOrder`, `cover` (image), `coverAlt`, `images`

Notes frontmatter: `title` (required), `slug`, `tags`, `lastmod`, `date`

## Tool Management

Uses **mise** (`mise.toml`) for CLI tool versions. Tools: task, volta, ripgrep, direnv, changie, glow.

Node/Yarn versions pinned via **Volta** in `package.json`.

## Deployment

**Netlify** (`netlify.toml`):
- Installs mise → installs tools → `task init` → `task build`
- Output: `.artifacts/public`
- Redirects handle legacy Jekyll/Hugo URLs and RSS feeds

## Gotchas

- `static/images/` contains 500+ legacy images still referenced by pre-2023 posts — do not delete
- MDX components are auto-imported; no manual `import` statements needed in posts
- Build output is `.artifacts/public` (not the default `dist/`)
- Site URL set dynamically for Netlify deploy previews via `DEPLOY_PRIME_URL`
