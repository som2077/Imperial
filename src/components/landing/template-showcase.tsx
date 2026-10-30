"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Smartphone,
  Globe,
  Layers,
  Zap,
  ShieldCheck,
  Code2,
  Database,
  CreditCard,
  Bot,
} from "lucide-react";

type FilterTab = "all" | "web" | "mobile" | "bundle";

interface TemplateItem {
  id: string;
  category: "web" | "mobile" | "bundle";
  badge: string;
  badgeVariant: "emerald" | "blue" | "amber";
  title: string;
  price: string;
  originalPrice?: string;
  subtitle: string;
  description: string;
  image: string;
  tags: { name: string; icon: React.ComponentType<{ className?: string }> }[];
  highlights: string[];
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  featured?: boolean;
}

const templates: TemplateItem[] = [
  {
    id: "web-saas-kit",
    category: "web",
    badge: "Next.js 16 • Turbopack",
    badgeVariant: "blue",
    title: "Web SaaS Boilerplate",
    price: "$50",
    subtitle: "Enterprise-grade web starter for high-MRR SaaS applications",
    description:
      "Engineered with Next.js 16 App Router, React 19, Supabase SSR Auth, Drizzle ORM, Lemon Squeezy billing webhooks, AI Copilot, Cloudinary media storage, and multi-language i18n.",
    image: "/images/web-template-preview.png",
    tags: [
      { name: "Next.js 16", icon: Code2 },
      { name: "Supabase", icon: Database },
      { name: "Drizzle ORM", icon: Zap },
      { name: "Lemon Squeezy", icon: CreditCard },
      { name: "AI Studio", icon: Bot },
    ],
    highlights: [
      "Supabase SSR Authentication (Magic links, OAuth, session refresh)",
      "Lemon Squeezy checkout & subscription billing webhooks",
      "Type-safe Drizzle ORM schema with automated Postgres migrations",
      "Vercel AI SDK Studio Copilot with streaming completions",
      "Multi-tenant organization accounts with RBAC & audit logs",
      "40+ Playwright E2E integration test specs with passing CI",
    ],
    primaryCtaText: "Get Web Kit ($50)",
    primaryCtaHref: "#pricing",
    secondaryCtaText: "Live Demo App",
    secondaryCtaHref: "/dashboard",
  },
  {
    id: "mobile-saas-kit",
    category: "mobile",
    badge: "Expo SDK 57 • New Architecture",
    badgeVariant: "emerald",
    title: "Mobile App Starter",
    price: "$50",
    subtitle: "Production-ready native app for iOS & Android with RevenueCat",
    description:
      "Built with Expo SDK 57, React Native 0.86, Hermes engine, NativeWind v4 styling, Apple Sign-In, Google OAuth, and RevenueCat in-app subscription paywalls.",
    image: "/images/mobile-template-preview.png",
    tags: [
      { name: "Expo SDK 57", icon: Smartphone },
      { name: "React Native 0.86", icon: Code2 },
      { name: "RevenueCat v10", icon: CreditCard },
      { name: "Hermes New Arch", icon: Zap },
      { name: "Supabase Auth", icon: Database },
    ],
    highlights: [
      "100% iOS & Android cross-platform feature parity on Hermes engine",
      "Apple Sign-In (Guideline 4.8) & permanent Account Deletion (5.1.1v)",
      "RevenueCat v10 in-app purchases with dynamic paywall switcher",
      "Supabase real-time database sync, auth, and remote storage",
      "NativeWind Tailwind styling with automatic system dark mode",
      "21/21 passing expo-doctor checks, zero Metro bundling crashes",
    ],
    primaryCtaText: "Get Mobile Kit ($50)",
    primaryCtaHref: "#pricing",
    secondaryCtaText: "View Documentation",
    secondaryCtaHref: "/docs",
  },
  {
    id: "all-in-one-bundle",
    category: "bundle",
    badge: "🔥 Best Value • Save $20",
    badgeVariant: "amber",
    title: "All-in-One Full-Stack Bundle",
    price: "$80",
    originalPrice: "$100",
    subtitle: "Complete Web + Mobile ecosystem with unified Supabase backend",
    description:
      "Get both the Next.js 16 Web SaaS kit and the Expo SDK 57 Mobile template. Share one Supabase database, unified user accounts, shared authentication, and single commercial license.",
    image: "/images/bundle-ecosystem-preview.png",
    featured: true,
    tags: [
      { name: "Web + Mobile", icon: Layers },
      { name: "Unified Supabase", icon: Database },
      { name: "Dual Checkout", icon: CreditCard },
      { name: "Commercial License", icon: ShieldCheck },
    ],
    highlights: [
      "Both complete boilerplates: Next.js 16 Web + Expo SDK 57 Mobile",
      "Unified Supabase backend: Web users seamlessly log into Mobile",
      "Save $20 compared to buying separate templates",
      "Lifetime updates for both repositories with automated upstream sync",
      "Private GitHub collaborator invitations for both repos",
      "Direct priority Discord support channel with core maintainers",
    ],
    primaryCtaText: "Claim Bundle ($80)",
    primaryCtaHref: "#pricing",
    secondaryCtaText: "Explore Features",
    secondaryCtaHref: "#features",
  },
];

export function TemplateShowcase() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filteredTemplates =
    activeTab === "all"
      ? templates
      : templates.filter((template) => template.category === activeTab);

  return (
    <section
      id="pricing"
      className="border-border/60 bg-background relative scroll-mt-16 border-b py-24 sm:py-32"
    >
      <div id="templates" className="absolute -top-20" />
      {/* Background radial glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-primary/5 absolute top-1/4 left-1/2 size-[600px] -translate-x-1/2 rounded-full blur-[120px]" />
        <div className="absolute right-10 bottom-10 size-[400px] rounded-full bg-emerald-500/5 blur-[100px]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="border-primary/20 bg-primary/10 text-primary mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold">
            <Sparkles className="size-3.5" />
            <span>Commercial Template Catalog</span>
          </div>
          <h2 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-5xl">
            Choose Your Foundation. <br />
            <span className="from-primary bg-gradient-to-r via-blue-500 to-emerald-500 bg-clip-text text-transparent">
              Ship in Days, Not Months.
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 text-base sm:text-lg">
            Stop stitching together auth, payments, database migrations, and mobile configurations.
            Every template is fully typed, tested, and battle-ready for production.
          </p>

          {/* Interactive Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={() => setActiveTab("all")}
              className={`cursor-pointer rounded-full px-5 py-2 text-xs font-semibold transition-all ${
                activeTab === "all"
                  ? "bg-foreground text-background shadow-sm"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              All Templates ({templates.length})
            </button>
            <button
              onClick={() => setActiveTab("web")}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-5 py-2 text-xs font-semibold transition-all ${
                activeTab === "web"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Globe className="size-3.5" />
              <span>Web SaaS Kit ($50)</span>
            </button>
            <button
              onClick={() => setActiveTab("mobile")}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-5 py-2 text-xs font-semibold transition-all ${
                activeTab === "mobile"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Smartphone className="size-3.5" />
              <span>Mobile App Kit ($50)</span>
            </button>
            <button
              onClick={() => setActiveTab("bundle")}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-5 py-2 text-xs font-semibold transition-all ${
                activeTab === "bundle"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Layers className="size-3.5" />
              <span>All-in-One Bundle ($80)</span>
            </button>
          </div>
        </div>

        {/* Templates Grid Showcase */}
        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {filteredTemplates.map((template) => {
            const isFeatured = template.featured;
            return (
              <div
                key={template.id}
                className={`group bg-card/60 relative flex flex-col overflow-hidden rounded-3xl border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                  isFeatured
                    ? "border-amber-500/50 ring-1 shadow-amber-500/10 ring-amber-500/40 lg:-translate-y-2"
                    : "border-border/60 hover:border-border"
                }`}
              >
                {/* Visual Mockup Header */}
                <div className="border-border/40 relative aspect-[16/10] w-full overflow-hidden border-b bg-neutral-950">
                  <Image
                    src={template.image}
                    alt={template.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase backdrop-blur-md ${
                        template.badgeVariant === "amber"
                          ? "bg-amber-500/90 text-black shadow-lg shadow-amber-500/30"
                          : template.badgeVariant === "emerald"
                            ? "bg-emerald-500/90 text-black shadow-lg shadow-emerald-500/30"
                            : "bg-blue-600/90 text-white shadow-lg shadow-blue-600/30"
                      }`}
                    >
                      {template.badge}
                    </span>
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute right-4 bottom-4 z-10 flex items-baseline gap-2 rounded-xl border border-white/10 bg-black/80 px-3.5 py-1.5 backdrop-blur-md">
                    {template.originalPrice && (
                      <span className="text-xs text-neutral-400 line-through">
                        {template.originalPrice}
                      </span>
                    )}
                    <span className="text-lg font-black text-white">{template.price}</span>
                    <span className="text-[10px] font-semibold text-neutral-400 uppercase">
                      one-time
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div>
                    <h3 className="text-foreground text-2xl font-bold tracking-tight">
                      {template.title}
                    </h3>
                    <p className="text-primary mt-1 text-xs font-semibold">{template.subtitle}</p>
                    <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                      {template.description}
                    </p>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {template.tags.map((tag) => {
                      const Icon = tag.icon;
                      return (
                        <span
                          key={tag.name}
                          className="bg-muted/60 text-foreground border-border/40 inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-[11px] font-medium"
                        >
                          <Icon className="text-primary size-3" />
                          <span>{tag.name}</span>
                        </span>
                      );
                    })}
                  </div>

                  {/* Feature Highlights Checklist */}
                  <div className="border-border/50 mt-6 flex-1 border-t pt-5">
                    <p className="text-muted-foreground mb-3 text-[11px] font-semibold tracking-wider uppercase">
                      Included Architecture:
                    </p>
                    <ul className="text-muted-foreground space-y-2 text-xs">
                      {template.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                          <span className="text-foreground/90 leading-tight">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action CTAs */}
                  <div className="border-border/50 mt-8 flex flex-col gap-2.5 border-t pt-4">
                    <a
                      href={template.primaryCtaHref}
                      className={`inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl text-sm font-semibold shadow-md transition-all ${
                        isFeatured
                          ? "bg-amber-500 font-bold text-black hover:bg-amber-400"
                          : "bg-primary text-primary-foreground hover:opacity-90"
                      }`}
                    >
                      <span>{template.primaryCtaText}</span>
                      <ArrowRight className="size-4" />
                    </a>
                    <Link
                      href={template.secondaryCtaHref}
                      className="border-border/80 bg-background/50 text-foreground hover:bg-muted inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-xl border text-xs font-semibold transition-colors"
                    >
                      <span>{template.secondaryCtaText}</span>
                      <ExternalLink className="text-muted-foreground size-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
