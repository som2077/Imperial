---
name: database-schema-change
description: Safely modify or extend PostgreSQL database models, columns, relations, and indexes using Drizzle ORM.
---

# Skill: Database Schema Changes (Drizzle ORM)

This skill guides an AI agent through updating database models in `src/db/schema.ts`.

## 1. Defining Tables

Always use `pgTable` from `drizzle-orm/pg-core`:

```ts
export const projectTasks = pgTable(
  "project_tasks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    status: text("status").default("todo").notNull(), // 'todo' | 'in_progress' | 'done'
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_project_tasks_user_id").on(table.userId),
    index("idx_project_tasks_status").on(table.status),
  ]
);
```

## 2. Defining Relational Queries

Link models together so `db.query.<tableName>.findFirst({ with: { ... } })` works:

```ts
export const projectTasksRelations = relations(projectTasks, ({ one }) => ({
  user: one(profiles, {
    fields: [projectTasks.userId],
    references: [profiles.id],
  }),
}));
```

## 3. Pushing Changes

Run Drizzle Kit to apply migrations immediately to your Supabase/Postgres instance:

```bash
npm run db:push
```

To visually introspect tables and test data:

```bash
npm run db:studio
```
