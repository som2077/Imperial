"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
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
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 bg-gradient-to-b from-background via-muted/20 to-background border-b border-border/40">
      {/* Background Glow Mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/10 blur-[130px] rounded-full opacity-60" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[250px] bg-emerald-500/10 blur-[100px] rounded-full opacity-40" />
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[250px] bg-purple-500/10 blur-[100px] rounded-full opacity-40" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <a
            href="#pricing"
            className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/60 hover:bg-muted/90 px-3.5 py-1.5 text-xs font-medium text-foreground backdrop-blur-md shadow-xs transition-all hover:scale-[1.02]"
          >
            <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-emerald-400">Next.js 16 + React 19 Ready</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground group-hover:text-foreground transition-colors">
              Save 200+ hours of setup
            </span>
            <ArrowRight className="size-3 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Main Hero Header & Value Proposition */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground text-balance leading-[1.08]">
            Launch your Web &amp; Mobile SaaS in{" "}
            <span className="bg-gradient-to-r from-primary via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              days, not months
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            The complete production starter kit.{" "}
            <strong className="text-foreground font-semibold">Next.js 16 Web SaaS</strong> +{" "}
            <strong className="text-foreground font-semibold">React Native Expo Mobile App</strong>{" "}
            with pre-built Supabase SSR Auth, Lemon Squeezy billing, RevenueCat in-app subscriptions,
            Drizzle ORM, and 40/40 passing E2E tests.
          </p>

          {/* Action Button Group */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a href="#pricing" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto h-13 px-8 rounded-xl text-base font-bold bg-foreground text-background hover:bg-foreground/90 shadow-xl transition-all hover:scale-105 active:scale-95 gap-2.5 cursor-pointer"
              >
                <Zap className="size-4.5 fill-current text-amber-400" />
                <span>Get Starter Kit ($80)</span>
                <span className="ml-1 text-xs font-mono font-normal opacity-70 px-1.5 py-0.5 rounded-md bg-background/20">
                  Save $270+
                </span>
              </Button>
            </a>

            <a href="#templates" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-13 px-7 rounded-xl text-sm font-semibold border-border/80 bg-background/60 hover:bg-muted/60 backdrop-blur-md transition-all gap-2 cursor-pointer"
              >
                <Laptop className="size-4 text-primary" />
                <span>Explore Templates</span>
              </Button>
            </a>
          </div>

          {/* Guarantee Badges */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
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
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-muted-foreground">
            <div className="flex -space-x-2">
              <div className="size-7 rounded-full border-2 border-background bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white shadow-xs">
                AK
              </div>
              <div className="size-7 rounded-full border-2 border-background bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-[10px] font-bold text-white shadow-xs">
                JD
              </div>
              <div className="size-7 rounded-full border-2 border-background bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-[10px] font-bold text-white shadow-xs">
                MR
              </div>
              <div className="size-7 rounded-full border-2 border-background bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-[10px] font-bold text-white shadow-xs">
                SL
              </div>
              <div className="size-7 rounded-full border-2 border-background bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center text-[10px] font-bold text-white shadow-xs">
                TC
              </div>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-foreground">4.9/5</span>
              <span>from 480+ founders &amp; indie developers</span>
            </div>
          </div>
        </div>

        {/* Interactive Device Showcase Frame (Mac Window Mockup) */}
        <div className="mt-14 sm:mt-16 mx-auto max-w-5xl">
          {/* Showcase Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            {PREVIEWS.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(idx)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-foreground text-background shadow-md scale-105"
                      : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="size-3.5 sm:size-4" />
                  <span>{item.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                      isActive ? "bg-background/20 text-background" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Browser / Device Shell */}
          <div className="relative rounded-2xl sm:rounded-3xl border border-border/80 bg-neutral-950/80 shadow-2xl backdrop-blur-xl overflow-hidden group">
            {/* Window Titlebar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-neutral-900/60 px-4 py-3 select-none">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-rose-500/80" />
                <span className="size-3 rounded-full bg-amber-500/80" />
                <span className="size-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-neutral-400 hidden sm:inline-block">
                  saas-kit://production/{currentPreview.id}
                </span>
              </div>
              <div className="text-[11px] font-medium text-neutral-400 flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
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
              <div className="absolute top-4 left-4 hidden sm:inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md shadow-lg">
                <span className="size-2 rounded-full bg-emerald-400" />
                <span>$14,850 MRR • Supabase SSR Sync</span>
              </div>

              <div className="absolute top-4 right-4 hidden sm:inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md shadow-lg">
                <ShieldCheck className="size-3.5 text-purple-400" />
                <span>RevenueCat &amp; Lemon Squeezy MoR</span>
              </div>

              <div className="absolute bottom-4 left-4 hidden md:inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md shadow-lg">
                <Code2 className="size-3.5 text-blue-400" />
                <span>40/40 Passing Playwright Tests</span>
              </div>

              <div className="absolute bottom-4 right-4 hidden md:inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md shadow-lg">
                <Sparkles className="size-3.5 text-amber-400" />
                <span>Zero Cold Starts • Drizzle ORM</span>
              </div>
            </div>

            {/* Active Preview Details Footer */}
            <div className="p-4 sm:p-5 border-t border-white/10 bg-neutral-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {currentPreview.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">{currentPreview.description}</p>
              </div>
              <a href="#pricing" className="shrink-0">
                <Button
                  size="sm"
                  className="h-8 px-3.5 text-xs font-bold rounded-lg bg-white text-black hover:bg-neutral-200"
                >
                  Deploy Template
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Tech Stack Marquee / Logo Cloud Bar */}
        <div className="mt-14 sm:mt-16 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold mb-6">
            Engineered with modern 2026 production architecture
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-4xl mx-auto">
            {TECH_BADGES.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2 rounded-xl border border-border/60 bg-muted/30 px-3.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-border transition-colors select-none"
              >
                <span className="font-bold text-foreground">{tech.name}</span>
                <span className="text-[10px] text-muted-foreground/70 hidden sm:inline-block">
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
