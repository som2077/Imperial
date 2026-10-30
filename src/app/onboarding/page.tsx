import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getOnboardingState } from "@/server/actions/onboarding";
import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: `Workspace Onboarding | ${siteConfig.name}`,
  description: "Set up your workspace and customize your SaaS dashboard.",
};

interface OnboardingPageProps {
  searchParams: Promise<{ force?: string }>;
}

export default async function OnboardingPage({ searchParams }: OnboardingPageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/onboarding");
  }

  const resolvedParams = await searchParams;
  const isForced = resolvedParams?.force === "true";

  const { state } = await getOnboardingState();

  // If user has already completed onboarding and hasn't explicitly forced re-run, send them to dashboard
  if (state?.user?.onboardingCompleted && !isForced) {
    redirect("/dashboard");
  }

  return <OnboardingWizard initialState={state} />;
}
