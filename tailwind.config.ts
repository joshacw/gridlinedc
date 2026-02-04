import type { Config } from 'tailwindcss'

/**
 * GridlineDC Tailwind Configuration
 * Extends Tailwind CSS with custom design tokens from Figma design system
 */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Figma Primary Colors
        'primary-blue': 'var(--gridline-primary)',
        'dark-navy': 'var(--gridline-navy)',
        'dark-blue': 'var(--gridline-dark-blue)',
        'gridline-white': 'var(--gridline-white)',
        'gridline-gray': 'var(--gridline-gray)',
        'gridline-light-gray': 'var(--gridline-light-gray)',

        // Semantic Tokens
        'cta-primary': 'var(--color-cta-primary)',
        'cta-primary-hover': 'var(--color-cta-primary-hover)',
        'bg-dark': 'var(--color-background-dark)',
        'bg-dark-alt': 'var(--color-background-dark-alt)',
        'bg-light': 'var(--color-background-light)',
        'text-primary': 'var(--color-text-primary)',
        'text-on-dark': 'var(--color-text-on-dark)',
        'text-muted': 'var(--color-text-muted)',
      },
      fontFamily: {
        outfit: 'var(--font-outfit)',
        'big-shoulders': 'var(--font-big-shoulders)',
        'instrument-sans': 'var(--font-instrument-sans)',
        inter: 'var(--font-inter)',
      },
      fontSize: {
        // Figma-specified sizes
        'mega': ['var(--text-mega)', { lineHeight: 'var(--leading-mega)' }],
        'xxl': ['var(--text-xxl)', { lineHeight: 'var(--leading-xxl)' }],
        'base-figma': ['var(--text-base)', { lineHeight: 'var(--leading-base)' }],
        'sm-figma': ['var(--text-sm)', { lineHeight: 'var(--leading-sm)' }],
        'xs-figma': ['var(--text-xs)', { lineHeight: 'var(--leading-sm)' }],
      },
      borderRadius: {
        'card': 'var(--radius-card)',
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        'primary': 'var(--shadow-primary)',
      },
      backgroundImage: {
        'gradient-dark': 'var(--gradient-bg-dark)',
        'gradient-dark-alt': 'var(--gradient-bg-dark-alt)',
        'gradient-text': 'var(--gradient-text-primary)',
      },
    },
  },
  plugins: [],
} satisfies Config
