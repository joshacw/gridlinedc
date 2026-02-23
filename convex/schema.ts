import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  enquiries: defineTable({
    // Contact Information
    name: v.string(),
    email: v.string(),
    companyName: v.string(),
    phoneNumber: v.optional(v.string()),
    enquiryType: v.union(v.literal("investor"), v.literal("asset_owner")),
    heardAbout: v.string(),

    // DC Owner Survey (optional - only for asset_owner type)
    survey: v.optional(v.object({
      ownershipStructure: v.optional(v.string()),
      currentPowerUtilisation: v.optional(v.string()),
      powerScalability: v.optional(v.string()),
      customerBase: v.optional(v.string()),
      customerConcentration: v.optional(v.string()),
      contractTenure: v.optional(v.string()),
      anchorTenants: v.optional(v.string()),
      networkConnectivity: v.optional(v.string()),
      annualRevenue: v.optional(v.string()),
      ebitdaRange: v.optional(v.string()),
      capitalOutlook: v.optional(v.string()),
    })),

    // Pipeline tracking
    pipelineStep: v.optional(v.number()), // Current active step (1-12)
    pipelineSteps: v.optional(v.object({
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
    })),

    // Metadata
    submittedAt: v.string(),
    status: v.optional(v.string()),
    ghlContactId: v.optional(v.string()),
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
