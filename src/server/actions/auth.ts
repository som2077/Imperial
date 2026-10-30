"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyTurnstileToken } from "@/lib/captcha";
import { logActivity } from "@/lib/activity-logger";

function sanitizeRedirect(url: string | null | undefined): string {
  if (!url || typeof url !== "string") return "/dashboard";
  if (url.startsWith("/") && !url.startsWith("//") && !url.startsWith("/\\")) {
    return url;
  }
  return "/dashboard";
}

export async function login(formData: FormData) {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;
  const rawRedirect = formData.get("redirectTo") as string;
  const redirectTo = sanitizeRedirect(rawRedirect);

  const supabase = await createClient();

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  if (authData.user) {
    await logActivity({
      userId: authData.user.id,
      action: "user.login",
      entityType: "auth",
      entityId: authData.user.id,
      description: `User signed in successfully (${email})`,
    });
  }

  redirect(redirectTo);
}

export async function signup(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;
  const turnstileToken = formData.get("cf-turnstile-response") as string | null;

  // Cloudflare Turnstile bot verification
  const captchaCheck = await verifyTurnstileToken(turnstileToken);
  if (!captchaCheck.success) {
    return { error: captchaCheck.error || "Captcha verification failed. Please try again." };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  // Create corresponding profile record if user created
  if (data.user) {
    try {
      const existingProfile = await db.query.profiles.findFirst({
        where: eq(profiles.id, data.user.id),
      });

      if (!existingProfile) {
        await db.insert(profiles).values({
          id: data.user.id,
          email: data.user.email!,
          fullName: fullName || null,
          onboardingCompleted: false,
        });
      }

      await logActivity({
        userId: data.user.id,
        action: "user.signup",
        entityType: "auth",
        entityId: data.user.id,
        description: `New user account registered (${email})`,
      });
    } catch (dbError) {
      console.error("Failed to insert profile row in database:", dbError);
    }
  }

  redirect("/onboarding");
}

export async function signInWithOAuth(provider: "google" | "github") {
  const supabase = await createClient();
  const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.url) {
    redirect(data.url);
  }
}

export async function resetPassword(formData: FormData) {
  const email = formData.get("email") as string;
  const supabase = await createClient();
  const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/dashboard/settings`,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function signInWithOtp(formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const redirectTo = (formData.get("redirectTo") as string) || "/dashboard";

  if (!email) {
    return { error: "Email is required." };
  }

  const supabase = await createClient();
  const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const safeRedirect = sanitizeRedirect(redirectTo);

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(safeRedirect)}`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
