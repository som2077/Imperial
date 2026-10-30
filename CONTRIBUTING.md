# Contributing to SaaS Starter Kit 🤝

Thank you for your interest in contributing to the **SaaS Starter Kit**! We welcome bug reports, pull requests, and architectural proposals from the community.

---

## 🛠️ Local Development Setup

### 1. Prerequisites

- **Node.js**: `v20.x` or higher (`node -v`)
- **Package Manager**: `npm` (or `pnpm` / `bun`)
- **Docker** (Optional, for local PostgreSQL): Docker Desktop or Docker Engine

### 2. Fork and Clone

```bash
git clone https://github.com/som2077/saas-kit-website.git
cd SAAS-Kit
npm install
```

### 3. Initialize Local Environment

Run the interactive setup wizard:

```bash
npm run setup
```

Or manually copy environment variables:

```bash
cp .env.example .env.local
```

### 4. Push Schema & Launch Dev Server

```bash
npm run db:push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your local instance.

---

## 📐 Coding Standards & Conventions

To maintain production-grade quality, every contribution must satisfy our strict quality gates:

1. **Framework & Engine**:
   - Use Next.js 16 App Router conventions (`layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`).
   - Mutations must utilize Next.js Server Actions (`src/server/actions/*`) with proper authentication and revalidation.
2. **Styling**:
   - Tailwind CSS v4 with CSS variables and `@theme inline`.
   - Shadcn UI component patterns.
3. **Database**:
   - Drizzle ORM models in `src/db/schema.ts`. Always run `npm run db:generate` to produce schema migration files.
4. **State Management**:
   - Client state in Zustand (`src/lib/store/use-app-store.ts`).

---

## 🧪 Testing & Verification

Before submitting any Pull Request, ensure that the entire quality suite passes:

```bash
# 1. Run all lint, formatting, and TypeScript strict checks
npm run check

# 2. Run Playwright End-to-End tests
npm run test:e2e

# 3. Verify production compilation
npm run build
```

---

## 🌿 Git Branch & Commit Conventions

- Create descriptive feature branches:
  - `feat/feature-name`
  - `fix/bug-description`
  - `docs/guide-name`
  - `refactor/component-name`
- Write clear, semantic commit messages (e.g., `feat: add activity logs export to CSV`, `fix: handle edge case in auth redirection`).

---

## 📜 License

By contributing to this repository, you agree that your contributions will be licensed under the [MIT License](LICENSE).
