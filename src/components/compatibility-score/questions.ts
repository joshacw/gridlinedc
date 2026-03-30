import type { Question, Band, RatingTier } from "./types";

export const QUESTIONS: Question[] = [
  // Band 1 — Thesis
  { id: 1, text: "Is your facility's current utilisation below 30% of total capacity?", bandId: "thesis" },
  { id: 2, text: "Does your facility operate at an EBITDA margin of 30% or above?", bandId: "thesis" },
  // Band 2 — Structure
  { id: 3, text: "Is the facility owned by a single owner or a small, simple shareholder group?", bandId: "structure" },
  { id: 4, text: "Does the facility carry no debt on its balance sheet?", bandId: "structure" },
  { id: 5, text: "Does your organisation own the facility outright — no lease agreements?", bandId: "structure" },
  // Band 3 — Quality
  { id: 6, text: "Does the facility have high-value, long-term contracts in place with anchor tenants?", bandId: "quality" },
  { id: 7, text: "Is there an effective management team that would continue operating post-acquisition?", bandId: "quality" },
  { id: 8, text: "Is the owner open to exploring valuation upside without adding new infrastructure?", bandId: "quality" },
  { id: 9, text: "Is the facility's total capacity under 5MW?", bandId: "quality" },
];

export const BANDS: Band[] = [
  { id: "thesis", label: "Investment Thesis", questionIds: [1, 2] },
  { id: "structure", label: "Structure", questionIds: [3, 4, 5] },
  { id: "quality", label: "Quality", questionIds: [6, 7, 8, 9] },
];

export const RATINGS: Record<number, RatingTier> = {
  6: {
    label: "Exceptional Match",
    message: "Your facility aligns with every dimension of the GridLine acquisition profile. Expect to hear from us within 24 hours.",
  },
  5: {
    label: "Strong Fit",
    message: "Your facility is a strong candidate for the GridLine platform. We'll be in touch within 24 hours to arrange a conversation.",
  },
  4: {
    label: "Qualified",
    message: "Your facility meets the core criteria. There are a few areas we'd like to explore together — we'll follow up shortly.",
  },
  3: {
    label: "Emerging",
    message: "Your facility shows real promise. Timing or structure may need to align further. We'll follow up to discuss.",
  },
};

export const DEFAULT_RATING: RatingTier = {
  label: "Not Right Now",
  message: "Your facility isn't the right fit at this stage, but circumstances change. We'll keep your details on file and be in touch if that shifts.",
};
