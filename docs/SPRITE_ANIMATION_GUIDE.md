# Animated Sprite Sheet Guide for Level-Up Page

## Current Implementation

The level-up page currently uses a static SVG pixel art mage character. To add walking animations or idle animations, you'll need to create and implement an animated sprite sheet.

## What You Need

### 1. Create Sprite Sheet

**Option A: Design Your Own**
- **Tool**: Use Aseprite (paid) or Piskel (free online)
- **Size**: 32x32 pixels per frame for crisp pixel art
- **Frames**: Create 4-8 frames for walking animation
- **Format**: Export as PNG sprite sheet (all frames in one row)

**Example Frames for Walking:**
```
[Frame 1] [Frame 2] [Frame 3] [Frame 4]
   Idle     Step 1   Step 2   Step 3
```

**Option B: Use Free Assets**
- [OpenGameArt.org](https://opengameart.org) - Search "pixel mage" or "pixel wizard"
- [itch.io](https://itch.io/game-assets/free/tag-pixel-art) - Free game assets
- [Kenney.nl](https://kenney.nl/assets) - Public domain pixel art

### 2. Sprite Sheet Specifications

For the level-up page mage character:
- **Character style**: Hooded mage/wizard
- **Color palette**: Purple (#7c3aed), darker purple (#5b21b6)
- **Staff**: Brown with golden/yellow orb
- **Animation**: Idle (2-4 frames) or Walking (4-8 frames)
- **Resolution**: 32x32px per frame (will scale to 128px)
- **Background**: Transparent PNG

## Implementation Steps

### Step 1: Add Sprite Sheet to Project

Place your sprite sheet in:
```
/public/images/mage-sprite-sheet.png
```

### Step 2: Update level-up.astro Character Section

Replace the current SVG pixel art with this sprite sheet implementation:

```astro
<!-- Replace the current character-display section with: -->
<div class="character-display">
  <div class="pixel-mage-animated">
    <div class="sprite-container"></div>
  </div>
  <div class="character-label">Level {yearLevels.length} Mage</div>
</div>
```

### Step 3: Add CSS for Sprite Animation

Add to the `<style>` section:

```css
.pixel-mage-animated {
  width: 128px;
  height: 128px;
  padding: 12px;
  background: rgba(16, 21, 38, 0.8);
  border: 3px solid rgba(139, 92, 246, 0.5);
  border-radius: 12px;
  box-shadow:
    0 0 30px rgba(139, 92, 246, 0.4),
    inset 0 0 20px rgba(139, 92, 246, 0.1);
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.sprite-container {
  width: 100%;
  height: 100%;
  background-image: url('/images/mage-sprite-sheet.png');
  background-size: 400% 100%; /* Adjust based on number of frames */
  background-repeat: no-repeat;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
  animation: walk 0.6s steps(4) infinite; /* Adjust steps to match frame count */
}

/* If you have 4 frames in your sprite sheet: */
@keyframes walk {
  0% { background-position: 0% 0; }
  100% { background-position: 100% 0; }
}

/* Idle animation (slower, subtle) */
.sprite-container.idle {
  animation: idle 1.2s steps(2) infinite;
}

@keyframes idle {
  0% { background-position: 0% 0; }
  100% { background-position: 50% 0; } /* Adjust for 2-frame idle */
}
```

### Step 4: Adjust for Your Sprite Sheet

**If you have 6 frames:**
```css
.sprite-container {
  background-size: 600% 100%;
  animation: walk 0.8s steps(6) infinite;
}
```

**If you have 8 frames:**
```css
.sprite-container {
  background-size: 800% 100%;
  animation: walk 1s steps(8) infinite;
}
```

### Step 5: Add Dynamic Animation on Scroll (Optional)

To make the character only animate during scrolling:

```javascript
// Add to the <script> section
const spriteContainer = document.querySelector('.sprite-container');

function updateSection(index) {
  // ... existing code ...

  // Animate sprite during transition
  if (spriteContainer) {
    spriteContainer.classList.remove('idle');
    spriteContainer.classList.add('walking');

    setTimeout(() => {
      spriteContainer.classList.remove('walking');
      spriteContainer.classList.add('idle');
    }, 800); // Duration of scroll animation
  }
}
```

Add to CSS:
```css
.sprite-container.walking {
  animation: walk 0.6s steps(4) infinite;
}

.sprite-container.idle {
  animation: idle 1.2s steps(2) infinite;
}
```

## Recommended Tools

### Design Tools
1. **Aseprite** ($19.99) - Professional pixel art editor
   - Best for creating custom sprites
   - Built-in animation preview
   - Export sprite sheets easily

2. **Piskel** (Free) - https://www.piskelapp.com
   - Browser-based pixel editor
   - Simple animation tools
   - Free and easy to use

3. **GraphicsGale** (Free) - Good for pixel art
4. **GIMP** (Free) - General purpose, can do pixel art

### Color Palette

Use these exact colors to match the current theme:

```
Hood/Robe:
- #6b46c1 (Light purple hood)
- #7c3aed (Main robe)
- #6b21a8 (Dark robe)
- #5b21b6 (Feet/base)

Skin:
- #d4a574 (Face)
- #4a2511 (Eyes)

Staff:
- #92400e (Wood)
- #fbbf24 (Orb base)
- #fde047 (Orb highlight)
```

## Example Sprite Sheet Layout

```
┌────────┬────────┬────────┬────────┐
│ Frame1 │ Frame2 │ Frame3 │ Frame4 │
│  Idle  │ Left   │  Idle  │ Right  │
│        │  Foot  │        │  Foot  │
└────────┴────────┴────────┴────────┘
  32x32    32x32    32x32    32x32
```

Total image size: 128x32 pixels (4 frames of 32x32)

## Testing

1. Place sprite sheet in `/public/images/`
2. Update the CSS `background-size` to match frame count
3. Test in browser - animation should loop smoothly
4. Adjust `animation-duration` to make it faster/slower
5. Adjust `steps()` count to match your frame count

## Alternative: Use GIF

If sprite sheets are complex, you can also use an animated GIF:

```astro
<div class="pixel-mage-animated">
  <img src="/images/mage-animated.gif" alt="Mage character" />
</div>
```

But sprite sheets give you more control over:
- When to animate (idle vs walking)
- Animation speed
- Frame-by-frame control
- File size (PNG often smaller than GIF)

## Resources

- **Pixel Art Tutorial**: https://blog.studiominiboss.com/pixelart
- **Aseprite Tutorials**: https://www.aseprite.org/docs/
- **Free Pixel Sprites**: https://opengameart.org/art-search?keys=mage+pixel
- **Color Palette Generator**: https://lospec.com/palette-list

## Current Static SVG

The current implementation uses a custom SVG with these features:
- Purple hooded mage
- Golden staff with glowing orb
- Pulse animation on staff orb
- Pixelated rendering for retro feel

You can keep this as a fallback or replace it entirely with your animated sprite sheet.

## Questions?

Feel free to experiment! The beauty of pixel art is that small tweaks can make a big difference. Start simple with 4 frames, then add more complexity as needed.
