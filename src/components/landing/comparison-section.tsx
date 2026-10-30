import { Check, Clock, ShieldCheck, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ComparisonSection() {
  const comparisonItems = [
    {
      feature: "Next.js 16 & React 19 Turbopack",
      us: true,
      fromScratch: "Days of config",
      paidKits: "Mostly Next 14/15",
    },
    {
      feature: "Supabase SSR Authentication & Multi-Tenancy",
      us: true,
      fromScratch: "30+ hours",
      paidKits: "Basic or Paid Add-on",
    },
    {
      feature: "Drizzle ORM (Zero Cold Starts)",
      us: true,
      fromScratch: "15+ hours",
      paidKits: "Prisma (High Cold Starts)",
    },
    {
      feature: "Lemon Squeezy Merchant of Record Billing",
      us: true,
      fromScratch: "25+ hours",
      paidKits: "Partial Webhook handling",
    },
    {
      feature: "Vercel AI SDK Copilot with Tool Calling",
      us: true,
      fromScratch: "20+ hours",
      paidKits: "Basic static prompt",
    },
    {
      feature: "Enterprise SOC2 Audit & Activity Logs",
      us: true,
      fromScratch: "15+ hours",
      paidKits: "Enterprise-only tier",
    },
    {
      feature: "Cloudinary CDN Signed Media & Transformations",
      us: true,
      fromScratch: "10+ hours",
      paidKits: "None",
    },
    {
      feature: "Automated Background Crons with GUI",
      us: true,
      fromScratch: "12+ hours",
      paidKits: "None",
    },
    {
      feature: "Interactive CLI Project Renamer",
      us: true,
      fromScratch: "Manual search/replace",
      paidKits: "None",
    },
    {
      feature: "Playwright E2E Suite (40/40 Passing)",
      us: true,
      fromScratch: "Weeks of QA",
      paidKits: "Minimal or None",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-24 sm:px-8">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <Badge variant="outline" className="border-primary/20 bg-primary/5 mb-3 gap-1.5">
          <Zap className="text-primary size-3.5" /> Stop Reinventing the Wheel
        </Badge>
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
          Build Your Product, Not Boilerplate
        </h2>
        <p className="text-muted-foreground text-base text-pretty">
          Save over <strong className="text-foreground tabular-nums">150+ hours</strong> of
          repetitive setup. See how our starter kit compares to other alternatives:
        </p>
      </div>

      <div className="border-border/80 bg-card mx-auto max-w-4xl overflow-hidden rounded-2xl border shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground border-border/60 border-b text-xs font-semibold tracking-wider uppercase">
              <tr>
                <th className="px-6 py-4">Feature / Capability</th>
                <th className="text-primary bg-primary/5 px-6 py-4 font-bold">Our Starter Kit</th>
                <th className="px-6 py-4">From Scratch</th>
                <th className="px-6 py-4">
                  Paid Kits (<span className="tabular-nums">$299+</span>)
                </th>
              </tr>
            </thead>
            <tbody className="divide-border/60 divide-y">
              {comparisonItems.map((item, index) => (
                <tr key={index} className="hover:bg-muted/20 transition-colors">
                  <td className="text-foreground px-6 py-4 font-medium">{item.feature}</td>
                  <td className="bg-primary/5 px-6 py-4 font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="flex items-center gap-1.5">
                      <Check className="size-4" /> Ready to Ship
                    </span>
                  </td>
                  <td className="text-muted-foreground px-6 py-4 tabular-nums">
                    {item.fromScratch}
                  </td>
                  <td className="text-muted-foreground px-6 py-4 tabular-nums">{item.paidKits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-muted/40 border-border/60 text-muted-foreground flex flex-col items-center justify-between gap-3 border-t p-4 px-6 text-center text-xs sm:flex-row">
          <span className="text-foreground flex items-center gap-1.5 font-medium">
            <Clock className="text-primary size-4" /> Estimated Time Saved:{" "}
            <strong className="tabular-nums">150+</strong> Engineering Hours
          </span>
          <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="size-4" /> 100% Free &amp; Open-Source (MIT License)
          </span>
        </div>
      </div>
    </section>
  );
}
