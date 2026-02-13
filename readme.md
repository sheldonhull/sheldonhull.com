# sheldonhull.com

Personal blog and digital garden at [sheldonhull.com](https://www.sheldonhull.com).

## Overview

This blog has gone through several phases: Wordpress, Jekyll, Ghost, Hugo, and now Astro.

The Hugo era (2019-2025) used the [DoIt](https://codeit.suntprogramator.dev/) theme with extensive customizations including custom shortcodes, photo galleries, series navigation, and Algolia search integration. The Go-based build system used mage for automation and Hugo modules for dependency management.

In 2025-2026, the site was fully migrated to Astro with MDX, Tailwind CSS 4, and Netlify. All 396 posts and 34 technical notes were migrated. The Hugo build system, Go tooling, and theme vendor directory were removed.

## Stack

- **Framework**: [Astro 5](https://astro.build) with MDX
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Deployment**: [Netlify](https://netlify.com)
- **Tool management**: [mise](https://mise.jdx.dev) (aqua backend)
- **Node/Yarn**: [Volta](https://volta.sh)
- **Task runner**: [go-task](https://taskfile.dev)

## Getting Started

```bash
mise install          # Install CLI tools
task init             # Install dependencies (yarn install)
task serve            # Start dev server
```

## Commands

| Command          | Action                                |
| :--------------- | :------------------------------------ |
| `task serve`     | Start Astro dev server with live reload |
| `task build`     | Build production site to `.artifacts/public` |
| `task preview`   | Preview production build locally      |
| `task init`      | Install dependencies                  |
| `task list`      | List all available tasks              |

## Content

- **Posts**: `src/content/posts/{year}/` — 396 blog posts (2013-2024) as MDX
- **Notes**: `src/content/notes/development/` — 34 technical notes/digital garden
- **Images**: `public/posts/{year}/images/` for post images (2023+), `static/images/` for legacy

MDX components (Gallery, GistWindow, Aside, YouTube, TypeIt, MermaidGraph, etc.) are auto-imported via `src/plugins/mdx-auto-imports.ts` — no manual imports needed.

## Customizations

- Auto-imported MDX components for galleries, code embeds, asciinema, mermaid diagrams
- Series navigation for multi-part posts
- Life RPG achievements page with gamified stats
- Notes section with sticky sidebar navigation
- Liquid glass header with random quotes
- Legacy URL redirects for Jekyll/Hugo era links
