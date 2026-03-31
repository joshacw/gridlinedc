import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  enquiries: defineTable({
    // Contact Information
    name: v.string(),
    email: v.string(),
    companyName: v.string(),
    organisationName: v.optional(v.string()),
    role: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
    enquiryType: v.union(v.literal("investor"), v.literal("asset_owner"), v.literal("compatibility")),
    heardAbout: v.string(),
    dcLocation: v.optional(v.string()),
    facilitySizeMW: v.optional(v.string()),

    // Compatibility Score (optional - only for compatibility type)
    compatibilityScore: v.optional(v.object({
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
    })),

    // DC Owner Survey (optional - 14 questions across 6 sections)
    survey: v.optional(v.object({
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
    })),

    // Detailed Survey Scoring (top-level for easy querying)
    detailedQualityScore: v.optional(v.number()),
    detailedReadinessScore: v.optional(v.number()),
    detailedTotalScore: v.optional(v.number()),
    detailedTier: v.optional(v.string()),
    detailedConditionalFlags: v.optional(v.array(v.string())),

    // Investor Survey (optional - only for investor type)
    investorSurvey: v.optional(v.object({
      investorType: v.optional(v.string()),
      accreditationStatus: v.optional(v.string()),
      investmentRange: v.optional(v.string()),
      investmentTimeline: v.optional(v.string()),
      geographicPreference: v.optional(v.string()),
      priorDCExperience: v.optional(v.string()),
    })),

    // Pipeline tracking
    pipelineStep: v.optional(v.number()), // Current active step
    pipelineSteps: v.optional(v.object({
      // DC Owner steps
      visitedWebsite: v.optional(v.object({ completedAt: v.optional(v.string()) })),
      registeredInterest: v.optional(v.object({ completedAt: v.optional(v.string()) })),
      bookMeeting: v.optional(v.object({ completedAt: v.optional(v.string()) })),
      shareDCDetails: v.optional(v.object({ completedAt: v.optional(v.string()) })),
      haveMeeting: v.optional(v.object({ completedAt: v.optional(v.string()) })),
      confirmNextSteps: v.optional(v.object({ completedAt: v.optional(v.string()) })),
      shareFinancials: v.optional(v.object({ completedAt: v.optional(v.string()) })),
      prepareReport: v.optional(v.object({ completedAt: v.optional(v.string()) })),
      presentOffer: v.optional(v.object({ completedAt: v.optional(v.string()) })),
      dueDiligence: v.optional(v.object({ completedAt: v.optional(v.string()) })),
      loi: v.optional(v.object({ completedAt: v.optional(v.string()) })),
      closing: v.optional(v.object({ completedAt: v.optional(v.string()) })),
      // Compatibility steps
      compatAssessment: v.optional(v.object({ completedAt: v.optional(v.string()) })),
      compatViewScore: v.optional(v.object({ completedAt: v.optional(v.string()) })),
      compatShareDetails: v.optional(v.object({ completedAt: v.optional(v.string()) })),
      compatBookMeeting: v.optional(v.object({ completedAt: v.optional(v.string()) })),
      compatHaveMeeting: v.optional(v.object({ completedAt: v.optional(v.string()) })),
      // Investor steps
      investorRegisterInterest: v.optional(v.object({ completedAt: v.optional(v.string()) })),
      investorExploreMeeting: v.optional(v.object({ completedAt: v.optional(v.string()) })),
      investorRequestDetail: v.optional(v.object({ completedAt: v.optional(v.string()) })),
      investorExecuteSafe: v.optional(v.object({ completedAt: v.optional(v.string()) })),
      investorInvest: v.optional(v.object({ completedAt: v.optional(v.string()) })),
    })),

    // Metadata
    submittedAt: v.string(),
    status: v.optional(v.string()),
    ghlContactId: v.optional(v.string()),
    ghlOpportunityId: v.optional(v.string()),
  })
    .index("by_email", ["email"])
    .index("by_type", ["enquiryType"])
    .index("by_status", ["status"])
    .index("by_ghlContactId", ["ghlContactId"]),

  progressTokens: defineTable({
    token: v.string(),
    enquiryId: v.id("enquiries"),
    createdAt: v.string(),
  })
    .index("by_token", ["token"])
    .index("by_enquiry", ["enquiryId"]),
});
