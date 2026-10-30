"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { toast } from "sonner";
import { siteConfig } from "@/config/site";
import {
  Sparkles,
  KeyRound,
  Mail,
  User,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Terminal,
} from "lucide-react";

export default function ClaimLicensePage() {
  const [customerEmail, setCustomerEmail] = useState("");
  const [licenseKey, setLicenseKey] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [successResult, setSuccessResult] = useState<{
    message: string;
    githubUsername: string;
  } | null>(null);

  async function handleClaimSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!customerEmail || !licenseKey || !githubUsername) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setSuccessResult(null);

    try {
      const res = await fetch("/api/v1/license/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail,
          licenseKey,
          githubUsername,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.error || "Failed to claim license. Please check your inputs.");
        return;
      }

      toast.success("GitHub invitation dispatched successfully!");
      setSuccessResult({
        message: data.message,
        githubUsername: githubUsername.replace(/^@/, ""),
      });
    } catch {
      toast.error("Network error. Please try again or contact support.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-border/60 bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
            <div className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-xl shadow-xs">
              <Sparkles className="size-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">{siteConfig.shortName}</span>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/docs">
              <Button variant="ghost" size="sm">
                Documentation
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="container mx-auto flex flex-1 items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-xl">
          <Card className="border-border/80 bg-card/60 shadow-xl backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="bg-primary/10 text-primary mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl">
                <svg className="size-6 fill-current" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </div>
              <CardTitle className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Claim GitHub Repository Access
              </CardTitle>
              <CardDescription className="text-sm">
                Purchased a license on Lemon Squeezy? Enter your purchase email, license key, and
                GitHub handle below to instantly receive your repository invitation.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {successResult ? (
                <div className="space-y-6">
                  <div className="bg-primary/10 border-primary/20 rounded-xl border p-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="text-primary mt-0.5 size-5 shrink-0" />
                      <div>
                        <h4 className="text-foreground font-semibold">
                          Invitation Dispatched to @{successResult.githubUsername}
                        </h4>
                        <p className="text-muted-foreground mt-1 text-sm">
                          {successResult.message}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Next Steps Card */}
                  <div className="bg-muted/50 space-y-4 rounded-xl border p-5 text-sm">
                    <h5 className="text-foreground flex items-center gap-2 font-semibold">
                      <Terminal className="size-4" /> Next Steps to Launch:
                    </h5>
                    <ol className="text-muted-foreground list-inside list-decimal space-y-2">
                      <li>
                        Accept your invitation on GitHub:{" "}
                        <a
                          href="https://github.com/som2077/saas-kit-template/invitations"
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary inline-flex items-center gap-1 font-medium underline"
                        >
                          github.com/som2077/saas-kit-template/invitations{" "}
                          <ExternalLink className="size-3" />
                        </a>
                      </li>
                      <li>
                        Clone the repository:{" "}
                        <code className="bg-background text-foreground rounded px-1.5 py-0.5 font-mono">
                          git clone https://github.com/som2077/saas-kit-template.git
                        </code>
                      </li>
                      <li>
                        Run the automated setup wizard:{" "}
                        <code className="bg-background text-foreground rounded px-1.5 py-0.5 font-mono">
                          npm install &amp;&amp; npm run setup
                        </code>
                      </li>
                    </ol>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <a
                      href="https://github.com/som2077/saas-kit-template/invitations"
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1"
                    >
                      <Button className="w-full gap-2">
                        Accept Invitation on GitHub <ArrowRight className="size-4" />
                      </Button>
                    </a>
                    <Button
                      variant="outline"
                      onClick={() => setSuccessResult(null)}
                      className="flex-1"
                    >
                      Claim Another Account
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleClaimSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Order Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="text-muted-foreground absolute top-3 left-3 size-4" />
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="licenseKey" className="text-sm font-medium">
                      Commercial License Key
                    </Label>
                    <div className="relative">
                      <KeyRound className="text-muted-foreground absolute top-3 left-3 size-4" />
                      <Input
                        id="licenseKey"
                        type="text"
                        required
                        placeholder="KIT-XXXX-XXXX-XXXX"
                        value={licenseKey}
                        onChange={(e) => setLicenseKey(e.target.value.toUpperCase())}
                        className="pl-9 font-mono"
                      />
                    </div>
                    <p className="text-muted-foreground text-xs">
                      Found in your Lemon Squeezy receipt email.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="github" className="text-sm font-medium">
                      GitHub Username
                    </Label>
                    <div className="relative">
                      <User className="text-muted-foreground absolute top-3 left-3 size-4" />
                      <Input
                        id="github"
                        type="text"
                        required
                        placeholder="e.g. octocat (without @)"
                        value={githubUsername}
                        onChange={(e) => setGithubUsername(e.target.value)}
                        className="pl-9 font-mono"
                      />
                    </div>
                    <p className="text-muted-foreground text-xs">
                      The GitHub handle that will receive read/clone collaborator access.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full gap-2 py-5 font-semibold"
                  >
                    {loading ? (
                      "Verifying & Dispatching Invitation..."
                    ) : (
                      <>
                        Claim GitHub Invitation <ArrowRight className="size-4" />
                      </>
                    )}
                  </Button>

                  <div className="bg-muted/40 text-muted-foreground flex items-center justify-center gap-2 rounded-lg p-2.5 text-xs">
                    <ShieldCheck className="text-primary size-4" />
                    <span>Instant automated invite via GitHub REST API</span>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Help Box */}
          <div className="text-muted-foreground mt-8 space-y-1 text-center text-xs">
            <p>
              Haven&apos;t purchased a license yet?{" "}
              <Link href="/#pricing" className="text-primary font-medium underline">
                View Pricing &amp; Plans
              </Link>
            </p>
            <p className="flex items-center justify-center gap-1">
              <AlertCircle className="size-3" /> Need help? Contact{" "}
              <a href="mailto:support@example.com" className="underline">
                support@example.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
