"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Code2, Copy, Check } from "lucide-react";

interface CodeSnippet {
  id: string;
  label: string;
  filename: string;
  code: string;
}

const SNIPPETS: CodeSnippet[] = [
  {
    id: "action",
    label: "Server Action",
    filename: "src/server/actions/team.ts",
    code: `"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { organizations, organizationMembers } from "@/db/schema";
import { logActivityAction } from "@/server/actions/activity";
import { revalidatePath } from "next/cache";

export async function createOrganizationAction(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const name = formData.get("name") as string;
  const [org] = await db.insert(organizations).values({ name, ownerId: user.id }).returning();

  await logActivityAction({
    action: "team.create",
    entityType: "organization",
    entityId: org.id,
    description: \`Created organization \${name}\`,
  });

  revalidatePath("/dashboard/team");
  return { success: true, data: org };
}`,
  },
  {
    id: "schema",
    label: "Drizzle Schema",
    filename: "src/db/schema.ts",
    code: `import { pgTable, text, uuid, timestamp, jsonb, index } from "drizzle-orm/pg-core";

export const activityLogs = pgTable(
  "activity_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull(),
    organizationId: uuid("organization_id"),
    action: text("action").notNull(),
    entityType: text("entity_type").notNull(),
    description: text("description").notNull(),
    ipAddress: text("ip_address"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_activity_logs_user_id").on(table.userId),
    index("idx_activity_logs_created_at").on(table.createdAt),
  ]
);`,
  },
  {
    id: "ai",
    label: "AI Tool Calling",
    filename: "src/app/api/ai/chat/route.ts",
    code: `import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const { messages } = await req.json();

  return streamText({
    model: openai("gpt-4o"),
    system: "You are the autonomous AI assistant for our SaaS platform.",
    messages,
    tools: {
      getRevenueMetrics: tool({
        description: "Fetch live MRR, Churn rate, and Net ARR metrics",
        parameters: z.object({ timeframe: z.enum(["month", "quarter", "year"]) }),
        execute: async ({ timeframe }) => fetchLiveDbMetrics(timeframe),
      }),
    },
  }).toDataStreamResponse();
}`,
  },
  {
    id: "rename",
    label: "CLI Rebranding",
    filename: "scripts/rename-project.ts",
    code: `// Fast 1-click project rebranding across entire codebase
// Run interactively or pass automated CI flags:
// $ npm run rename -- --name "Apex AI" --short "Apex" -y

const modified = await rebrandProject({
  name: "Apex AI",
  shortName: "Apex",
  slug: "apex-ai",
  description: "Next-gen intelligent SaaS workspace",
  supportEmail: "support@apexai.io",
});

console.log(\`✓ Rebranded \${modified.length} configuration and i18n files!\`);`,
  },
];

export function CodeShowcase() {
  const [activeId, setActiveId] = useState("action");
  const [copied, setCopied] = useState(false);

  const activeSnippet = SNIPPETS.find((s) => s.id === activeId) || SNIPPETS[0];

  function handleCopy() {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="architecture" className="bg-muted/30 border-t py-24">
      <div className="container mx-auto max-w-5xl px-4 sm:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="outline" className="mb-3 gap-1">
            <Code2 className="text-primary size-3.5" /> Clean Developer Experience
          </Badge>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            Type-Safe Architecture From Day One
          </h2>
          <p className="text-muted-foreground text-base text-pretty">
            No messy spaghettis. Every Server Action, ORM query, and AI tool call is strictly typed
            with TypeScript.
          </p>
        </div>

        {/* Code Window Container */}
        <div className="border-border/80 overflow-hidden rounded-2xl border bg-zinc-950 text-zinc-100 shadow-2xl">
          {/* Top Tab Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 py-2.5">
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {SNIPPETS.map((snippet) => (
                <button
                  key={snippet.id}
                  type="button"
                  onClick={() => setActiveId(snippet.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    activeId === snippet.id
                      ? "bg-zinc-800 text-zinc-100 shadow-xs"
                      : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                  }`}
                >
                  {snippet.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span className="hidden font-mono text-[11px] sm:inline">
                {activeSnippet.filename}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
                title="Copy snippet"
                aria-label="Copy code snippet to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-emerald-400" />
                    <span className="font-medium text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Syntax Highlighted Code Box */}
          <div className="selection:bg-primary/30 overflow-x-auto p-5 font-mono text-xs leading-relaxed text-zinc-200">
            <pre>
              <code>{activeSnippet.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
