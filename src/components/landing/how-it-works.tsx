import { Terminal, Database, Rocket, Sparkles, Check, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Clone & 1-Click Rebrand",
      command: "npm run setup && npm run rename",
      description:
        "Run the interactive CLI wizard. It updates your app name, company details, support emails, and localized copy across all 5 i18n dictionaries in seconds.",
      terminalOutput: [
        { text: "$ npm run rename --name 'Apex AI'", type: "cmd" },
        { text: "✓ Updated site configuration (site.ts)", type: "success" },
        { text: "✓ Synchronized 5 language dictionaries", type: "success" },
        { text: "✓ Rebrand complete in 120ms", type: "accent" },
      ],
      icon: Terminal,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
    },
    {
      step: "02",
      title: "Sync PostgreSQL Database",
      command: "npm run db:push",
      description:
        "Drizzle ORM immediately synchronizes users, teams, subscriptions, and audit log tables into your Supabase PostgreSQL database with zero migration lag.",
      terminalOutput: [
        { text: "$ npm run db:push", type: "cmd" },
        { text: "✓ Connected to PostgreSQL connection pool", type: "success" },
        { text: "✓ Applied schema: users, orgs, audit_logs", type: "success" },
        { text: "✓ Drizzle Studio ready on :4983", type: "accent" },
      ],
      icon: Database,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      step: "03",
      title: "Deploy & Accept Payments",
      command: "git push origin main",
      description:
        "Deploy to Vercel, Railway, or Coolify in 1-click. Lemon Squeezy Merchant of Record handles global billing, tax compliance, and automated webhooks.",
      terminalOutput: [
        { text: "$ vercel --prod", type: "cmd" },
        { text: "✓ Built Next.js 16 App Router in 14s", type: "success" },
        { text: "✓ Production URL: app.yourdomain.com", type: "success" },
        { text: "✓ Lemon Squeezy Webhooks 200 OK", type: "accent" },
      ],
      icon: Rocket,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
  ];

  return (
    <section className="bg-muted/10 border-border/60 relative overflow-hidden border-b py-24">
      {/* Background radial accent */}
      <div className="from-primary/10 pointer-events-none absolute top-1/2 left-1/2 -z-10 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr via-transparent to-transparent opacity-60 blur-3xl" />

      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 mb-3 gap-1.5">
            <Sparkles className="text-primary size-3.5" /> 3-Step Launch Architecture
          </Badge>
          <h2 className="text-foreground mb-4 text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">
            From Git Clone to Production in Minutes
          </h2>
          <p className="text-muted-foreground text-base text-pretty sm:text-lg">
            Stop spending 3 weeks stitching authentication, ORMs, and Stripe webhooks. Follow our
            proven 3-step path to ship your SaaS MVP today.
          </p>
        </div>

        {/* 3 Step Flow Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group border-border/80 bg-card hover:border-primary/40 relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 shadow-2xs transition-all duration-300 hover:shadow-lg"
              >
                <div>
                  {/* Step Header */}
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-muted-foreground font-mono text-xs font-bold tracking-widest uppercase">
                      Step {item.step}
                    </span>
                    <div
                      className={`flex size-10 items-center justify-center rounded-xl ${item.bg} ${item.color}`}
                    >
                      <Icon className="size-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-foreground mb-2 text-xl font-bold tracking-tight text-balance">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed text-pretty">
                    {item.description}
                  </p>
                </div>

                {/* Mini Terminal / Output Preview */}
                <div className="border-border/60 rounded-xl border bg-zinc-950 p-3.5 font-mono text-[11px] text-zinc-300 shadow-inner">
                  <div className="mb-2 flex items-center justify-between border-b border-zinc-800 pb-2 text-[10px] text-zinc-500">
                    <span className="truncate">{item.command}</span>
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="space-y-1">
                    {item.terminalOutput.map((line, lIdx) => (
                      <div
                        key={lIdx}
                        className={`truncate ${
                          line.type === "cmd"
                            ? "font-semibold text-zinc-400"
                            : line.type === "accent"
                              ? "font-medium text-emerald-400"
                              : "text-zinc-300"
                        }`}
                      >
                        {line.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Fast Track Banner */}
        <div className="border-border/60 bg-card/60 mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border p-6 text-center backdrop-blur-sm sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
              <Check className="size-5" />
            </div>
            <div>
              <p className="text-foreground text-sm font-semibold text-balance">
                Ready to cut 150+ development hours right now?
              </p>
              <p className="text-muted-foreground text-xs text-pretty">
                Every component is verified by 40/40 passing Playwright end-to-end tests.
              </p>
            </div>
          </div>
          <a
            href="#pricing"
            className="text-primary hover:text-primary/80 inline-flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap transition-colors"
          >
            <span>Explore Pricing &amp; Plans</span>
            <ArrowRight className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
