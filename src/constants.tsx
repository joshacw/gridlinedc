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

// DC Owner Detailed Survey Questions (14 questions across 6 sections)
export const DC_SURVEY_QUESTIONS: SurveyQuestion[] = [
  // Section 1: Facility Overview
  {
    key: 'criticalLoadCapacity',
    label: 'Facility Overview',
    question: "What is the facility's total critical load capacity (MW)?",
    type: 'choice',
    options: ['<1 MW', '1–5 MW', '5–10 MW', '10+ MW'],
  },
  {
    key: 'capacityUtilisation',
    label: 'Facility Overview',
    question: 'What percentage of capacity is currently utilised (revenue-generating)?',
    type: 'choice',
    options: ['<30%', '30–60%', '60–85%', '85%+'],
  },
  {
    key: 'expansionCapability',
    label: 'Facility Overview',
    question: 'Does the facility have the ability to expand power capacity?',
    type: 'choice',
    options: ['Yes – Significant expansion available', 'Yes – Limited expansion', 'No expansion capability', 'Unsure'],
  },
  // Section 2: Financial & Operating Profile
  {
    key: 'ebitdaMargin',
    label: 'Financial & Operating Profile',
    question: 'What is the approximate EBITDA margin?',
    type: 'choice',
    options: ['<20%', '20–30%', '30–50%', '50%+'],
  },
  {
    key: 'powerCost',
    label: 'Financial & Operating Profile',
    question: 'What is your approximate all-in power cost ($/kWh)?',
    type: 'text',
    placeholder: 'e.g., $0.06/kWh',
  },
  // Section 3: Tenants & Contracts
  {
    key: 'longTermContracts',
    label: 'Tenants & Contracts',
    question: 'Do you have long-term contracts with tenants?',
    type: 'choice',
    options: ['Yes (3+ years remaining)', 'Yes (1–3 years remaining)', 'Mostly short-term / month-to-month', 'No current tenants'],
  },
  {
    key: 'tenantConcentration',
    label: 'Tenants & Contracts',
    question: 'How concentrated is your tenant base?',
    type: 'choice',
    options: ['Single tenant >50% of revenue', 'Top 2–3 tenants = majority', 'Diversified tenant base', 'No tenants currently'],
  },
  // Section 4: Ownership & Structure
  {
    key: 'ownershipType',
    label: 'Ownership & Structure',
    question: 'How is the facility owned?',
    type: 'choice',
    options: ['Single owner', 'Small ownership group (2–5 parties)', 'Larger group / multiple stakeholders'],
  },
  {
    key: 'realEstateStatus',
    label: 'Ownership & Structure',
    question: 'Is the real estate owned or leased?',
    type: 'choice',
    options: ['Owned outright', 'Owned with debt', 'Ground lease', 'Fully leased'],
  },
  {
    key: 'debtStatus',
    label: 'Ownership & Structure',
    question: 'Does the facility currently have any debt or liens?',
    type: 'choice',
    options: ['No debt', 'Moderate debt', 'Significant debt'],
  },
  // Section 5: Market & Operations
  {
    key: 'marketDemand',
    label: 'Market & Operations',
    question: 'How would you describe demand in your market?',
    type: 'choice',
    options: ['Strong and growing (AI / hyperscale demand)', 'Stable demand', 'Limited demand', 'Unsure'],
  },
  {
    key: 'managementTeam',
    label: 'Market & Operations',
    question: 'Is there an existing management/operations team in place?',
    type: 'choice',
    options: ['Yes – would remain post-transaction', 'Yes – but uncertain retention', 'No'],
  },
  // Section 6: Seller Intent
  {
    key: 'transactionIntent',
    label: 'Seller Intent',
    question: 'Are you open to exploring a potential sale or strategic transaction?',
    type: 'choice',
    options: ['Yes – actively exploring', 'Possibly – open to discussion', 'Just evaluating options'],
  },
  {
    key: 'timeline',
    label: 'Seller Intent',
    question: 'What is your approximate timeline?',
    type: 'choice',
    options: ['Immediate (0–3 months)', 'Near-term (3–12 months)', 'Long-term / exploratory'],
  },
];

// Detailed Survey Scoring Model
// Each scored question maps answer → points (0-3)
// Q5 (powerCost) is free text and unscored
export const SURVEY_SCORING: Record<string, Record<string, number>> = {
  // Section 1: Asset Quality
  criticalLoadCapacity: {
    '<1 MW': 1,
    '1–5 MW': 3,
    '5–10 MW': 2,
    '10+ MW': 1,
  },
  capacityUtilisation: {
    '<30%': 3,
    '30–60%': 2,
    '60–85%': 1,
    '85%+': 0,
  },
  expansionCapability: {
    'Yes – Significant expansion available': 3,
    'Yes – Limited expansion': 2,
    'No expansion capability': 0,
    'Unsure': 1,
  },
  ebitdaMargin: {
    '<20%': 0,
    '20–30%': 1,
    '30–50%': 2,
    '50%+': 3,
  },
  longTermContracts: {
    'Yes (3+ years remaining)': 3,
    'Yes (1–3 years remaining)': 2,
    'Mostly short-term / month-to-month': 1,
    'No current tenants': 0,
  },
  tenantConcentration: {
    'Single tenant >50% of revenue': 1,
    'Top 2–3 tenants = majority': 2,
    'Diversified tenant base': 3,
    'No tenants currently': 0,
  },
  // Section 2: Deal Readiness
  ownershipType: {
    'Single owner': 3,
    'Small ownership group (2–5 parties)': 2,
    'Larger group / multiple stakeholders': 1,
  },
  realEstateStatus: {
    'Owned outright': 3,
    'Owned with debt': 2,
    'Ground lease': 1,
    'Fully leased': 0,
  },
  debtStatus: {
    'No debt': 3,
    'Moderate debt': 1,
    'Significant debt': 0,
  },
  marketDemand: {
    'Strong and growing (AI / hyperscale demand)': 3,
    'Stable demand': 2,
    'Limited demand': 1,
    'Unsure': 1,
  },
  managementTeam: {
    'Yes – would remain post-transaction': 3,
    'Yes – but uncertain retention': 1,
    'No': 0,
  },
  transactionIntent: {
    'Yes – actively exploring': 3,
    'Possibly – open to discussion': 2,
    'Just evaluating options': 1,
  },
  timeline: {
    'Immediate (0–3 months)': 3,
    'Near-term (3–12 months)': 2,
    'Long-term / exploratory': 1,
  },
};

// Asset Quality questions (Q1-Q7, excluding Q5 which is unscored text)
export const QUALITY_QUESTION_KEYS = [
  'criticalLoadCapacity', 'capacityUtilisation', 'expansionCapability',
  'ebitdaMargin', 'longTermContracts', 'tenantConcentration',
];

// Deal Readiness questions (Q8-Q14)
export const READINESS_QUESTION_KEYS = [
  'ownershipType', 'realEstateStatus', 'debtStatus',
  'marketDemand', 'managementTeam', 'transactionIntent', 'timeline',
];

// Conditional flags
export const SURVEY_CONDITIONALS: Record<string, { answer: string; flag: string }> = {
  tenantConcentration: {
    answer: 'No tenants currently',
    flag: 'No tenants — combined with low utilisation may signal greenfield upside',
  },
};

// Compute detailed survey scores
export function computeDetailedScores(answers: Record<string, string>): {
  qualityScore: number;
  readinessScore: number;
  totalScore: number;
  maxQuality: number;
  maxReadiness: number;
  maxTotal: number;
  tier: string;
  tierNumber: number;
  conditionalFlags: string[];
} {
  let qualityScore = 0;
  let readinessScore = 0;
  const conditionalFlags: string[] = [];

  // Quality (max 18: 6 questions × 3 points)
  for (const key of QUALITY_QUESTION_KEYS) {
    const answer = answers[key];
    if (answer && SURVEY_SCORING[key]) {
      qualityScore += SURVEY_SCORING[key][answer] ?? 0;
    }
    // Check conditionals
    if (SURVEY_CONDITIONALS[key] && answer === SURVEY_CONDITIONALS[key].answer) {
      const utilisationAnswer = answers['capacityUtilisation'];
      if (utilisationAnswer === '<30%' || utilisationAnswer === '30–60%') {
        conditionalFlags.push(SURVEY_CONDITIONALS[key].flag);
      }
    }
  }

  // Readiness (max 21: 7 questions × 3 points)
  for (const key of READINESS_QUESTION_KEYS) {
    const answer = answers[key];
    if (answer && SURVEY_SCORING[key]) {
      readinessScore += SURVEY_SCORING[key][answer] ?? 0;
    }
  }

  const totalScore = qualityScore + readinessScore;
  const maxQuality = 18;
  const maxReadiness = 21;
  const maxTotal = 39;

  let tier: string;
  let tierNumber: number;
  if (totalScore >= 33) { tier = 'Priority Acquisition Target'; tierNumber = 1; }
  else if (totalScore >= 25) { tier = 'Strong Candidate'; tierNumber = 2; }
  else if (totalScore >= 17) { tier = 'Conditional — Needs Alignment'; tierNumber = 3; }
  else if (totalScore >= 9) { tier = 'Unlikely Fit'; tierNumber = 4; }
  else { tier = 'Not Aligned'; tierNumber = 5; }

  return { qualityScore, readinessScore, totalScore, maxQuality, maxReadiness, maxTotal, tier, tierNumber, conditionalFlags };
}

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
  { number: 1, key: 'discoverFit', label: 'Discover Your Fit', description: 'Initial screening complete', phase: 'pre' as const },
  { number: 2, key: 'bookCall', label: 'Book A Call', description: 'Schedule a call with our team', phase: 'pre' as const },
  { number: 3, key: 'shareDetails', label: 'Share More Details', description: 'Provide additional facility information', phase: 'pre' as const },
  { number: 4, key: 'headsOfAgreement', label: 'Heads Of Agreement', description: 'Outline the partnership terms', phase: 'post' as const },
  { number: 5, key: 'reviewFinancials', label: 'Review Audited Financials', description: 'Financial documentation review', phase: 'post' as const },
  { number: 6, key: 'loi', label: 'Letter of Intent', description: 'Formalising partnership commitment', phase: 'post' as const },
  { number: 7, key: 'dueDiligence', label: 'Due Diligence', description: 'Including site visit', phase: 'post' as const },
  { number: 8, key: 'signDocs', label: 'Sign Definitive Acquisition Documents', description: 'Execute acquisition agreements', phase: 'post' as const },
  { number: 9, key: 'closing', label: 'Closing', description: 'Finalise partnership agreement', phase: 'post' as const },
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
