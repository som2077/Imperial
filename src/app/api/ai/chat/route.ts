import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";
import { rateLimit, rateLimitExceededResponse, getClientIp } from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_MODELS = ["gpt-4o-mini", "gpt-4o"];

export async function POST(req: Request) {
  try {
    // 1. Enforce authentication for AI Studio route
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new Response(
        JSON.stringify({
          error: "Unauthorized. Please sign in to access AI Studio.",
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Enforce 10 requests per minute per IP to protect OpenAI API balance
    const ip = getClientIp(req);
    const limitResult = rateLimit({
      key: `ai_chat:${user.id || ip}`,
      limit: 10,
      windowSeconds: 60,
    });

    if (!limitResult.success) {
      return rateLimitExceededResponse(limitResult);
    }

    const { messages, modelId = "gpt-4o-mini" } = await req.json();

    // 3. Validate model against allowlist to prevent arbitrary model injection
    const safeModelId = ALLOWED_MODELS.includes(modelId) ? modelId : "gpt-4o-mini";

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey.includes("placeholder") || apiKey.includes("your-openai")) {
      return new Response(
        JSON.stringify({
          error: "OPENAI_API_KEY is not configured or is a placeholder in .env.local",
        }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = streamText({
      model: openai(safeModelId),
      system:
        "You are an intelligent AI assistant built into this modern SaaS starter kit. " +
        "You help users build, scale, and understand their application. " +
        "When appropriate, call your available tools to display interactive metrics or pricing recommendations.",
      messages,
      tools: {
        getSaaSMetrics: tool({
          description:
            "Fetch real-time SaaS metrics including MRR, subscriber count, and churn rate.",
          inputSchema: z.object({}),
          execute: async () => ({
            mrr: 14820,
            activeUsers: 842,
            churnRate: "1.4%",
            growth: "+28.4% MoM",
          }),
        }),
        recommendPricing: tool({
          description: "Generate a tailored SaaS pricing tier recommendation.",
          inputSchema: z.object({
            tier: z.enum(["starter", "pro", "enterprise"]).default("pro"),
          }),
          execute: async ({ tier }: { tier: "starter" | "pro" | "enterprise" }) => {
            if (tier === "pro") {
              return {
                planName: "Pro Builder",
                price: 29,
                features: [
                  "Unlimited projects",
                  "50,000 active users",
                  "Supabase Storage S3 bucket",
                  "Priority Resend email delivery",
                ],
              };
            }
            return {
              planName: "Enterprise",
              price: 99,
              features: [
                "Dedicated connection pooler",
                "Custom Lemon Squeezy contracts",
                "24/7 SLA priority support",
              ],
            };
          },
        }),
      },
    });

    return result.toTextStreamResponse();
  } catch (error: unknown) {
    console.error("AI route error:", error);
    const message = error instanceof Error ? error.message : "Failed to process AI request";
    return new Response(
      JSON.stringify({
        error: message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
