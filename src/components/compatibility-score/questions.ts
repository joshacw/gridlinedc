// Questions and scoring are now defined in @/constants.tsx
// This file re-exports them for backward compatibility
export { DC_SURVEY_QUESTIONS as QUESTIONS, SURVEY_SCORING, computeDetailedScores } from "@/constants";

// Section grouping for the quiz UI — derived from question labels
export const SECTIONS = [
  { id: "facility-overview", label: "Facility Overview", questionKeys: ["criticalLoadCapacity", "capacityUtilisation", "expansionCapability"] },
  { id: "financial", label: "Financial & Operating Profile", questionKeys: ["ebitdaMargin", "powerCost"] },
  { id: "tenants", label: "Tenants & Contracts", questionKeys: ["longTermContracts", "tenantConcentration"] },
  { id: "ownership", label: "Ownership & Structure", questionKeys: ["ownershipType", "realEstateStatus", "debtStatus"] },
  { id: "market", label: "Market & Operations", questionKeys: ["marketDemand", "managementTeam"] },
  { id: "intent", label: "Seller Intent", questionKeys: ["transactionIntent", "timeline"] },
];
