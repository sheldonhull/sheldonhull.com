# Hugo Shortcode Migration Specification

> **Generated:** 2024-11-21
> **Purpose:** Complete inventory of Hugo shortcodes requiring Astro component replacements

## Content Inventory Summary

**Total Posts:** 427 markdown files (2013-2024)
- 2024: 5 posts ✅ (migrated)
- 2023: 18 posts
- 2022: 13 posts
- 2021: 111 posts (largest folder)
- 2020: 82 posts
- 2019: 24 posts
- 2018: 6 posts
- 2017: 33 posts
- 2016: 54 posts
- 2015: 26 posts
- 2014: 8 posts
- 2013: 15 posts

**Total Remaining:** 422 posts to migrate

---

## Hugo Shortcode Inventory

### 1. Admonition - Callout/Alert Boxes

**Priority:** 🔴 CRITICAL
**Total Instances:** ~127 occurrences
**Distribution:**
- 2021: 49 instances
- 2020: 9 instances
- 2019: 11 instances
- 2016: 24 instances
- 2015: 8 instances
- 2013: 4 instances

**Hugo Syntax:**
```hugo
{{< admonition type="info" title="Update 2021-09-20" open="true" >}}
Content here
{{< /admonition >}}
```

**Types Used:** info, warning, note, tip

**Astro Component Required:**
```astro
---
// src/components/Admonition.astro
interface Props {
  type?: 'info' | 'warning' | 'note' | 'tip';
  title?: string;
  open?: boolean;
}

const { type = 'info', title, open = true } = Astro.props;
---

<div class:list={['admonition', `admonition-${type}`, { 'admonition-open': open }]}>
  {title && <div class="admonition-title">{title}</div>}
  <div class="admonition-content">
    <slot />
  </div>
</div>

<style>
  /* Styled callout boxes with type-specific colors */
</style>
```

**Migration Strategy:**
- Replace `{{< admonition ... >}}` with `<Admonition ...>`
- Convert props: `type`, `title`, `open`
- Wrap content in component tags

---

### 2. Gist - GitHub Gist Embeds

**Priority:** 🔴 CRITICAL
**Total Instances:** ~94 occurrences
**Distribution:**
- 2016: 43 instances (23 files)
- 2021: 17 instances
- 2020: 16 instances
- 2017: 17 instances
- 2019: 7 instances
- 2018: 5 instances
- 2014: 5 instances

**Hugo Syntax:**
```hugo
{{< gist sheldonhull "764d2702bf9e783fca0263bbabd598a7" >}}
{{< gist sheldonhull "gist-id" "filename.ext" >}}
```

**Astro Component Required:**
```astro
---
// src/components/GistEmbed.astro
interface Props {
  username: string;
  gistId: string;
  filename?: string;
}

const { username, gistId, filename } = Astro.props;
const gistUrl = filename
  ? `https://gist.github.com/${username}/${gistId}.js?file=${filename}`
  : `https://gist.github.com/${username}/${gistId}.js`;
---

<script src={gistUrl}></script>
```

**Migration Strategy:**
- Parse shortcode parameters
- Replace with `<GistEmbed username="..." gistId="..." />`
- Handle optional filename parameter

---

### 3. FA-Icon - Font Awesome Icons

**Priority:** 🟡 MEDIUM
**Total Instances:** ~32 occurrences
**Distribution:**
- 2020: 17 instances (concentrated in 1 post)
- 2021: 12 instances
- 2023: 3 instances

**Hugo Syntax:**
```hugo
{{< fa-icon solid external-link-alt >}}
{{< fa-icon brands twitter fa-fw >}}
```

**Astro Component Required:**
```astro
---
// src/components/FAIcon.astro
interface Props {
  style: 'solid' | 'brands' | 'regular';
  icon: string;
  fw?: boolean;
}

const { style, icon, fw = false } = Astro.props;
---

<i class:list={[`fa-${style}`, `fa-${icon}`, { 'fa-fw': fw }]}></i>
```

**Alternative:** Consider replacing with modern icon library (lucide, phosphor, etc.)

**Migration Strategy:**
- Install Font Awesome or alternative icon library
- Replace with `<FAIcon style="..." icon="..." />`
- Or convert to modern icon components

---

### 4. Gallery - Image Galleries

**Priority:** 🟡 MEDIUM
**Total Instances:** 6 occurrences
**Distribution:**
- 2023: 3 instances (page bundles with images/)
- 2017: 3 instances (as `fancybox-gallery`)

**Hugo Syntax:**
```hugo
{{< gallery >}}
{{< gallery match="images/*" >}}
```

**Features:**
- Auto-discovers images in page bundle
- Creates lightbox gallery
- Reads `.meta` files for captions

**Astro Component Required:**
```astro
---
// src/components/Gallery.astro
import { getCollection } from 'astro:content';
import { Image } from 'astro:assets';

interface Props {
  match?: string;
  images?: string[];
}

const { match = 'images/*', images } = Astro.props;
// Auto-discover images or use provided list
---

<div class="gallery">
  <!-- PhotoSwipe or lightbox gallery implementation -->
</div>

<script>
  // Initialize lightbox library
</script>
```

**Dependencies:**
- PhotoSwipe, GLightbox, or similar
- Image optimization with Astro's Image component

**Migration Strategy:**
- Handle page bundles with co-located images
- Parse `.meta` files for image captions
- Implement lightbox functionality

---

### 5. YouTube - Video Embeds

**Priority:** 🟢 LOW
**Total Instances:** 6 occurrences
**Distribution:**
- 2023: 2 instances
- 2020: 2 instances
- 2017: 2 instances

**Hugo Syntax:**
```hugo
{{< youtube "2hOLm_k6eCs" >}}
```

**Astro Component Required:**
```astro
---
// src/components/YouTube.astro
interface Props {
  id: string;
  title?: string;
}

const { id, title = 'YouTube video' } = Astro.props;
---

<lite-youtube videoid={id} playlabel={title}></lite-youtube>

<style>
  /* Lite YouTube styles */
</style>
```

**Alternative:** Use `@astro-community/astro-embed-youtube` or lite-youtube-embed

**Migration Strategy:**
- Replace with `<YouTube id="..." />`
- Consider lite-youtube for performance

---

### 6. RelRef - Internal Cross-References

**Priority:** 🟡 MEDIUM
**Total Instances:** ~12 occurrences
**Distribution:**
- 2021: 5 instances
- 2020: 2 instances
- 2023: 1 instance
- 2019: 1 instance
- 2018: 3 instances

**Hugo Syntax:**
```hugo
[link text]({{< relref "2021-06-11-post-name.md" >}})
```

**Migration Strategy:**
- Build mapping of Hugo post paths to Astro slugs
- Replace with static paths during migration
- Or create helper function for content collection references

**Astro Approach:**
```astro
---
import { getEntry } from 'astro:content';

const relatedPost = await getEntry('posts', 'slug-name');
---

<a href={`/${relatedPost.data.slug || relatedPost.slug}`}>link text</a>
```

---

### 7. Conversation - Styled Dialog

**Priority:** 🟢 LOW
**Total Instances:** 1 occurrence
**Distribution:**
- 2023: 1 instance

**Hugo Syntax:**
```hugo
{{< conversation >}}
Dialog content here
{{< /conversation >}}
```

**Astro Component Required:**
```astro
---
// src/components/Conversation.astro
---

<div class="conversation">
  <slot />
</div>

<style>
  .conversation {
    /* Custom styling for conversation blocks */
  }
</style>
```

**Migration Strategy:**
- Simple component with slot
- Custom CSS for styling

---

### 8. Asciinema - Terminal Recordings

**Priority:** 🟢 LOW
**Total Instances:** 2 occurrences
**Distribution:**
- 2020: 2 instances

**Hugo Syntax:**
```hugo
{{< asciinema id="DnQ0MCgZekv11MggByfjqRNNT" >}}
```

**Astro Component Required:**
```astro
---
// src/components/Asciinema.astro
interface Props {
  id: string;
}

const { id } = Astro.props;
---

<script src="https://asciinema.org/a/{id}.js" id="asciicast-{id}" async></script>
```

**Migration Strategy:**
- Replace with `<Asciinema id="..." />`
- Load asciinema player script

---

### 9. TypeIt - Animated Text

**Priority:** 🟢 LOW
**Total Instances:** 1 occurrence
**Distribution:**
- 2020: 1 instance

**Hugo Syntax:**
```hugo
{{< typeit >}}Text to animate{{< /typeit >}}
```

**Astro Component Required:**
```astro
---
// src/components/TypeIt.astro
---

<span class="typeit">
  <slot />
</span>

<script>
  import TypeIt from 'typeit';

  document.querySelectorAll('.typeit').forEach(el => {
    new TypeIt(el, { /* options */ }).go();
  });
</script>
```

**Migration Strategy:**
- Install typeit library
- Client-side initialization

---

### 10. GoPlay - Go Playground (Commented Out)

**Priority:** ⚪ SKIP
**Total Instances:** 1 occurrence (commented out)
**Distribution:**
- 2021: 1 instance (not active)

**Migration Strategy:**
- Skip - not in active use

---

## Migration Complexity by Year

| Year | Posts | Complexity | Shortcode Count | Primary Challenges |
|------|-------|------------|-----------------|-------------------|
| 2024 | 5 | ✅ COMPLETE | 0 | None |
| 2023 | 18 | MEDIUM | 11 | Gallery (3), YouTube (2), FA-Icon (3), Conversation (1), RelRef (1) |
| 2022 | 13 | MEDIUM | 3 | Gist (1), RelRef (1), Admonition (1) |
| 2021 | 111 | 🔴 HIGH | 75 | Admonition (49), Gist (17), FA-Icon (12), RelRef (5) |
| 2020 | 82 | 🔴 HIGH | 49 | FA-Icon (17), Gist (16), Admonition (9), YouTube (2) |
| 2019 | 24 | MEDIUM | 19 | Admonition (11), Gist (7), RelRef (1) |
| 2018 | 6 | LOW | 9 | Gist (5), Admonition (1), RelRef (3) |
| 2017 | 33 | MEDIUM | 22 | Gist (17), Gallery (3), YouTube (2) |
| 2016 | 54 | MEDIUM | 67 | Gist (43), Admonition (24) |
| 2015 | 26 | LOW | 14 | Gist (6), Admonition (8) |
| 2014 | 8 | LOW | 5 | Gist (5) |
| 2013 | 15 | LOW | 6 | Admonition (4), Gist (2) |

---

## Component Creation Priority

### Phase 1: Critical Components (Must Have)
1. **Admonition** - 127 uses, blocks ~33% of content
2. **GistEmbed** - 94 uses, blocks ~22% of content
3. **FAIcon** - 32 uses, needed for recent posts

### Phase 2: Important Components (Should Have)
4. **Gallery** - 6 uses, but important for visual content
5. **YouTube** - 6 uses, media content
6. **Internal linking strategy** - 12 uses

### Phase 3: Nice to Have
7. **Conversation** - 1 use
8. **Asciinema** - 2 uses
9. **TypeIt** - 1 use

---

## Recommended Migration Order

### Stage 1: Foundation (8-12 hours)
- Create core Astro components (Admonition, Gist, FAIcon)
- Set up testing environment
- Document component usage

### Stage 2: Simple Content (4-6 hours)
- Migrate years with no/minimal shortcodes
- Years: 2013, 2014, 2015, 2018
- Total: ~55 posts

### Stage 3: Medium Complexity (12-16 hours)
- Migrate years with moderate shortcode use
- Years: 2017, 2019, 2022, 2023
- Total: ~88 posts

### Stage 4: Complex Content (20-30 hours)
- Migrate heavy shortcode years
- Years: 2016, 2020, 2021
- Total: ~247 posts
- Special handling for 100DaysOfCode posts (2021)

### Stage 5: Validation (8-12 hours)
- Verify all shortcodes converted
- Test image rendering
- Validate internal links
- SEO checks

**Total Estimated Effort:** 52-76 hours

---

## Special Considerations

### 100DaysOfCode Posts (2021)
- Custom front matter: `area`, `round`, `day_counter`
- Need special collection schema
- Consider dedicated layout/index pages

### Page Bundles with Images (2023)
- 4 posts with `images/` directories
- `.meta` files contain image captions
- Need co-located image handling

### Series/Collections
- 9 posts use "Trip to Europe" series (2023)
- Need series navigation component
- Astro content collections support

### Image Optimization
- 278+ images referenced across posts
- Consider Astro's Image component for optimization
- Verify `/images/` path resolution

### Code Syntax Highlighting
- Heavy use of code blocks across all years
- Languages: Go, PowerShell, SQL, Python, bash, YAML, JSON
- Verify Shiki/Prism configuration

---

## Testing Checklist

- [ ] All shortcodes have Astro component equivalents
- [ ] Admonition types render correctly (info, warning, note, tip)
- [ ] Gist embeds load properly
- [ ] Gallery lightbox works on mobile/desktop
- [ ] YouTube embeds are responsive
- [ ] Internal links resolve correctly
- [ ] Font Awesome icons display
- [ ] Images load from correct paths
- [ ] Code syntax highlighting works
- [ ] Page bundle images render
- [ ] Series navigation functions
- [ ] SEO metadata preserved
- [ ] RSS feed generation works
- [ ] Build performance acceptable

---

## Notes

- 2024 posts already migrated ✅
- No Hugo shortcodes found in 2024 posts
- Older posts (2013-2016) have fewer shortcodes
- 2020-2021 are heaviest years for shortcode usage
- Consider parallel migration of multiple years once components are ready
- Maintain git history with careful file moves

---

## Component Dependencies

**Required NPM Packages:**
- Font Awesome (if keeping FA-Icon) or alternative icon library
- PhotoSwipe/GLightbox (for Gallery)
- lite-youtube-embed or @astro-community/astro-embed-youtube
- typeit (if keeping TypeIt animation)

**Astro Integrations:**
- @astrojs/mdx (for component usage in markdown)
- astro-imagetools or native Astro Image (for optimization)
- Syntax highlighting (built-in with Shiki)

**Optional:**
- remark-footnotes (for markdown footnotes)
- remark-gfm (for GitHub Flavored Markdown)
