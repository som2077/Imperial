"use client";

import { useState } from "react";
import {
  TrendingUp,
  Users,
  Bot,
  ShieldCheck,
  Check,
  Copy,
  Terminal,
  Sparkles,
  Activity,
  Lock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HeroMockup() {
  const [activeTab, setActiveTab] = useState<"metrics" | "ai" | "audit">("metrics");
  const [copied, setCopied] = useState(false);

  const command = "git clone https://github.com/saas-starter-kit.git && npm run setup";

  function copyCommand() {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative mx-auto mt-12 w-full max-w-5xl">
      {/* Ambient background glow behind mockup */}
      <div className="from-primary/20 via-primary/5 pointer-events-none absolute -top-12 left-1/2 -z-10 h-72 w-3/4 -translate-x-1/2 rounded-full bg-gradient-to-b to-transparent opacity-70 blur-3xl" />

      {/* Terminal 1-Click Copy Pill */}
      <div className="border-border/80 bg-card/80 mx-auto mb-6 flex max-w-md items-center justify-between rounded-full border px-4 py-2 text-xs shadow-xs backdrop-blur-md">
        <div className="text-muted-foreground flex items-center gap-2 font-mono">
          <Terminal className="text-primary size-3.5 shrink-0" />
          <span className="truncate">npm run setup</span>
        </div>
        <button
          type="button"
          onClick={copyCommand}
          className="text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors"
          title="Copy setup command"
          aria-label="Copy setup command to clipboard"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-emerald-500" />
              <span className="font-medium text-emerald-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* MacOS Browser Frame */}
      <div className="border-border/80 bg-card/95 hover:border-primary/40 hover:shadow-primary/5 overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-xl transition-all duration-300">
        {/* Browser Top Bar */}
        <div className="border-border/60 bg-muted/40 flex h-11 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-rose-500/80" />
            <div className="size-3 rounded-full bg-amber-500/80" />
            <div className="size-3 rounded-full bg-emerald-500/80" />
          </div>

          {/* Mock URL bar */}
          <div className="border-border/60 bg-background/80 text-muted-foreground flex items-center gap-2 rounded-md border px-3 py-1 text-xs shadow-2xs">
            <Lock className="size-3 text-emerald-500" />
            <span className="font-mono text-[11px]">app.saas-starter.com/dashboard</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="flex size-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-muted-foreground hidden text-[11px] font-medium sm:inline">
              Live Production
            </span>
          </div>
        </div>

        {/* Dashboard Body Mockup */}
        <div className="p-4 sm:p-6">
          {/* Top greeting & tab switcher */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold tracking-tight text-balance sm:text-lg">
                Platform Overview
              </h3>
              <p className="text-muted-foreground text-xs text-pretty">
                Next.js 16 App Router • Supabase SSR • Drizzle ORM Live Pool
              </p>
            </div>

            <div className="border-border/60 bg-muted/40 flex items-center gap-1 rounded-lg border p-1 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("metrics")}
                className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                  activeTab === "metrics"
                    ? "bg-background text-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                KPI Metrics
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("ai")}
                className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                  activeTab === "ai"
                    ? "bg-background text-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                AI Copilot
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("audit")}
                className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                  activeTab === "audit"
                    ? "bg-background text-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Audit Trail
              </button>
            </div>
          </div>

          {/* 3 Metrics Cards */}
          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="border-border/60 bg-card rounded-xl border p-4 shadow-2xs">
              <div className="text-muted-foreground mb-2 flex items-center justify-between">
                <span className="text-xs font-medium">Monthly Revenue (MRR)</span>
                <TrendingUp className="size-4 text-emerald-500" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold tracking-tight tabular-nums">$14,850</span>
                <Badge
                  variant="outline"
                  className="border-emerald-500/20 bg-emerald-500/10 text-[10px] text-emerald-600 tabular-nums dark:text-emerald-400"
                >
                  +24.5% MoM
                </Badge>
              </div>
              <div className="bg-muted mt-2 h-1.5 w-full overflow-hidden rounded-full">
                <div className="h-full w-4/5 rounded-full bg-emerald-500" />
              </div>
            </div>

            <div className="border-border/60 bg-card rounded-xl border p-4 shadow-2xs">
              <div className="text-muted-foreground mb-2 flex items-center justify-between">
                <span className="text-xs font-medium">Active Subscribers</span>
                <Users className="text-primary size-4" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold tracking-tight tabular-nums">3,420</span>
                <Badge
                  variant="outline"
                  className="text-primary border-primary/20 bg-primary/10 text-[10px] tabular-nums"
                >
                  +18.2%
                </Badge>
              </div>
              <div className="bg-muted mt-2 h-1.5 w-full overflow-hidden rounded-full">
                <div className="bg-primary h-full w-2/3 rounded-full" />
              </div>
            </div>

            <div className="border-border/60 bg-card rounded-xl border p-4 shadow-2xs">
              <div className="text-muted-foreground mb-2 flex items-center justify-between">
                <span className="text-xs font-medium">AI Copilot Tokens</span>
                <Bot className="size-4 text-purple-500" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold tracking-tight tabular-nums">1.2M</span>
                <Badge
                  variant="outline"
                  className="border-purple-500/20 bg-purple-500/10 text-[10px] text-purple-600 tabular-nums dark:text-purple-400"
                >
                  99.9% Uptime
                </Badge>
              </div>
              <div className="bg-muted mt-2 h-1.5 w-full overflow-hidden rounded-full">
                <div className="h-full w-11/12 rounded-full bg-purple-500" />
              </div>
            </div>
          </div>

          {/* Interactive Dynamic Panel Based on Tab */}
          {activeTab === "metrics" && (
            <div className="border-border/60 bg-muted/20 rounded-xl border p-4">
              <div className="text-muted-foreground mb-3 flex items-center justify-between text-xs">
                <span className="text-foreground flex items-center gap-1.5 font-semibold">
                  <Activity className="text-primary size-3.5" /> Live Subscription & Webhook Stream
                </span>
                <span>Lemon Squeezy Sync: Active</span>
              </div>
              <div className="space-y-2">
                <div className="bg-card/80 border-border/40 flex items-center justify-between rounded-lg border p-2.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    <span className="font-medium">Acme Corp upgraded to Pro Builder</span>
                    <span className="text-muted-foreground text-[10px] tabular-nums">($29/mo)</span>
                  </div>
                  <span className="text-muted-foreground text-[10px] tabular-nums">
                    2 minutes ago
                  </span>
                </div>
                <div className="bg-card/80 border-border/40 flex items-center justify-between rounded-lg border p-2.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary size-2 rounded-full" />
                    <span className="font-medium">
                      Webhook delivery: subscription_payment_success
                    </span>
                    <span className="text-muted-foreground font-mono text-[10px] tabular-nums">
                      200 OK (84ms)
                    </span>
                  </div>
                  <span className="text-muted-foreground text-[10px] tabular-nums">
                    14 minutes ago
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "ai" && (
            <div className="border-border/60 bg-muted/20 rounded-xl border p-4">
              <div className="mb-3 flex items-center justify-between text-xs">
                <span className="text-foreground flex items-center gap-1.5 font-semibold">
                  <Bot className="text-primary size-3.5" /> Vercel AI SDK Tool Calling Copilot
                </span>
                <span className="text-muted-foreground font-mono">model: gpt-4o</span>
              </div>
              <div className="bg-card/90 border-border/40 space-y-2 rounded-lg border p-3 text-xs">
                <div className="text-muted-foreground flex items-center gap-2">
                  <span className="text-foreground font-semibold">User:</span>
                  <span className="text-pretty">
                    Calculate our net ARR forecast based on current customer churn rate.
                  </span>
                </div>
                <div className="bg-primary/5 border-primary/20 text-foreground rounded-md border p-2.5">
                  <div className="text-primary mb-1 flex items-center gap-1.5 text-[11px] font-semibold">
                    <Sparkles className="size-3" /> Tool Executed: calculateArrForecast(churn: 0.8%)
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed text-pretty">
                    Projected ARR is{" "}
                    <strong className="text-foreground tabular-nums">$178,200</strong> with a{" "}
                    <span className="tabular-nums">94.2%</span> annual retention rate. Feature
                    expansions in Enterprise tier account for{" "}
                    <span className="tabular-nums">+18%</span> net revenue retention.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "audit" && (
            <div className="border-border/60 bg-muted/20 rounded-xl border p-4">
              <div className="mb-3 flex items-center justify-between text-xs">
                <span className="text-foreground flex items-center gap-1.5 font-semibold">
                  <ShieldCheck className="size-3.5 text-emerald-500" /> Enterprise SOC2 Immutable
                  Audit Trail
                </span>
                <span className="text-muted-foreground">Real-Time IP & User-Agent</span>
              </div>
              <div className="space-y-2 font-mono text-[11px]">
                <div className="bg-card/80 border-border/40 flex items-center justify-between rounded-lg border p-2">
                  <span>auth.login &bull; Google OAuth Session Initialized</span>
                  <span className="text-emerald-500">IP: 192.168.1.1 (Verified)</span>
                </div>
                <div className="bg-card/80 border-border/40 flex items-center justify-between rounded-lg border p-2">
                  <span>api_key.create &bull; Generated sk_live_... for Team Pipeline</span>
                  <span className="text-primary">User: founder@startup.io</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
