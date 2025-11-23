# Copilot Instructions for sheldonhull.com

**IMPORTANT: Site Migration in Progress**

This site is being migrated from Hugo to Astro. Both systems currently coexist:
- **Legacy**: Hugo content in `content/` (will be removed after full migration)
- **Current**: Astro site in `src/` with content in `src/content/posts/`

When working with posts and images, **always use the Astro structure** in `src/`.

## Astro Image Organization

**Image Convention (Updated Nov 2025)**:
- All images for Astro posts go in `public/posts/{year}/images/`
- Images are **prefixed with post slug**: `{year}-{month}-{day}-{slug}-{filename}.jpg`
- Example: `public/posts/2023/images/2023-11-06-new-york-IMG_3085.jpg`
- `.meta` files for image captions are preserved alongside images

**Structure**:
```
src/content/posts/
├── 2023/
│   ├── 2023-11-06-new-york.mdx          ← Flat MDX file
│   ├── 2023-11-14-first-week-in-paris.mdx
│   └── images/                           ← Shared by ALL 2023 posts
│       ├── 2023-11-06-new-york-IMG_3085.jpg
│       ├── 2023-11-06-new-york-IMG_3089.jpg
│       ├── 2023-11-14-first-week-in-paris-IMG_3227.jpg
│       └── ...
└── 2024/
    ├── post1.md
    └── images/
        └── ...
```

**Gallery Component**:
- Use `<Gallery />` component in MDX files to display image galleries
- Auto-imported via `src/plugins/mdx-auto-imports.ts` (no manual import needed)
- Usage: `<Gallery images={["2023-11-06-new-york-IMG_3085.jpg", "..."]} year="2023" />`
- Replaces Hugo's `{{< gallery >}}` shortcode

**Content Schema**:
- Updated in `src/content/config.ts` to support image fields
- `cover: image().optional()` for featured images (optimized by Astro)
- `coverAlt: z.string().optional()` for alt text
- `images: z.array(z.string()).optional()` for backward compatibility

**Image Optimization**:
- Astro 5.16.0 provides automatic WebP conversion, lazy loading, and responsive images
- Images in `src/` are optimized at build time
- Images in `public/` are served as-is (no optimization)

## Legacy Hugo Architecture (Being Phased Out)

This Hugo-based personal blog repository uses modern Go tooling with Hugo modules,
mage build automation, and extensive customizations.
The site is deployed via Netlify with Algolia search integration.

## Architecture Overview

**Hugo Static Site with Modules**:
The site uses Hugo modules instead of traditional themes.
The primary theme is `github.com/HEIGE-PCloud/DoIt` with additional modules like `hugo-shortcode-gallery`.
All modules are vendored in `_vendor/` and customized through layout overrides in `layouts/`.

**Build System**:
Dual build system using both Go's mage tool and Taskfile.
Mage handles complex Go-based tasks like post creation and Dagger builds,
while Taskfile provides simpler command orchestration.

**Content Structure**:
- Main content in `content/posts/{year}/` organized by year
- Special sections: `notes/` (documentation), `microblog/`, `creative/` (photo galleries)
- Custom archetypes in `archetypes/` for different post types including 100DaysOfCode tracking

**Development Environment**:
Uses aqua for CLI tool management, devcontainer support, and comprehensive tooling setup.

## Command/API Patterns

### Primary Build Commands
```bash
# Development server (most common)
task serve
# OR
go run mage.go hugo:serve

# Production build
task build-public
# OR
go run mage.go hugo:buildpublic

# Create new posts
go run mage.go post

# Initialize project tooling
task init
# OR
go run mage.go init
```

### Content Creation Patterns
- **Blog posts**: Use `go run mage.go post` for guided creation with automatic slug generation
- **100DaysOfCode**: Special archetype that auto-increments counter from `100daysofcode.toml`
- **Microblog**: Short-form content with full content display in list views
- **Notes**: Documentation-style content with different layout patterns

### Development Workflow Commands
```bash
# List all available tasks
task list
go run mage.go -l

# Build and serve locally
task serve  # Uses hugo serve with live reload

# Update dependencies
hugo mod get -u && hugo mod vendor

# Search integration
task algolia  # Updates search index
yarn run algolia  # Direct npm script
```

## Development Patterns

### Hugo Module Management
- **Vendor Strategy**: All modules vendored in `_vendor/` for reproducible builds
- **Theme Overrides**: Custom layouts in `layouts/` override vendor theme files
- **Module Updates**: Use `hugo mod get -u` then `hugo mod vendor`

### Custom Shortcodes and Layouts
Key customizations in `layouts/shortcodes/`:
- `gallery.html` - PhotoSwipe galleries with lazy loading
- `admonition.html` - Styled callout boxes
- `typeit.html` - TypeIt animation integration
- `fancybox-*` - Various image gallery implementations

### Content Organization
- **Yearly Structure**: Posts organized as `content/posts/{YYYY}/{YYYY-MM-DD-title.md}`
- **Page Bundles**: Some posts use bundle format with associated images
- **Front Matter**: Extensive use of Hugo's front matter for SEO, images, and custom features
- **Permalink Strategy**: Clean URLs without year structure in final output

### Go Integration Patterns
```go
// Mage namespace pattern (magefiles/magefile.go)
type Hugo mg.Namespace
func (Hugo) Serve() error { /* hugo serve logic */ }

// 100DaysOfCode configuration (CodeConfig struct)
type CodeConfig struct {
    Language string `toml:"language"`
    Counter  int    `toml:"counter"`
    Round    int    `toml:"round"`
}
```

## External Context

### Build and Deployment
- **Netlify**: Primary deployment platform using `netlify.toml`
- **Build Command**: Uses aqua installer, mage tooling, and algolia updates
- **Environment Variables**: DEPLOY_PRIME_URL, HUGO_* settings, Algolia credentials
- **Redirects**: Handles legacy Jekyll URLs and RSS feed compatibility

### Search Integration
- **Algolia**: Powers site search with atomic-algolia for index updates
- **Config**: App ID: `04HSGXXQD5`, Index: `sheldonhull.com`
- **Generation**: Hugo outputs `algolia.json` for indexing
- **Updates**: Automated via `yarn run algolia` in build pipeline

### Tool Management
- **Aqua**: CLI version manager for development tools (replaces asdf/homebrew for CLIs)
- **Configuration**: `.aqua/aqua.yaml` defines tool versions, tags for targeted installs
- **CI Integration**: Netlify build uses aqua installer for reproducible tooling

### Development Environment
- **Devcontainer**: Full setup in `.devcontainer/` with aqua, trunk.io, zsh
- **Codespaces**: Supported with automated tooling setup
- **Local Setup**: `task init` or `mage init` handles dependency installation

## Development Workflow

### Getting Started
1. **Clone and Initialize**:
   ```bash
   git clone <repo>
   task init  # Sets up hugo modules, yarn deps, tooling
   ```

2. **Local Development**:
   ```bash
   task serve  # Starts hugo server with live reload
   # Opens at http://127.0.0.1:1313
   ```

3. **Content Creation**:
   ```bash
   go run mage.go post  # Interactive post creation
   # Choose type: 100DaysOfCode, microblog, blog, blog-bundle
   ```

### Key Files to Understand
- `config.yml`: Hugo configuration with extensive customization
- `magefiles/magefile.go`: Go-based build automation
- `Taskfile.yml`: Task runner configuration
- `layouts/`: Theme overrides and custom layouts
- `100daysofcode.toml`: Counter tracking for coding posts

### Debugging Common Issues
- **Module Issues**: Run `hugo mod clean && hugo mod vendor`
- **Build Failures**: Check `task echo-debug` for environment info
- **Search Issues**: Verify algolia.json generation and environment variables
- **Missing Tools**: `aqua install` or check `.aqua/aqua.yaml`

## Build and Deployment

### Local Build Process
```bash
# Development build with drafts/future posts
task build
# OR for specific output
hugo --buildFuture --buildDrafts --enableGitInfo -d _site

# Production build (matches Netlify)
task build-public
```

### Netlify Configuration
- **Primary Command**: Uses aqua installer → mage tooling → algolia update
- **Environment**: HUGO_ENABLEGITINFO=true, HUGO_BASEURL=production URL
- **Outputs**: `public/` directory for production, `preview/` for deploy previews
- **Post-Build**: Automatic algolia index update via `atomic-algolia`

### Asset Processing
- **Images**: Hugo image processing with multiple formats/sizes
- **CSS/JS**: Asset pipeline with minification and fingerprinting
- **Search**: JSON generation for Algolia indexing

## Testing Strategies

### Local Testing
```bash
# Serve with production-like settings
hugo serve -b http://127.0.0.1:1313 --enableGitInfo --buildFuture --buildDrafts

# Build validation
task build && echo "Build successful"

# Link checking (when configured)
# Uses linkchecker or similar tools
```

### Content Validation
- **Front Matter**: Hugo validates YAML front matter
- **Links**: Internal link validation through Hugo
- **Search**: Test algolia.json generation for search functionality

### CI/CD Validation
- **Netlify Build Logs**: Check for Hugo errors, algolia updates
- **Deploy Previews**: Automatic generation for pull requests
- **Branch Deploys**: Feature branch testing capability

## Recent Problems and Solutions

### Hugo Module Conflicts
- **Problem**: Module version conflicts between theme updates
- **Solution**: Pin specific versions in `go.mod`, use `hugo mod vendor` consistently

### Algolia Integration Issues
- **Problem**: Search index not updating in CI
- **Solution**: Ensure `ALGOLIA_ADMIN_KEY` environment variable set, verify `atomic-algolia` execution

### Build Performance
- **Problem**: Slow builds due to image processing
- **Solution**: Use `.Scratch` for caching, optimize image sizes in content

### 100DaysOfCode Automation
- **Problem**: Manual counter management prone to errors
- **Solution**: Automated counter in `100daysofcode.toml` with mage post creation

### Theme Customization Maintenance
- **Problem**: Theme updates breaking custom layouts
- **Solution**: Maintain overrides in `layouts/`, test theme updates in branches first
- add short synopsis of resources you used and that it's still a work in progress to your memory