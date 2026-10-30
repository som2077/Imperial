<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## SaaS Starter Kit - AI Agent Architecture Guide

This starter kit is engineered for autonomous AI coding agents (Claude Code, Cursor, Gemini CLI).

### Built-in MCP Server

You can query this codebase using our built-in Model Context Protocol (MCP) server:

```bash
npm run mcp
```

Available MCP Tools:

- `get_stack_info`: Returns framework versions, auth, database, and billing setup.
- `get_database_schema`: Introspects all Drizzle ORM PostgreSQL tables and columns.
- `list_api_routes`: Inspects REST API v1, Webhook receivers, and AI streaming routes.
- `list_server_actions`: Lists available server actions for auth, mfa, team, billing, admin, and gdpr.

### Core Architectural Patterns

- **Framework**: Next.js 16 with App Router, React 19, Server Actions (`src/server/actions/*`).
- **Styling**: Tailwind CSS v4 (`@theme inline`), CSS Variables, Shadcn UI patterns.
- **Database**: Drizzle ORM (`src/db/schema.ts`, `src/db/index.ts`) with PostgreSQL.
- **Authentication**: Supabase SSR (`src/lib/supabase/*`) with Passwords, Magic Links, MFA TOTP, and OAuth.
- **Bot Protection**: Cloudflare Turnstile Captcha (`src/components/turnstile-captcha.tsx`, `src/lib/captcha.ts`).
- **Client State**: Zustand with LocalStorage persist middleware (`src/lib/store/use-app-store.ts`).
- **Media & Storage**: Cloudinary signed uploads (`src/lib/cloudinary/*`, `src/server/actions/media.ts`) with auto WebP/AVIF optimization.
- **Automation & Crons**: Scheduled background task runner (`src/server/cron/jobs.ts`, `/api/cron/[job]`) with `/admin/jobs` visual control room.
- **Internationalization (i18n)**: Multi-language engine (`src/lib/i18n/*`) supporting EN, ES, DE, FR, HI with cookie & Zustand sync.
- **Testing**: Playwright E2E suite (`npm run test:e2e` - 9/9 specs passing).
- **Code Quality**: Prettier + Tailwind plugin, ESLint, TypeScript Strict (`npm run check`).

### Standardized Agent Skills (`.agent/skills/`)

Autonomous coding agents should consult our standardized skills before performing changes:

- [`add-a-feature-module.md`](.agent/skills/add-a-feature-module.md): Scaffolds new SaaS feature modules from database to UI.
- [`add-paywall-gating.md`](.agent/skills/add-paywall-gating.md): Implements `<Paywall />` component and server tier authorization.
- [`database-schema-change.md`](.agent/skills/database-schema-change.md): Safe Drizzle ORM model changes, indexes, and relations.
- [`add-translations.md`](.agent/skills/add-translations.md): Adding localization keys across all 5 language dictionaries.
- [`add-email-template.md`](.agent/skills/add-email-template.md): Authoring React Email templates and Resend dispatchers.
