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

export type PageContext = 'home' | 'owners' | 'investors';

// DC Survey Question types
export interface SurveyQuestionBase {
  key: string;
  label: string;
  question: string;
}

export interface SurveyChoiceQuestion extends SurveyQuestionBase {
  type: 'choice';
  options: string[];
}

export interface SurveyTextQuestion extends SurveyQuestionBase {
  type: 'text';
  placeholder: string;
}

export type SurveyQuestion = SurveyChoiceQuestion | SurveyTextQuestion;
