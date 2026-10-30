"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mail, CheckCircle2, Loader2, Sparkles } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || loading) return;

    setLoading(true);
    // Simulate fast lead capture (connectable to Resend audience or DB)
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLoading(false);
    setSubmitted(true);
    toast.success("You're on the list! Check your inbox for updates.");
  }

  return (
    <section className="from-background via-muted/30 to-background border-t bg-gradient-to-b py-20">
      <div className="container mx-auto max-w-4xl px-4 sm:px-8">
        <div className="bg-card/60 relative overflow-hidden rounded-3xl border p-8 text-center shadow-xs backdrop-blur sm:p-12">
          <div className="bg-primary/10 pointer-events-none absolute top-0 right-0 -mt-16 -mr-16 size-48 rounded-full blur-3xl" />
          <div className="bg-primary/10 pointer-events-none absolute bottom-0 left-0 -mb-16 -ml-16 size-48 rounded-full blur-3xl" />

          <div className="mx-auto max-w-xl space-y-4">
            <div className="bg-primary/10 text-primary mb-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium">
              <Sparkles className="size-3.5" /> Stay Ahead of the Curve
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-balance sm:text-3xl">
              Get SaaS Tactics &amp; Product Releases
            </h2>
            <p className="text-muted-foreground text-sm text-pretty sm:text-base">
              Join <span className="tabular-nums">4,200+</span> indie hackers and software founders
              receiving our bi-weekly breakdown on growth experiments, architecture, and revenue
              milestones.
            </p>

            {submitted ? (
              <div className="flex items-center justify-center gap-2 pt-4 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-4" /> You&apos;re subscribed! Thank you for joining.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3 pt-4 sm:flex-row">
                <div className="relative flex-1">
                  <Mail className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
                  <Input
                    type="email"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background h-11 pl-10 text-sm"
                  />
                </div>
                <Button type="submit" disabled={loading} className="h-11 px-6 font-semibold">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" /> Subscribing...
                    </>
                  ) : (
                    "Subscribe Free"
                  )}
                </Button>
              </form>
            )}

            <p className="text-muted-foreground pt-1 text-xs text-pretty">
              Zero spam. Unsubscribe with 1-click anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
