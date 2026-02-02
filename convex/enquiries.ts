import { mutation, query, action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

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

// Action to send webhook to GoHighLevel
export const sendToGHL = action({
  args: {
    name: v.string(),
    email: v.string(),
    companyName: v.string(),
    phoneNumber: v.optional(v.string()),
    enquiryType: v.string(),
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
    const webhookUrl = process.env.GHL_WEBHOOK_URL;

    if (!webhookUrl) {
      console.log("GHL_WEBHOOK_URL not configured, skipping webhook");
      return { success: false, reason: "webhook_not_configured" };
    }

    // Flatten survey fields for GHL custom fields
    const payload = {
      // Contact fields
      name: args.name,
      email: args.email,
      company_name: args.companyName,
      phone: args.phoneNumber || "",

      // Custom fields
      enquiry_type: args.enquiryType,
      heard_about: args.heardAbout,
      submitted_at: args.submittedAt,

      // DC Owner Survey fields (prefixed for clarity)
      dc_ownership_structure: args.survey?.ownershipStructure || "",
      dc_current_power_utilisation: args.survey?.currentPowerUtilisation || "",
      dc_power_scalability: args.survey?.powerScalability || "",
      dc_customer_base: args.survey?.customerBase || "",
      dc_customer_concentration: args.survey?.customerConcentration || "",
      dc_contract_tenure: args.survey?.contractTenure || "",
      dc_anchor_tenants: args.survey?.anchorTenants || "",
      dc_network_connectivity: args.survey?.networkConnectivity || "",
      dc_annual_revenue: args.survey?.annualRevenue || "",
      dc_ebitda_range: args.survey?.ebitdaRange || "",
      dc_capital_outlook: args.survey?.capitalOutlook || "",
    };

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error("GHL webhook failed:", response.status, await response.text());
        return { success: false, reason: "webhook_failed", status: response.status };
      }

      return { success: true };
    } catch (error) {
      console.error("GHL webhook error:", error);
      return { success: false, reason: "network_error" };
    }
  },
});

// Combined submit that saves to DB and sends to GHL
export const submitWithWebhook = action({
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
    // Save to database
    const enquiryId = await ctx.runMutation(api.enquiries.submit, args);

    // Send to GHL webhook (fire and forget - don't block on failure)
    ctx.runAction(api.enquiries.sendToGHL, {
      ...args,
      enquiryType: args.enquiryType,
    }).catch((error) => {
      console.error("Failed to send to GHL:", error);
    });

    return enquiryId;
  },
});
