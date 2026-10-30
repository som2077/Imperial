import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { apiKeys } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { ApiKeysManager } from "./api-keys-manager";
import type { ApiKey } from "@/db/schema";

export const metadata = {
  title: "API Keys | Developer Settings",
  description: "Manage secret API keys for programmatic access.",
};

export default async function ApiKeysPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userKeys: ApiKey[] = [];
  if (user) {
    try {
      userKeys = await db.query.apiKeys.findMany({
        where: eq(apiKeys.userId, user.id),
        orderBy: [desc(apiKeys.createdAt)],
      });
    } catch (e) {
      console.warn("Database query skipped or not connected:", e);
    }
  }

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Developer API Keys</h1>
        <p className="text-muted-foreground mt-1">
          Manage your programmatic secret keys and authenticate external requests.
        </p>
      </div>

      <ApiKeysManager initialKeys={userKeys} />
    </div>
  );
}
