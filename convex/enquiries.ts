import { mutation, query, action, internalAction } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { internal } from "./_generated/api";

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
    dcLocation: v.optional(v.string()),
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
    dcLocation: v.optional(v.string()),
    progressUrl: v.optional(v.string()),
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
        { key: "contact.dc_location", field_value: args.dcLocation || "" },
        { key: "contact.progress_url", field_value: args.progressUrl || "" },
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

// Store a progress token and set initial pipeline state + schedule GHL sync
export const storeProgressToken = mutation({
  args: {
    token: v.string(),
    enquiryId: v.id("enquiries"),
    // Contact info for GHL sync
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    companyName: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
    heardAbout: v.optional(v.string()),
    dcLocation: v.optional(v.string()),
    progressUrl: v.optional(v.string()),
    pipelineId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("progressTokens", {
      token: args.token,
      enquiryId: args.enquiryId,
      createdAt: new Date().toISOString(),
    });

    // Set initial pipeline state — steps 1 + 2 auto-completed
    await ctx.db.patch(args.enquiryId, {
      pipelineStep: 3,
      pipelineSteps: {
        visitedWebsite: { completedAt: new Date().toISOString() },
        registeredInterest: { completedAt: new Date().toISOString() },
      },
    });

    // Schedule GHL sync server-side (runs even after client navigates away)
    if (args.name && args.email && args.companyName && args.heardAbout && args.progressUrl && args.pipelineId) {
      await ctx.scheduler.runAfter(0, internal.enquiries.syncToGHL, {
        enquiryId: args.enquiryId,
        name: args.name,
        email: args.email,
        companyName: args.companyName,
        phoneNumber: args.phoneNumber,
        enquiryType: "asset_owner",
        heardAbout: args.heardAbout,
        dcLocation: args.dcLocation,
        progressUrl: args.progressUrl,
        pipelineId: args.pipelineId,
      });
    }
  },
});

// Submit contact info (step 1) - creates contact in GHL, saves to DB, generates progress token
export const submitContactInfo = action({
  args: {
    name: v.string(),
    email: v.string(),
    companyName: v.string(),
    phoneNumber: v.optional(v.string()),
    enquiryType: v.union(v.literal("investor"), v.literal("asset_owner")),
    heardAbout: v.string(),
    dcLocation: v.optional(v.string()),
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
      dcLocation: args.dcLocation,
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

// Update enquiry with GHL opportunity ID
export const updateGhlOpportunityId = mutation({
  args: {
    id: v.id("enquiries"),
    ghlOpportunityId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { ghlOpportunityId: args.ghlOpportunityId });
  },
});

// Create opportunity in GHL via API
export const createGHLOpportunity = action({
  args: {
    contactId: v.string(),
    pipelineId: v.string(), // investor or DC owner pipeline
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.GHL_API_KEY;

    if (!apiKey) {
      console.log("GHL_API_KEY not configured, skipping opportunity creation");
      return { success: false, reason: "api_key_not_configured", opportunityId: null };
    }

    try {
      // Fetch pipeline stages to get the first stage ID
      const pipelineRes = await fetch(`${GHL_API_BASE}/opportunities/pipelines/${args.pipelineId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Version": "2021-07-28",
        },
      });

      if (!pipelineRes.ok) {
        const errData = await pipelineRes.json();
        console.error("GHL fetch pipeline failed:", pipelineRes.status, errData);
        return { success: false, reason: "pipeline_fetch_failed", opportunityId: null };
      }

      const pipelineData = await pipelineRes.json();
      const stages = pipelineData.pipeline?.stages || pipelineData.stages || [];
      const firstStageId = stages[0]?.id;

      if (!firstStageId) {
        console.error("No stages found for pipeline:", args.pipelineId);
        return { success: false, reason: "no_stages_found", opportunityId: null };
      }

      // Create the opportunity
      const oppPayload = {
        pipelineId: args.pipelineId,
        locationId: GHL_LOCATION_ID,
        name: `${args.name} – ${args.email}`,
        pipelineStageId: firstStageId,
        contactId: args.contactId,
      };

      const oppRes = await fetch(`${GHL_API_BASE}/opportunities/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "Version": "2021-07-28",
        },
        body: JSON.stringify(oppPayload),
      });

      const oppData = await oppRes.json();

      if (!oppRes.ok) {
        console.error("GHL create opportunity failed:", oppRes.status, oppData);
        return { success: false, reason: "opp_create_failed", opportunityId: null };
      }

      console.log("GHL opportunity created:", oppData.opportunity?.id);
      return { success: true, opportunityId: oppData.opportunity?.id || null };
    } catch (error) {
      console.error("GHL create opportunity error:", error);
      return { success: false, reason: "network_error", opportunityId: null };
    }
  },
});

// Update contact in GHL with investor survey data
export const updateGHLContactInvestorSurvey = action({
  args: {
    contactId: v.string(),
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
    const apiKey = process.env.GHL_API_KEY;

    if (!apiKey) {
      console.log("GHL_API_KEY not configured, skipping investor survey update");
      return { success: false, reason: "api_key_not_configured" };
    }

    const customFields = [
      { key: "contact.investor_type", field_value: args.investorSurvey.investorType || "" },
      { key: "contact.accreditation_status", field_value: args.investorSurvey.accreditationStatus || "" },
      { key: "contact.investment_range", field_value: args.investorSurvey.investmentRange || "" },
      { key: "contact.investment_timeline", field_value: args.investorSurvey.investmentTimeline || "" },
      { key: "contact.geographic_preference", field_value: args.investorSurvey.geographicPreference || "" },
      { key: "contact.prior_dc_experience", field_value: args.investorSurvey.priorDCExperience || "" },
    ];

    try {
      const response = await fetch(`${GHL_API_BASE}/contacts/${args.contactId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "Version": "2021-07-28",
        },
        body: JSON.stringify({ customFields }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("GHL update investor survey failed:", response.status, data);
        return { success: false, reason: "api_failed", status: response.status };
      }

      console.log("GHL contact updated with investor survey:", args.contactId);
      return { success: true };
    } catch (error) {
      console.error("GHL update investor survey error:", error);
      return { success: false, reason: "network_error" };
    }
  },
});

// Store a progress token and set initial investor pipeline state + schedule GHL sync
export const storeInvestorProgressToken = mutation({
  args: {
    token: v.string(),
    enquiryId: v.id("enquiries"),
    // Contact info for GHL sync
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    companyName: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
    heardAbout: v.optional(v.string()),
    progressUrl: v.optional(v.string()),
    pipelineId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("progressTokens", {
      token: args.token,
      enquiryId: args.enquiryId,
      createdAt: new Date().toISOString(),
    });

    // Set initial investor pipeline state — step 1 auto-completed, starts at step 2
    await ctx.db.patch(args.enquiryId, {
      pipelineStep: 2,
      pipelineSteps: {
        investorRegisterInterest: { completedAt: new Date().toISOString() },
      },
    });

    // Schedule GHL sync server-side
    if (args.name && args.email && args.companyName && args.heardAbout && args.progressUrl && args.pipelineId) {
      await ctx.scheduler.runAfter(0, internal.enquiries.syncToGHL, {
        enquiryId: args.enquiryId,
        name: args.name,
        email: args.email,
        companyName: args.companyName,
        phoneNumber: args.phoneNumber,
        enquiryType: "investor",
        heardAbout: args.heardAbout,
        progressUrl: args.progressUrl,
        pipelineId: args.pipelineId,
      });
    }
  },
});

// Server-side GHL sync — scheduled from mutations so it runs even after client navigates away
export const syncToGHL = internalAction({
  args: {
    enquiryId: v.id("enquiries"),
    name: v.string(),
    email: v.string(),
    companyName: v.string(),
    phoneNumber: v.optional(v.string()),
    enquiryType: v.string(),
    heardAbout: v.string(),
    dcLocation: v.optional(v.string()),
    progressUrl: v.string(),
    pipelineId: v.string(),
  },
  handler: async (ctx, args) => {
    // Step 1: Create GHL contact
    const ghlResult = await ctx.runAction(api.enquiries.createGHLContact, {
      name: args.name,
      email: args.email,
      companyName: args.companyName,
      phoneNumber: args.phoneNumber,
      enquiryType: args.enquiryType,
      heardAbout: args.heardAbout,
      dcLocation: args.dcLocation,
      progressUrl: args.progressUrl,
      submittedAt: new Date().toISOString(),
    });

    if (!ghlResult.contactId) {
      console.error("syncToGHL: Failed to create contact, skipping opportunity creation");
      return;
    }

    // Store GHL contact ID
    await ctx.runMutation(api.enquiries.updateGhlContactId, {
      id: args.enquiryId,
      ghlContactId: ghlResult.contactId,
    });

    // Step 2: Create GHL opportunity
    const oppResult = await ctx.runAction(api.enquiries.createGHLOpportunity, {
      contactId: ghlResult.contactId,
      pipelineId: args.pipelineId,
      name: args.name,
      email: args.email,
    });

    if (oppResult.opportunityId) {
      await ctx.runMutation(api.enquiries.updateGhlOpportunityId, {
        id: args.enquiryId,
        ghlOpportunityId: oppResult.opportunityId,
      });
    }

    console.log("syncToGHL: Complete for", args.email, "contact:", ghlResult.contactId, "opp:", oppResult.opportunityId);
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
    dcLocation: v.optional(v.string()),
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
      dcLocation: args.dcLocation,
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
