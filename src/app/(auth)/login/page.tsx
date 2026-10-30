"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { login, signInWithOtp } from "@/server/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { OAuthButtons } from "@/components/oauth-buttons";
import { toast } from "sonner";
import { siteConfig } from "@/config/site";
import { Loader2, Sparkles, Mail, KeyRound, CheckCircle2 } from "lucide-react";

function RedirectToField() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  if (!redirectTo) return null;
  return <input type="hidden" name="redirectTo" value={redirectTo} />;
}

export default function LoginPage() {
  const [authMode, setAuthMode] = useState<"password" | "magic-link">("password");
  const [loading, setLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  async function handlePasswordSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
    }
  }

  async function handleMagicLinkSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string) || "";
    setSentEmail(email);

    const result = await signInWithOtp(formData);
    setLoading(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      setMagicLinkSent(true);
      toast.success("Magic sign-in link sent to your email!");
    }
  }

  return (
    <div className="bg-muted/40 flex min-h-screen flex-col items-center justify-center px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xl font-bold tracking-tight"
          >
            <div className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-xl shadow-xs">
              <Sparkles className="size-5" />
            </div>
            <span>{siteConfig.shortName}</span>
          </Link>
          <p className="text-muted-foreground mt-2 text-sm text-pretty">
            Welcome back to your workspace
          </p>
        </div>

        <Card className="border-border/80 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-balance">
              Sign in
            </CardTitle>
            <CardDescription className="text-pretty">
              {authMode === "password"
                ? "Enter your email and password to access your workspace"
                : "Receive a secure 1-click login link in your email"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <OAuthButtons />

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card text-muted-foreground px-2">Or continue with</span>
              </div>
            </div>

            {/* Mode Selector Tabs */}
            <div className="bg-muted grid grid-cols-2 rounded-lg p-1 text-xs font-medium">
              <button
                type="button"
                onClick={() => {
                  setAuthMode("password");
                  setMagicLinkSent(false);
                }}
                className={`flex items-center justify-center gap-1.5 rounded-md py-1.5 transition-all ${
                  authMode === "password"
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <KeyRound className="size-3.5" />
                Password
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("magic-link")}
                className={`flex items-center justify-center gap-1.5 rounded-md py-1.5 transition-all ${
                  authMode === "magic-link"
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Mail className="size-3.5" />
                Magic Link
              </button>
            </div>

            {authMode === "password" ? (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <Suspense fallback={null}>
                  <RedirectToField />
                </Suspense>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="text-muted-foreground hover:text-primary text-xs transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...
                    </>
                  ) : (
                    "Sign In with Password"
                  )}
                </Button>
              </form>
            ) : magicLinkSent ? (
              <div className="bg-primary/5 border-primary/20 space-y-3 rounded-lg border p-4 text-center">
                <CheckCircle2 className="text-primary mx-auto h-8 w-8" />
                <h3 className="text-sm font-semibold">Magic Link Sent!</h3>
                <p className="text-muted-foreground text-xs">
                  We sent a 1-click sign in link to{" "}
                  <span className="text-foreground font-medium">{sentEmail}</span>. Check your inbox
                  or spam folder.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMagicLinkSent(false)}
                  className="mt-2 text-xs"
                >
                  Send to a different email
                </Button>
              </div>
            ) : (
              <form onSubmit={handleMagicLinkSubmit} className="space-y-4">
                <Suspense fallback={null}>
                  <RedirectToField />
                </Suspense>
                <div className="space-y-2">
                  <Label htmlFor="magic-email">Email</Label>
                  <Input
                    id="magic-email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    autoComplete="email"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending Link...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" /> Send Magic Link
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center border-t py-4">
            <p className="text-muted-foreground text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
