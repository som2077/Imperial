import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { logout } from "@/server/actions/auth";
import { CommandPaletteTrigger } from "@/components/command-palette";
import { NotificationBell } from "@/components/dashboard/notification-bell";
import { ImpersonationBanner } from "@/components/dashboard/impersonation-banner";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { getServerDictionary } from "@/lib/i18n/server";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import {
  WorkspaceSwitcher,
  type OrganizationItem,
} from "@/components/dashboard/workspace-switcher";
import { getUserOrganizations, getOrCreateUserOrganization } from "@/server/actions/team";
import {
  Sparkles,
  LayoutDashboard,
  CreditCard,
  Settings,
  LogOut,
  User,
  Bot,
  Users,
  Key,
  Webhook,
  BookOpen,
  Image as ImageIcon,
  Activity,
} from "lucide-react";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { dictionary } = await getServerDictionary();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let userProfile = null;
  let userOrgs: OrganizationItem[] = [];
  try {
    userProfile = await db.query.profiles.findFirst({
      where: eq(profiles.id, user.id),
    });

    userOrgs = await getUserOrganizations(user.id);
    if (userOrgs.length === 0) {
      const defaultOrg = await getOrCreateUserOrganization(user.id, user.email || "");
      if (defaultOrg) {
        userOrgs = [defaultOrg];
      }
    }
  } catch (e) {
    console.warn("Could not load profile or orgs in layout:", e);
  }

  return (
    <div className="bg-background flex min-h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="bg-card flex w-full shrink-0 flex-col justify-between border-r p-4 md:w-64 md:p-6">
        <div className="space-y-5">
          <div className="flex items-center justify-between px-1">
            <Link href="/dashboard" className="flex items-center gap-2 text-lg font-bold">
              <Sparkles className="text-primary h-5 w-5" />
              <span>{siteConfig.shortName}</span>
            </Link>
            <NotificationBell />
          </div>

          <WorkspaceSwitcher initialOrganizations={userOrgs} />

          <div>
            <CommandPaletteTrigger />
          </div>

          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className="hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" />
              {dictionary.dashboard.overview}
            </Link>
            <Link
              href="/dashboard/ai-studio"
              className="hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              <Bot className="text-primary h-4 w-4" />
              {dictionary.dashboard.aiStudio}
            </Link>
            <Link
              href="/dashboard/team"
              className="hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              <Users className="h-4 w-4" />
              {dictionary.dashboard.team}
            </Link>
            <Link
              href="/dashboard/api-keys"
              className="hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              <Key className="h-4 w-4" />
              {dictionary.dashboard.apiKeys}
            </Link>
            <Link
              href="/dashboard/webhooks"
              className="hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              <Webhook className="h-4 w-4" />
              {dictionary.dashboard.webhooks}
            </Link>
            <Link
              href="/dashboard/billing"
              className="hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              <CreditCard className="h-4 w-4" />
              {dictionary.dashboard.billing}
            </Link>
            <Link
              href="/dashboard/media"
              className="hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              <ImageIcon className="h-4 w-4" />
              {dictionary.dashboard.media}
            </Link>
            <Link
              href="/dashboard/activity"
              className="hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              <Activity className="h-4 w-4" />
              {dictionary.dashboard.activity}
            </Link>
            <Link
              href="/dashboard/settings"
              className="hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              <Settings className="h-4 w-4" />
              {dictionary.dashboard.settings}
            </Link>
            <Link
              href="/onboarding?force=true"
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground mt-2 flex items-center gap-3 rounded-lg border-t px-3 py-2 pt-2 text-sm font-medium transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              Onboarding Setup
            </Link>
            <Link
              href="/docs"
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              {dictionary.dashboard.docs}
            </Link>
          </nav>
        </div>

        <div className="space-y-4 border-t pt-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="bg-primary/10 relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border">
                {userProfile?.avatarUrl ? (
                  <Image
                    src={userProfile.avatarUrl}
                    alt="Avatar"
                    fill
                    sizes="32px"
                    className="object-cover"
                    unoptimized={
                      userProfile.avatarUrl.startsWith("blob:") ||
                      userProfile.avatarUrl.startsWith("data:")
                    }
                  />
                ) : (
                  <User className="text-primary h-4 w-4" />
                )}
              </div>
              <p className="text-muted-foreground max-w-[120px] truncate text-xs font-medium">
                {userProfile?.fullName || user.email}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <LanguageSwitcher variant="icon" />
              <ThemeToggle />
            </div>
          </div>

          <form action={logout}>
            <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-xs">
              <LogOut className="h-3.5 w-3.5" />
              {dictionary.common.signOut}
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex flex-1 flex-col overflow-y-auto">
        <ImpersonationBanner />
        {userProfile && !userProfile.onboardingCompleted && (
          <div className="bg-primary/10 border-primary/20 text-primary flex items-center justify-between border-b px-4 py-2.5 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>
                Complete your workspace setup to unlock personalized features and invite teammates.
              </span>
            </div>
            <Link
              href="/onboarding"
              className="bg-primary text-primary-foreground rounded-md px-2.5 py-1 text-[11px] font-semibold transition-opacity hover:opacity-90"
            >
              Finish Setup &rarr;
            </Link>
          </div>
        )}
        <div className="flex-1 p-6 md:p-10">{children}</div>
      </main>
    </div>
  );
}
