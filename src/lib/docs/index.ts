export interface DocArticle {
  slug: string;
  title: string;
  category: "Getting Started" | "Core Stack" | "Integrations" | "Deployment";
  description: string;
  readTime: string;
  content: string;
}

export const DOC_ARTICLES: DocArticle[] = [
  {
    slug: "getting-started",
    category: "Getting Started",
    title: "Quick Start & Setup Guide",
    description:
      "Clone, configure environment variables, and launch your SaaS locally in under 3 minutes.",
    readTime: "3 min read",
    content: `### 1. Prerequisites
Ensure you have the following installed on your machine:
* Node.js 18.18 or higher (Node 20+ recommended)
* npm, pnpm, or bun
* A free Supabase account for PostgreSQL & Auth
* A Lemon Squeezy or Stripe account for billing

### 2. Installation
Clone the repository and install all project dependencies:
\`\`\`bash
git clone <your-repo-url>
cd website-starterKit
npm install
\`\`\`

### 3. Rebrand & Rename Project
Customize your startup name, short brand, package slug, and metadata across the app in one command:
\`\`\`bash
npm run rename
\`\`\`
Or non-interactively:
\`\`\`bash
npm run rename -- --name "Apex AI" --short "Apex" --slug "apex-ai" -y
\`\`\`

### 4. Environment Setup
Copy the environment template and populate your service keys:
\`\`\`bash
cp .env.example .env.local
\`\`\`
Fill in \`NEXT_PUBLIC_SUPABASE_URL\`, \`NEXT_PUBLIC_SUPABASE_ANON_KEY\`, and \`DATABASE_URL\`.

### 5. Push Database Schema
Synchronize the PostgreSQL tables directly via Drizzle ORM:
\`\`\`bash
npm run db:push
\`\`\`

### 6. Launch Development Server
Start the Next.js 16 Turbopack development server:
\`\`\`bash
npm run dev
\`\`\`
Visit http://localhost:3000 to view your application!`,
  },
  {
    slug: "syncing-upstream",
    category: "Getting Started",
    title: "Staying Updated with Upstream Releases",
    description:
      "Seamlessly pull new features, security updates, and performance patches from official SAAS-Kit releases.",
    readTime: "3 min read",
    content: `### Automatic 1-Click Sync Helper
We ship an automated sync assistant script that fetches and merges official upstream releases into an isolated branch safely without overwriting your custom business logic:

\`\`\`bash
npm run sync:upstream
\`\`\`

The wizard will:
1. Automatically verify or configure \`upstream\` to \`https://github.com/som2077/saas-kit-template.git\`.
2. Inspect how many new commits have been released in the official repository.
3. Create an isolated, timestamped branch (e.g., \`upstream-sync-2026-10-11\`).
4. Merge \`upstream/main\` into that safe branch for testing.

### Manual Git Upstream Workflow
If you prefer standard Git commands, follow this 3-step workflow:

\`\`\`bash
# 1. Add the official starter kit repository as upstream
git remote add upstream https://github.com/som2077/saas-kit-template.git

# 2. Fetch the latest releases without touching your working tree
git fetch upstream

# 3. Check what commits are new
git log HEAD..upstream/main --oneline -n 5
\`\`\`

### Safe Merge Verification
After merging upstream updates into your test branch, run our automated quality suites:

\`\`\`bash
# Run ESLint, Prettier, and TypeScript strict checks
npm run check

# Run the 40/40 Playwright E2E browser test suite
npm run test:e2e
\`\`\`

Once all checks pass, merge into your \`main\` branch:
\`\`\`bash
git checkout main
git merge upstream-sync-xxxx
git push origin main
\`\`\`

### Selective Feature Cherry-Picking
If you only want a specific feature or bugfix rather than all changes:
\`\`\`bash
# Pick and apply a single upstream commit
git cherry-pick <commit-hash>
\`\`\``,
  },
  {
    slug: "architecture-overview",
    category: "Core Stack",
    title: "Application Architecture",
    description: "Understand the Next.js 16 App Router structure, Turbopack, and state management.",
    readTime: "4 min read",
    content: `### High-Performance Tech Stack
This starter kit is engineered for ultra-low latency, maintainability, and zero technical debt:

* **Next.js 16 (App Router):** Server Components by default for optimal SEO and instant initial page loads.
* **React 19:** Server Actions for type-safe database mutations without redundant API boilerplate.
* **Tailwind CSS v4:** Next-generation CSS engine featuring instant compilation and native CSS variables.
* **shadcn/ui + Radix:** Fully accessible, unstyled UI primitives that you own directly in your codebase.

### Directory Convention
* \`src/app/(auth)\`: Isolated routes for sign-in, registration, and password recovery.
* \`src/app/(dashboard)\`: Authenticated layout with role-protected workspace subroutes.
* \`src/components/ui\`: Base reusable shadcn primitives.
* \`src/db\`: Drizzle ORM schema definitions and client connection.
* \`src/server/actions\`: Server Actions managing auth, profile, billing, and teams.`,
  },
  {
    slug: "authentication",
    category: "Core Stack",
    title: "Supabase Authentication & SSR Cookies",
    description:
      "Session persistence, OAuth social logins, and route protection via Next.js 16 proxy.",
    readTime: "5 min read",
    content: `### Server-Side Cookie Handling
Unlike legacy client-side token storage (localStorage), this starter kit utilizes \`@supabase/ssr\` to store authentication cookies securely using \`httpOnly\` cookies.

### Route Protection via Proxy
Next.js 16 uses \`src/proxy.ts\` to intercept incoming requests before rendering. The proxy verifies session validity:

\`\`\`typescript
// src/proxy.ts
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}
\`\`\`

If an unauthenticated visitor attempts to access any route under \`/dashboard/*\`, they are automatically redirected to \`/login?redirectTo=/requested-path\`.`,
  },
  {
    slug: "database-and-orm",
    category: "Core Stack",
    title: "Drizzle ORM & PostgreSQL",
    description: "Schema definitions, relational queries, migrations, and Drizzle Studio.",
    readTime: "4 min read",
    content: `### Why Drizzle ORM?
Drizzle provides true zero-cold-start execution, pure TypeScript type inference, and near-native SQL performance without heavy memory overhead.

### Schema Definitions
All schemas are declared in \`src/db/schema.ts\`:
* \`profiles\`: Linked to Supabase auth accounts with full names, avatars, and roles.
* \`subscriptions\`: Tracks active, paused, or cancelled Lemon Squeezy plans.
* \`organizations\` & \`organizationMembers\`: Multi-tenancy workspaces and roles.
* \`apiKeys\`: Cryptographically hashed developer tokens.

### Database Studio GUI
To inspect and manage your live database through an intuitive web interface, run:
\`\`\`bash
npm run db:studio
\`\`\``,
  },
  {
    slug: "payments-and-billing",
    category: "Integrations",
    title: "Lemon Squeezy Billing & Webhooks",
    description: "Merchant of Record billing, HMAC signature verification, and customer portals.",
    readTime: "5 min read",
    content: `### Merchant of Record Benefits
Lemon Squeezy acts as the Merchant of Record (MoR). This means they handle global sales taxes, EU VAT compliance, localized payment methods, and automated invoicing on your behalf.

### Webhook Verification
Incoming webhook events at \`/api/webhooks/lemonsqueezy\` are verified using timing-safe HMAC SHA-256 signatures:

\`\`\`typescript
const hmac = crypto.createHmac("sha256", webhookSecret);
const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
if (!crypto.timingSafeEqual(digest, signatureBuffer)) {
  return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
}
\`\`\`

When a subscription is created or renewed, the user's status is synchronized directly into the PostgreSQL database.`,
  },
  {
    slug: "commercial-license-and-claim",
    category: "Integrations",
    title: "Commercial Licenses & Claim Portal",
    description: "Automated Lemon Squeezy order fulfillment, GitHub invitations, and license keys.",
    readTime: "4 min read",
    content: `### 1. Zero-Touch Commercial Fulfillment
When a customer purchases a commercial license via Lemon Squeezy, our automated fulfillment pipeline triggers instantly:
* **Order Created Event:** \`/api/webhooks/lemonsqueezy\` generates a cryptographically tracked License Key (e.g. \`KIT-XXXX-XXXX-XXXX\`).
* **Automated GitHub Access:** If the buyer supplied their GitHub handle at checkout, an automated collaborator invite is dispatched via GitHub API.
* **Transactional Delivery:** Resend sends a branded License Delivery email containing order credentials, quick start steps, and Discord access.

### 2. Self-Service Claim Portal
If a customer did not provide their GitHub username during checkout, they can claim or update access anytime at:
\`\`\`
/claim
\`\`\`
The portal validates the purchase email and license key against the \`licenses\` table, calls the GitHub REST API (\`PUT /repos/{owner}/{repo}/collaborators/{username}\`), and confirms invitation delivery.

### 3. CLI License Verification
Developers can register their commercial license key during setup:
\`\`\`bash
npm run setup
\`\`\`
The setup wizard stores \`SAAS_KIT_LICENSE_KEY\` in \`.env.local\`. When running upstream update syncs (\`npm run sync:upstream\`), the CLI verifies active license status.`,
  },
  {
    slug: "ai-sdk-and-studio",
    category: "Integrations",
    title: "Vercel AI SDK & Tool Calling",
    description: "Streaming LLM responses, custom generative tools, and AI Studio components.",
    readTime: "4 min read",
    content: `### Vercel AI SDK v7 Integration
The starter kit includes a pre-wired AI copilot workspace accessible at \`/dashboard/ai-studio\`.

### Available Tools
The assistant is equipped with server tools:
* \`getSaaSMetrics\`: Queries live MRR, subscriber count, and churn rates.
* \`recommendPricing\`: Analyzes user requirements and recommends tier packages.

### AI Elements Suite
* **CodeBlock:** Syntax-highlighted code with 1-click clipboard copy.
* **ReasoningDisplay:** Expandable accordion showing the model's chain-of-thought.
* **ModelSelector:** Real-time dropdown switching between GPT-4o Mini, GPT-4o, and o1 Mini.
* **SmartInput:** Auto-resizing textarea with abort/stop generation controls.`,
  },
  {
    slug: "fonts-and-theming",
    category: "Core Stack",
    title: "Fonts & Color Theming Customization",
    description:
      "Switch typography and primary color palettes in under 10 seconds without breaking styles.",
    readTime: "3 min read",
    content: `### 1. Switching Typography in 10 Seconds
All fonts are centralized in \`src/config/fonts.ts\`. Five Google Font presets are pre-configured:
* \`fontGeist\` (Default - Modern, clean, Vercel/Linear style)
* \`fontInter\` (Classic, balanced SaaS staple)
* \`fontJakarta\` (Plus Jakarta Sans - warm, trendy, high-converting)
* \`fontOutfit\` (Futuristic, friendly, consumer-facing)
* \`fontRoboto\` (Material standard, universal legibility)

To switch the entire application font, open \`src/config/fonts.ts\` and change the export:
\`\`\`typescript
// src/config/fonts.ts
export const fontSans = fontJakarta; // Change to fontInter, fontOutfit, etc.
\`\`\`
That's it! Next.js will automatically download, optimize, and self-host the font locally with 0 Cumulative Layout Shift (CLS).

### 2. Switching Color Palettes
Six production-ready theme presets are defined in \`src/config/themes.ts\` and \`src/app/globals.css\`:
* **Neutral Zinc (Default):** Minimalist high-contrast monochrome
* **Modern Violet (\`theme-violet\`):** Deep indigo-purple (Raycast / Supastarter style)
* **Emerald Green (\`theme-emerald\`):** FinTech and sustainable SaaS vibe
* **Ocean Blue (\`theme-blue\`):** Corporate and Enterprise B2B tech style
* **Sunset Orange (\`theme-orange\`):** High-converting amber palette (ShipFast style)
* **Cyber Rose (\`theme-rose\`):** Vibrant modern creator style

#### Method A: Apply Preset Class
Add any preset class to your \`<html>\` or \`<body>\` tag:
\`\`\`tsx
<html className="theme-violet">
\`\`\`

#### Method B: Customize Brand HSL Directly
In \`src/app/globals.css\`, update \`--primary\` and \`--ring\` under \`:root\` and \`.dark\` to your exact brand HSL values!`,
  },
  {
    slug: "public-api-and-webhooks",
    category: "Integrations",
    title: "Public REST API & Outgoing Webhooks",
    description:
      "Authenticate programmatic requests with Bearer sk_live_... tokens and verify HMAC SHA-256 webhook signatures with whsec_... secrets.",
    readTime: "5 min read",
    content: `### 1. Developer REST API Overview
The platform exposes public REST API endpoints at \`/api/v1/*\`. All requests require an Authorization header with a valid developer key generated in \`/dashboard/api-keys\`:

\`\`\`bash
Authorization: Bearer sk_live_your_api_key_here
\`\`\`

#### Endpoints Reference:
* \`GET /api/v1/me\`: Returns authenticated user profile, workspace organization, role, and subscription status.
* \`GET /api/v1/metrics\`: Returns team member count, active key count, and webhook configuration stats.
* \`POST /api/v1/events\`: Ingests external custom events and triggers subscribed outgoing webhooks.

#### Example Request (cURL):
\`\`\`bash
curl -X GET http://localhost:3000/api/v1/me \\
  -H "Authorization: Bearer sk_live_abcdef1234567890" \\
  -H "Accept: application/json"
\`\`\`

#### Example Ingesting Events (Node.js):
\`\`\`typescript
const response = await fetch("http://localhost:3000/api/v1/events", {
  method: "POST",
  headers: {
    "Authorization": "Bearer sk_live_abcdef1234567890",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    event: "lead.created",
    data: { email: "lead@client.com", value: 1200 },
  }),
});
const data = await response.json();
console.log(data);
\`\`\`

---

### 2. Outgoing Webhooks & HMAC Verification
When events occur within the SaaS (user registration, subscription renewal, team invitation, or custom events), automated HTTP POST requests are dispatched to your registered endpoints.

#### Headers Included in Webhooks:
* \`Content-Type: application/json\`
* \`X-Webhook-Event: <event-name>\` (e.g. \`user.created\`, \`test.ping\`)
* \`X-Webhook-Signature: sha256=<hex-digest>\`
* \`User-Agent: SaaS-Starter-Webhook/1.0\`

#### Verifying Signatures in Node.js / Express:
\`\`\`typescript
import crypto from "crypto";

function verifyWebhook(rawBody: string, signatureHeader: string, secret: string) {
  const [algo, signature] = signatureHeader.split("=");
  if (algo !== "sha256") return false;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature, "utf8"),
    Buffer.from(expectedSignature, "utf8")
  );
}
\`\`\`

#### Verifying Signatures in Python / FastAPI:
\`\`\`python
import hmac
import hashlib

def verify_webhook(raw_body: bytes, signature_header: str, secret: str) -> bool:
    try:
        algo, signature = signature_header.split("=")
        if algo != "sha256":
            return False
        
        expected = hmac.new(
            secret.encode("utf-8"),
            raw_body,
            hashlib.sha256
        ).hexdigest()
        
        return hmac.compare_digest(signature, expected)
    except Exception:
        return False
\`\`\``,
  },
  {
    slug: "docker-and-self-hosting",
    category: "Deployment",
    title: "Docker & Self-Hosting Guide",
    description:
      "Deploy your SaaS on Coolify, Railway, or any Linux VPS using standalone multi-stage Docker builds.",
    readTime: "4 min read",
    content: `### 1. Why Self-Host?
While Vercel is great for getting started, high traffic bandwidth and serverless function execution costs can add up quickly. 
Using our pre-configured Docker stack, you can self-host your entire application on a **$5/month Hetzner or DigitalOcean VPS** with **Coolify** or **Dokku**.

### 2. Multi-Stage Standalone Build
The included \`Dockerfile\` uses Next.js 16 standalone output:
* Strips unnecessary development dependencies and static overhead.
* Produces an ultra-lightweight Docker image (<180MB).
* Executes under a dedicated, low-privilege \`nextjs\` system user for security.

### 3. Running Locally with Docker Compose
To launch the full stack (Next.js 16 app + local PostgreSQL 16 + Redis 7) without needing any cloud accounts:

\`\`\`bash
docker compose up -d
\`\`\`

The services will be available at:
* **Web App:** http://localhost:3000
* **PostgreSQL:** \`localhost:5432\` (User: \`postgres\`, DB: \`saas_db\`)
* **Redis:** \`localhost:6379\`

### 4. Deploying to Coolify
1. In your Coolify dashboard, select **New Resource > Application > From Git Repository**.
2. Select your repository.
3. Coolify will auto-detect the root \`Dockerfile\`.
4. Add your production environment variables (\`DATABASE_URL\`, \`NEXT_PUBLIC_SUPABASE_URL\`, etc.).
5. Click **Deploy**!`,
  },
  {
    slug: "cron-and-automation",
    category: "Core Stack",
    title: "Background Cron Jobs & Automations",
    description:
      "Scheduled recurring tasks, secure RFC runner endpoint, and visual admin control room.",
    readTime: "4 min read",
    content: `### 1. Built-in Automation Workers
Automate critical maintenance tasks located in \`src/server/cron/jobs.ts\`:
* **webhook-retries**: Re-attempts failed outgoing webhooks with exponential backoff.
* **trial-reminders**: Identifies users with trials expiring in 3 days and sends reminder notifications.
* **db-cleanup**: Purges stale audit logs and expired invitations.

### 2. Secure Execution Endpoint
Cron jobs are invoked via an RFC-compliant API route:
\`\`\`bash
POST /api/cron/[job]
Headers:
  Authorization: Bearer <CRON_SECRET>
\`\`\`
Or for schedulers that only support GET queries:
\`\`\`bash
GET /api/cron/webhook-retries?secret=<CRON_SECRET>
\`\`\`

### 3. Admin Visual Control Room
Super Admins can view job execution histories, status logs, durations, and trigger manual on-demand runs directly at \`/admin/jobs\`.`,
  },
  {
    slug: "internationalization-i18n",
    category: "Core Stack",
    title: "Internationalization (i18n)",
    description:
      "Multilingual engine supporting 5 languages with zero-flicker cookie synchronization.",
    readTime: "3 min read",
    content: `### 1. Supported Languages
The starter kit includes complete localized dictionaries for:
* **English** (\`en\`) - Default
* **Spanish** (\`es\`)
* **German** (\`de\`)
* **French** (\`fr\`)
* **Hindi** (\`hi\`)

### 2. Using Dictionaries in Server Components
\`\`\`tsx
import { getServerDictionary } from "@/lib/i18n/server";

export default async function MyPage() {
  const { dictionary, locale } = await getServerDictionary();
  return <h1>{dictionary.dashboard.overview}</h1>;
}
\`\`\`

### 3. Using Dictionaries in Client Components
\`\`\`tsx
"use client";
import { useI18n } from "@/lib/i18n/context";

export function MyWidget() {
  const { dictionary, locale, setLocale } = useI18n();
  return <button onClick={() => setLocale("es")}>{dictionary.common.save}</button>;
}
\`\`\`

### 4. Language Switcher
Drop in the responsive switcher anywhere in your application:
\`\`\`tsx
<LanguageSwitcher variant="header" /> // Or "card" | "icon"
\`\`\``,
  },
  {
    slug: "paywall-and-feature-gating",
    category: "Core Stack",
    title: "Subscription Paywalls & Feature Gating",
    description:
      "Gate premium routes, components, and server actions based on active subscription tiers.",
    readTime: "4 min read",
    content: `### 1. Overview
The starter kit includes an enterprise-grade **Paywall** engine that allows gating any dashboard page, modal, or component based on the user's active billing tier.

### 2. The <Paywall /> Component
Wrap any UI element with the \`<Paywall />\` component:
\`\`\`tsx
import { Paywall } from "@/components/dashboard/paywall";

<Paywall
  isAllowed={isSubscribed}
  requiredTier="pro" // "pro" or "enterprise"
  featureTitle="AI Copilot & Tool Calling"
  featureDescription="Upgrade to Pro to unlock unlimited generative tools and streaming."
  variant="blur" // "blur" (frosted glass lock overlay) or "card" (standalone banner)
>
  <AICopilotStudio />
</Paywall>
\`\`\`

### 3. Server-Side Tier Checking
Verify user subscription status inside Server Components or Server Actions:
\`\`\`ts
import { getSubscriptionStatus, satisfiesPlanTier } from "@/lib/billing/paywall";

const { tier, isSubscribed } = await getSubscriptionStatus(userId);
const hasAccess = satisfiesPlanTier(tier, "pro");
\`\`\`

### 4. Self-Serve Customer Portal
Subscribers can upgrade, cancel, or download invoices anytime through the Lemon Squeezy Customer Portal at \`/dashboard/billing\`.`,
  },
  {
    slug: "ai-agent-skills-guide",
    category: "Core Stack",
    title: "AI Coding Agent Skills Specification",
    description:
      "Empower autonomous AI coding assistants (Cursor, Claude Code, Antigravity) with structured skills.",
    readTime: "3 min read",
    content: `### 1. Autonomous Agent Support
The starter kit includes standardized **Agent Skills** located in \`.agent/skills/\` and registered in \`AGENTS.md\`.

### 2. Included Agent Skills
* **add-a-feature-module.md**: Complete recipe for scaffolding a new feature from database schema to UI and sidebar navigation.
* **add-paywall-gating.md**: Implementing subscription paywalls and server tier authorization.
* **database-schema-change.md**: Safe Drizzle ORM PostgreSQL migrations, relations, and indexes.
* **add-translations.md**: Adding i18n localization keys across English, Spanish, German, French, and Hindi.
* **add-email-template.md**: Creating React Email templates and dispatching via Resend.

### 3. Feature Scaffolding CLI
Developers and agents can instantly scaffold new features via the CLI:
\`\`\`bash
npm run create:feature <feature-name>
\`\`\`
This automatically generates:
1. Server Actions in \`src/server/actions/<name>.ts\`
2. UI Manager Component in \`src/components/dashboard/<name>-manager.tsx\`
3. Dashboard Page in \`src/app/(dashboard)/dashboard/<name>/page.tsx\``,
  },
  {
    slug: "onboarding-wizard",
    category: "Core Stack",
    title: "Interactive Multi-Step Onboarding Wizard",
    description:
      "Guide new signups through workspace setup, user persona selection, and teammate invitations.",
    readTime: "3 min read",
    content:
      '### 1. High-Converting User Onboarding\nIn top-tier SaaS platforms, new users are guided through an interactive, distraction-free onboarding wizard before entering their workspace.\n\n### 2. Built-in Wizard Flow (`/onboarding`)\n1. **Step 1: Workspace Setup**: Creates the organization, auto-generates slug, and selects workspace brand accent.\n2. **Step 2: Role & Persona**: Captures user role (Founder, Engineer, PM, Designer), company size, and project goal.\n3. **Step 3: Team Collaboration**: Invites co-workers via email tokens with a 1-click "Skip for now" option.\n4. **Step 4: Celebration**: Confirms setup and transitions smoothly to `/dashboard`.\n\n### 3. Architecture & Code Locations\n* **Route**: `src/app/onboarding/page.tsx` & `src/app/onboarding/layout.tsx`\n* **Interactive UI**: `src/components/onboarding/onboarding-wizard.tsx`\n* **Server Actions**: `src/server/actions/onboarding.ts` (`completeOnboardingAction`, `skipOnboardingAction`, `getOnboardingState`)\n* **Database Models**: `profiles.onboardingCompleted`, `profiles.rolePersona`, `organizations.logoUrl` in `src/db/schema.ts`\n\n### 4. Customizing Onboarding Steps\nYou can add extra questions (e.g. tech stack, industry, referral source) by extending `profiles` in `src/db/schema.ts` and editing the steps in `src/components/onboarding/onboarding-wizard.tsx`.',
  },
  {
    slug: "dynamic-og-generator",
    category: "Integrations",
    title: "Dynamic Social OpenGraph (OG) Image Generator",
    description:
      "Automated 1200x630 social preview cards generated on the fly with Next.js ImageResponse.",
    readTime: "3 min read",
    content: `### 1. What is Dynamic OG Generation?
Whenever someone shares your SaaS link on Twitter/X, LinkedIn, Slack, Discord, or WhatsApp, social media platforms inspect the page's \`<meta property="og:image">\` tag to render an attractive preview card.

Instead of manually designing static PNG images in Figma for every single blog post, doc page, and landing page, our starter kit dynamically generates high-fidelity branded cards on demand using **Next.js ImageResponse**.

### 2. The \`/api/og\` Endpoint
The generator is accessible at \`/api/og\` and accepts the following query parameters:
* \`title\`: The main card headline (auto-scaled and truncated for optimal visual balance).
* \`description\` / \`subtitle\`: Secondary summary or subtitle text.
* \`badge\` / \`category\`: Pill label shown in the top right corner (e.g., "Blog", "Documentation", "Feature").
* \`author\`: Author name or company attribution in the bottom watermark.

#### Example URL:
\`\`\`
/api/og?title=How+to+Ship+a+SaaS+in+7+Days&badge=Engineering&author=Marc+Dev
\`\`\`

### 3. Automatic Hookup in Metadata
Pages define dynamic OG cards within Next.js \`generateMetadata\`:

\`\`\`tsx
export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  const ogParams = new URLSearchParams({
    title: post.title,
    description: post.description,
    badge: "Blog",
    author: post.author.name,
  });
  const ogImageUrl = \`/api/og?\${ogParams.toString()}\`;

  return {
    title: post.title,
    openGraph: {
      title: post.title,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImageUrl],
    },
  };
}
\`\`\`

### 4. Edge Caching & Performance
Generated images are served with HTTP 200 and cached with \`Cache-Control: public, max-age=86400, s-maxage=86400\` to ensure instant edge delivery for social media bots and crawlers without repetitive server computation.`,
  },
  {
    slug: "mcp-server-guide",
    category: "Core Stack",
    title: "AI Agent MCP Server Integration",
    description:
      "Connect Cursor, Claude Code, Windsurf, and AI coding agents directly to the codebase via Model Context Protocol.",
    readTime: "3 min read",
    content: `### 1. Why Built-in MCP?
The Model Context Protocol (MCP) allows modern AI IDEs and autonomous coding agents (Cursor, Claude Code, Windsurf, Antigravity) to introspect your codebase dynamically instead of relying on out-of-date training data.

### 2. Starting the MCP Server
Launch the server via standard I/O (stdio):
\`\`\`bash
npm run mcp
\`\`\`

### 3. IDE Configuration
Add the server configuration to your IDE's MCP settings:

#### Cursor (\`.cursor/mcp.json\`):
\`\`\`json
{
  "mcpServers": {
    "saas-starter": {
      "command": "node",
      "args": ["-r", "tsx/cjs", "scripts/mcp-server.ts"]
    }
  }
}
\`\`\`

#### Claude Desktop (\`claude_desktop_config.json\`):
\`\`\`json
{
  "mcpServers": {
    "saas-starter": {
      "command": "npx",
      "args": ["tsx", "scripts/mcp-server.ts"],
      "cwd": "/path/to/website-starterKit"
    }
  }
}
\`\`\`

### 4. Provided MCP Tools
* **get_stack_info**: Returns framework versions, database, auth provider, and billing setup.
* **get_database_schema**: Introspects all Drizzle ORM PostgreSQL tables, columns, and relations.
* **list_api_routes**: Inspects public REST API v1, webhook handlers, cron endpoints, and AI streaming routes.
* **list_server_actions**: Catalogs all Server Actions categorized by domain (auth, billing, team, admin, media).`,
  },
  {
    slug: "cloudinary-media-suite",
    category: "Integrations",
    title: "Cloudinary Signed Media & Optimization",
    description:
      "Secure direct browser-to-CDN uploads, automatic WebP/AVIF formatting, and asset management.",
    readTime: "3 min read",
    content: `### 1. Direct Signed Uploads Architecture
Unlike legacy backends that route multi-megabyte image binaries through Node.js memory, this starter kit uses **direct signed uploads**:
1. Client requests a cryptographic upload signature from Server Action \`generateUploadSignatureAction\`.
2. Browser uploads directly to Cloudinary's global edge network via HTTPS POST.
3. Once completed, client confirms asset details via \`saveMediaAssetAction\`, saving metadata to PostgreSQL (\`media_assets\` table).

### 2. Environment Variables Setup
Obtain your credentials from the Cloudinary Console:
\`\`\`bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
\`\`\`

### 3. Auto Format & Quality Optimization
Assets served via Cloudinary automatically leverage \`f_auto,q_auto\` URL transforms, delivering AVIF/WebP formats with up to 70% bandwidth reduction without quality degradation.

### 4. Interactive Media Manager
Manage, copy CDN URLs, and delete assets inside \`/dashboard/media\`. RBAC and organization isolation are strictly enforced.`,
  },
  {
    slug: "background-crons",
    category: "Core Stack",
    title: "Automated Background Cron Jobs",
    description:
      "Scheduled background worker tasks with timing-safe HTTP authentication and visual admin control.",
    readTime: "3 min read",
    content: `### 1. Built-in Background Workers
The starter kit includes 3 production-ready scheduled background jobs defined in \`src/server/cron/jobs.ts\`:
* **webhook-retries**: Automatically re-attempts pending or failed outgoing webhooks with exponential backoff.
* **trial-reminders**: Queries users whose trials expire in 3 days and sends reminder notifications.
* **db-cleanup**: Purges soft-deleted records, expired tokens, and obsolete audit events older than 90 days.

### 2. Secure Route Authentication
Jobs are triggered via \`POST /api/cron/[job]\`. Authentication uses timing-safe constant-time comparison against \`CRON_SECRET\`:
\`\`\`bash
curl -X POST https://your-domain.com/api/cron/webhook-retries \\
  -H "Authorization: Bearer your-cron-secret-token"
\`\`\`

### 3. Admin Visual Control Room (\`/admin/jobs\`)
Super Admins can view job execution status, last run timestamps, and trigger manual "Run Now" executions directly from the UI without terminal access.

### 4. Production Cron Triggers (Vercel Cron)
Add to your \`vercel.json\`:
\`\`\`json
{
  "crons": [
    {
      "path": "/api/cron/webhook-retries",
      "schedule": "*/15 * * * *"
    },
    {
      "path": "/api/cron/trial-reminders",
      "schedule": "0 9 * * *"
    }
  ]
}
\`\`\``,
  },
  {
    slug: "i18n-multilingual-engine",
    category: "Core Stack",
    title: "Multi-Language Internationalization (i18n)",
    description:
      "Enterprise localization system supporting English, Spanish, German, French, and Hindi with cookie sync.",
    readTime: "3 min read",
    content: `### 1. Multi-Language Engine
Expand your SaaS reach globally with built-in multi-language dictionaries:
* **English** (\`en\`) - Default
* **Spanish** (\`es\`)
* **German** (\`de\`)
* **French** (\`fr\`)
* **Hindi** (\`hi\`)

### 2. Zero-Flicker Cookie Sync
Language preference is stored in the \`NEXT_LOCALE\` cookie and synced with the Zustand app store.

### 3. Usage in Components
#### Server Components:
\`\`\`tsx
import { getServerDictionary } from "@/lib/i18n/server";

export default async function Page() {
  const { dictionary } = await getServerDictionary();
  return <h1>{dictionary.dashboard.overview}</h1>;
}
\`\`\`

#### Client Components:
\`\`\`tsx
"use client";
import { useI18n } from "@/lib/i18n/context";

export function Widget() {
  const { dictionary, locale, setLocale } = useI18n();
  return <button onClick={() => setLocale("es")}>{dictionary.nav.signIn}</button>;
}
\`\`\`

### 4. Adding a New Language
1. Create a dictionary file in \`src/lib/i18n/dictionaries/<lang>.ts\`.
2. Register the language code in \`src/lib/i18n/config.ts\`.
3. Add the dictionary export to \`src/lib/i18n/dictionaries/index.ts\`.`,
  },
  {
    slug: "developer-api-webhooks",
    category: "Integrations",
    title: "Developer REST API & Outgoing Webhooks",
    description:
      "Public REST API v1 with cryptographically hashed API keys and HMAC-signed webhook dispatches.",
    readTime: "4 min read",
    content: `### 1. Public REST API v1
Developers can integrate programmatically with your SaaS platform:
* \`GET /api/v1/me\`: Returns authenticated user profile, organization, and subscription status.
* \`GET /api/v1/metrics\`: Returns organization KPI telemetry and resource counts.
* \`POST /api/v1/events\`: Ingests custom tracking events and triggers configured webhooks.

### 2. API Key Management
Users generate API keys inside \`/dashboard/api-keys\`:
* Keys are prefixed with \`sk_live_\` and hashed via SHA-256 before storage in PostgreSQL.
* The raw secret is revealed **only once** inside a secure modal with 1-click clipboard copy.

### 3. Sliding-Window Rate Limiting
All public API routes are protected by a sliding-window token bucket rate limiter:
* Limits requests per IP / Token.
* Returns standard \`X-RateLimit-Limit\`, \`X-RateLimit-Remaining\`, and \`429 Too Many Requests\` headers.

### 4. Outgoing Webhooks Platform
Users can register webhook URLs in \`/dashboard/webhooks\`:
* Payloads are signed with HMAC SHA-256 using an organization secret (\`whsec_...\`).
* Dispatches include \`X-Signature-SHA256\` and \`X-Webhook-Event\` headers.
* Live ping button allows testing endpoint connectivity directly from the UI.`,
  },
  {
    slug: "enterprise-audit-logs",
    category: "Core Stack",
    title: "Enterprise Activity & Audit Logs",
    description:
      "Immutable compliance audit trail tracking security events, team modifications, and API operations.",
    readTime: "3 min read",
    content: `### 1. Why Enterprise Audit Logging?
For B2B SaaS customers and security compliance frameworks (SOC2, GDPR, ISO 27001, HIPAA), having an immutable, tamper-resistant record of who did what, when, and from where is a non-negotiable requirement.

### 2. Tracked Events & Architecture
Audit logs are stored in PostgreSQL via the \`activity_logs\` table. The system automatically records:
* **Authentication**: User logins (\`user.login\`), signups (\`user.signup\`), password resets.
* **Team & RBAC**: Member invitations (\`team.member_invited\`), removals (\`team.member_removed\`), role updates.
* **API Credentials**: API key generation (\`api_key.created\`) and revocations (\`api_key.revoked\`).
* **Media Assets**: Cloudinary signed uploads (\`media.uploaded\`) and asset deletions (\`media.deleted\`).
* **Onboarding**: Wizard flow completions (\`onboarding.completed\`).

### 3. Non-Blocking Activity Logger
All Server Actions record activity via a universal, non-blocking helper in \`src/lib/activity-logger.ts\`:

\`\`\`tsx
import { logActivity } from "@/lib/activity-logger";

await logActivity({
  userId: user.id,
  organizationId: org.id,
  action: "team.member_invited",
  entityType: "team",
  description: \`Invited \${email} as \${role}\`,
  metadata: { email, role },
});
\`\`\`

Client IP addresses (\`x-forwarded-for\`, \`x-real-ip\`) and User-Agents are automatically captured from request headers.

### 4. Interactive Log Viewer & Export
Users and workspace admins can review events at \`/dashboard/activity\`:
* Filter by Category (All, Auth, Team, API Keys, Media, Onboarding).
* Real-time search across event descriptions, users, and IP addresses.
* 1-Click Compliance Export to **CSV** or **JSON** for external auditing.`,
  },
];

export function getAllDocs() {
  return DOC_ARTICLES;
}

export function getDocBySlug(slug: string) {
  return DOC_ARTICLES.find((doc) => doc.slug === slug);
}
