# VIZUN Design System

**Premium Men's Fashion Brand**  
*Quiet Luxury • Confidence • Precision*

---

## Brand Philosophy

VIZUN embodies the intersection of modern streetwear and editorial fashion. Our design language speaks to those who value **quiet luxury** over loud statements—confidence expressed through precision, not excess.

### Design Principles

1. **Minimal, Bold, Cinematic** — Every element serves a purpose
2. **High Contrast, Dark Luxury** — Dramatic yet sophisticated
3. **Calm, Expensive, Intentional** — Nothing feels rushed or cheap

---

## Color Palette

### Primary Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Jet Black** | `#0A0A0A` | Primary background, main canvas |
| **Pure Black** | `#000000` | Deep shadows, maximum contrast |

### Secondary Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Midnight Navy** | `#0F1419` | Secondary sections, cards |
| **Midnight Navy Light** | `#1A1F26` | Hover states, layered elements |

### Accent Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Electric Blue** | `#0066FF` | Hero sections, primary CTAs |
| **Electric Blue Dark** | `#0052CC` | Hover states for blue elements |
| **Electric Blue Light** | `#3385FF` | Active states, highlights |

### Luxury Highlights

| Color | Hex | Usage |
|-------|-----|-------|
| **Amber** | `#D4A574` | Luxury accents, premium indicators |
| **Amber Dark** | `#B8935F` | Hover states for amber elements |
| **Amber Light** | `#E6C299` | Subtle highlights |

### Typography Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Off-White** | `#F5F5F0` | Primary text, headlines |
| **Off-White Muted** | `#E8E8E3` | Secondary text |
| **Off-White Subtle** | `rgba(245, 245, 240, 0.7)` | Body text |
| **Off-White Faint** | `rgba(245, 245, 240, 0.4)` | Tertiary text, captions |

---

## Typography

### Font Families

```css
--font-serif: 'Playfair Display', 'Georgia', serif;
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Import these fonts:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Headline Styles (Serif)

Use for **editorial impact** and **luxury positioning**:

| Class | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `.headline-hero` | 128px | Bold | 1.0 | Landing page heroes |
| `.headline-display` | 96px | Bold | 1.1 | Section heroes |
| `.headline-1` | 72px | Bold | 1.1 | Major headings |
| `.headline-2` | 56px | Semibold | 1.1 | Sub-headings |
| `.headline-3` | 40px | Semibold | 1.25 | Card titles |
| `.headline-4` | 32px | Medium | 1.25 | Smaller headings |

### Body Styles (Sans-Serif)

Use for **readability** and **UI elements**:

| Class | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `.body-xl` | 20px | Regular | 1.75 | Lead paragraphs |
| `.body-lg` | 18px | Regular | 1.75 | Feature descriptions |
| `.body-base` | 16px | Regular | 1.5 | Standard body text |
| `.body-sm` | 14px | Regular | 1.5 | Captions, metadata |
| `.body-xs` | 12px | Regular | 1.5 | Fine print |

### Label Styles (Sans-Serif)

Use for **UI labels** and **navigation**:

| Class | Size | Weight | Transform | Usage |
|-------|------|--------|-----------|-------|
| `.label-lg` | 14px | Medium | Uppercase | Navigation, CTAs |
| `.label-base` | 12px | Medium | Uppercase | Form labels, tags |

---

## Spacing System

Based on **8px grid** for rhythm and consistency:

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Micro spacing |
| `--space-2` | 8px | Tight spacing |
| `--space-3` | 12px | Small gaps |
| `--space-4` | 16px | Default spacing |
| `--space-6` | 24px | Medium spacing |
| `--space-8` | 32px | Large spacing |
| `--space-12` | 48px | Section spacing |
| `--space-16` | 64px | Major spacing |
| `--space-24` | 96px | Hero spacing |
| `--space-32` | 128px | Section padding |

---

## Components

### Buttons

**One primary CTA per section** — follow the hierarchy:

#### Primary Button
```html
<button class="btn btn-primary">Shop Collection</button>
```
- White background, black text
- Hovers to **amber** with glow
- Use for main actions

#### Secondary Button
```html
<button class="btn btn-secondary">Learn More</button>
```
- Transparent with border
- Hovers to white fill
- Use for secondary actions

#### Accent Button
```html
<button class="btn btn-accent">Explore</button>
```
- Electric blue background
- Hovers darker with glow
- Use sparingly for emphasis

#### Ghost Button
```html
<button class="btn btn-ghost">View Details</button>
```
- No background or border
- Hovers to amber text
- Use for tertiary actions

### Cards

#### Standard Card
```html
<div class="card">
  <h3 class="headline-4">Product Name</h3>
  <p class="body-base">Description</p>
</div>
```
- Midnight navy background
- Subtle border
- Hovers with stronger border

#### Minimal Card
```html
<div class="card-minimal">
  <h4 class="headline-4">Title</h4>
  <p class="body-sm">Details</p>
</div>
```
- Transparent background
- Bottom border only
- Border changes to amber on hover

### Navigation

```html
<nav class="nav">
  <a href="#" class="nav-link">Collections</a>
  <a href="#" class="nav-link nav-link-active">Editorial</a>
  <a href="#" class="nav-link">About</a>
</nav>
```

- Uppercase labels
- Subtle underline animation
- Amber accent on hover/active

### Forms

```html
<input type="text" class="input" placeholder="Enter email">
```

- Midnight navy background
- Electric blue focus state
- Minimal borders

---

## Layout Patterns

### Hero Section

```html
<section class="section-hero">
  <div class="container">
    <h1 class="headline-hero">VIZUN</h1>
    <p class="body-xl">Quiet luxury for the modern man</p>
    <button class="btn btn-primary btn-lg">Explore Collection</button>
  </div>
</section>
```

**Rules:**
- Full viewport height
- Electric blue background
- One primary CTA
- Generous negative space

### Content Section

```html
<section class="section section-primary">
  <div class="container-narrow">
    <h2 class="headline-2">Section Title</h2>
    <p class="body-lg">Content goes here</p>
  </div>
</section>
```

**Rules:**
- Jet black or midnight navy background
- Narrow container for readability
- Ample padding (128px top/bottom)

---

## UI Rules

### ✅ Do

- Use **one primary CTA** per section
- Maintain **generous negative space**
- Keep borders **subtle and minimal**
- Use **tight line-height** for headlines
- Apply **amber** for luxury moments
- Keep interactions **smooth and intentional** (600ms transitions)

### ❌ Don't

- Use rounded corners (keep minimal or none)
- Add playful or bright colors
- Overcrowd sections with multiple CTAs
- Use decorative elements without purpose
- Rush animations (keep them slow and luxurious)

---

## Responsive Behavior

### Desktop (1440px+)
- Full headline sizes
- 128px section padding
- Wide containers

### Tablet (768px - 1024px)
- Reduced headline sizes (1-2 steps down)
- 96px section padding
- Medium containers

### Mobile (< 768px)
- Smallest headline sizes
- 64px section padding
- Full-width containers with 16px padding
- Stack navigation vertically

---

## Animation Guidelines

### Transitions

| Speed | Duration | Usage |
|-------|----------|-------|
| Fast | 150ms | Micro-interactions |
| Base | 250ms | Standard hovers |
| Slow | 400ms | Complex transitions |
| **Luxury** | **600ms** | **Premium feel** |

### Easing

Use **cubic-bezier(0.16, 1, 0.3, 1)** for luxury transitions — creates a smooth, expensive feel.

---

## Code Examples

### Complete Page Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VIZUN — Quiet Luxury</title>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Design System -->
  <link rel="stylesheet" href="design-system.css">
</head>
<body>
  
  <!-- Hero Section -->
  <section class="section-hero">
    <div class="container">
      <h1 class="headline-hero">VIZUN</h1>
      <p class="body-xl text-secondary">Modern streetwear meets editorial fashion</p>
      <button class="btn btn-primary btn-lg">Explore Collection</button>
    </div>
  </section>
  
  <!-- Content Section -->
  <section class="section section-primary">
    <div class="container-narrow">
      <h2 class="headline-2">Quiet Luxury</h2>
      <p class="body-lg">Confidence expressed through precision, not excess.</p>
    </div>
  </section>
  
</body>
</html>
```

---

## Brand Voice

When writing copy for VIZUN:

- **Confident, not arrogant** — "Designed for those who know"
- **Precise, not verbose** — Short, impactful statements
- **Sophisticated, not pretentious** — Accessible luxury
- **Modern, not trendy** — Timeless with contemporary edge

### Example Copy

✅ **Good:** "Precision tailoring for the modern era"  
❌ **Bad:** "The most amazing clothes you'll ever wear!!!"

✅ **Good:** "Quiet confidence"  
❌ **Bad:** "Stand out from the crowd!"

---

## File Structure

```
/Vizun
  ├── design-system.css          # Complete design system
  ├── DESIGN_SYSTEM_GUIDE.md     # This documentation
  └── demo.html                  # Component showcase
```

---

## Support

For questions or contributions to the VIZUN design system, maintain the core principles:

1. **Minimal** — Remove before you add
2. **Bold** — Make intentional choices
3. **Cinematic** — Think editorial, not e-commerce

**Every pixel should feel expensive.**
