import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { SettingsForm } from "./settings-form";
import { ThemeCustomizer } from "@/components/dashboard/theme-customizer";
import { MfaManager } from "@/components/dashboard/mfa-manager";
import { GdprManager } from "@/components/dashboard/gdpr-manager";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { getServerDictionary } from "@/lib/i18n/server";

export default async function SettingsPage() {
  const { dictionary } = await getServerDictionary();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    try {
      profile = await db.query.profiles.findFirst({
        where: eq(profiles.id, user.id),
      });
    } catch (e) {
      console.warn("DB not connected yet:", e);
    }
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{dictionary.settings.title}</h1>
        <p className="text-muted-foreground mt-1">{dictionary.settings.description}</p>
      </div>

      <SettingsForm
        email={user?.email || ""}
        initialFullName={profile?.fullName || ""}
        initialAvatarUrl={profile?.avatarUrl || null}
        userId={user?.id || ""}
      />

      <div className="border-t pt-4">
        <h2 className="mb-1 text-xl font-bold tracking-tight">
          {dictionary.settings.languageTitle}
        </h2>
        <p className="text-muted-foreground mb-6 text-sm">{dictionary.settings.languageDesc}</p>
        <LanguageSwitcher variant="card" />
      </div>

      <div className="border-t pt-4">
        <h2 className="mb-1 text-xl font-bold tracking-tight">
          {dictionary.settings.appearanceTitle}
        </h2>
        <p className="text-muted-foreground mb-6 text-sm">{dictionary.settings.appearanceDesc}</p>
        <ThemeCustomizer />
      </div>

      <div className="border-t pt-4">
        <h2 className="mb-1 text-xl font-bold tracking-tight">
          {dictionary.settings.securityTitle}
        </h2>
        <p className="text-muted-foreground mb-6 text-sm">{dictionary.settings.securityDesc}</p>
        <MfaManager />
      </div>

      <GdprManager />
    </div>
  );
}
