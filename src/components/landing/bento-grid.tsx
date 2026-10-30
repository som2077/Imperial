import Image from "next/image";
import { ShieldCheck, Database, CreditCard, Bot, Activity, Cloud, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BentoGrid() {
  return (
    <section id="features" className="container mx-auto px-4 py-24 sm:px-8">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <Badge variant="outline" className="border-primary/20 bg-primary/5 mb-3 gap-1.5">
          <Sparkles className="text-primary size-3.5" /> Next-Gen Architecture
        </Badge>
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">
          Everything Engineered to Ship Fast
        </h2>
        <p className="text-muted-foreground text-base text-pretty sm:text-lg">
          Zero technical debt. Production-ready full-stack primitives built with the highest
          engineering standards.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Card 1: Supabase SSR & Multi-Tenancy (Span 2) */}
        <div className="group border-border/80 bg-card hover:border-primary/40 relative col-span-1 overflow-hidden rounded-3xl border p-8 shadow-2xs transition-all duration-300 hover:shadow-lg md:col-span-2">
          <div className="from-primary/10 pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl">
                  <ShieldCheck className="size-5" />
                </div>
                <Badge variant="secondary" className="font-mono text-[11px]">
                  @supabase/ssr
                </Badge>
              </div>
              <h3 className="mb-2 text-xl font-bold tracking-tight text-balance sm:text-2xl">
                Supabase SSR Auth &amp; B2B Multi-Tenancy
              </h3>
              <p className="text-muted-foreground mb-6 max-w-xl text-sm leading-relaxed text-pretty">
                Complete authentication architecture with cookie-based SSR sessions, MFA TOTP with
                QR codes, Google &amp; GitHub OAuth, and multi-tenant workspace isolation with
                role-based access control (RBAC).
              </p>
            </div>

            {/* Interactive Visual Element */}
            <div className="border-border/60 bg-muted/30 rounded-2xl border p-4 font-mono text-xs">
              <div className="border-border/40 mb-3 flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  <span className="text-foreground font-sans font-semibold">
                    Workspace: Acme Corp
                  </span>
                </div>
                <Badge variant="outline" className="bg-background text-[10px]">
                  Role: Owner
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] sm:grid-cols-3">
                <div className="bg-card/80 border-border/40 rounded-lg border p-2 text-center">
                  <span className="text-muted-foreground block text-[10px]">Session</span>
                  <span className="font-semibold text-emerald-500">HttpOnly Cookie</span>
                </div>
                <div className="bg-card/80 border-border/40 rounded-lg border p-2 text-center">
                  <span className="text-muted-foreground block text-[10px]">MFA Protection</span>
                  <span className="text-primary font-semibold">TOTP Enabled</span>
                </div>
                <div className="bg-card/80 border-border/40 col-span-2 rounded-lg border p-2 text-center sm:col-span-1">
                  <span className="text-muted-foreground block text-[10px]">Turnstile</span>
                  <span className="font-semibold text-emerald-500">Cloudflare Dev Bypass</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Drizzle ORM (Span 1) */}
        <div className="group border-border/80 bg-card hover:border-primary/40 relative col-span-1 overflow-hidden rounded-3xl border p-8 shadow-2xs transition-all duration-300 hover:shadow-lg">
          <div className="from-primary/10 pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                  <Database className="size-5" />
                </div>
                <Badge variant="secondary" className="font-mono text-[11px]">
                  PostgreSQL
                </Badge>
              </div>
              <h3 className="mb-2 text-xl font-bold tracking-tight text-balance">
                Drizzle ORM (0ms Cold Starts)
              </h3>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed text-pretty">
                Lightweight, type-safe SQL query builder without bloated Prisma engines. Full
                connection pooling and visual Drizzle Studio inspection.
              </p>
            </div>

            <div className="border-border/60 bg-muted/40 text-muted-foreground rounded-2xl border p-3 font-mono text-[11px]">
              <div className="mb-1 font-semibold text-emerald-500">
                db.query.users.findMany({`{`}
              </div>
              <div className="text-foreground pl-3">
                with: {`{`} organization: true {`}`},
              </div>
              <div className="font-semibold text-emerald-500 tabular-nums">
                {`})`} &bull; 0.4ms latency
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Lemon Squeezy MoR & Paywall (Span 1) */}
        <div className="group border-border/80 bg-card hover:border-primary/40 relative col-span-1 overflow-hidden rounded-3xl border p-8 shadow-2xs transition-all duration-300 hover:shadow-lg">
          <div className="from-primary/10 pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                  <CreditCard className="size-5" />
                </div>
                <Badge variant="secondary" className="font-mono text-[11px]">
                  MoR Billing
                </Badge>
              </div>
              <h3 className="mb-2 text-xl font-bold tracking-tight text-balance">
                Lemon Squeezy &amp; Paywall
              </h3>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed text-pretty">
                Automated global tax and EU VAT compliance. Customer portal, HMAC webhook
                verification, and reusable {`<Paywall />`} component.
              </p>
            </div>

            <div className="border-border/60 bg-muted/40 space-y-2 rounded-2xl border p-3 text-xs">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Pro Plan Sync</span>
                <span className="font-semibold text-emerald-500 tabular-nums">
                  Active &bull; Renews Nov 2026
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Customer Portal</span>
                <span className="text-primary font-medium">1-Click Redirect</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: AI SDK Copilot Studio (Span 2) */}
        <div className="group border-border/80 bg-card hover:border-primary/40 relative col-span-1 overflow-hidden rounded-3xl border p-8 shadow-2xs transition-all duration-300 hover:shadow-lg md:col-span-2">
          <div className="from-primary/10 pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex size-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
                  <Bot className="size-5" />
                </div>
                <Badge variant="secondary" className="font-mono text-[11px]">
                  Vercel AI SDK v7
                </Badge>
              </div>
              <h3 className="mb-2 text-xl font-bold tracking-tight text-balance sm:text-2xl">
                AI Copilot Studio &amp; Generative UI
              </h3>
              <p className="text-muted-foreground mb-6 max-w-xl text-sm leading-relaxed text-pretty">
                Interactive full-screen workspace with multi-turn conversations, live tool calling,
                reasoning accordions, model switcher (GPT-4o, o1-mini), and Generative UI widgets
                directly interacting with database state.
              </p>
            </div>

            {/* Visual AI Studio Preview */}
            <div className="relative mt-2 overflow-hidden rounded-2xl border border-border/60 bg-neutral-950 aspect-[16/9]">
              <Image
                src="/images/ai-studio-copilot-preview.png"
                alt="AI Studio Copilot Interface"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-1.5 text-purple-400 font-semibold">
                  <Sparkles className="size-3" /> Multi-Model: GPT-4o &bull; Claude 3.5 &bull; Gemini 1.5
                </span>
                <span className="text-muted-foreground tabular-nums">94 tokens/sec</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 5: Enterprise Audit Logs (Span 1) */}
        <div className="group border-border/80 bg-card hover:border-primary/40 relative col-span-1 overflow-hidden rounded-3xl border p-8 shadow-2xs transition-all duration-300 hover:shadow-lg">
          <div className="from-primary/10 pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                  <Activity className="size-5" />
                </div>
                <Badge variant="secondary" className="font-mono text-[11px]">
                  SOC2 Compliance
                </Badge>
              </div>
              <h3 className="mb-2 text-xl font-bold tracking-tight text-balance">
                Enterprise Activity &amp; Audit
              </h3>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed text-pretty">
                Non-blocking universal activity logger tracking auth, team invitations, and API keys
                with 1-click CSV &amp; JSON export.
              </p>
            </div>

            <div className="border-border/60 bg-muted/40 space-y-1.5 rounded-2xl border p-3 font-mono text-[11px]">
              <div className="text-muted-foreground flex justify-between">
                <span>auth.login</span>
                <span className="text-emerald-500">200 OK</span>
              </div>
              <div className="text-muted-foreground flex justify-between">
                <span>api_key.create</span>
                <span className="text-primary">Logged</span>
              </div>
              <div className="text-muted-foreground border-border/40 border-t pt-1 text-[10px]">
                Auto IP &amp; User-Agent capture enabled
              </div>
            </div>
          </div>
        </div>

        {/* Card 6: Media CDN & Cron Automation (Span 2) */}
        <div className="group border-border/80 bg-card hover:border-primary/40 relative col-span-1 overflow-hidden rounded-3xl border p-8 shadow-2xs transition-all duration-300 hover:shadow-lg md:col-span-2">
          <div className="from-primary/10 pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
                  <Cloud className="size-5" />
                </div>
                <Badge variant="secondary" className="font-mono text-[11px]">
                  CDN &amp; Crons
                </Badge>
              </div>
              <h3 className="mb-2 text-xl font-bold tracking-tight text-balance sm:text-2xl">
                Cloudinary Media CDN &amp; Background Crons
              </h3>
              <p className="text-muted-foreground mb-6 max-w-xl text-sm leading-relaxed text-pretty">
                Direct client-to-CDN signed uploads with automatic WebP/AVIF transformations
                (`f_auto,q_auto`). Includes scheduled RFC background runner with visual
                `/admin/jobs` control room.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
              <div className="border-border/60 bg-muted/30 rounded-xl border p-3">
                <div className="text-foreground mb-1 text-xs font-semibold">Signed Uploads</div>
                <div className="text-muted-foreground font-mono text-[11px]">
                  SHA-1 cryptographic signature bypasses server memory for unlimited scale.
                </div>
              </div>
              <div className="border-border/60 bg-muted/30 rounded-xl border p-3">
                <div className="text-foreground mb-1 text-xs font-semibold">Scheduled Jobs</div>
                <div className="text-muted-foreground font-mono text-[11px]">
                  webhook-retries &bull; trial-reminders &bull; db-cleanup
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
