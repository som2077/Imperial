"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Sparkles, ArrowRight, Check } from "lucide-react";

export interface PaywallProps {
  isAllowed?: boolean;
  requiredTier?: "pro" | "enterprise";
  featureTitle?: string;
  featureDescription?: string;
  variant?: "blur" | "card";
  children: React.ReactNode;
}

export function Paywall({
  isAllowed = false,
  requiredTier = "pro",
  featureTitle = "Pro Feature Access",
  featureDescription = "This capability requires an active subscription plan to access and operate.",
  variant = "blur",
  children,
}: PaywallProps) {
  if (isAllowed) {
    return <>{children}</>;
  }

  const tierLabel = requiredTier === "enterprise" ? "Enterprise" : "Pro";

  const benefits =
    requiredTier === "enterprise"
      ? [
          "Unlimited team workspaces & members",
          "Dedicated priority infrastructure",
          "Custom SLAs & 24/7 priority support",
          "Full GDPR & SOC2 compliance exports",
        ]
      : [
          "Unlimited AI Copilot conversations & tool calling",
          "High-performance Cloudinary CDN storage & transforms",
          "Scheduled Background Cron Automations & webhooks",
          "Programmatic Developer REST API keys",
        ];

  if (variant === "card") {
    return (
      <div className="border-primary/20 bg-card/80 mx-auto my-8 max-w-xl rounded-2xl border p-8 text-center shadow-sm">
        <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl">
          <Lock className="h-6 w-6" />
        </div>
        <Badge variant="outline" className="border-primary/30 text-primary mb-3">
          <Sparkles className="mr-1 h-3 w-3" />
          {tierLabel} Plan Required
        </Badge>
        <h3 className="text-xl font-bold tracking-tight">{featureTitle}</h3>
        <p className="text-muted-foreground mx-auto mt-2 max-w-md text-sm">{featureDescription}</p>

        <ul className="text-muted-foreground mx-auto mt-6 max-w-xs space-y-2 text-left text-xs">
          {benefits.map((b) => (
            <li key={b} className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/dashboard/billing">
            <Button className="gap-2 font-semibold">
              Upgrade to {tierLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Blur variant: renders children blurred with a frosted glass lock overlay
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="pointer-events-none opacity-30 blur-xs select-none">{children}</div>

      <div className="bg-background/80 absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center backdrop-blur-md">
        <div className="bg-card border-border/80 max-w-md space-y-4 rounded-2xl border p-6 shadow-xl">
          <div className="bg-primary/10 text-primary mx-auto flex h-12 w-12 items-center justify-center rounded-xl">
            <Lock className="h-6 w-6" />
          </div>

          <div>
            <Badge variant="outline" className="border-primary/30 text-primary mb-2">
              <Sparkles className="mr-1 h-3 w-3" />
              {tierLabel} Plan Required
            </Badge>
            <h4 className="text-lg font-bold tracking-tight">{featureTitle}</h4>
            <p className="text-muted-foreground mt-1 text-xs">{featureDescription}</p>
          </div>

          <ul className="text-muted-foreground space-y-1.5 text-left text-xs">
            {benefits.slice(0, 3).map((b) => (
              <li key={b} className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-center gap-2 pt-2">
            <Link href="/dashboard/billing" className="w-full">
              <Button className="w-full gap-2 text-xs font-semibold">
                Upgrade to {tierLabel}
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
