# Additional Conventions Beyond the Built-in Functions

As this project's AI coding tool, you must follow the additional conventions below, in addition to the built-in functions.

# Copilot Instructions for sheldonhull.com

Personal blog and digital garden built with Astro, deployed on Netlify.

## Architecture Overview

**Astro Static Site**:
The site is located in `src/` with configuration in `astro.config.mjs`.
Uses Yarn 4 (managed via Volta in `package.json`) for dependency management.
**IMPORTANT**: Always use `task` commands for builds to ensure proper environment setup.

**Build System**:
Taskfile (`Taskfile.yml`) orchestrates all build commands.
Always prefer `task` commands over direct `yarn` or `npm` commands.

**Content Structure**:
- Blog posts in `src/content/posts/{year}/` as MDX files
- Notes/digital garden in `src/content/notes/development/`
- Schema defined in `src/content/config.ts`

**Tool Management**:
Uses mise (`mise.toml`) for CLI tool versions. Node/Yarn pinned via Volta.

## Command/API Patterns

### Build Commands
```bash
# Development server with live reload
task serve

# Production build
task build

# Preview production build
task preview

# Install dependencies
task init

# List all tasks
task list
```

### Content Organization
- **Posts**: `src/content/posts/{YYYY}/{YYYY-MM-DD-title.mdx}`
- **Notes**: `src/content/notes/development/{topic}/{file.mdx}`
- **Images**: `public/posts/{year}/images/{slug}-{filename}.jpg`
- **Legacy images**: `static/images/` (pre-2023, still actively referenced)

### MDX Components
All components are auto-imported via `src/plugins/mdx-auto-imports.ts`:
- Gallery, GistWindow, Aside, YouTube, TypeIt, MermaidGraph, etc.
- No manual import statements needed in MDX files

## Development Patterns

### Yarn Dependency Management
- **Version**: Yarn 4 managed via Volta (version in `package.json`)
- **Local Development**: Use `task init` to install dependencies
- **Important**: Never commit changes that modify `yarn.lock` without also committing the updated lockfile

## Key Files to Understand
- `astro.config.mjs`: Astro configuration with Netlify adapter, MDX, Tailwind
- `Taskfile.yml`: Task runner configuration
- `src/content/config.ts`: Content collection schema definitions
- `src/config/site.ts`: Site metadata and header quotes
- `src/plugins/mdx-auto-imports.ts`: Auto-imported MDX components
- `mise.toml`: CLI tool version management

## Build and Deployment

### Netlify Configuration
- **Pipeline**: Installs mise → installs tools → `task init` → `task build`
- **Output**: `.artifacts/public`
- **Previews**: Deploy previews auto-generated for PRs
- **Redirects**: Legacy Jekyll/Hugo URL compatibility

### Debugging
- **Build Failures**: Check `task echo-debug` for environment info
- **Missing Tools**: Run `mise install` to install tools from `mise.toml`
- **Dependency Issues**: Run `task init` to reinstall

## Gotchas

- `static/images/` has 500+ legacy images referenced by pre-2023 posts — do not delete
- Build output is `.artifacts/public` (not default `dist/`)
- Site URL dynamically set for Netlify previews via `DEPLOY_PRIME_URL`
- MDX components are auto-imported — no `import` statements needed
