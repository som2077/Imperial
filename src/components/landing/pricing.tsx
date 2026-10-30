"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export function PricingSection() {
  return (
    <section id="pricing" className="bg-muted/20 relative overflow-hidden border-t py-24">
      <div className="container mx-auto max-w-5xl px-4 sm:px-8">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge variant="outline" className="mb-3 px-3 py-1 text-xs font-semibold tracking-wide">
            Lifetime Access • Zero Recurring Fees
          </Badge>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">
            Pay Once. Build &amp; Ship Forever.
          </h2>
          <p className="text-muted-foreground text-base text-pretty sm:text-lg">
            Get full source code ownership, instant GitHub collaborator invitation, and ship your
            next SaaS in hours instead of months.
          </p>

          <div className="bg-background/80 mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium shadow-2xs sm:text-sm">
            <Zap className="size-4 fill-amber-500 text-amber-500" />
            <span>Automatic Lemon Squeezy fulfillment + instant GitHub repo access</span>
          </div>
        </div>

        {/* Pricing Cards Grid (2-column layout for Standard vs Unlimited) */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {siteConfig.plans.map((plan) => {
            const hasCheckout = Boolean(
              plan.checkoutUrl && plan.checkoutUrl !== "https://lemonsqueezy.com"
            );

            return (
              <Card
                key={plan.id}
                className={`relative flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? "border-primary/80 ring-primary/20 bg-card shadow-xl ring-2"
                    : "border-border bg-card/60 shadow-md hover:shadow-lg"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge
                      variant="default"
                      className="gap-1.5 px-3 py-1 text-xs font-bold tracking-wider uppercase shadow-md"
                    >
                      <Sparkles className="size-3.5" /> {plan.badge || "Most Popular"}
                    </Badge>
                  </div>
                )}

                <CardHeader className="pt-8">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    {plan.originalPrice && (
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 uppercase dark:text-emerald-400">
                        Save ${plan.originalPrice - plan.price}
                      </span>
                    )}
                  </div>
                  <CardDescription className="mt-2 min-h-10 text-sm text-pretty">
                    {plan.description}
                  </CardDescription>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-5xl font-black tracking-tight tabular-nums">
                      ${plan.price}
                    </span>
                    {plan.originalPrice && (
                      <span className="text-muted-foreground decoration-muted-foreground/60 text-xl line-through">
                        ${plan.originalPrice}
                      </span>
                    )}
                    <span className="text-muted-foreground text-sm font-medium">
                      one-time payment
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 space-y-3.5 pt-2 text-sm">
                  <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                    What&apos;s Included:
                  </p>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                      <span className="text-foreground text-xs leading-snug font-medium sm:text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </CardContent>

                <CardFooter className="border-t pt-5 pb-6">
                  {hasCheckout ? (
                    <a
                      href={plan.checkoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button
                        size="lg"
                        variant={plan.popular ? "default" : "outline"}
                        className="w-full gap-2 text-sm font-bold shadow-sm"
                      >
                        {plan.ctaText}
                        <ArrowRight className="size-4" />
                      </Button>
                    </a>
                  ) : (
                    <Link href={plan.checkoutUrl || "/claim"} className="w-full">
                      <Button
                        size="lg"
                        variant={plan.popular ? "default" : "outline"}
                        className="w-full gap-2 text-sm font-bold shadow-sm"
                      >
                        {plan.ctaText}
                        <ArrowRight className="size-4" />
                      </Button>
                    </Link>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Claim Portal Callout & Trust Strip */}
        <div className="mx-auto mt-12 max-w-xl space-y-4 text-center">
          <p className="text-muted-foreground text-sm">
            Already purchased a license?{" "}
            <Link
              href="/claim"
              className="text-primary hover:text-primary/80 font-semibold underline underline-offset-4 transition-colors"
            >
              Claim or resend your GitHub invite here &rarr;
            </Link>
          </p>

          <div className="border-border/60 bg-card/60 text-muted-foreground flex flex-wrap items-center justify-center gap-6 rounded-2xl border p-4 text-xs backdrop-blur-xs">
            <span className="text-foreground flex items-center gap-1.5 font-medium">
              <ShieldCheck className="size-4 text-emerald-500" /> 100% Full Source Code Ownership
            </span>
            <span>•</span>
            <span className="text-foreground flex items-center gap-1.5 font-medium">
              <svg className="size-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>{" "}
              Direct GitHub Collaborator Access
            </span>
            <span>•</span>
            <span className="text-foreground flex items-center gap-1.5 font-medium">
              <Sparkles className="text-primary size-4" /> Lifetime Upstream Updates
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
