"use client";

import Link from "next/link";
import { useState } from "react";
import { resetPassword } from "@/server/actions/auth";
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
import { toast } from "sonner";
import { siteConfig } from "@/config/site";
import { ArrowLeft, CheckCircle2, Loader2, Sparkles } from "lucide-react";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await resetPassword(formData);
    setLoading(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      setSubmitted(true);
      toast.success("Password reset instructions sent!");
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
            Recover your account password
          </p>
        </div>

        <Card className="border-border/80 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-balance">
              Reset Password
            </CardTitle>
            <CardDescription className="text-pretty">
              {submitted
                ? "Check your email for the password recovery link"
                : "Enter your email address and we will send you a reset link"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="space-y-3 py-6 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <CheckCircle2 className="size-6" />
                </div>
                <p className="text-muted-foreground text-sm text-pretty">
                  We have sent a password reset link to your email. Click the link in the email to
                  set a new password.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
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
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" /> Sending link...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center border-t py-4">
            <Link
              href="/login"
              className="text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm transition-colors"
            >
              <ArrowLeft className="size-4" /> Back to sign in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
