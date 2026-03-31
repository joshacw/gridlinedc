import { mutation, query, action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

// Fetch enquiry data by progress token
export const getByToken = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const tokenRecord = await ctx.db
      .query("progressTokens")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();
    if (!tokenRecord) return null;
    const enquiry = await ctx.db.get(tokenRecord.enquiryId);
    return enquiry;
  },
});

// Advance pipeline step (for frontend-tracked steps like booking and survey)
export const advanceStep = mutation({
  args: {
    enquiryId: v.id("enquiries"),
    stepKey: v.string(),
  },
  handler: async (ctx, args) => {
    const enquiry = await ctx.db.get(args.enquiryId);
    if (!enquiry) throw new Error("Enquiry not found");

    const currentStep = enquiry.pipelineStep || 2;
    const steps = enquiry.pipelineSteps || {};

    await ctx.db.patch(args.enquiryId, {
      pipelineStep: currentStep + 1,
      pipelineSteps: {
        ...steps,
        [args.stepKey]: { completedAt: new Date().toISOString() },
      },
    });
  },
});

// Survey validator — matches the 14-question detailed survey
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

// Save survey data to the enquiry record
export const saveSurvey = mutation({
  args: {
    enquiryId: v.id("enquiries"),
    survey: surveyValidator,
    detailedQualityScore: v.optional(v.number()),
    detailedReadinessScore: v.optional(v.number()),
    detailedTotalScore: v.optional(v.number()),
    detailedTier: v.optional(v.string()),
    detailedConditionalFlags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.enquiryId, {
      survey: args.survey,
      detailedQualityScore: args.detailedQualityScore,
      detailedReadinessScore: args.detailedReadinessScore,
      detailedTotalScore: args.detailedTotalScore,
      detailedTier: args.detailedTier,
      detailedConditionalFlags: args.detailedConditionalFlags,
    });
  },
});

// Submit survey from progress page — saves to Convex + syncs to GHL + advances step
export const submitSurveyFromProgress = action({
  args: {
    enquiryId: v.id("enquiries"),
    survey: surveyValidator,
    detailedQualityScore: v.optional(v.number()),
    detailedReadinessScore: v.optional(v.number()),
    detailedTotalScore: v.optional(v.number()),
    detailedTier: v.optional(v.string()),
    detailedConditionalFlags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    // 1. Save survey data + scores
    await ctx.runMutation(api.progress.saveSurvey, {
      enquiryId: args.enquiryId,
      survey: args.survey,
      detailedQualityScore: args.detailedQualityScore,
      detailedReadinessScore: args.detailedReadinessScore,
      detailedTotalScore: args.detailedTotalScore,
      detailedTier: args.detailedTier,
      detailedConditionalFlags: args.detailedConditionalFlags,
    });

    // 2. Get the enquiry to find ghlContactId
    const enquiry = await ctx.runQuery(api.enquiries.getById, { id: args.enquiryId });

    // 3. Sync to GHL if we have a contact ID
    if (enquiry?.ghlContactId) {
      await ctx.runAction(api.enquiries.updateGHLContactSurvey, {
        contactId: enquiry.ghlContactId,
        survey: args.survey,
        detailedQualityScore: args.detailedQualityScore,
        detailedReadinessScore: args.detailedReadinessScore,
        detailedTotalScore: args.detailedTotalScore,
        detailedTier: args.detailedTier,
      });
    }

    // 4. Advance the pipeline step (use compatShareDetails for compatibility flow)
    const stepKey = enquiry?.enquiryType === 'compatibility' ? 'compatShareDetails' : 'shareDCDetails';
    await ctx.runMutation(api.progress.advanceStep, {
      enquiryId: args.enquiryId,
      stepKey,
    });

    return { success: true };
  },
});

// Save investor survey data to the enquiry record
export const saveInvestorSurvey = mutation({
  args: {
    enquiryId: v.id("enquiries"),
    investorSurvey: v.object({
      investorType: v.optional(v.string()),
      accreditationStatus: v.optional(v.string()),
      investmentRange: v.optional(v.string()),
      investmentTimeline: v.optional(v.string()),
      geographicPreference: v.optional(v.string()),
      priorDCExperience: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.enquiryId, { investorSurvey: args.investorSurvey });
  },
});

// Submit investor survey from progress page — saves to Convex + syncs to GHL + advances step
export const submitInvestorSurveyFromProgress = action({
  args: {
    enquiryId: v.id("enquiries"),
    investorSurvey: v.object({
      investorType: v.optional(v.string()),
      accreditationStatus: v.optional(v.string()),
      investmentRange: v.optional(v.string()),
      investmentTimeline: v.optional(v.string()),
      geographicPreference: v.optional(v.string()),
      priorDCExperience: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    // 1. Save investor survey data
    await ctx.runMutation(api.progress.saveInvestorSurvey, {
      enquiryId: args.enquiryId,
      investorSurvey: args.investorSurvey,
    });

    // 2. Get the enquiry to find ghlContactId
    const enquiry = await ctx.runQuery(api.enquiries.getById, { id: args.enquiryId });

    // 3. Sync to GHL if we have a contact ID
    if (enquiry?.ghlContactId) {
      await ctx.runAction(api.enquiries.updateGHLContactInvestorSurvey, {
        contactId: enquiry.ghlContactId,
        investorSurvey: args.investorSurvey,
      });
    }

    // 4. Advance the pipeline step
    await ctx.runMutation(api.progress.advanceStep, {
      enquiryId: args.enquiryId,
      stepKey: "investorRequestDetail",
    });

    return { success: true };
  },
});

// Update step from GHL webhook (looks up by ghlContactId)
export const updateStepFromWebhook = mutation({
  args: {
    ghlContactId: v.string(),
    stepNumber: v.number(),
    stepKey: v.string(),
  },
  handler: async (ctx, args) => {
    const enquiry = await ctx.db
      .query("enquiries")
      .withIndex("by_ghlContactId", (q) => q.eq("ghlContactId", args.ghlContactId))
      .first();

    if (!enquiry) {
      throw new Error("Enquiry not found for GHL contact: " + args.ghlContactId);
    }

    const currentStep = enquiry.pipelineStep || 2;

    // Only advance if this step is beyond current
    if (args.stepNumber >= currentStep) {
      const steps = enquiry.pipelineSteps || {};
      await ctx.db.patch(enquiry._id, {
        pipelineStep: args.stepNumber + 1,
        pipelineSteps: {
          ...steps,
          [args.stepKey]: { completedAt: new Date().toISOString() },
        },
      });
    }
  },
});
