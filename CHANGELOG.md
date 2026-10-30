# Changelog 📦

All notable changes to the **SaaS Starter Kit** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [3.3.0] - 2026-10-11

### Added

- **CLI Project Renamer & Rebranding Tool** (`npm run rename`): Interactive terminal wizard to rebrand project names, package slugs, descriptions, support emails, and creator handles in 1 click across `package.json`, `src/config/site.ts`, and i18n dictionaries.
- **Enterprise Activity & Audit Logs** (`/dashboard/activity`): Full SOC2-compliant immutable event log tracking user signins, invitations, API key generations, and team mutations with JSON/CSV export.
- **Open-Source Repository Excellence Suite**: `.github/workflows/ci.yml`, issue templates, PR template, `CONTRIBUTING.md`, `SECURITY.md`, and automated setup runner.
- **Prettier & Git Ignores Hardening**: Added auto-generated `drizzle/` migrations and `.react-email` to ignore configs to maintain 100% clean lint checks.

---

## [3.2.0] - 2026-10-10

### Added

- **Dynamic OpenGraph (OG) Engine** (`/api/og`): `@vercel/og` ImageResponse generator producing on-the-fly 1200x630 branded social cards for Blog, Documentation, and Landing.
- **Interactive Multi-Step Onboarding Wizard** (`/onboarding`): 4-step wizard capturing workspace details, role personas, team invitations, and setup celebrations.
- **Developer Documentation Center**: 17 comprehensive guides (`/docs`) with categorized navigation, syntax highlighting, and prev/next pagination.

### Changed

- Refactored `layout.tsx` metadata and dashboard headers to consume dynamic `siteConfig` values as a Single Source of Truth.

---

## [3.1.0] - 2026-10-09

### Added

- **Vercel AI SDK Copilot Studio** (`/dashboard/ai-studio`): Multi-turn conversational copilot with model picker (`gpt-4o`, `o1-mini`), streaming, and Generative UI metrics tools.
- **Cloudinary Dynamic Media Manager** (`/dashboard/media`): Signed uploads with auto WebP/AVIF optimizations and direct deletion.
- **Background Cron Automations** (`/admin/jobs`): Scheduled task runner executing webhook retries, trial reminders, and database cleanup.

---

## [3.0.0] - 2026-10-08

### Added

- **Internationalization (i18n)**: 5 supported languages (English, Spanish, German, French, Hindi) with cookie persistence and language dropdown.
- **Super Admin Control Room** (`/admin`): Live platform analytics, user directory, 1-click customer impersonation, and transactional email inspector.
- **B2B Multi-Tenancy**: Organization switcher, role-based access control (Owner, Admin, Member), and pending invitations manager.

---

## [2.0.0] - 2026-10-01

### Added

- **Next.js 16 App Router & React 19 Core**: Turbopack engine with Server Actions.
- **Supabase SSR Authentication**: Passwords, Magic Links OTP, and Google/GitHub OAuth.
- **Drizzle ORM & PostgreSQL**: Relational schema, connection pooling, and Drizzle Studio.
- **Lemon Squeezy Billing Engine**: Webhook synchronization and paywall feature gating.
