---
name: add-a-feature-module
description: Add a complete, production-ready SaaS product feature module with database schema, server actions, UI components, and dashboard navigation.
---

# Skill: Add a Feature Module

This skill guides an AI agent through adding a complete feature module to the Next.js 16 SaaS Starter Kit.

## Workflow Checklist

1. **Database Schema (`src/db/schema.ts`)**:
   - Define the new PostgreSQL table using `pgTable`.
   - Add relational foreign keys (e.g. `userId` referencing `profiles.id` with `{ onDelete: "cascade" }`).
   - Add B-tree indexes for high-frequency queries (e.g. `index("idx_feature_user_id").on(table.userId)`).
   - Export relations if applicable using `relations(newTable, ({ one, many }) => ({ ... }))`.
   - Synchronize schema: `npm run db:push`.

2. **Server Actions (`src/server/actions/<feature>.ts`)**:
   - Add `"use server"` directive at the top.
   - Guard session via `createClient()` and `supabase.auth.getUser()`.
   - Perform type-safe Drizzle operations wrapped in `try/catch`.
   - Call `revalidatePath("/dashboard/<feature>")` on mutations.
   - Return clean `{ success: true, data }` or `{ error: string }`.

3. **Feature UI Component (`src/components/dashboard/<feature>-manager.tsx`)**:
   - Add `"use client"` directive.
   - Use shadcn/ui components (`Card`, `Button`, `Input`, `Dialog`, `Badge`).
   - Trigger server actions via standard forms or optimistic transitions.
   - Use `sonner` (`toast.success` / `toast.error`) for feedback.

4. **Dashboard Page (`src/app/(dashboard)/dashboard/<feature>/page.tsx`)**:
   - Fetch data in the Server Component.
   - Optionally wrap premium features in `<Paywall isAllowed={isSubscribed} requiredTier="pro">`.
   - Render the client manager component.

5. **Navigation & Command Palette**:
   - Add the navigation link into `src/app/(dashboard)/layout.tsx`.
   - Register the quick jump command in `src/components/command-palette.tsx`.
   - Add localized dictionary keys to `src/lib/i18n/dictionaries/*`.
