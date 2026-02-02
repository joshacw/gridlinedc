import { mutation, query, action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_LOCATION_ID = "pDeHDxXRGXbQ8RnErHWV";

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
    ghlContactId: v.optional(v.string()),
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

// Update enquiry with GHL contact ID
export const updateGhlContactId = mutation({
  args: {
    id: v.id("enquiries"),
    ghlContactId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { ghlContactId: args.ghlContactId });
  },
});

// Create contact in GHL via API
export const createGHLContact = action({
  args: {
    name: v.string(),
    email: v.string(),
    companyName: v.string(),
    phoneNumber: v.optional(v.string()),
    enquiryType: v.string(),
    heardAbout: v.string(),
    submittedAt: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.GHL_API_KEY;

    if (!apiKey) {
      console.log("GHL_API_KEY not configured, skipping contact creation");
      return { success: false, reason: "api_key_not_configured", contactId: null };
    }

    // Split name into first and last name
    const nameParts = args.name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const payload = {
      firstName,
      lastName,
      email: args.email,
      phone: args.phoneNumber || "",
      companyName: args.companyName,
      locationId: GHL_LOCATION_ID,
      customFields: [
        { key: "contact.enquiry_type", field_value: args.enquiryType },
        { key: "contact.heard_about", field_value: args.heardAbout },
      ],
    };

    try {
      const response = await fetch(`${GHL_API_BASE}/contacts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "Version": "2021-07-28",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("GHL create contact failed:", response.status, data);
        return { success: false, reason: "api_failed", status: response.status, contactId: null };
      }

      console.log("GHL contact created:", data.contact?.id);
      return { success: true, contactId: data.contact?.id || null };
    } catch (error) {
      console.error("GHL create contact error:", error);
      return { success: false, reason: "network_error", contactId: null };
    }
  },
});

// Update contact in GHL with survey data
export const updateGHLContactSurvey = action({
  args: {
    contactId: v.string(),
    survey: v.object({
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
    }),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.GHL_API_KEY;

    if (!apiKey) {
      console.log("GHL_API_KEY not configured, skipping contact update");
      return { success: false, reason: "api_key_not_configured" };
    }

    // Build custom fields array for survey data
    const customFields = [
      { key: "contact.dc_ownership_structure", field_value: args.survey.ownershipStructure || "" },
      { key: "contact.dc_current_power_utilisation", field_value: args.survey.currentPowerUtilisation || "" },
      { key: "contact.dc_power_scalability", field_value: args.survey.powerScalability || "" },
      { key: "contact.dc_customer_base", field_value: args.survey.customerBase || "" },
      { key: "contact.dc_customer_concentration", field_value: args.survey.customerConcentration || "" },
      { key: "contact.dc_contract_tenure", field_value: args.survey.contractTenure || "" },
      { key: "contact.dc_anchor_tenants", field_value: args.survey.anchorTenants || "" },
      { key: "contact.dc_network_connectivity", field_value: args.survey.networkConnectivity || "" },
      { key: "contact.dc_annual_revenue", field_value: args.survey.annualRevenue || "" },
      { key: "contact.dc_ebitda_range", field_value: args.survey.ebitdaRange || "" },
      { key: "contact.dc_capital_outlook", field_value: args.survey.capitalOutlook || "" },
    ];

    const payload = {
      customFields,
    };

    try {
      const response = await fetch(`${GHL_API_BASE}/contacts/${args.contactId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "Version": "2021-07-28",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("GHL update contact failed:", response.status, data);
        return { success: false, reason: "api_failed", status: response.status };
      }

      console.log("GHL contact updated with survey data:", args.contactId);
      return { success: true };
    } catch (error) {
      console.error("GHL update contact error:", error);
      return { success: false, reason: "network_error" };
    }
  },
});

// Submit contact info (step 1) - creates contact in GHL and saves to DB
export const submitContactInfo = action({
  args: {
    name: v.string(),
    email: v.string(),
    companyName: v.string(),
    phoneNumber: v.optional(v.string()),
    enquiryType: v.union(v.literal("investor"), v.literal("asset_owner")),
    heardAbout: v.string(),
    submittedAt: v.string(),
  },
  handler: async (ctx, args): Promise<{ enquiryId: string; ghlContactId: string | null; ghlSuccess: boolean }> => {
    // Create contact in GHL first
    const ghlResult: { success: boolean; contactId: string | null } = await ctx.runAction(api.enquiries.createGHLContact, {
      name: args.name,
      email: args.email,
      companyName: args.companyName,
      phoneNumber: args.phoneNumber,
      enquiryType: args.enquiryType,
      heardAbout: args.heardAbout,
      submittedAt: args.submittedAt,
    });

    // Save to database with GHL contact ID
    const enquiryId: string = await ctx.runMutation(api.enquiries.submit, {
      ...args,
      ghlContactId: ghlResult.contactId || undefined,
    });

    return {
      enquiryId,
      ghlContactId: ghlResult.contactId,
      ghlSuccess: ghlResult.success,
    };
  },
});

// Submit survey data (step 2) - updates contact in GHL and saves to DB
export const submitSurvey = action({
  args: {
    enquiryId: v.id("enquiries"),
    ghlContactId: v.string(),
    survey: v.object({
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
    }),
  },
  handler: async (ctx, args): Promise<{ success: boolean; ghlSuccess: boolean }> => {
    // Update contact in GHL with survey data
    const ghlResult: { success: boolean } = await ctx.runAction(api.enquiries.updateGHLContactSurvey, {
      contactId: args.ghlContactId,
      survey: args.survey,
    });

    // Update the enquiry in the database with survey data
    // Note: We'll need a mutation to update survey data
    // For now, just return the GHL result
    return {
      success: ghlResult.success,
      ghlSuccess: ghlResult.success,
    };
  },
});

// Legacy: Combined submit that saves to DB and sends to GHL (kept for backwards compatibility)
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
  handler: async (ctx, args): Promise<string> => {
    // Use the new two-step flow
    const contactResult: { enquiryId: string; ghlContactId: string | null; ghlSuccess: boolean } = await ctx.runAction(api.enquiries.submitContactInfo, {
      name: args.name,
      email: args.email,
      companyName: args.companyName,
      phoneNumber: args.phoneNumber,
      enquiryType: args.enquiryType,
      heardAbout: args.heardAbout,
      submittedAt: args.submittedAt,
    });

    // If it's an asset_owner with survey data, update the contact
    if (args.enquiryType === "asset_owner" && args.survey && contactResult.ghlContactId) {
      await ctx.runAction(api.enquiries.updateGHLContactSurvey, {
        contactId: contactResult.ghlContactId,
        survey: args.survey,
      });
    }

    return contactResult.enquiryId;
  },
});
