# VIZUN Motion Design System

## Overview

A luxury-grade motion design system built with Framer Motion, featuring smooth scrolling, elegant animations, and cinematic transitions. Every animation is crafted to feel calm, expensive, and sophisticated.

## Design Principles

- **Calm & Cinematic**: No sudden movements or jarring transitions
- **Luxury Timing**: 300-600ms animation durations for elegance
- **Smooth Easing**: Custom bezier curves for buttery-smooth motion
- **Subtle Parallax**: Gentle depth without overdoing it
- **Purposeful Animation**: Every motion serves a purpose

## Core Library (`/lib/motion.ts`)

### Easing Functions

```typescript
easings.luxury      // [0.16, 1, 0.3, 1] - Primary luxury easing
easings.entry       // [0.25, 0.46, 0.45, 0.94] - Text reveals
easings.exit        // [0.4, 0, 0.6, 1] - Smooth exits
easings.parallax    // [0.19, 1, 0.22, 1] - Ultra smooth scrolling
easings.scale       // [0.33, 1, 0.68, 1] - Image scaling
```

### Animation Durations

```typescript
durations.instant    // 0.2s - Micro-interactions
durations.fast       // 0.3s - Button hovers
durations.medium     // 0.5s - Standard transitions
durations.slow       // 0.8s - Reveals and entries
durations.cinematic  // 1.2s - Hero elements
```

### Pre-built Variants

- `fadeSlideUp` - Fade in with slide from bottom
- `fadeSlideDown` - Fade in with slide from top
- `fadeSlideLeft` - Fade in with slide from right
- `fadeSlideRight` - Fade in with slide from left
- `fadeIn` - Simple fade animation
- `scaleIn` - Scale up with fade
- `textReveal` - Word-by-word text reveal

## Motion Components

### FadeIn

Scroll-triggered fade animations with directional options.

```tsx
import { FadeIn } from '@/components/motion';

<FadeIn direction="up" delay={0.2}>
  <YourContent />
</FadeIn>
```

**Props:**
- `direction`: 'up' | 'down' | 'left' | 'right' | 'none' | 'scale'
- `delay`: number (seconds)
- `duration`: number (seconds)
- `triggerOnce`: boolean (default: true)
- `margin`: 'immediate' | 'early' | 'normal' | 'late' | 'delayed'

### Parallax

Subtle parallax scrolling effects for images and elements.

```tsx
import { Parallax } from '@/components/motion';

<Parallax speed="medium" scale>
  <img src="..." alt="..." />
</Parallax>
```

**Props:**
- `speed`: 'subtle' | 'medium' | 'strong'
- `direction`: 'up' | 'down'
- `scale`: boolean
- `scaleIntensity`: 'subtle' | 'medium' | 'strong'

### TextReveal

Word-by-word cinematic text reveals.

```tsx
import { TextReveal } from '@/components/motion';

<TextReveal 
  text="Quiet Luxury Redefined"
  as="h1"
  className="headline-hero"
/>
```

**Props:**
- `text`: string
- `as`: HTML element type
- `delay`: number
- `staggerSpeed`: 'fast' | 'medium' | 'slow' | 'luxurious'

### LineReveal

Single line reveal with mask effect.

```tsx
import { LineReveal } from '@/components/motion';

<LineReveal delay={0.3}>
  Your text content here
</LineReveal>
```

### Stagger

Container that staggers children animations.

```tsx
import { Stagger } from '@/components/motion';

<Stagger speed="medium">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stagger>
```

### Hover Effects

#### HoverLift
```tsx
import { HoverLift } from '@/components/motion';

<HoverLift intensity="medium">
  <YourCard />
</HoverLift>
```

#### HoverScale
```tsx
import { HoverScale } from '@/components/motion';

<HoverScale scale={1.05}>
  <YourImage />
</HoverScale>
```

#### HoverGlow
```tsx
import { HoverGlow } from '@/components/motion';

<HoverGlow color="0, 102, 255" intensity={0.3}>
  <YourElement />
</HoverGlow>
```

## Smooth Scrolling

### Lenis Integration

The site uses Lenis for buttery-smooth scrolling. It's automatically initialized in the root layout.

**Configuration** (`SmoothScroll.tsx`):
- Duration: 1.2s
- Custom easing curve
- Touch multiplier: 2x
- Wheel multiplier: 1x

### Usage

Already active site-wide. No additional setup needed.

## Usage Examples

### Hero Section with Parallax

```tsx
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end start"]
});

const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

<motion.div style={{ y: imageY, scale: imageScale }}>
  <Image src="..." />
</motion.div>
```

### Product Card with Hover

```tsx
const [isHovered, setIsHovered] = useState(false);

<motion.div
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  whileHover={{ y: -8 }}
  transition={{ duration: durations.slow, ease: easings.luxury }}
>
  <motion.div
    animate={{ scale: isHovered ? 1.08 : 1 }}
    transition={{ duration: durations.cinematic, ease: easings.scale }}
  >
    <Image src="..." />
  </motion.div>
</motion.div>
```

### Scroll-Triggered Sections

```tsx
<FadeIn direction="up" delay={0} margin="normal">
  <SectionHeader />
</FadeIn>

<Stagger speed="medium">
  {items.map(item => (
    <FadeIn key={item.id} direction="up">
      <ItemCard />
    </FadeIn>
  ))}
</Stagger>
```

## Button Animations

Buttons automatically include:
- Lift effect on hover (scale: 1.02, y: -2)
- Tap effect (scale: 0.98)
- Luxury easing curves
- Medium duration (0.5s)

## Best Practices

### DO ✅

- Use luxury easing curves from the motion library
- Keep animations between 300-600ms
- Apply subtle parallax (20-30% maximum)
- Trigger animations early with viewport margins
- Use stagger delays of 0.08-0.2s between items
- Test on slower devices
- Combine fade with slide for elegance

### DON'T ❌

- Use bounce or elastic easings
- Create animations faster than 200ms
- Apply aggressive parallax (>50%)
- Stack too many effects on one element
- Use default Framer Motion easings
- Animate everything simultaneously
- Use heavy transforms on mobile

## Performance Tips

1. **Use `will-change: transform`** for parallax elements
2. **Trigger once** for scroll animations (default)
3. **Limit simultaneous animations** to 5-10 elements
4. **Prefer transform over position** changes
5. **Use viewport margins** to trigger before visible
6. **Avoid layout animations** (width, height, padding)

## Animation Timing Reference

| Element Type | Duration | Delay | Easing |
|-------------|----------|-------|---------|
| Button Hover | 0.5s | 0 | luxury |
| Card Hover | 0.8s | 0 | luxury |
| Fade In | 0.8s | 0-0.3s | luxury |
| Text Reveal | 0.8s | 0.2s stagger | luxury |
| Parallax | - | - | parallax |
| Hero Entrance | 1.2s | 0.4s | luxury |
| CTA Appear | 0.8s | 1.8s | luxury |

## Viewport Margins

| Margin | Value | Use Case |
|--------|-------|----------|
| immediate | 0px | Immediate trigger |
| early | -100px | Preload animations |
| normal | -50px | Standard (default) |
| late | 0px 0px -20% | 20% visible |
| delayed | 0px 0px -40% | 40% visible |

## Future Enhancements

- [ ] Magnetic cursor effects for CTAs
- [ ] Page transition animations
- [ ] Scroll-linked progress indicators
- [ ] Custom loading animations
- [ ] Advanced image reveal effects
- [ ] Text scramble effects
- [ ] 3D card tilts on hover

## Dependencies

- `framer-motion`: ^12.34.0
- `lenis`: ^1.3.17

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Related Files

- `/lib/motion.ts` - Core motion utilities
- `/components/motion/` - Motion components
- `/components/ui/SmoothScroll.tsx` - Lenis integration
- `/components/ui/Button.tsx` - Button with hover effects
- `/components/ui/ProductCard.tsx` - Card with luxury hover
- `/components/home/HeroSection.tsx` - Hero with parallax

---

**Remember**: Every animation should feel expensive, calm, and intentional. When in doubt, go slower and smoother.
