import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

// Configurable LLM endpoint — works with Ollama, Groq, Together, OpenAI, etc.
const LLM_API_BASE = process.env.LLM_API_BASE || "http://localhost:11434/v1";
const LLM_API_KEY = process.env.LLM_API_KEY || "ollama"; // Ollama doesn't need a real key
const LLM_MODEL = process.env.LLM_MODEL || "gemma3";

// Cache the pipeline data summary (built once per cold start)
let pipelineContext: string | null = null;

function buildPipelineContext(): string {
  if (pipelineContext) return pipelineContext;

  try {
    const dataPath = join(process.cwd(), "data", "pipeline-data.json");
    const raw = JSON.parse(readFileSync(dataPath, "utf-8"));
    const features = raw.features || [];

    // Build a compact summary for the LLM context
    const stats = {
      total: features.length,
      active: features.filter((f: Record<string, unknown>) => f.status === "ACTIVE").length,
      disqualified: features.filter((f: Record<string, unknown>) => f.status === "DISQUALIFIED").length,
      needsReview: features.filter((f: Record<string, unknown>) => f.status === "NEEDS_REVIEW").length,
      unprocessed: features.filter((f: Record<string, unknown>) => f.status === "UNPROCESSED").length,
    };

    // Group by country
    const byCountry: Record<string, number> = {};
    features.forEach((f: Record<string, unknown>) => {
      const c = f.country as string;
      byCountry[c] = (byCountry[c] || 0) + 1;
    });

    // Build per-target summaries (compact format)
    const targetLines = features.map((f: Record<string, unknown>) => {
      const parts = [
        f.name,
        f.city,
        f.country,
        `L2:${f.layer2_score}`,
        `MW:${f.capacity_mw || f.estimated_capacity_mw || "?"}`,
        f.capacity_confident ? "verified" : "est",
        `status:${f.status}`,
        `risk:${f.succession_risk_label}`,
        `priority:${f.research_priority}`,
        `nets:${f.network_count}`,
        `ixs:${f.ix_count}`,
      ];
      if (f.l3_news_summary) parts.push(`news:"${f.l3_news_summary}"`);
      if (f.l3_founder_name_guess) parts.push(`founder:${f.l3_founder_name_guess}`);
      if (f.best_outreach_email || f.l4_primary_email) parts.push(`email:${f.l4_primary_email || f.best_outreach_email}`);
      if (f.inflect_mw) parts.push(`inflect_mw:${f.inflect_mw}`);
      if (f.inflect_tier) parts.push(`tier:${f.inflect_tier}`);
      if (f.domain_registrant_is_person === "Yes") parts.push("person_registrant");
      return parts.join(" | ");
    });

    pipelineContext = `GRIDLINE DC ACQUISITION PIPELINE DATA
====================================
Summary: ${stats.total} targets across ${Object.keys(byCountry).length} countries
Status: ${stats.active} ACTIVE, ${stats.disqualified} DISQUALIFIED, ${stats.needsReview} NEEDS_REVIEW, ${stats.unprocessed} UNPROCESSED
Countries: ${Object.entries(byCountry).sort((a, b) => b[1] - a[1]).map(([c, n]) => `${c}(${n})`).join(", ")}

FIELD DEFINITIONS:
- L2 = Layer 2 qualification score (0-10, higher = better acquisition target)
- MW = estimated power capacity in megawatts (sub-5MW is the sweet spot for GridLine)
- verified/est = whether MW is verified by Inflect data or estimated
- status = ACTIVE (passed news check), DISQUALIFIED (PE-backed/acquired/hyperscale), NEEDS_REVIEW, UNPROCESSED
- risk = succession risk (High/Medium/Low) — High means owner likely approaching exit
- priority = research priority from Layer 2 (HIGH/MEDIUM/LOW)
- nets/ixs = network count and internet exchange count (higher = more interconnected)
- person_registrant = domain WHOIS registered to a person (founder signal)
- news = Layer 3 news check summary
- founder = identified founder/owner name
- inflect_mw = Inflect-verified power capacity
- tier = data center tier rating

GridLine's thesis: acquire sub-5MW independently-operated data centers in APAC where the founder/owner is approaching succession. High L2 scores, person registrants, and sub-5MW verified capacity are the strongest signals.

ALL TARGETS:
${targetLines.join("\n")}`;

    return pipelineContext;
  } catch (e) {
    console.error("Failed to build pipeline context:", e);
    return "Pipeline data unavailable.";
  }
}

const SYSTEM_PROMPT = `You are GridLine's acquisition intelligence analyst. You have access to the full pipeline database of datacenter acquisition targets across APAC.

Your role:
- Help users identify priority acquisition targets based on their criteria
- Analyse patterns in the data (geographic clusters, scoring trends, succession signals)
- Recommend outreach strategies for specific targets
- Compare targets and explain trade-offs
- Surface hidden gems that might be overlooked

Guidelines:
- Be concise and direct — users are busy dealmakers
- When listing targets, include key metrics (L2 score, MW, country, status)
- Proactively highlight why a target is interesting (or risky)
- If asked about targets you have data on, reference specific facilities by name
- Format responses with markdown for readability (headers, bullet points, bold for emphasis)

PIPELINE DATA:
`;

export async function POST(request: NextRequest) {
  // Check auth
  const authCookie = request.cookies.get("gridline-auth");
  if (!authCookie?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages required" }, { status: 400 });
    }

    const context = buildPipelineContext();

    // Build the LLM request in OpenAI-compatible format
    const llmMessages = [
      { role: "system", content: SYSTEM_PROMPT + context },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    const response = await fetch(`${LLM_API_BASE}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LLM_API_KEY}`,
      },
      body: JSON.stringify({
        model: LLM_MODEL,
        messages: llmMessages,
        temperature: 0.3,
        max_tokens: 2048,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("LLM error:", response.status, errText);
      return NextResponse.json(
        { error: `LLM request failed (${response.status}). Check LLM_API_BASE and LLM_MODEL env vars.` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content || "No response generated.";

    return NextResponse.json({ content: assistantMessage });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
