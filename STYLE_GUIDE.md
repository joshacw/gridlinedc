# GRIDLINE Design System & Style Guide

A comprehensive design system for the GRIDLINE data center investment platform. This guide ensures visual consistency across all platform interfaces.

---

## Table of Contents

1. [Brand Identity](#brand-identity)
2. [Typography](#typography)
3. [Color Palette](#color-palette)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Effects & Animations](#effects--animations)
7. [Iconography](#iconography)
8. [Responsive Design](#responsive-design)

---

## Brand Identity

### Logo
- **Primary Logo**: "GRIDLINE" with "GRID" in slate-950 and "LINE" in blue-600
- **Font**: Outfit, Bold, tracking-tighter
- **Size**: text-2xl (1.5rem / 24px)

```html
<span class="font-outfit text-2xl font-bold tracking-tighter text-slate-950">
  GRID<span class="text-blue-600">LINE</span>
</span>
```

### Brand Voice
- **Tone**: Institutional, professional, confident
- **Language**: Clear, precise, investment-focused
- **Messaging**: Focus on multipliers, liquidity, and public market access

---

## Typography

### Font Families

| Font | Usage | CSS Variable |
|------|-------|--------------|
| **Outfit** | Headings, brand elements | `font-outfit` |
| **Inter** | Body text, UI elements | Default sans-serif |

### Font Import
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;600;700&display=swap');
```

### Type Scale

| Element | Size | Weight | Tracking | Class |
|---------|------|--------|----------|-------|
| H1 (Hero) | 5xl-7xl | Bold | tighter | `text-5xl md:text-7xl font-outfit font-bold tracking-tighter` |
| H2 (Section) | 3xl-4xl | Bold | tight | `text-3xl md:text-4xl font-outfit font-bold tracking-tight` |
| H3 (Card Title) | xl-2xl | Bold | - | `text-xl md:text-2xl font-bold font-outfit` |
| H4 (Subsection) | lg | Bold | - | `text-lg font-bold font-outfit` |
| Body | base-lg | Normal | - | `text-base md:text-lg` |
| Body Small | sm | Normal | relaxed | `text-sm leading-relaxed` |
| Caption | xs | Bold | widest | `text-xs font-bold uppercase tracking-widest` |
| Micro | [10px] | Bold | widest | `text-[10px] font-bold uppercase tracking-widest` |

### Text Colors

| Usage | Color | Class |
|-------|-------|-------|
| Primary heading | Slate 950 | `text-slate-950` |
| Secondary heading | Slate 900 | `text-slate-900` |
| Body text | Slate 600 | `text-slate-600` |
| Muted text | Slate 500 | `text-slate-500` |
| Subtle text | Slate 400 | `text-slate-400` |
| Accent text | Blue 600 | `text-blue-600` |
| Light on dark | White | `text-white` |

---

## Color Palette

### Primary Colors

| Name | Hex | Tailwind | Usage |
|------|-----|----------|-------|
| Primary Blue | `#2563eb` | `blue-600` | CTAs, accents, links |
| Primary Blue Hover | `#1d4ed8` | `blue-700` | Button hover states |
| Dark Blue | `#1e40af` | `blue-800` | Deep accents |

### Neutral Colors

| Name | Hex | Tailwind | Usage |
|------|-----|----------|-------|
| Slate 950 | `#020617` | `slate-950` | Primary dark, headers |
| Slate 900 | `#0f172a` | `slate-900` | Secondary dark |
| Slate 600 | `#475569` | `slate-600` | Body text |
| Slate 500 | `#64748b` | `slate-500` | Muted text |
| Slate 400 | `#94a3b8` | `slate-400` | Subtle text, placeholders |
| Slate 200 | `#e2e8f0` | `slate-200` | Borders |
| Slate 100 | `#f1f5f9` | `slate-100` | Light borders, dividers |
| Slate 50 | `#f8fafc` | `slate-50` | Backgrounds |
| White | `#ffffff` | `white` | Cards, surfaces |

### Semantic Colors

| Name | Hex | Tailwind | Usage |
|------|-----|----------|-------|
| Success | `#22c55e` | `green-500` | Positive indicators |
| Warning | `#f59e0b` | `amber-500` | Caution states |
| Error | `#ef4444` | `red-400` | Error messages |
| Info | `#3b82f6` | `blue-500` | Information |

### Gradient Definitions

```css
/* Text Gradient */
.text-gradient {
  background: linear-gradient(135deg, #0f172a 0%, #2563eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Blue Gradient Bar */
.gradient-bar {
  background: linear-gradient(to right, #2563eb, #4f46e5, #2563eb);
}
```

---

## Spacing & Layout

### Container
- **Max Width**: 7xl (80rem / 1280px)
- **Padding**: px-4 sm:px-6 lg:px-8

```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```

### Section Padding
| Size | Class | Usage |
|------|-------|-------|
| Small | `py-16` | Compact sections |
| Medium | `py-20` | Standard sections |
| Large | `py-24` | Feature sections |
| XL | `py-32` | CTA sections |

### Grid System
```html
<!-- 3-column grid -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">

<!-- 4-column grid -->
<div class="grid grid-cols-1 md:grid-cols-4 gap-8">

<!-- 2-column grid -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-10">
```

### Gap Scale
| Size | Class | Pixels |
|------|-------|--------|
| Small | `gap-4` | 16px |
| Medium | `gap-6` | 24px |
| Large | `gap-8` | 32px |
| XL | `gap-10` | 40px |
| 2XL | `gap-16` | 64px |

---

## Components

### Buttons

#### Primary Button (Dark)
```html
<button class="px-10 py-4 bg-slate-950 hover:bg-blue-600 text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-xl active:scale-95">
  Button Text
</button>
```

#### Primary Button (Blue)
```html
<button class="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-600/20 active:scale-95">
  Button Text
</button>
```

#### Secondary Button (Glass)
```html
<button class="px-10 py-4 glass text-slate-900 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-all">
  Button Text
</button>
```

#### Secondary Button (Outline)
```html
<button class="px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all uppercase tracking-widest text-xs">
  Button Text
</button>
```

#### Small Button (Nav)
```html
<button class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md hover:shadow-xl active:scale-95">
  Inquire
</button>
```

### Cards

#### Standard Card
```html
<div class="bg-white rounded-3xl p-10 shadow-sm border border-slate-100 hover:border-blue-400 transition-all">
  <!-- Content -->
</div>
```

#### Featured Card (with ring)
```html
<div class="relative bg-white p-10 rounded-[2.5rem] shadow-sm border border-blue-500 shadow-blue-100 ring-4 ring-blue-500/5 transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
  <!-- Content -->
</div>
```

#### Dark Card
```html
<div class="p-8 bg-slate-950 text-white rounded-3xl border border-blue-500/30 shadow-2xl">
  <!-- Content -->
</div>
```

#### Glass Card
```html
<div class="relative group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all">
  <!-- Content -->
</div>
```

### Badges & Pills

#### Status Badge
```html
<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-slate-200 backdrop-blur-sm shadow-sm">
  <span class="flex h-2 w-2 rounded-full bg-blue-600 animate-ping"></span>
  <span class="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Status Text</span>
</div>
```

#### Category Pill
```html
<div class="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest">
  Category
</div>
```

#### Label Pill (Primary)
```html
<div class="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-widest">
  Primary Option
</div>
```

#### Label Pill (Neutral)
```html
<div class="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
  Alternative
</div>
```

### Navigation

#### Fixed Navbar
```html
<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-6">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="glass rounded-2xl flex items-center justify-between px-6 py-3 transition-all duration-300 bg-white/40 shadow-sm">
      <!-- Nav content -->
    </div>
  </div>
</nav>
```

#### Nav Link
```html
<a href="#" class="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors">
  Link Text
</a>
```

### Tables

#### Comparison Table
```html
<div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
  <table class="w-full text-left border-collapse">
    <thead>
      <tr class="bg-slate-50">
        <th class="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Header</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-100">
      <tr class="hover:bg-slate-50 transition-colors">
        <td class="p-6 text-sm font-bold text-slate-900">Cell</td>
      </tr>
    </tbody>
  </table>
</div>
```

### Form Elements

#### Text Input
```html
<input
  type="text"
  placeholder="Placeholder"
  class="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
/>
```

### Icon Containers

#### Icon Box (Light)
```html
<div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
  <!-- SVG icon -->
</div>
```

#### Icon Box (Dark)
```html
<div class="p-4 rounded-2xl bg-blue-600 text-white">
  <!-- SVG icon -->
</div>
```

---

## Effects & Animations

### Glass Effect
```css
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
```

### Hover Effects

| Effect | Classes |
|--------|---------|
| Lift | `hover:-translate-y-1` |
| Scale down | `active:scale-95` |
| Shadow increase | `hover:shadow-xl` |
| Border highlight | `hover:border-blue-400` or `hover:border-blue-500/50` |
| Color change | `hover:text-blue-600` or `hover:bg-blue-600` |

### Transitions
```html
<!-- Standard transition -->
<div class="transition-all duration-300">

<!-- Long transition (for cards) -->
<div class="transition-all duration-500">

<!-- Color only -->
<div class="transition-colors">
```

### Animations

#### Pulse
```html
<div class="animate-pulse">
```

#### Ping (for status indicators)
```html
<span class="flex h-2 w-2 rounded-full bg-blue-600 animate-ping"></span>
```

#### Scan Line
```css
@keyframes scan {
  0% { transform: translateY(-100vh); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
}

.animate-scan {
  animation: scan 8s linear infinite;
}
```

### Background Effects

#### Blur Orbs
```html
<div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 blur-[100px] rounded-full animate-pulse"></div>
```

#### Grid Pattern
```html
<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
    <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" class="text-slate-400" />
  </pattern>
  <rect width="100%" height="100%" fill="url(#grid)" />
</svg>
```

#### Dot Pattern
```html
<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <pattern id="dotPattern" width="20" height="20" patternUnits="userSpaceOnUse">
    <circle cx="2" cy="2" r="1" fill="currentColor" class="text-slate-900" />
  </pattern>
  <rect width="100%" height="100%" fill="url(#dotPattern)" />
</svg>
```

---

## Iconography

### Icon Style
- **Type**: Outline (stroke-based)
- **Stroke Width**: 2 (default), 1 (decorative), 3 (emphasis)
- **Size**: w-6 h-6 (24px standard)
- **Source**: Heroicons or custom SVG

### Common Icons
```html
<!-- Arrow Right -->
<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
</svg>

<!-- Chart/Growth -->
<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
</svg>

<!-- Shield/Security -->
<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
</svg>

<!-- Lightning/Power -->
<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
</svg>

<!-- Link -->
<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
</svg>

<!-- Server/Stack -->
<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
</svg>
```

---

## Responsive Design

### Breakpoints

| Name | Min Width | Prefix |
|------|-----------|--------|
| Mobile | 0px | (default) |
| Small | 640px | `sm:` |
| Medium | 768px | `md:` |
| Large | 1024px | `lg:` |
| XL | 1280px | `xl:` |

### Common Patterns

```html
<!-- Typography scaling -->
<h1 class="text-5xl md:text-7xl">

<!-- Layout changes -->
<div class="flex flex-col sm:flex-row">

<!-- Grid columns -->
<div class="grid grid-cols-1 md:grid-cols-3">

<!-- Visibility -->
<div class="hidden md:flex">
<div class="block sm:hidden">

<!-- Spacing -->
<section class="py-16 lg:py-32">

<!-- Width -->
<button class="w-full sm:w-auto">
```

---

## Selection Styling

```css
::selection {
  background-color: #dbeafe; /* blue-100 */
  color: #1e3a8a; /* blue-900 */
}
```

```html
<div class="selection:bg-blue-100 selection:text-blue-900">
```

---

## Z-Index Scale

| Layer | Z-Index | Usage |
|-------|---------|-------|
| Background | `z-0` | Decorative elements |
| Content | `z-10` | Main content |
| Overlay | `z-20` | Overlays |
| Dropdown | `z-30` | Dropdowns |
| Fixed | `z-40` | Fixed elements |
| Modal | `z-50` | Modals, navigation |

---

## Shadow Scale

| Name | Class | Usage |
|------|-------|-------|
| Small | `shadow-sm` | Cards, subtle elevation |
| Medium | `shadow-md` | Buttons |
| Large | `shadow-lg` | Hover states |
| XL | `shadow-xl` | Emphasis, hover |
| 2XL | `shadow-2xl` | Featured cards |

### Colored Shadows
```html
<div class="shadow-lg shadow-blue-600/20">
<div class="shadow-2xl shadow-slate-300">
<div class="shadow-blue-100">
```

---

## Border Radius Scale

| Size | Class | Pixels | Usage |
|------|-------|--------|-------|
| Medium | `rounded-xl` | 12px | Buttons, small elements |
| Large | `rounded-2xl` | 16px | Cards, buttons |
| XL | `rounded-3xl` | 24px | Feature cards |
| Custom | `rounded-[2.5rem]` | 40px | Premium cards |
| Full | `rounded-full` | 50% | Pills, avatars |

---

*Last updated: February 2026*
*Version: 1.0*
