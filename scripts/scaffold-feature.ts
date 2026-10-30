#!/usr/bin/env node

/**
 * SaaS Feature Scaffolding CLI
 * Automatically scaffolds a production-ready Next.js 16 feature module:
 * - Server Action in src/server/actions/<name>.ts
 * - UI Manager component in src/components/dashboard/<name>-manager.tsx
 * - Dashboard route in src/app/(dashboard)/dashboard/<name>/page.tsx
 *
 * Usage:
 *   npx tsx scripts/scaffold-feature.ts <feature-name>
 * Example:
 *   npx tsx scripts/scaffold-feature.ts projects
 */

import fs from "fs";
import path from "path";

const featureArg = process.argv[2];

if (!featureArg) {
  console.log(`
Usage:
  npx tsx scripts/scaffold-feature.ts <feature-name>

Example:
  npx tsx scripts/scaffold-feature.ts projects
  npx tsx scripts/scaffold-feature.ts documents
`);
  process.exit(1);
}

const featureName = featureArg.toLowerCase().replace(/[^a-z0-9_-]/g, "");
const featureTitle = featureName
  .split("-")
  .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
  .join(" ");

const rootDir = process.cwd();

// 1. Generate Server Actions: src/server/actions/<featureName>.ts
const actionsDir = path.join(rootDir, "src", "server", "actions");
const actionFile = path.join(actionsDir, `${featureName}.ts`);

const actionContent = `"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface ${featureTitle.replace(/\s+/g, "")}Item {
  id: string;
  title: string;
  createdAt: string;
}

// In-memory or database query action
export async function get${featureTitle.replace(/\s+/g, "")}ItemsAction(): Promise<${featureTitle.replace(/\s+/g, "")}Item[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  // TODO: Replace with db.query.${featureName}.findMany({ where: eq(...) })
  return [
    { id: "1", title: "Example ${featureTitle} Alpha", createdAt: new Date().toISOString() },
    { id: "2", title: "Example ${featureTitle} Beta", createdAt: new Date().toISOString() },
  ];
}

export async function create${featureTitle.replace(/\s+/g, "")}Action(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  if (!title) {
    return { error: "Title is required." };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    // TODO: Insert into database via db.insert(${featureName}).values(...)
    revalidatePath("/dashboard/${featureName}");
    return { success: true };
  } catch (error) {
    console.error("Failed to create ${featureName}:", error);
    return { error: "Operation failed." };
  }
}
`;

// 2. Generate UI Component: src/components/dashboard/<featureName>-manager.tsx
const componentsDir = path.join(rootDir, "src", "components", "dashboard");
const componentFile = path.join(componentsDir, `${featureName}-manager.tsx`);

const componentContent = `"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { create${featureTitle.replace(/\s+/g, "")}Action, type ${featureTitle.replace(/\s+/g, "")}Item } from "@/server/actions/${featureName}";
import { Plus, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  initialItems: ${featureTitle.replace(/\s+/g, "")}Item[];
}

export function ${featureTitle.replace(/\s+/g, "")}Manager({ initialItems }: Props) {
  const [items, setItems] = useState<${featureTitle.replace(/\s+/g, "")}Item[]>(initialItems);
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", title.trim());

    try {
      const res = await create${featureTitle.replace(/\s+/g, "")}Action(formData);
      if (res.error) {
        toast.error(res.error);
      } else {
        setItems((prev) => [
          ...prev,
          { id: Math.random().toString(), title: title.trim(), createdAt: new Date().toISOString() },
        ]);
        setTitle("");
        toast.success("${featureTitle} item created!");
      }
    } catch {
      toast.error("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-bold">Add New ${featureTitle}</CardTitle>
          <CardDescription className="text-xs">
            Create and track new ${featureName} items under your active workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              placeholder="Enter title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="max-w-md"
            />
            <Button type="submit" disabled={isSubmitting || !title.trim()} size="sm" className="gap-1.5">
              {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
              Create
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-bold">All ${featureTitle} Items</CardTitle>
          <CardDescription className="text-xs">Manage and inspect your registered items.</CardDescription>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <p className="text-muted-foreground text-xs py-4 text-center">No items found.</p>
          ) : (
            <div className="divide-y rounded-lg border">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="text-primary h-3.5 w-3.5" />
                    <span className="font-semibold">{item.title}</span>
                  </div>
                  <span className="text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
`;

// 3. Generate Dashboard Page: src/app/(dashboard)/dashboard/<featureName>/page.tsx
const pageDir = path.join(rootDir, "src", "app", "(dashboard)", "dashboard", featureName);
const pageFile = path.join(pageDir, "page.tsx");

const pageContent = `import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { get${featureTitle.replace(/\s+/g, "")}ItemsAction } from "@/server/actions/${featureName}";
import { ${featureTitle.replace(/\s+/g, "")}Manager } from "@/components/dashboard/${featureName}-manager";
import { Paywall } from "@/components/dashboard/paywall";
import { getSubscriptionStatus } from "@/lib/billing/paywall";

export default async function ${featureTitle.replace(/\s+/g, "")}Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const items = await get${featureTitle.replace(/\s+/g, "")}ItemsAction();
  const { isSubscribed } = await getSubscriptionStatus(user.id);

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">${featureTitle}</h1>
        <p className="text-muted-foreground mt-1">
          Manage your ${featureName} items, workspace collaboration, and configurations.
        </p>
      </div>

      <Paywall
        isAllowed={true /* Set to isSubscribed to require paid subscription */}
        requiredTier="pro"
        featureTitle="${featureTitle} Pro Access"
        featureDescription="Upgrade to Pro to manage unlimited ${featureName}."
      >
        <${featureTitle.replace(/\s+/g, "")}Manager initialItems={items} />
      </Paywall>
    </div>
  );
}
`;

// Ensure directories exist and write files
fs.mkdirSync(actionsDir, { recursive: true });
fs.mkdirSync(componentsDir, { recursive: true });
fs.mkdirSync(pageDir, { recursive: true });

fs.writeFileSync(actionFile, actionContent, "utf8");
fs.writeFileSync(componentFile, componentContent, "utf8");
fs.writeFileSync(pageFile, pageContent, "utf8");

console.log(`
✅ Successfully scaffolded feature "${featureName}":
  1. Server Action:    src/server/actions/${featureName}.ts
  2. UI Component:     src/components/dashboard/${featureName}-manager.tsx
  3. Dashboard Page:   src/app/(dashboard)/dashboard/${featureName}/page.tsx

Next Steps:
  - Add navigation link to src/app/(dashboard)/layout.tsx
  - Add route command to src/components/command-palette.tsx
  - (Optional) Define database table in src/db/schema.ts
`);
