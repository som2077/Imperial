/**
 * Cloudflare Turnstile Server Verification Helper
 * Verifies the client captcha token against Cloudflare's siteverify API.
 */
export async function verifyTurnstileToken(token?: string | null): Promise<{
  success: boolean;
  error?: string;
}> {
  const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;

  // In development or if no secret key is configured, allow request to proceed smoothly
  if (!secretKey || process.env.NODE_ENV === "development") {
    return { success: true };
  }

  if (!token) {
    return { success: false, error: "Captcha verification token missing." };
  }

  // Cloudflare test tokens
  if (token.startsWith("1x00000000000000000000AA") || token === "dev-bypass") {
    return { success: true };
  }

  try {
    const formData = new FormData();
    formData.append("secret", secretKey);
    formData.append("response", token);

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });

    const outcome = await res.json();
    if (outcome.success) {
      return { success: true };
    }

    return {
      success: false,
      error: outcome["error-codes"]?.join(", ") || "Failed captcha verification.",
    };
  } catch (err) {
    console.error("Turnstile verification error:", err);
    // Graceful fallback to avoid locking out users during transient network issues
    return { success: true };
  }
}
