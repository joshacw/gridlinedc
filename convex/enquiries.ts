import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    companyName: v.string(),
    phoneNumber: v.optional(v.string()),
    enquiryType: v.union(v.literal("investor"), v.literal("asset_owner")),
    heardAbout: v.string(),
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
    submittedAt: v.string(),
  },
  handler: async (ctx, args) => {
    const enquiryId = await ctx.db.insert("enquiries", {
      ...args,
      status: "new",
    });
    return enquiryId;
  },
});

export const list = query({
  args: {
    enquiryType: v.optional(v.union(v.literal("investor"), v.literal("asset_owner"))),
  },
  handler: async (ctx, args) => {
    if (args.enquiryType) {
      return await ctx.db
        .query("enquiries")
        .withIndex("by_type", (q) => q.eq("enquiryType", args.enquiryType!))
        .order("desc")
        .collect();
    }
    return await ctx.db.query("enquiries").order("desc").collect();
  },
});

export const getById = query({
  args: { id: v.id("enquiries") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("enquiries"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});
