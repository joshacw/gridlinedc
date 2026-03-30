import React from 'react';
import { InvestmentTier } from './types';
import type { SurveyQuestion } from './types';

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

// DC Owner Survey Questions (used on progress page survey step)
export const DC_SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    key: 'ownershipStructure',
    label: 'Ownership Structure',
    question: 'How is the data centre currently owned?',
    type: 'choice',
    options: ['Fully owned', 'Majority owned (>50%)', 'Minority owned (<50%)', 'Joint venture / Partnership'],
  },
  {
    key: 'currentPowerUtilisation',
    label: 'Current Power Utilisation',
    question: 'What is the current IT load of the facility?',
    type: 'choice',
    options: ['<2MW', '2\u20135MW', '5\u201310MW', '10\u201320MW', '20MW+'],
  },
  {
    key: 'powerScalability',
    label: 'Power Scalability',
    question: 'What is the maximum designed power capacity?',
    type: 'choice',
    options: ['<5MW', '5\u201310MW', '10\u201320MW', '20\u201350MW', '50MW+'],
  },
  {
    key: 'customerBase',
    label: 'Customer Base',
    question: 'How many active customer contracts are in place?',
    type: 'choice',
    options: ['1\u20135 contracts', '6\u201315 contracts', '16\u201350 contracts', '50+ contracts'],
  },
  {
    key: 'customerConcentration',
    label: 'Customer Concentration',
    question: 'What percentage of revenue comes from the top three customers?',
    type: 'choice',
    options: ['<30%', '30\u201350%', '50\u201370%', '70%+'],
  },
  {
    key: 'contractTenure',
    label: 'Contract Tenure',
    question: 'What is the typical contract length?',
    type: 'choice',
    options: ['<1 year', '1\u20133 years', '3\u20135 years', '5+ years'],
  },
  {
    key: 'anchorTenants',
    label: 'Anchor Tenant(s)',
    question: 'Who are the anchor tenant(s), and what is the remaining contract term?',
    type: 'text',
    placeholder: 'e.g., Major telco \u2014 8 years remaining',
  },
  {
    key: 'networkConnectivity',
    label: 'Network Connectivity',
    question: 'How many network carriers are available on-site?',
    type: 'choice',
    options: ['1\u20132 carriers', '3\u20135 carriers', '6\u201310 carriers', '10+ carriers'],
  },
  {
    key: 'annualRevenue',
    label: 'Annual Revenue',
    question: 'What is the current annual revenue?',
    type: 'choice',
    options: ['<$5M', '$5\u201315M', '$15\u201350M', '$50M+'],
  },
  {
    key: 'ebitdaRange',
    label: 'EBITDA Range',
    question: 'What is the typical EBITDA margin?',
    type: 'choice',
    options: ['<20%', '20\u201330%', '30\u201340%', '40%+'],
  },
  {
    key: 'capitalOutlook',
    label: 'Capital & Maintenance Outlook',
    question: 'Are there major capital expenditures planned in the next 12\u201324 months?',
    type: 'choice',
    options: ['No major capex planned', 'Minor maintenance (<$1M)', 'Major upgrade ($1\u20135M)', 'Significant expansion (>$5M)'],
  },
];

// Investor Pipeline steps configuration (5 steps)
export const INVESTOR_PIPELINE_STEPS = [
  { number: 1, key: 'investorRegisterInterest', label: 'Register Interest', description: 'Contact info submitted', phase: 'pre' as const },
  { number: 2, key: 'investorExploreMeeting', label: 'Explore Opportunity', description: 'Book a meeting with our team', phase: 'pre' as const },
  { number: 3, key: 'investorRequestDetail', label: 'Request Offer Detail', description: 'Complete the investor survey', phase: 'pre' as const },
  { number: 4, key: 'investorExecuteSafe', label: 'Execute SAFE', description: 'Sign the SAFE agreement', phase: 'post' as const },
  { number: 5, key: 'investorInvest', label: 'Invest', description: 'Complete your investment', phase: 'post' as const },
];

// Investor Survey Questions (used on investor progress page survey step)
export const INVESTOR_SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    key: 'investorType',
    label: 'Investor Type',
    question: 'Which best describes you as an investor?',
    type: 'choice',
    options: ['Individual / Angel', 'Family Office', 'Venture Capital', 'Private Equity', 'Institutional Fund', 'Corporate / Strategic'],
  },
  {
    key: 'accreditationStatus',
    label: 'Accreditation Status',
    question: 'What is your accreditation status?',
    type: 'choice',
    options: ['Accredited Investor', 'Qualified Purchaser', 'Sophisticated Investor', 'Not yet accredited', 'Unsure'],
  },
  {
    key: 'investmentRange',
    label: 'Investment Range',
    question: 'What is your typical investment range?',
    type: 'choice',
    options: ['<$100K', '$100K–$500K', '$500K–$1M', '$1M–$5M', '$5M+'],
  },
  {
    key: 'investmentTimeline',
    label: 'Investment Timeline',
    question: 'What is your expected investment timeline?',
    type: 'choice',
    options: ['Immediately', 'Within 3 months', '3–6 months', '6–12 months', '12+ months'],
  },
  {
    key: 'geographicPreference',
    label: 'Geographic Preference',
    question: 'Do you have a geographic preference for data centre investments?',
    type: 'choice',
    options: ['APAC only', 'Global – no preference', 'North America', 'Europe', 'Other'],
  },
  {
    key: 'priorDCExperience',
    label: 'Prior DC Experience',
    question: 'Do you have prior experience investing in data centres or digital infrastructure?',
    type: 'choice',
    options: ['Yes – actively invested', 'Yes – limited exposure', 'No – but interested', 'No – exploring for the first time'],
  },
];

// Compatibility Score Pipeline steps configuration (10 steps)
export const COMPATIBILITY_PIPELINE_STEPS = [
  { number: 1, key: 'compatAssessment', label: 'Compatibility Assessment', description: 'Initial screening complete', phase: 'pre' as const },
  { number: 2, key: 'compatViewScore', label: 'View Your Score', description: 'Review your compatibility rating', phase: 'pre' as const },
  { number: 3, key: 'compatShareDetails', label: 'Share DC Details', description: 'Complete the detailed facility survey', phase: 'pre' as const },
  { number: 4, key: 'compatBookMeeting', label: 'Book Initial Assessment', description: 'Schedule a call with our team', phase: 'pre' as const },
  { number: 5, key: 'compatHaveMeeting', label: 'Have Meeting', description: 'Meet with the GRIDLINE team', phase: 'pre' as const },
  { number: 6, key: 'shareFinancials', label: 'Share Financials', description: 'Provide financial documentation', phase: 'post' as const },
  { number: 7, key: 'prepareReport', label: 'Prepare Report', description: 'GRIDLINE prepares valuation report', phase: 'post' as const },
  { number: 8, key: 'presentOffer', label: 'Present Offer', description: 'Review partnership proposal', phase: 'post' as const },
  { number: 9, key: 'dueDiligence', label: 'Due Diligence', description: 'Formal verification process', phase: 'post' as const },
  { number: 10, key: 'closing', label: 'Closing', description: 'Finalise partnership agreement', phase: 'post' as const },
];

// DC Owner Pipeline steps configuration (12 steps)
export const PIPELINE_STEPS = [
  { number: 1, key: 'visitedWebsite', label: 'Visit Website', description: 'You found us', phase: 'pre' as const },
  { number: 2, key: 'registeredInterest', label: 'Register Interest', description: 'Contact info submitted', phase: 'pre' as const },
  { number: 3, key: 'bookMeeting', label: 'Book Meeting', description: 'Schedule a call with our team', phase: 'pre' as const },
  { number: 4, key: 'shareDCDetails', label: 'Share DC Details', description: 'Complete the facility survey', phase: 'pre' as const },
  { number: 5, key: 'haveMeeting', label: 'Have Meeting', description: 'Meet with the GRIDLINE team', phase: 'pre' as const },
  { number: 6, key: 'confirmNextSteps', label: 'Confirm Next Steps', description: 'Agree on path forward', phase: 'pre' as const },
  { number: 7, key: 'shareFinancials', label: 'Share Financials', description: 'Provide financial documentation', phase: 'post' as const },
  { number: 8, key: 'prepareReport', label: 'Prepare Report', description: 'GRIDLINE prepares valuation report', phase: 'post' as const },
  { number: 9, key: 'presentOffer', label: 'Present Offer', description: 'Review partnership proposal', phase: 'post' as const },
  { number: 10, key: 'dueDiligence', label: 'Due Diligence', description: 'Formal verification process', phase: 'post' as const },
  { number: 11, key: 'loi', label: 'LOI', description: 'Letter of Intent', phase: 'post' as const },
  { number: 12, key: 'closing', label: 'Closing', description: 'Finalise partnership agreement', phase: 'post' as const },
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
