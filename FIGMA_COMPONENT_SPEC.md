# GRIDLINE Financial Review — Figma Component Specification

Use this spec to recreate the report document in Figma. All values are in pixels unless otherwise noted.

---

## 1. Document Setup

### Frame Size (US Letter Portrait)
```
Width:  816px (8.5" @ 96dpi)
Height: 1056px (11" @ 96dpi)
```

### Margins
```
Top:    96px
Right:  96px
Bottom: 96px
Left:   96px
Content Width: 624px
```

### Grid
```
Columns: 12
Gutter:  24px
Margin:  96px
```

---

## 2. Color Tokens

### Primary
| Token | Hex | Usage |
|-------|-----|-------|
| `blue-600` | #2563EB | Primary accent, CTAs, links |
| `blue-400` | #60A5FA | Light accent text on dark |
| `blue-100` | #DBEAFE | Badge backgrounds |
| `blue-50`  | #EFF6FF | Light card backgrounds |

### Neutral
| Token | Hex | Usage |
|-------|-----|-------|
| `slate-950` | #020617 | Dark card bg, primary headings |
| `slate-900` | #0F172A | Section titles |
| `slate-600` | #475569 | Body text |
| `slate-500` | #64748B | Secondary text |
| `slate-400` | #94A3B8 | Muted text, borders |
| `slate-200` | #E2E8F0 | Borders, dividers |
| `slate-100` | #F1F5F9 | Table headers, light fills |
| `slate-50`  | #F8FAFC | Card backgrounds |
| `white`     | #FFFFFF | Page background |

---

## 3. Typography Tokens

### Font Family
```
Primary: Inter (or Arial fallback)
Headings: Inter Bold
```

### Type Scale
| Style | Size | Weight | Line Height | Letter Spacing | Color |
|-------|------|--------|-------------|----------------|-------|
| `title-xl` | 44px | Bold | 52px (1.18) | -0.02em | slate-900 |
| `title-lg` | 32px | Bold | 40px (1.25) | -0.01em | slate-900 |
| `heading-2` | 26px | Bold | 32px (1.23) | 0 | blue-600 |
| `body` | 16px | Regular | 24px (1.5) | 0 | slate-600 |
| `body-sm` | 14px | Regular | 20px (1.43) | 0 | slate-600 |
| `label` | 11px | Bold | 16px (1.45) | 0.1em | slate-400 |
| `badge` | 11px | Bold Italic | 16px | 0.05em | slate-600 |

---

## 4. Component Specifications

### 4.1 Section Badge
```
Frame: Auto Layout (Horizontal)
Padding: 0
Alignment: Center

Text:
  - Style: badge (11px, Bold, Italic)
  - Color: slate-600
  - Transform: UPPERCASE
  - Letter Spacing: 0.05em
```

### 4.2 Page Title Block
```
Frame: Auto Layout (Vertical)
Gap: 12px
Alignment: Center

Children:
  1. Badge (see 4.1)
  2. Title
     - Style: title-xl (44px, Bold)
     - Color: slate-900
     - Alignment: Center
  3. Subtitle
     - Style: body (16px, Regular)
     - Color: slate-600
     - Alignment: Center
     - Max Width: 480px
```

### 4.3 Metric Card
```
Frame: Fixed Width
Width: 156px
Height: Auto
Padding: 20px 16px
Border Radius: 8px
Border: 1px solid slate-200
Fill: slate-50

Children (Auto Layout Vertical, Gap: 8px, Center):
  1. Value
     - Style: 20px, Bold
     - Color: blue-600
  2. Label
     - Style: label (10px, Bold, Uppercase)
     - Color: slate-500
     - Letter Spacing: 0.05em
```

### 4.4 Metric Card (Highlighted)
```
Same as 4.3 except:
Fill: blue-600
Value Color: white
Label Color: blue-100
```

### 4.5 Metrics Row
```
Frame: Auto Layout (Horizontal)
Gap: 16px
Alignment: Center
Children: 4x Metric Card
Total Width: 624px (content width)
```

### 4.6 Comparison Card (Light)
```
Frame: Fixed
Width: 280px
Height: Auto
Padding: 40px 24px
Border Radius: 12px
Border: 4px solid slate-200
Fill: slate-50

Children (Auto Layout Vertical, Gap: 12px, Center):
  1. Label: "STANDALONE ASSET"
     - Style: label (11px, Bold, Uppercase)
     - Color: slate-400
  2. Value: "1x – 3x Revenue"
     - Style: 22px, Bold
     - Color: slate-900
  3. Subtext: "Discounted for illiquidity"
     - Style: 11px, Italic
     - Color: slate-500
```

### 4.7 Comparison Card (Dark)
```
Frame: Fixed
Width: 280px
Height: Auto
Padding: 40px 24px
Border Radius: 12px
Border: 4px solid blue-600
Fill: slate-950

Children (Auto Layout Vertical, Gap: 12px, Center):
  1. Label: "INSTITUTIONAL / PUBLIC MARKET"
     - Style: label (11px, Bold, Uppercase)
     - Color: blue-400
  2. Value: "*8–12x Multiple"
     - Style: 22px, Bold
     - Color: white
  3. Subtext: "Portfolio-wide rerating"
     - Style: 11px, Italic
     - Color: blue-400
```

### 4.8 Comparison Card Group
```
Frame: Auto Layout (Horizontal)
Gap: 24px
Alignment: Center Vertical

Children:
  1. Light Card (280px)
  2. Arrow Block
     Frame: 48px wide
     Children:
       - Arrow: "→" (24px, Bold, blue-600)
       - Label: "PLATFORM" (8px, Bold, blue-600)
  3. Dark Card (280px)
```

### 4.9 Comparison Table
```
Frame: Auto Layout (Vertical)
Width: 624px (full content)
Border Radius: 8px
Border: 1px solid slate-200
Overflow: Hidden

Header Row:
  Fill: slate-50
  Height: 48px
  Padding: 12px 16px

  Cells:
    - Width: 208px each (3 columns)
    - Text: label style (11px, Bold, Uppercase)
    - Col 1-2: slate-400
    - Col 3: blue-600 (INSIDE GRIDLINE)

Data Rows:
  Fill: white
  Height: 48px
  Padding: 12px 16px
  Border Top: 1px solid slate-200

  Cells:
    - Col 1: 14px, Bold, slate-900
    - Col 2: 14px, Regular, slate-600
    - Col 3: 14px, Bold, blue-600
```

### 4.10 Bullet List Item
```
Frame: Auto Layout (Horizontal)
Gap: 12px
Alignment: Top

Children:
  1. Bullet: "•" (16px, slate-400)
  2. Text: body style (16px, Regular, slate-600)
     - Line Height: 24px
```

### 4.11 Numbered List Item
```
Frame: Auto Layout (Horizontal)
Gap: 12px
Alignment: Top

Children:
  1. Number: "1." (16px, Bold, slate-400)
     - Width: 20px (fixed)
  2. Text: body style (16px, Regular, slate-600)
```

---

## 5. Page Layouts

### Page 1: Cover
```
Y Positions (from top of content area):
  - Hero Image: Y=40, Width=480, Height=270, Centered
  - Logo: Y=350, Centered
  - Accent Line: Y=420, Width=240, 2px, blue-600
  - Title: Y=470
  - Subtitle: Y=520
  - Date/Confidential: Y=720
```

### Page 2: Executive Summary
```
Y Positions:
  - Badge: Y=0
  - Title: Y=30
  - Subtitle: Y=90
  - Body Paragraphs: Y=160, Gap=24px between
  - Bullet List: Y=280, Gap=12px between items
```

### Page 3: Asset Overview + Capacity
```
Y Positions:
  - Badge: Y=0
  - Title: Y=30
  - Subtitle: Y=90
  - Metrics Row: Y=160
  - Heading 2 ("Capacity"): Y=280
  - Body Text: Y=320
  - Chart Image: Y=380, 160x160, Centered
  - Chart Labels: Y=560
```

### Page 4: Strategic Assessment
```
Y Positions:
  - Badge: Y=0
  - Title: Y=30
  - Subtitle: Y=90
  - Heading 2 ("Strengths"): Y=150
  - Bullet List: Y=190, Gap=12px
  - Heading 2 ("Considerations"): Y=380
  - Bullet List: Y=420, Gap=12px
```

### Page 5: Platform Integration Value
```
Y Positions:
  - Badge: Y=0
  - Title: Y=30
  - Subtitle: Y=90
  - Comparison Card Group: Y=160
  - Comparison Table: Y=340
```

### Page 6: Partnership Options
```
Y Positions:
  - Badge: Y=0
  - Title: Y=30
  - Subtitle: Y=90
  - Heading 2 (Option 1): Y=150
  - Bullets: Y=190
  - Heading 2 (Option 2): Y=360
  - Bullets: Y=400
  - Heading 2 (Option 3): Y=500
  - Bullets: Y=540
```

### Page 7: Execution Credibility
```
Y Positions:
  - Badge: Y=0
  - Title: Y=30
  - Body: Y=90
  - Metrics Row: Y=150
  - Heading 2: Y=280
  - Bullet List: Y=320
```

### Page 8: Next Steps
```
Y Positions:
  - Badge: Y=0
  - Title: Y=30
  - Numbered List: Y=90, Gap=16px
  - Closing Body: Y=280
```

---

## 6. Header & Footer

### Header (all pages except cover)
```
Position: Top of frame
Height: 48px
Padding Top: 24px

Content (Right Aligned):
  - "GRID" (11px, Bold, slate-950)
  - "LINE" (11px, Bold, blue-600)
  - " | Irix DC-1 Financial Review" (11px, Regular, slate-400)
```

### Footer (all pages)
```
Position: Bottom of frame
Height: 48px
Padding Bottom: 24px

Content (Centered):
  - "Confidential • Page X" (11px, Regular, slate-400)
```

---

## 7. Assets Required

| Asset | Dimensions | Location |
|-------|------------|----------|
| DC Facility Photo | 480×270 | Cover page hero |
| Capacity Donut Chart | 160×160 | Asset Overview page |
| GRIDLINE Logo | Vector | Cover page |

---

## 8. Figma Setup Checklist

1. [ ] Create new Figma file
2. [ ] Set up color styles from Section 2
3. [ ] Set up text styles from Section 3
4. [ ] Create components for each item in Section 4
5. [ ] Create 8 frames (816×1056px) for pages
6. [ ] Apply 96px margins to each frame
7. [ ] Place components per Section 5 layouts
8. [ ] Add header/footer components
9. [ ] Import assets from Section 7

---

*Spec generated February 2026*
