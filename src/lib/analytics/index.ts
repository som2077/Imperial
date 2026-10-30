import posthog from "posthog-js";

// Global type declaration for gtag
declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "set",
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Track custom events in both PostHog and Google Analytics
 */
export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  // PostHog Event
  if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.capture(eventName, properties);
  }

  // Google Analytics Event
  if (typeof window !== "undefined" && window.gtag && process.env.NEXT_PUBLIC_GA_ID) {
    window.gtag("event", eventName, properties);
  }
}

/**
 * Identify user across PostHog and Google Analytics on login
 */
export function identifyUser(
  userId: string,
  traits?: { email?: string; name?: string; role?: string }
) {
  if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.identify(userId, traits);
  }

  if (typeof window !== "undefined" && window.gtag && process.env.NEXT_PUBLIC_GA_ID) {
    window.gtag("set", "user_properties", {
      user_id: userId,
      ...traits,
    });
  }
}

/**
 * Reset tracking session on logout
 */
export function resetUser() {
  if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.reset();
  }
}
