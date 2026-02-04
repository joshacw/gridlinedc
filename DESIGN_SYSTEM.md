# GridlineDC Design System

**Version:** 1.0.0
**Last Updated:** February 4, 2026
**Figma Source:** [GridlineDC Design File](https://www.figma.com/design/YPwvwFw6uJXa6xsYhUW47O/GridlineDC)

## Overview

This design system provides the foundational tokens, components, and patterns for the GridlineDC website. It is extracted from the Figma design file and implements the "Infrastructure Monumentalism" design philosophy.

## Design Philosophy: Infrastructure Monumentalism

**Core Principles:**

1. **Space & Breathing Room** - Generous padding and whitespace for clarity
2. **Chromatic Hierarchy** - Dark navy/white foundation with electric blue accents
3. **Typographic Monumentalism** - Extreme scale headlines with precise supporting text
4. **Systematic Accumulation** - Grid-based layouts with intentional asymmetry

---

## Color System

### Primary Colors

| Token | Hex Value | Usage | Tailwind Class |
|-------|-----------|-------|----------------|
| `--gridline-primary` | #2469ff | Primary CTAs, highlights, accents | `bg-primary-blue` |
| `--gridline-navy` | #010825 | Dark backgrounds, headers | `bg-dark-navy` |
| `--gridline-dark-blue` | #030948 | Card backgrounds, secondary dark surfaces | `bg-dark-blue` |
| `--gridline-white` | #fdfdfd | Light backgrounds, text on dark | `bg-gridline-white` |

### Neutral Grays

| Token | Hex Value | Usage | Tailwind Class |
|-------|-----------|-------|----------------|
| `--gridline-gray` | #94a3b8 | Muted text, supporting information | `text-gridline-gray` |
| `--gridline-light-gray` | #bebebe | Subtle text, tertiary information | `text-gridline-light-gray` |
| `--gridline-slate-50` | #f8fafc | Page backgrounds | `bg-slate-50` |
| `--gridline-slate-950` | #0f172a | Dark section backgrounds | `bg-slate-950` |

### Semantic Tokens

| Token | Maps To | Usage | Tailwind Class |
|-------|---------|-------|----------------|
| `--color-cta-primary` | `--gridline-primary` | Primary call-to-action buttons | `bg-cta-primary` |
| `--color-cta-primary-hover` | #1d5ae6 | Hover state for CTAs | `bg-cta-primary-hover` |
| `--color-background-dark` | `--gridline-navy` | Dark section backgrounds | `bg-bg-dark` |
| `--color-text-on-dark` | `--gridline-white` | Text on dark backgrounds | `text-text-on-dark` |
| `--color-text-muted` | `--gridline-gray` | Secondary text | `text-text-muted` |

### Color Usage Guidelines

**Do:**
- Use `--gridline-primary` (#2469ff) sparingly for high-impact CTAs and accents
- Maintain strong contrast ratios (WCAG AA minimum: 4.5:1)
- Use dark navy (#010825) as the primary dark background
- Use off-white (#fdfdfd) instead of pure white for softer contrast

**Don't:**
- Overuse the electric blue - it should feel special
- Mix old blue (#2563eb) with new blue (#2469ff)
- Use pure black - always use navy tones for dark surfaces

---

## Typography

### Font Families

| Font | Variable | Usage | Tailwind Class |
|------|----------|-------|----------------|
| **Big Shoulders Display** | `--font-big-shoulders` | Monumental headlines (55px+) | `font-big-shoulders` |
| **Outfit** | `--font-outfit` | Section headings, labels | `font-outfit` |
| **Instrument Sans** | `--font-instrument-sans` | UI labels, metrics, captions | `font-instrument-sans` |
| **Inter** | `--font-inter` | Body text, paragraphs | `font-inter` |

### Font Scale (Figma Specifications)

| Size Name | Exact Size | Line Height | Usage | Tailwind Class |
|-----------|------------|-------------|-------|----------------|
| Mega | 55.59px | 61.246px | Hero headlines (Big Shoulders) | `text-mega` |
| XXL | 39.927px | 56.942px | Section titles (Outfit Bold) | `text-xxl` |
| XL | 21.419px | 26.996px | Large headings (Outfit Bold) | `text-xl` |
| Base | 13.83px | 23.9px | Body text, labels | `text-base-figma` |
| SM | 12.83px | 19.416px | Small text, secondary info | `text-sm-figma` |
| XS | 11.89px | 19.416px | Captions, metric labels | `text-xs-figma` |
| Tiny | 8.83px | - | Fine print, disclaimers | `text-[8.83px]` |
| Micro | 6.831px | 8.538px | Confidential marks | `text-[6.831px]` |

### Typography Usage Guidelines

**Headlines (Big Shoulders Display):**
```tsx
<h1 className="font-big-shoulders text-mega font-bold">
  Headline Text
</h1>
```

**Section Titles (Outfit Bold):**
```tsx
<h2 className="font-outfit text-xxl font-bold">
  Section Title
</h2>
```

**UI Labels (Instrument Sans):**
```tsx
<span className="font-instrument-sans text-xs-figma text-gridline-gray">
  Revenue Multiple
</span>
```

**Body Text (Inter):**
```tsx
<p className="font-inter text-base-figma">
  Body text goes here...
</p>
```

---

## Spacing & Layout

### Border Radius

| Token | Value | Usage | Tailwind Class |
|-------|-------|-------|----------------|
| `--radius-card` | 19px | Card components | `rounded-card` |
| `--radius-lg` | 16px | Large elements | `rounded-lg` |
| `--radius-md` | 12px | Medium elements | `rounded-md` |
| `--radius-sm` | 8px | Small elements | `rounded-sm` |
| `--radius-full` | 9999px | Pills, badges | `rounded-full` |

### Shadows

| Token | Value | Usage | Tailwind Class |
|-------|-------|-------|----------------|
| `--shadow-card` | Standard card shadow | Default card elevation | `shadow-card` |
| `--shadow-card-hover` | Enhanced shadow | Hover state cards | `shadow-card-hover` |
| `--shadow-primary` | Blue glow | Featured/highlighted cards | `shadow-primary` |

---

## Gradients

### Background Gradients

| Token | Value | Usage | Tailwind Class |
|-------|-------|-------|----------------|
| `--gradient-bg-dark` | linear-gradient(105.39deg, rgb(2, 6, 23) 1.5%, rgb(2, 9, 42) 73.59%) | Dark section backgrounds | `bg-gradient-dark` |
| `--gradient-text-primary` | linear-gradient(135deg, #0f172a 0%, #2469ff 100%) | Text gradients | `bg-gradient-text` |

### Usage Example

```tsx
// Dark background gradient
<div className="bg-gradient-dark">
  Content here
</div>

// Text gradient
<h1 className="text-gradient font-big-shoulders text-mega">
  Gradient Headline
</h1>
```

---

## Component Patterns

### Cards

**Comparison Card (Dark):**
```tsx
<div className="bg-dark-blue rounded-card p-8 border-3 border-primary-blue shadow-primary">
  <h3 className="font-outfit font-bold text-center text-primary-blue">
    UPSIDE POTENTIAL
  </h3>
  <p className="font-big-shoulders text-mega text-white text-center">
    8-10x*
  </p>
</div>
```

**Standard Card:**
```tsx
<div className="bg-white rounded-card shadow-card hover:shadow-card-hover transition-shadow p-8">
  Card content
</div>
```

### Buttons

**Primary CTA:**
```tsx
<button className="bg-cta-primary hover:bg-cta-primary-hover text-white font-outfit font-bold px-8 py-4 rounded-xl transition-colors">
  Inquire Today
</button>
```

**Secondary Button:**
```tsx
<button className="bg-bg-dark hover:bg-bg-dark-alt text-white font-outfit font-bold px-8 py-4 rounded-xl transition-colors">
  Learn More
</button>
```

---

## Implementation Status

### ✅ Phase 1: Foundation (Completed)
- [x] Design token system created (`design-tokens.css`)
- [x] Tailwind configuration created (`tailwind.config.ts`)
- [x] Fonts integrated (Instrument Sans, Big Shoulders Display)
- [x] Global styles updated with token imports

### 🔄 Phase 2: Figma Extraction (In Progress)
- [ ] Extract all component designs from Figma
- [ ] Document component variants and states
- [ ] Capture screenshots for visual reference

### ⏳ Phase 3-6: Component Migration (Pending)
- [ ] Wave 1: Buttons, Cards, Typography
- [ ] Wave 2: Navigation, Hero, Footer
- [ ] Forms & Complex Components
- [ ] Polish & Documentation

---

## Migration Guide

### For Existing Components

**Step 1: Replace hardcoded colors**
```tsx
// Before
<div className="bg-[#2563eb] text-white">

// After
<div className="bg-primary-blue text-white">
```

**Step 2: Replace hardcoded fonts**
```tsx
// Before
<h1 className="text-5xl font-bold">

// After
<h1 className="font-big-shoulders text-mega font-bold">
```

**Step 3: Update border radius**
```tsx
// Before
<div className="rounded-3xl">

// After
<div className="rounded-card">
```

### Adding New Components

1. Use design tokens exclusively (no hardcoded values)
2. Follow typography scale (Big Shoulders for headlines, Outfit for headings, Instrument Sans for labels, Inter for body)
3. Maintain chromatic hierarchy (navy/white foundation, blue accents)
4. Test at all breakpoints (375px, 768px, 1280px, 1920px)
5. Ensure WCAG AA color contrast (4.5:1 minimum)

---

## Resources

- **Figma Design File:** [View in Figma](https://www.figma.com/design/YPwvwFw6uJXa6xsYhUW47O/GridlineDC)
- **Font Sources:**
  - [Big Shoulders Display on Google Fonts](https://fonts.google.com/specimen/Big+Shoulders+Display)
  - [Instrument Sans on Google Fonts](https://fonts.google.com/specimen/Instrument+Sans)
  - [Outfit on Google Fonts](https://fonts.google.com/specimen/Outfit)
  - [Inter on Google Fonts](https://fonts.google.com/specimen/Inter)

---

## Support

For questions or issues with the design system, refer to:
- Design tokens: `/src/styles/design-tokens.css`
- Tailwind config: `/tailwind.config.ts`
- Implementation plan: `/Users/joshwilliams/.claude/plans/stateless-orbiting-gem.md`
