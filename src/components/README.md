# GistWindow Component

A beautiful Astro component for displaying GitHub gists with macOS-style window chrome and glassmorphism effects.

## Features

- ✨ **Glassmorphism Design** - Semi-transparent background with backdrop blur
- 🖼️ **macOS Window Chrome** - Authentic window with colored control dots (red/yellow/green)
- 🎨 **Syntax Highlighting** - Powered by Shiki with Night Owl theme
- 📋 **Copy Button** - One-click code copying with visual feedback
- 🔗 **GitHub Link** - Direct link to view full gist on GitHub
- ⚡ **Build-time Fetching** - Gists are fetched at build time for better performance
- 📱 **Responsive** - Works beautifully on all screen sizes
- 🎭 **Smooth Animations** - Hover effects and transitions

## Installation

The component is already set up! Just make sure you have the required dependencies:

```bash
npm install shiki
```

(Note: `shiki` should already be installed as it's a dependency of Astro)

## Usage

### Basic Example

```astro
---
import GistWindow from '../components/GistWindow.astro';
---

<GistWindow
  user="sheldonhull"
  gistId="abc123def456"
/>
```

### With All Options

```astro
<GistWindow
  user="sheldonhull"
  gistId="abc123def456"
  filename="example.ts"
  title="My Amazing TypeScript Code"
  lang="typescript"
  theme="night-owl"
/>
```

### In a Blog Post (MDX)

If you're using MDX for blog posts, you can import and use it directly:

```mdx
---
title: My Blog Post
---

import GistWindow from '../../components/GistWindow.astro';

Check out this awesome code:

<GistWindow
  user="sheldonhull"
  gistId="abc123def456"
  title="Cool Function"
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `user` | string | ✅ Yes | - | GitHub username |
| `gistId` | string | ✅ Yes | - | Gist ID (from the gist URL) |
| `filename` | string | ❌ No | First file | Specific file to display from the gist |
| `title` | string | ❌ No | `filename` or "Code" | Window title bar text |
| `lang` | string | ❌ No | Auto-detected | Language for syntax highlighting |
| `theme` | string | ❌ No | `"night-owl"` | Shiki theme name |

## Finding Your Gist ID

Your gist URL looks like: `https://gist.github.com/username/abc123def456`

The gist ID is the hash at the end: `abc123def456`

## Available Themes

The component uses Shiki for syntax highlighting. Popular themes include:

- `night-owl` (default) - Dark theme
- `github-dark`
- `github-light`
- `dracula`
- `nord`
- `monokai`
- `one-dark-pro`

See [Shiki themes](https://shiki.style/themes) for the complete list.

## Customization

### Changing Colors

The component uses Tailwind CSS classes. You can customize by editing [GistWindow.astro](./GistWindow.astro):

```astro
<!-- Change glassmorphism background -->
<div class="bg-slate-900/75">  <!-- Change this -->

<!-- Change window chrome gradient -->
<div class="bg-gradient-to-b from-slate-800/95 to-slate-900/95">  <!-- Change this -->
```

### Control Dot Colors

The macOS control dots use these Tailwind classes:
- Close: `from-red-500 to-red-600`
- Minimize: `from-yellow-500 to-yellow-600`
- Maximize: `from-green-500 to-green-600`

### Adding More Effects

Add more glassmorphism effects:
```astro
<div class="backdrop-blur-2xl saturate-150">  <!-- Increase blur and saturation -->
```

## Styling Details

The component includes:

1. **Glassmorphism Effect**
   - `backdrop-blur-xl` - Creates the frosted glass effect
   - `bg-slate-900/75` - Semi-transparent background
   - `border-white/10` - Subtle border

2. **Hover Animation**
   - `hover:-translate-y-1` - Lifts up on hover
   - `transition-all duration-300` - Smooth animation

3. **Window Chrome**
   - Gradient background for depth
   - Interactive control dots that show symbols on hover
   - Centered title with proper typography

4. **Copy Button**
   - Positioned absolutely in top-right
   - Visual feedback on click (green background + checkmark)
   - Auto-resets after 2 seconds

## Demo Page

A demo page is available at [`/gist-demo`](../pages/gist-demo.astro) showing multiple examples.

Run your dev server:
```bash
npm run dev
```

Then visit: `http://localhost:4321/gist-demo`

## Troubleshooting

### Gist not loading

1. **Check the gist ID** - Make sure it's the correct hash from the URL
2. **Check the filename** - If specifying a filename, ensure it matches exactly (case-sensitive)
3. **API rate limits** - GitHub API has rate limits (60/hour unauthenticated, 5000/hour authenticated). Set `GITHUB_TOKEN` environment variable to avoid rate limit errors:
   - Create a [Personal Access Token](https://github.com/settings/tokens) with no scopes (public access only)
   - Add to `.env`: `GITHUB_TOKEN=ghp_xxxxxxxxxxxx`
   - For Netlify: Add to Environment Variables in Site Settings
4. **Caching** - Gist data is automatically cached in `node_modules/.cache/gists/` to avoid re-fetching on every build. To refresh a gist, delete its cache file or run `rm -rf node_modules/.cache/gists/`

### Syntax highlighting not working

1. **Check the language code** - Use standard language codes (`typescript`, `javascript`, `python`, `go`, etc.)
2. **Auto-detection** - Remove the `lang` prop to let the component auto-detect from the gist metadata

### Styling issues

1. **Tailwind not applying** - Ensure Tailwind is properly configured in your `astro.config.mjs`
2. **Dark mode** - The component is designed for dark backgrounds. Adjust colors if using on light backgrounds

## Performance

- **Build-time fetching**: Gists are fetched once during build, not on every page load
- **No client-side API calls**: Better performance and no rate limit issues for visitors
- **Optimized styling**: Uses native CSS and Tailwind utilities for minimal runtime overhead

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- Requires support for `backdrop-filter` for the glassmorphism effect
- Fallback: Component still looks good even without backdrop-filter support

## License

Free to use and modify for your project!
