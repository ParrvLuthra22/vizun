# Motion System Quick Reference

## Import Everything You Need
```tsx
import { 
  FadeIn, 
  Parallax, 
  TextReveal, 
  Stagger, 
  HoverLift,
  durations,
  easings 
} from '@/components/motion';
```

## Common Patterns

### Section Reveal
```tsx
<FadeIn direction="up">
  <section>Your content</section>
</FadeIn>
```

### Hero with Parallax
```tsx
<Parallax speed="medium" scale>
  <Image src="/hero.jpg" />
</Parallax>
```

### Animated Headline
```tsx
<TextReveal 
  text="Quiet Luxury Redefined"
  as="h1"
/>
```

### Product Grid
```tsx
<Stagger speed="medium">
  {products.map(product => (
    <FadeIn key={product.id}>
      <ProductCard {...product} />
    </FadeIn>
  ))}
</Stagger>
```

### Interactive Card
```tsx
<HoverLift intensity="medium">
  <Card />
</HoverLift>
```

## Timing Reference

| Use Case | Duration | Easing |
|----------|----------|--------|
| Button hover | `durations.fast` (0.3s) | `easings.luxury` |
| Card lift | `durations.slow` (0.8s) | `easings.luxury` |
| Fade in | `durations.slow` (0.8s) | `easings.luxury` |
| Hero reveal | `durations.cinematic` (1.2s) | `easings.luxury` |
| Parallax | - | `easings.parallax` |

## Direction Options

- `up` - Slide from bottom (default)
- `down` - Slide from top
- `left` - Slide from right
- `right` - Slide from left
- `scale` - Scale up
- `none` - Fade only

## Speed Options

- `fast` - 0.08s stagger
- `medium` - 0.12s stagger (default)
- `slow` - 0.15s stagger
- `luxurious` - 0.2s stagger

## Intensity Options

- `subtle` - Small movements
- `medium` - Balanced (default)
- `strong` - More pronounced

## Pro Tips

1. Use `durations.slow` (0.8s) for most animations
2. Delay staggered items by 0.1-0.2s
3. Keep parallax at "medium" or "subtle"
4. Use `margin="normal"` for standard scroll triggers
5. Combine fade with slide for elegance
6. Let buttons use their built-in hover effects

## Don't Forget

✅ Every animation should feel expensive  
✅ Slower is usually better  
✅ Subtle is more luxurious than flashy  
✅ Test on slower devices  
✅ Less is more
