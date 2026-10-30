"use client";

import * as React from "react";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Laptop,
  Smartphone,
  Layers,
  Bot,
  Star,
  ShieldCheck,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const TECH_BADGES = [
  { name: "Next.js 16", label: "Turbopack App Router" },
  { name: "React 19", label: "Server Actions" },
  { name: "Expo SDK 57", label: "iOS & Android" },
  { name: "Supabase", label: "SSR Auth & Postgres" },
  { name: "Drizzle ORM", label: "Type-safe SQL" },
  { name: "Lemon Squeezy", label: "Merchant of Record" },
  { name: "RevenueCat", label: "Mobile In-App Purchases" },
  { name: "Vercel AI SDK", label: "Streaming Copilot" },
  { name: "Playwright", label: "40/40 Passing Tests" },
  { name: "Tailwind CSS v4", label: "Modern Styling" },
];

const PREVIEWS = [
  {
    id: "ecosystem",
    label: "Unified Ecosystem",
    badge: "Web + Mobile Sync",
    icon: Layers,
    title: "Dual-Platform Architecture with Shared Supabase Database",
    description:
      "MacBook Pro web admin dashboard and iPhone 16 companion app sharing real-time Postgres tables, user accounts, and subscription tiers.",
    image: "/images/bundle-ecosystem-preview.png",
  },
  {
    id: "web",
    label: "Next.js 16 Web SaaS",
    badge: "$50 Standalone",
    icon: Laptop,
    title: "Full-Featured Next.js 16 Web Application",
    description:
      "Includes Lemon Squeezy billing, Drizzle ORM migrations, Supabase SSR Auth, team multi-tenancy, and dark glassmorphic analytics.",
    image: "/images/web-template-preview.png",
  },
  {
    id: "mobile",
    label: "Expo Mobile App",
    badge: "$50 Standalone",
    icon: Smartphone,
    title: "Cross-Platform React Native App (iOS & Android)",
    description:
      "Pre-configured RevenueCat paywalls, Apple Sign-In (App Store 4.8), account deletion flow (5.1.1v), and biometric face auth.",
    image: "/images/mobile-template-preview.png",
  },
  {
    id: "ai",
    label: "AI Studio Copilot",
    badge: "Multi-Model LLM",
    icon: Bot,
    title: "Vercel AI SDK Streaming Playground",
    description:
      "Integrated streaming completions, token usage telemetry, OpenAI, Claude, and Gemini model selectors with code generation.",
    image: "/images/ai-studio-copilot-preview.png",
  },
];

export function StarterKitHero() {
  const [activeTab, setActiveTab] = useState(0);
  const currentPreview = PREVIEWS[activeTab];

  return (
    <section className="from-background via-muted/20 to-background border-border/40 relative overflow-hidden border-b bg-gradient-to-b pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Background Glow Mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-primary/10 absolute top-1/4 left-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[130px]" />
        <div className="absolute top-1/3 left-1/4 h-[250px] w-[350px] rounded-full bg-emerald-500/10 opacity-40 blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 h-[250px] w-[350px] rounded-full bg-purple-500/10 opacity-40 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:28px_28px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Announcement Pill */}
        <div className="mb-6 flex justify-center">
          <a
            href="#pricing"
            className="group border-border/80 bg-muted/60 hover:bg-muted/90 text-foreground inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium shadow-xs backdrop-blur-md transition-all hover:scale-[1.02]"
          >
            <span className="flex size-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="font-semibold text-emerald-400">Next.js 16 + React 19 Ready</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground group-hover:text-foreground transition-colors">
              Save 200+ hours of setup
            </span>
            <ArrowRight className="text-muted-foreground size-3 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Main Hero Header & Value Proposition */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-foreground text-4xl leading-[1.08] font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
            Launch your Web &amp; Mobile SaaS in{" "}
            <span className="from-primary bg-gradient-to-r via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              days, not months
            </span>
          </h1>

          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-base leading-relaxed text-balance sm:text-lg md:text-xl">
            The complete production starter kit.{" "}
            <strong className="text-foreground font-semibold">Next.js 16 Web SaaS</strong> +{" "}
            <strong className="text-foreground font-semibold">React Native Expo Mobile App</strong>{" "}
            with pre-built Supabase SSR Auth, Lemon Squeezy billing, RevenueCat in-app
            subscriptions, Drizzle ORM, and 40/40 passing E2E tests.
          </p>

          {/* Action Button Group */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:mt-10 sm:flex-row">
            <a href="#pricing" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 h-13 w-full cursor-pointer gap-2.5 rounded-xl px-8 text-base font-bold shadow-xl transition-all hover:scale-105 active:scale-95 sm:w-auto"
              >
                <Zap className="size-4.5 fill-current text-amber-400" />
                <span>Get Starter Kit ($80)</span>
                <span className="bg-background/20 ml-1 rounded-md px-1.5 py-0.5 font-mono text-xs font-normal opacity-70">
                  Save $270+
                </span>
              </Button>
            </a>

            <a href="#templates" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="border-border/80 bg-background/60 hover:bg-muted/60 h-13 w-full cursor-pointer gap-2 rounded-xl px-7 text-sm font-semibold backdrop-blur-md transition-all sm:w-auto"
              >
                <Laptop className="text-primary size-4" />
                <span>Explore Templates</span>
              </Button>
            </a>
          </div>

          {/* Guarantee Badges */}
          <div className="text-muted-foreground mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-emerald-500" />
              100% Commercial MIT License
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-emerald-500" />
              Lifetime Updates Included
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-emerald-500" />
              Zero Monorepo Complexity
            </span>
          </div>

          {/* Social Proof / Maker Rating */}
          <div className="text-muted-foreground mt-8 flex flex-col items-center justify-center gap-3 text-xs sm:flex-row">
            <div className="flex -space-x-2">
              <div className="border-background flex size-7 items-center justify-center rounded-full border-2 bg-gradient-to-tr from-indigo-500 to-purple-500 text-[10px] font-bold text-white shadow-xs">
                AK
              </div>
              <div className="border-background flex size-7 items-center justify-center rounded-full border-2 bg-gradient-to-tr from-emerald-500 to-teal-500 text-[10px] font-bold text-white shadow-xs">
                JD
              </div>
              <div className="border-background flex size-7 items-center justify-center rounded-full border-2 bg-gradient-to-tr from-amber-500 to-orange-500 text-[10px] font-bold text-white shadow-xs">
                MR
              </div>
              <div className="border-background flex size-7 items-center justify-center rounded-full border-2 bg-gradient-to-tr from-rose-500 to-pink-500 text-[10px] font-bold text-white shadow-xs">
                SL
              </div>
              <div className="border-background flex size-7 items-center justify-center rounded-full border-2 bg-gradient-to-tr from-blue-500 to-cyan-500 text-[10px] font-bold text-white shadow-xs">
                TC
              </div>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <span className="text-foreground font-semibold">4.9/5</span>
              <span>from 480+ founders &amp; indie developers</span>
            </div>
          </div>
        </div>

        {/* Interactive Device Showcase Frame (Mac Window Mockup) */}
        <div className="mx-auto mt-14 max-w-5xl sm:mt-16">
          {/* Showcase Tabs */}
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
            {PREVIEWS.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(idx)}
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all sm:text-sm ${
                    isActive
                      ? "bg-foreground text-background scale-105 shadow-md"
                      : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="size-3.5 sm:size-4" />
                  <span>{item.label}</span>
                  <span
                    className={`rounded-md px-1.5 py-0.5 font-mono text-[10px] ${
                      isActive
                        ? "bg-background/20 text-background"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Browser / Device Shell */}
          <div className="border-border/80 group relative overflow-hidden rounded-2xl border bg-neutral-950/80 shadow-2xl backdrop-blur-xl sm:rounded-3xl">
            {/* Window Titlebar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-neutral-900/60 px-4 py-3 select-none">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-rose-500/80" />
                <span className="size-3 rounded-full bg-amber-500/80" />
                <span className="size-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 hidden font-mono text-xs text-neutral-400 sm:inline-block">
                  saas-kit://production/{currentPreview.id}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-medium text-neutral-400">
                <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
                <span>Live Supabase SSR Auth</span>
              </div>
            </div>

            {/* Display Content Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950">
              <Image
                src={currentPreview.image}
                alt={currentPreview.title}
                fill
                sizes="(max-width: 1200px) 100vw, 1100px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                priority
              />

              {/* Floating Metric Badges */}
              <div className="absolute top-4 left-4 hidden items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-md sm:inline-flex">
                <span className="size-2 rounded-full bg-emerald-400" />
                <span>$14,850 MRR • Supabase SSR Sync</span>
              </div>

              <div className="absolute top-4 right-4 hidden items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-md sm:inline-flex">
                <ShieldCheck className="size-3.5 text-purple-400" />
                <span>RevenueCat &amp; Lemon Squeezy MoR</span>
              </div>

              <div className="absolute bottom-4 left-4 hidden items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-md md:inline-flex">
                <Code2 className="size-3.5 text-blue-400" />
                <span>40/40 Passing Playwright Tests</span>
              </div>

              <div className="absolute right-4 bottom-4 hidden items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-md md:inline-flex">
                <Sparkles className="size-3.5 text-amber-400" />
                <span>Zero Cold Starts • Drizzle ORM</span>
              </div>
            </div>

            {/* Active Preview Details Footer */}
            <div className="flex flex-col justify-between gap-3 border-t border-white/10 bg-neutral-900/50 p-4 text-left sm:flex-row sm:items-center sm:p-5">
              <div>
                <h3 className="text-sm font-bold text-white sm:text-base">
                  {currentPreview.title}
                </h3>
                <p className="mt-0.5 text-xs text-neutral-400">{currentPreview.description}</p>
              </div>
              <a href="#pricing" className="shrink-0">
                <Button
                  size="sm"
                  className="h-8 rounded-lg bg-white px-3.5 text-xs font-bold text-black hover:bg-neutral-200"
                >
                  Deploy Template
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Tech Stack Marquee / Logo Cloud Bar */}
        <div className="mt-14 text-center sm:mt-16">
          <p className="text-muted-foreground mb-6 font-mono text-xs font-semibold tracking-widest uppercase">
            Engineered with modern 2026 production architecture
          </p>
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {TECH_BADGES.map((tech) => (
              <div
                key={tech.name}
                className="border-border/60 bg-muted/30 text-muted-foreground hover:text-foreground hover:border-border flex items-center gap-2 rounded-xl border px-3.5 py-1.5 text-xs font-medium transition-colors select-none"
              >
                <span className="text-foreground font-bold">{tech.name}</span>
                <span className="text-muted-foreground/70 hidden text-[10px] sm:inline-block">
                  ({tech.label})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
