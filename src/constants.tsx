import React from 'react';
import { InvestmentTier, NavItem } from './types';

// Legacy nav items (kept for backward compatibility)
export const NAV_ITEMS: NavItem[] = [
  { label: 'Multiplier Model', href: '#rerating' },
  { label: 'Partnership', href: '#partnership' },
  { label: 'Investment', href: '#strategy' },
];

// Page-specific navigation
export const HOME_NAV_ITEMS: NavItem[] = [
  { label: 'For Owners', href: '/owners' },
  { label: 'For Investors', href: '/investors' },
];

export const OWNERS_NAV_ITEMS: NavItem[] = [
  { label: 'Why Partner', href: '#why-partner' },
  { label: 'Comparison', href: '#comparison' },
  { label: 'Options', href: '#partnership-options' },
  { label: 'Arbitrage', href: '#arbitrage' },
];

export const INVESTORS_NAV_ITEMS: NavItem[] = [
  { label: 'Overview', href: '#overview' },
];

// New partnership options for the owners page
export const OWNERS_PARTNERSHIP_OPTIONS = [
  {
    title: 'Royalty + Platform Equity',
    type: 'Primary Option',
    typeLabel: 'Preferred',
    icon: 'star',
    points: [
      'Ongoing royalty participation tied to asset-level performance',
      'Minority equity participation in the GRIDLINE platform',
      'No forced exit at closing',
      'Preserves operating continuity',
      'Aligns near-term income with long-term platform value',
    ],
    description: 'Best suited for owners seeking continued cash flow with exposure to institutional rerating.',
    highlighted: true,
  },
  {
    title: 'Owner Financing + Platform Equity',
    type: 'Secondary Option',
    typeLabel: 'Secondary',
    icon: 'link',
    points: [
      'Agreed enterprise valuation',
      'Deferred consideration via owner financing',
      'Interest accrual over time',
      'Repayment from free cash flow and/or future liquidity events',
      'Minority platform equity participation',
    ],
    description: 'Best suited for owners seeking deferred liquidity with strong alignment.',
    highlighted: false,
  },
  {
    title: 'Partial Cash / Partial Equity',
    type: 'Alternative Option',
    typeLabel: 'Alternative',
    icon: 'scale',
    points: [
      'Partial liquidity at closing',
      'Remaining value contributed as platform equity',
      'Increased capital and execution complexity',
      'Longer timelines',
      'Reduced alignment relative to primary structures',
    ],
    description: 'Used selectively where partial liquidity is required.',
    highlighted: false,
  },
];

export const INVESTMENT_TIERS: InvestmentTier[] = [
  {
    id: 'seed',
    name: 'Seed Capital',
    minInvestment: '$1M Minimum',
    focus: 'Direct Equity Swap & Site Acquisition',
    targetYield: '30%+',
    listingHorizon: '48 Months',
    multiplierPath: '2x Entry → 12x Exit'
  },
  {
    id: 'core',
    name: 'Core Growth',
    minInvestment: '$5M Asset Valuation',
    focus: 'Consolidation & Infrastructure (Specific Criteria Apply)',
    targetYield: '15-20%',
    listingHorizon: '24-36 Months',
    multiplierPath: '5x Entry → 12x Exit'
  }
];

export const ASSET_STRENGTHS = [
  'Embedded growth capacity without new land or greenfield development',
  'Diversified end-market exposure',
  'Anchor tenancy stability (SAINS – 11-year contract)',
  'Operating leverage at current margins',
  'Clean ownership structure enabling straightforward execution'
];

export const PARTNERSHIP_OPTIONS = [
  {
    title: 'Vendor Finance with Platform Equity',
    type: 'Primary Option',
    icon: 'link',
    points: [
      'Agreed enterprise valuation',
      'Deferred consideration via vendor financing',
      'Interest accrual over time',
      'Repayment from free cash flow and/or liquidity events',
      'Minority equity participation in GRIDLINE'
    ]
  },
  {
    title: 'Partial Cash / Partial Equity',
    type: 'Alternative Option',
    icon: 'scale',
    points: [
      'Partial liquidity at close',
      'Increased execution complexity',
      'Longer timelines',
      'Reduced alignment compared to Option 1'
    ]
  },
  {
    title: 'All Equity Contribution',
    type: 'Fallback Option',
    icon: 'alert',
    points: [
      'No immediate liquidity',
      'Full exposure to early-stage platform risk',
      'Limited alignment with GRIDLINE governance objectives'
    ]
  }
];

export const FEATURES = [
  {
    title: 'Asset Aggregation',
    description: 'We bundle high-quality data center assets into a unified portfolio for public markets.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    title: 'Listing Readiness',
    description: 'Institutional-grade governance designed to meet public exchange requirements.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: 'AI Workloads',
    description: 'Infrastructure optimized for high-density compute and liquid cooling.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
];
