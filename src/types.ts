export interface MarketInsight {
  topic: string;
  summary: string;
  trend: 'up' | 'down' | 'stable';
  impactScore: number;
}

export interface InvestmentTier {
  id: string;
  name: string;
  minInvestment: string;
  focus: string;
  targetYield: string;
  listingHorizon: string;
  multiplierPath: string;
}

export interface NavItem {
  label: string;
  href: string;
}
