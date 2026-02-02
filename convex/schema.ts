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

    // Metadata
    submittedAt: v.string(),
    status: v.optional(v.string()), // e.g., "new", "contacted", "qualified", "closed"
    ghlContactId: v.optional(v.string()), // GoHighLevel contact ID
  })
    .index("by_email", ["email"])
    .index("by_type", ["enquiryType"])
    .index("by_status", ["status"]),
});
