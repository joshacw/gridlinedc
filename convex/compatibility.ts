import { action, mutation } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_LOCATION_ID = "pDeHDxXRGXbQ8RnErHWV";

// GHL Custom Field IDs for Compatibility Score
const SCORE_FIELDS = {
  score: "6zv7rLIDkoRdhokZRphZ",
  label: "V8cDr0rBytarz18OrcZe",
  band1: "qifvbHF8ywaVnmbzw2XG",
  band2: "SKBTpXdZaQBaWI9LBdsh",
  band3: "h9DXeSpxJB0HQn12Iyd4",
  q1: "Ird1PqpsWmUMvldTahaU",
  q2: "YQrhNbNnLGAPNDAMWVTI",
  q3: "sisLX6yC6Kkt6gzGC3EX",
  q4: "56MJAhz8gO21YcYHERXw",
  q5: "MH4qlG5DA38vFgxgqlqq",
  q6: "Socg1QQZSuxzQsFh7lMz",
  q7: "3mn71LrQUUMgiYc8viHx",
  q8: "hm0Zlkt3fhvRAHoEBVxe",
  q9: "QdsbfLuhYcyNPSrHsfMe",
  facilityName: "UnYsc7lTtdBl63pyEaeY",
  country: "YJC3QZfipyOVqP39FZd1",
  organisationName: "Djx9Nbc25Zychb2ZjuMN",
  facilityLocation: "fvJ3RCrgR7huc7NNBoQi",
  contactRole: "9ellKQaxPS19cAr2NvYq",
  contactPhone: "wy5hLlosh7W9mbQXwTKY",
  facilitySizeMW: "3iDCk1HVyVADzA6ecj8a",
} as const;

// One-time setup: create all custom fields in GHL and return their IDs
export const setupCustomFields = action({
  args: {},
  handler: async () => {
    const apiKey = process.env.GHL_API_KEY;
    if (!apiKey) {
      return { success: false, reason: "GHL_API_KEY not configured" };
    }

    const fieldsToCreate = [
      { name: "Compatibility Score", dataType: "NUMERICAL" },
      { name: "Compatibility Label", dataType: "TEXT" },
      { name: "Compatibility Band 1 Score", dataType: "NUMERICAL" },
      { name: "Compatibility Band 2 Score", dataType: "NUMERICAL" },
      { name: "Compatibility Band 3 Score", dataType: "NUMERICAL" },
      { name: "Compat Q1 - Utilisation Below 30%", dataType: "SINGLE_OPTIONS", options: ["Yes", "No"] },
      { name: "Compat Q2 - EBITDA 30%+", dataType: "SINGLE_OPTIONS", options: ["Yes", "No"] },
      { name: "Compat Q3 - Single Owner", dataType: "SINGLE_OPTIONS", options: ["Yes", "No"] },
      { name: "Compat Q4 - No Debt", dataType: "SINGLE_OPTIONS", options: ["Yes", "No"] },
      { name: "Compat Q5 - Owns Outright", dataType: "SINGLE_OPTIONS", options: ["Yes", "No"] },
      { name: "Compat Q6 - Anchor Tenants", dataType: "SINGLE_OPTIONS", options: ["Yes", "No"] },
      { name: "Compat Q7 - Management Team", dataType: "SINGLE_OPTIONS", options: ["Yes", "No"] },
      { name: "Compat Q8 - Open to Valuation", dataType: "SINGLE_OPTIONS", options: ["Yes", "No"] },
      { name: "Compat Q9 - Under 5MW", dataType: "SINGLE_OPTIONS", options: ["Yes", "No"] },
      { name: "Facility Name", dataType: "TEXT" },
      { name: "Compatibility Country", dataType: "TEXT" },
      { name: "Organisation Name", dataType: "TEXT" },
      { name: "Facility Location", dataType: "TEXT" },
      { name: "Contact Role", dataType: "TEXT" },
      { name: "Contact Phone", dataType: "TEXT" },
    ];

    const results: Record<string, string> = {};

    for (const field of fieldsToCreate) {
      try {
        const payload: Record<string, unknown> = {
          name: field.name,
          dataType: field.dataType,
          model: "contact",
        };

        // Add options for SINGLE_OPTIONS fields
        if (field.dataType === "SINGLE_OPTIONS" && "options" in field) {
          payload.options = field.options;
        }

        const response = await fetch(
          `${GHL_API_BASE}/locations/${GHL_LOCATION_ID}/customFields`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
              Version: "2021-07-28",
            },
            body: JSON.stringify(payload),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(`Failed to create field "${field.name}":`, response.status, data);
          results[field.name] = `ERROR: ${response.status}`;
        } else {
          const fieldId = data.customField?.id || data.id;
          results[field.name] = fieldId;
          console.log(`Created "${field.name}" → ${fieldId}`);
        }
      } catch (error) {
        console.error(`Error creating field "${field.name}":`, error);
        results[field.name] = `ERROR: ${error}`;
      }
    }

    console.log("\n=== COPY THESE IDs INTO SCORE_FIELDS ===");
    console.log(JSON.stringify(results, null, 2));
    return { success: true, fields: results };
  },
});

// Survey validator for compatibility submission
const surveyValidator = v.object({
  criticalLoadCapacity: v.optional(v.string()),
  capacityUtilisation: v.optional(v.string()),
  expansionCapability: v.optional(v.string()),
  ebitdaMargin: v.optional(v.string()),
  powerCost: v.optional(v.string()),
  longTermContracts: v.optional(v.string()),
  tenantConcentration: v.optional(v.string()),
  ownershipType: v.optional(v.string()),
  realEstateStatus: v.optional(v.string()),
  debtStatus: v.optional(v.string()),
  marketDemand: v.optional(v.string()),
  managementTeam: v.optional(v.string()),
  transactionIntent: v.optional(v.string()),
  timeline: v.optional(v.string()),
});

// Create compatibility enquiry + progress token
export const createEnquiry = mutation({
  args: {
    firstName: v.string(),
    organisationName: v.optional(v.string()),
    facilityName: v.string(),
    facilityLocation: v.optional(v.string()),
    facilitySizeMW: v.optional(v.string()),
    role: v.optional(v.string()),
    email: v.string(),
    phoneNumber: v.optional(v.string()),
    country: v.string(),
    qualityScore: v.number(),
    readinessScore: v.number(),
    totalScore: v.number(),
    tier: v.string(),
    tierNumber: v.number(),
    survey: surveyValidator,
    conditionalFlags: v.optional(v.array(v.string())),
    token: v.string(),
    submittedAt: v.string(),
  },
  handler: async (ctx, args) => {
    const enquiryId = await ctx.db.insert("enquiries", {
      name: args.firstName,
      email: args.email,
      companyName: args.facilityName,
      organisationName: args.organisationName,
      role: args.role,
      phoneNumber: args.phoneNumber,
      dcLocation: args.facilityLocation,
      facilitySizeMW: args.facilitySizeMW,
      enquiryType: "compatibility",
      heardAbout: "compatibility-score",
      survey: args.survey,
      detailedQualityScore: args.qualityScore,
      detailedReadinessScore: args.readinessScore,
      detailedTotalScore: args.totalScore,
      detailedTier: args.tier,
      detailedConditionalFlags: args.conditionalFlags,
      submittedAt: args.submittedAt,
      status: "new",
      pipelineStep: 1,
      pipelineSteps: {},
    });

    await ctx.db.insert("progressTokens", {
      token: args.token,
      enquiryId,
      createdAt: args.submittedAt,
    });

    return { enquiryId, token: args.token };
  },
});

// Submit compatibility score — creates enquiry + GHL contact with survey scores
export const submitScore = action({
  args: {
    firstName: v.string(),
    organisationName: v.optional(v.string()),
    facilityName: v.string(),
    facilityLocation: v.optional(v.string()),
    facilitySizeMW: v.optional(v.string()),
    role: v.optional(v.string()),
    email: v.string(),
    phoneNumber: v.optional(v.string()),
    country: v.string(),
    qualityScore: v.number(),
    readinessScore: v.number(),
    totalScore: v.number(),
    tier: v.string(),
    tierNumber: v.number(),
    survey: surveyValidator,
    conditionalFlags: v.optional(v.array(v.string())),
    token: v.string(),
    progressUrl: v.string(),
    submittedAt: v.string(),
  },
  handler: async (ctx, args) => {
    // 1. Create enquiry + progress token
    const { enquiryId } = await ctx.runMutation(api.compatibility.createEnquiry, {
      firstName: args.firstName,
      organisationName: args.organisationName,
      facilityName: args.facilityName,
      facilityLocation: args.facilityLocation,
      facilitySizeMW: args.facilitySizeMW,
      role: args.role,
      email: args.email,
      phoneNumber: args.phoneNumber,
      country: args.country,
      qualityScore: args.qualityScore,
      readinessScore: args.readinessScore,
      totalScore: args.totalScore,
      tier: args.tier,
      tierNumber: args.tierNumber,
      survey: args.survey,
      conditionalFlags: args.conditionalFlags,
      token: args.token,
      submittedAt: args.submittedAt,
    });

    // 2. Create GHL contact
    const apiKey = process.env.GHL_API_KEY;

    if (!apiKey) {
      console.log("GHL_API_KEY not configured, skipping GHL contact creation");
      return { success: true, token: args.token, contactId: null };
    }

    const customFields = [
      { id: SCORE_FIELDS.score, field_value: String(args.totalScore) },
      { id: SCORE_FIELDS.label, field_value: args.tier },
      { id: SCORE_FIELDS.band1, field_value: String(args.qualityScore) },
      { id: SCORE_FIELDS.band2, field_value: String(args.readinessScore) },
      { id: SCORE_FIELDS.facilityName, field_value: args.facilityName },
      { id: SCORE_FIELDS.country, field_value: args.country },
      { id: SCORE_FIELDS.organisationName, field_value: args.organisationName ?? "" },
      { id: SCORE_FIELDS.facilityLocation, field_value: args.facilityLocation ?? "" },
      { id: SCORE_FIELDS.contactRole, field_value: args.role ?? "" },
      { id: SCORE_FIELDS.facilitySizeMW, field_value: args.facilitySizeMW ?? "" },
      { id: SCORE_FIELDS.contactPhone, field_value: args.phoneNumber ?? "" },
      { id: "2BjxVIRiKEn4HI7MTGgr", field_value: args.progressUrl },
    ].filter(f => f.id);

    const payload: Record<string, unknown> = {
      firstName: args.firstName,
      email: args.email,
      companyName: args.organisationName || args.facilityName,
      locationId: GHL_LOCATION_ID,
      customFields,
      tags: ["compatibility-score", args.tier.toLowerCase().replace(/\s+/g, "-")],
    };

    if (args.phoneNumber) payload.phone = args.phoneNumber;
    if (args.facilityLocation) payload.address1 = args.facilityLocation;

    try {
      const response = await fetch(`${GHL_API_BASE}/contacts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          Version: "2021-07-28",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("GHL create compatibility contact failed:", response.status, data);
        return { success: true, token: args.token, contactId: null };
      }

      const contactId = data.contact?.id || null;
      console.log("GHL compatibility contact created:", contactId, "Tier:", args.tier, "Score:", args.totalScore);

      if (contactId) {
        await ctx.runMutation(api.enquiries.updateGhlContactId, {
          id: enquiryId,
          ghlContactId: contactId,
        });
      }

      return { success: true, token: args.token, contactId };
    } catch (error) {
      console.error("GHL compatibility contact error:", error);
      return { success: true, token: args.token, contactId: null };
    }
  },
});

// One-time setup: create GHL custom fields for the detailed survey scores
export const setupDetailedSurveyFields = action({
  args: {},
  handler: async () => {
    const apiKey = process.env.GHL_API_KEY;
    if (!apiKey) {
      return { success: false, reason: "GHL_API_KEY not configured" };
    }

    const fieldsToCreate = [
      { name: "Detailed Quality Score", dataType: "NUMERICAL" },
      { name: "Detailed Readiness Score", dataType: "NUMERICAL" },
      { name: "Detailed Total Score", dataType: "NUMERICAL" },
      { name: "Detailed Tier", dataType: "TEXT" },
      { name: "Survey - Critical Load Capacity", dataType: "TEXT" },
      { name: "Survey - Capacity Utilisation", dataType: "TEXT" },
      { name: "Survey - Expansion Capability", dataType: "TEXT" },
      { name: "Survey - EBITDA Margin", dataType: "TEXT" },
      { name: "Survey - Power Cost", dataType: "TEXT" },
      { name: "Survey - Long Term Contracts", dataType: "TEXT" },
      { name: "Survey - Tenant Concentration", dataType: "TEXT" },
      { name: "Survey - Ownership Type", dataType: "TEXT" },
      { name: "Survey - Real Estate Status", dataType: "TEXT" },
      { name: "Survey - Debt Status", dataType: "TEXT" },
      { name: "Survey - Market Demand", dataType: "TEXT" },
      { name: "Survey - Management Team", dataType: "TEXT" },
      { name: "Survey - Transaction Intent", dataType: "TEXT" },
      { name: "Survey - Timeline", dataType: "TEXT" },
    ];

    const results: Record<string, string> = {};

    for (const field of fieldsToCreate) {
      try {
        const response = await fetch(
          `${GHL_API_BASE}/locations/${GHL_LOCATION_ID}/customFields`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
              Version: "2021-07-28",
            },
            body: JSON.stringify({
              name: field.name,
              dataType: field.dataType,
              model: "contact",
            }),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          console.error(`Failed to create field "${field.name}":`, response.status, data);
          results[field.name] = `ERROR: ${response.status}`;
        } else {
          const fieldId = data.customField?.id || data.id;
          results[field.name] = fieldId;
          console.log(`Created "${field.name}" → ${fieldId}`);
        }
      } catch (error) {
        console.error(`Error creating field "${field.name}":`, error);
        results[field.name] = `ERROR: ${error}`;
      }
    }

    console.log("\n=== COPY THESE IDs INTO GHL_FIELDS (enquiries.ts) ===");
    console.log(JSON.stringify(results, null, 2));
    return { success: true, fields: results };
  },
});
