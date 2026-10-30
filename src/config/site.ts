export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  priceMonthly?: number;
  priceAnnually?: number;
  popular?: boolean;
  badge?: string;
  features: string[];
  variantIdMonthly?: string;
  variantIdAnnually?: string;
  checkoutUrl?: string;
  ctaText: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface ChangelogItem {
  version: string;
  title: string;
  date: string;
  badge: "major" | "feature" | "improvement";
  highlights: string[];
}

export const siteConfig = {
  name: "Imperial",
  shortName: "Imperial",
  description:
    "Official commercial sales platform, docs hub, and automated license delivery portal for SaaS Kit Web & Mobile boilerplates.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/api/og",
  mailSupport: "support@example.com",
  socials: {
    twitter: "https://x.com/saas_builder",
    github: "https://github.com/saas-starter-kit",
    discord: "https://discord.gg/saas-starter",
  },
  creator: {
    name: "SaaS Builder",
    twitter: "@saas_builder",
  },

  // High-converting commercial boilerplate plans
  plans: [
    {
      id: "standard",
      name: "Standard License",
      description: "Ideal for indie hackers and solo founders launching 1 commercial product.",
      price: 79,
      originalPrice: 129,
      priceMonthly: 79,
      priceAnnually: 79,
      features: [
        "1 Commercial SaaS Project License",
        "Next.js 16 + React 19 + Tailwind CSS v4",
        "Supabase SSR Auth (MFA, Magic Link, OAuth)",
        "Drizzle ORM with PostgreSQL Database",
        "Lemon Squeezy MoR Subscriptions & Portal",
        "Cloudinary CDN Media & WebP Image Uploads",
        "Vercel AI SDK Copilot with Tool Calling",
        "Automated Upstream Sync (npm run sync:upstream)",
        "Direct GitHub Collaborator Invite to SAAS-Kit",
        "Community Discord Access & Lifetime Updates",
      ],
      variantIdMonthly: process.env.LEMON_SQUEEZY_STANDARD_VARIANT_ID || "standard",
      variantIdAnnually: process.env.LEMON_SQUEEZY_STANDARD_VARIANT_ID || "standard",
      checkoutUrl:
        process.env.NEXT_PUBLIC_LEMON_SQUEEZY_STANDARD_CHECKOUT_URL || "https://lemonsqueezy.com",
      ctaText: "Get Standard License",
    },
    {
      id: "unlimited",
      name: "Unlimited / Agency License",
      description: "For serial builders, startups, and agencies building unlimited SaaS apps.",
      price: 149,
      originalPrice: 249,
      priceMonthly: 149,
      priceAnnually: 149,
      popular: true,
      badge: "Best Value • Unlimited Apps",
      features: [
        "Unlimited Commercial SaaS Projects",
        "Client Projects & Agency Distribution Rights",
        "Everything in Standard License included",
        "Multi-tenant Teams & Organization Workspaces",
        "Enterprise Activity & Audit Trail Logs",
        "Automated Background Cron Task Runner",
        "5 Languages Multi-i18n Localization (EN, ES, DE, FR, HI)",
        "40/40 Passing Playwright E2E Tests",
        "Built-in Model Context Protocol Server (npm run mcp)",
        "Priority 1-on-1 Discord & Architecture Support",
        "Lifetime Access to all Future Modules & Releases",
      ],
      variantIdMonthly: process.env.LEMON_SQUEEZY_UNLIMITED_VARIANT_ID || "unlimited",
      variantIdAnnually: process.env.LEMON_SQUEEZY_UNLIMITED_VARIANT_ID || "unlimited",
      checkoutUrl:
        process.env.NEXT_PUBLIC_LEMON_SQUEEZY_UNLIMITED_CHECKOUT_URL || "https://lemonsqueezy.com",
      ctaText: "Get Unlimited Access",
    },
  ] satisfies PricingPlan[],

  // Frequently Asked Questions
  faqs: [
    {
      question: "What exactly do I get with this starter kit?",
      answer:
        "You get a complete, production-ready SaaS codebase featuring Next.js 16 (App Router, Turbopack, React 19), Supabase Authentication with SSR cookies, Drizzle ORM connected to PostgreSQL, Lemon Squeezy billing with HMAC-verified webhooks, Resend transactional emails, PostHog & Google Analytics, a full blog engine, and Vercel AI SDK with Generative UI components.",
      category: "General",
    },
    {
      question: "Can I use Stripe instead of Lemon Squeezy?",
      answer:
        "Yes! Because the database schema uses a clean `subscriptions` table and Server Actions abstraction, you can easily swap the billing layer with Stripe or Polar in under 30 minutes. We chose Lemon Squeezy out of the box because it acts as Merchant of Record and handles all global taxes, VAT, and invoices automatically.",
      category: "Billing",
    },
    {
      question: "How long does it take to launch a SaaS with this?",
      answer:
        "Most developers launch in less than 48 hours. All the repetitive boilerplate—authentication, database migrations, checkout sessions, customer portal, dark mode, protected routes, and email delivery—is already written and tested.",
      category: "Getting Started",
    },
    {
      question: "Are there any recurring subscription fees for the kit itself?",
      answer:
        "No. The starter kit is open-source under the permissive MIT license. You own 100% of the code, have zero vendor lock-in, and never pay any revenue share or license fees.",
      category: "Licensing",
    },
    {
      question: "How does the AI Studio & Tool Calling work?",
      answer:
        "We integrated the Vercel AI SDK v7 with OpenAI models. The studio features interactive components like CodeBlocks with 1-click copy, reasoning drawers, model switcher, and Generative UI widgets that execute live database metrics tools.",
      category: "AI Features",
    },
    {
      question: "Is there support if I run into database or deployment issues?",
      answer:
        "Yes! We provide complete setup documentation in `.env.example`, comprehensive guides, and community support in our Discord community.",
      category: "Support",
    },
  ] satisfies FAQItem[],

  // Wall of Love / Testimonials
  testimonials: [
    {
      name: "Alex Rivera",
      role: "Founder",
      company: "DataPulse AI",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
      quote:
        "Saved me at least 3 weeks of grueling setup. The Supabase SSR auth + Drizzle ORM + Lemon Squeezy webhooks were completely wired up on day one. Launched and hit $4k MRR in my first month!",
      rating: 5,
    },
    {
      name: "Marcus Vance",
      role: "Indie Hacker",
      company: "ShipFastly",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
      quote:
        "The Next.js 16 Turbopack performance is unreal. Zero cold starts with Drizzle, and having AI tool calling ready to go meant I could build an AI copilot into my app in an afternoon.",
      rating: 5,
    },
    {
      name: "Sarah Chen",
      role: "Lead Engineer",
      company: "SyntaxCloud",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces",
      quote:
        "I’ve purchased MakerKit and ShipFast in the past. This starter kit matches the best parts of both: clean enterprise-level architecture without unnecessary bloat.",
      rating: 5,
    },
  ] satisfies TestimonialItem[],

  // Release history & roadmap
  changelog: [
    {
      version: "v3.2.0",
      title: "Resilience & Security Hardening",
      date: "October 2026",
      badge: "improvement",
      highlights: [
        "Zero ESLint & TypeScript errors with strict type guards",
        "Stream abort and empty chunk safeguards in AI Studio",
        "Preserved redirectTo destination paths on auth login redirections",
        "API key placeholder detection guard on /api/ai/chat",
      ],
    },
    {
      version: "v3.1.0",
      title: "AI Elements & Copilot Studio",
      date: "October 2026",
      badge: "major",
      highlights: [
        "Vercel AI SDK v7 integration with Tool Calling",
        "Full-screen /dashboard/ai-studio workspace",
        "Interactive Generative UI widgets (MRR, Churn, Pricing)",
        "CodeBlock with syntax styling and 1-click clipboard copy",
        "Collapsible chain-of-thought Reasoning drawer",
      ],
    },
    {
      version: "v2.0.0",
      title: "Full-Stack Core Architecture",
      date: "October 2026",
      badge: "feature",
      highlights: [
        "Next.js 16 App Router & React 19 Turbopack engine",
        "Supabase SSR authentication with cookie handling",
        "Drizzle ORM connected to PostgreSQL with connection pooling",
        "Lemon Squeezy HMAC-verified webhook billing sync",
        "Resend transactional email delivery & React Email templates",
      ],
    },
  ] satisfies ChangelogItem[],
};
