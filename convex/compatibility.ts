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
    score: v.number(),
    scoreLabel: v.string(),
    band1Score: v.number(),
    band2Score: v.number(),
    band3Score: v.number(),
    answers: v.object({
      q1: v.boolean(),
      q2: v.boolean(),
      q3: v.boolean(),
      q4: v.boolean(),
      q5: v.boolean(),
      q6: v.boolean(),
      q7: v.boolean(),
      q8: v.boolean(),
      q9: v.boolean(),
    }),
    token: v.string(),
    submittedAt: v.string(),
  },
  handler: async (ctx, args) => {
    // Create enquiry record
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
      compatibilityScore: {
        score: args.score,
        scoreLabel: args.scoreLabel,
        band1Score: args.band1Score,
        band2Score: args.band2Score,
        band3Score: args.band3Score,
        answers: args.answers,
      },
      submittedAt: args.submittedAt,
      status: "new",
      pipelineStep: 2, // Start at "View Your Score"
      pipelineSteps: {
        compatAssessment: { completedAt: args.submittedAt },
      },
    });

    // Create progress token
    await ctx.db.insert("progressTokens", {
      token: args.token,
      enquiryId,
      createdAt: args.submittedAt,
    });

    return { enquiryId, token: args.token };
  },
});

// Submit compatibility score — creates GHL contact with score custom fields + progress URL
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
    score: v.number(),
    scoreLabel: v.string(),
    band1Score: v.number(),
    band2Score: v.number(),
    band3Score: v.number(),
    answers: v.object({
      q1: v.boolean(),
      q2: v.boolean(),
      q3: v.boolean(),
      q4: v.boolean(),
      q5: v.boolean(),
      q6: v.boolean(),
      q7: v.boolean(),
      q8: v.boolean(),
      q9: v.boolean(),
    }),
    token: v.string(),
    progressUrl: v.string(),
    submittedAt: v.string(),
  },
  handler: async (ctx, args) => {
    // 1. Create enquiry + progress token via mutation
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
      score: args.score,
      scoreLabel: args.scoreLabel,
      band1Score: args.band1Score,
      band2Score: args.band2Score,
      band3Score: args.band3Score,
      answers: args.answers,
      token: args.token,
      submittedAt: args.submittedAt,
    });

    // 2. Create GHL contact with custom fields + progress URL
    const apiKey = process.env.GHL_API_KEY;

    if (!apiKey) {
      console.log("GHL_API_KEY not configured, skipping GHL contact creation");
      return { success: true, token: args.token, contactId: null };
    }

    const customFields = [
      { id: SCORE_FIELDS.score, field_value: String(args.score) },
      { id: SCORE_FIELDS.label, field_value: args.scoreLabel },
      { id: SCORE_FIELDS.band1, field_value: String(args.band1Score) },
      { id: SCORE_FIELDS.band2, field_value: String(args.band2Score) },
      { id: SCORE_FIELDS.band3, field_value: String(args.band3Score) },
      { id: SCORE_FIELDS.q1, field_value: args.answers.q1 ? "Yes" : "No" },
      { id: SCORE_FIELDS.q2, field_value: args.answers.q2 ? "Yes" : "No" },
      { id: SCORE_FIELDS.q3, field_value: args.answers.q3 ? "Yes" : "No" },
      { id: SCORE_FIELDS.q4, field_value: args.answers.q4 ? "Yes" : "No" },
      { id: SCORE_FIELDS.q5, field_value: args.answers.q5 ? "Yes" : "No" },
      { id: SCORE_FIELDS.q6, field_value: args.answers.q6 ? "Yes" : "No" },
      { id: SCORE_FIELDS.q7, field_value: args.answers.q7 ? "Yes" : "No" },
      { id: SCORE_FIELDS.q8, field_value: args.answers.q8 ? "Yes" : "No" },
      { id: SCORE_FIELDS.q9, field_value: args.answers.q9 ? "Yes" : "No" },
      { id: SCORE_FIELDS.facilityName, field_value: args.facilityName },
      { id: SCORE_FIELDS.country, field_value: args.country },
      { id: "2BjxVIRiKEn4HI7MTGgr", field_value: args.progressUrl }, // progressUrl field (shared with enquiries)
    ];

    // Add new custom fields only if IDs are configured
    if (SCORE_FIELDS.organisationName) {
      customFields.push({ id: SCORE_FIELDS.organisationName, field_value: args.organisationName ?? "" });
    }
    if (SCORE_FIELDS.facilityLocation) {
      customFields.push({ id: SCORE_FIELDS.facilityLocation, field_value: args.facilityLocation ?? "" });
    }
    if (SCORE_FIELDS.contactRole) {
      customFields.push({ id: SCORE_FIELDS.contactRole, field_value: args.role ?? "" });
    }
    if (SCORE_FIELDS.facilitySizeMW) {
      customFields.push({ id: SCORE_FIELDS.facilitySizeMW, field_value: args.facilitySizeMW ?? "" });
    }
    if (SCORE_FIELDS.contactPhone) {
      customFields.push({ id: SCORE_FIELDS.contactPhone, field_value: args.phoneNumber ?? "" });
    }

    const payload: Record<string, unknown> = {
      firstName: args.firstName,
      email: args.email,
      companyName: args.organisationName || args.facilityName,
      locationId: GHL_LOCATION_ID,
      customFields,
      tags: ["compatibility-score", args.scoreLabel.toLowerCase().replace(/\s+/g, "-")],
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
      console.log("GHL compatibility contact created:", contactId, "Score:", args.score, args.scoreLabel);

      // Store GHL contact ID on enquiry
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
