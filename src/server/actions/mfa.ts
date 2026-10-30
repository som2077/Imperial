"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import QRCode from "qrcode";

export type MfaFactor = {
  id: string;
  friendlyName?: string;
  factorType: string;
  status: "verified" | "unverified";
  createdAt: string;
};

export async function getMfaFactorsAction(): Promise<{
  factors: MfaFactor[];
  isMfaEnabled: boolean;
  error?: string;
}> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { factors: [], isMfaEnabled: false, error: "Unauthorized" };
  }

  const { data, error } = await supabase.auth.mfa.listFactors();

  if (error) {
    return { factors: [], isMfaEnabled: false, error: error.message };
  }

  const allFactors = (data.all || []).map((f) => ({
    id: f.id,
    friendlyName: f.friendly_name || "Authenticator App",
    factorType: f.factor_type,
    status: f.status as "verified" | "unverified",
    createdAt: f.created_at,
  }));

  const verified = allFactors.filter((f) => f.status === "verified");

  return {
    factors: allFactors,
    isMfaEnabled: verified.length > 0,
  };
}

export async function enrollMfaAction(): Promise<{
  factorId?: string;
  qrCodeUrl?: string;
  secret?: string;
  error?: string;
}> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Unauthorized" };
  }

  // Enroll TOTP factor
  const { data, error } = await supabase.auth.mfa.enroll({
    factorType: "totp",
    issuer: "SaaS Starter",
    friendlyName: user.email || "Primary Device",
  });

  if (error || !data) {
    return { error: error?.message || "Failed to initiate MFA enrollment" };
  }

  const { id: factorId, totp } = data;
  let qrCodeUrl = "";

  try {
    qrCodeUrl = await QRCode.toDataURL(totp.uri);
  } catch (qrErr) {
    console.error("QR Code generation error:", qrErr);
  }

  return {
    factorId,
    qrCodeUrl,
    secret: totp.secret,
  };
}

export async function verifyMfaEnrollmentAction(
  factorId: string,
  code: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const challenge = await supabase.auth.mfa.challenge({ factorId });
  if (challenge.error) {
    return { success: false, error: challenge.error.message };
  }

  const verify = await supabase.auth.mfa.verify({
    factorId,
    challengeId: challenge.data.id,
    code: code.trim(),
  });

  if (verify.error) {
    return { success: false, error: verify.error.message };
  }

  revalidatePath("/dashboard/settings");
  return { success: true };
}

export async function unenrollMfaAction(
  factorId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase.auth.mfa.unenroll({ factorId });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/dashboard/settings");
  return { success: true };
}
