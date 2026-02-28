import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

// GHL pipeline stage webhook
http.route({
  path: "/webhooks/ghl-pipeline",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    // Optional: validate webhook secret
    const secret = request.headers.get("x-webhook-secret");
    const expectedSecret = process.env.GHL_WEBHOOK_SECRET;
    if (expectedSecret && secret !== expectedSecret) {
      return new Response("Unauthorized", { status: 401 });
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }

    const contactId = body.contactId as string | undefined;
    const pipelineStage = body.pipelineStage as string | undefined;

    if (!contactId || !pipelineStage) {
      return new Response("Missing contactId or pipelineStage", { status: 400 });
    }

    // Map GHL pipeline stage names to step numbers and keys
    const STAGE_MAP: Record<string, { step: number; key: string }> = {
      // DC Owner pipeline stages
      "Have Meeting": { step: 5, key: "haveMeeting" },
      "Confirm Next Steps": { step: 6, key: "confirmNextSteps" },
      "Share Financials": { step: 7, key: "shareFinancials" },
      "Prepare Report": { step: 8, key: "prepareReport" },
      "Present Offer": { step: 9, key: "presentOffer" },
      "Due Diligence": { step: 10, key: "dueDiligence" },
      "LOI": { step: 11, key: "loi" },
      "Closing": { step: 12, key: "closing" },
      // Investor pipeline stages
      "Explore Opportunity": { step: 2, key: "investorExploreMeeting" },
      "Request Offer Detail": { step: 3, key: "investorRequestDetail" },
      "Execute SAFE": { step: 4, key: "investorExecuteSafe" },
      "Invest": { step: 5, key: "investorInvest" },
    };

    const stageInfo = STAGE_MAP[pipelineStage];
    if (!stageInfo) {
      console.warn("Unknown GHL pipeline stage:", pipelineStage);
      return new Response("Unknown pipeline stage", { status: 400 });
    }

    try {
      await ctx.runMutation(api.progress.updateStepFromWebhook, {
        ghlContactId: contactId,
        stepNumber: stageInfo.step,
        stepKey: stageInfo.key,
      });
      return new Response("OK", { status: 200 });
    } catch (error) {
      console.error("Webhook handler error:", error);
      return new Response("Internal error", { status: 500 });
    }
  }),
});

export default http;
