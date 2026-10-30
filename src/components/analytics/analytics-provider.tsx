import { PostHogProvider } from "./posthog-provider";
import { GoogleAnalytics } from "@next/third-parties/google";

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <PostHogProvider>
      {children}
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </PostHogProvider>
  );
}
