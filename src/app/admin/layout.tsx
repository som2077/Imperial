import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/admin");
  }

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.id, user.id),
  });

  // Strict Super Admin Access Guard
  if (profile?.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      {/* Super Admin Top Header */}
      <header className="bg-card/95 supports-[backdrop-filter]:bg-card/60 sticky top-0 z-40 border-b backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="bg-destructive/10 text-destructive flex h-9 w-9 items-center justify-center rounded-xl font-bold">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight">Platform Control</span>
                <span className="bg-destructive/10 text-destructive rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase">
                  Super Admin
                </span>
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-xs font-semibold sm:flex">
            <Link
              href="/admin"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Platform KPIs
            </Link>
            <Link
              href="/admin/emails"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Email Studio
            </Link>
            <Link
              href="/admin/jobs"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Cron Automation
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl flex-1 px-4 py-8 sm:px-8">{children}</main>
    </div>
  );
}
