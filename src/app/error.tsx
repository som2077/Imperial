"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error boundary caught:", error);
  }, [error]);

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="bg-destructive/10 text-destructive mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
        <AlertTriangle className="h-8 w-8" />
      </div>

      <h1 className="mb-3 text-3xl font-extrabold tracking-tight">Something went wrong!</h1>
      <p className="text-muted-foreground mb-8 max-w-md text-sm">
        An unexpected error occurred while processing your request. Please try again or return home.
      </p>

      <div className="flex items-center gap-4">
        <Button onClick={() => reset()} className="gap-2">
          <RefreshCcw className="h-4 w-4" /> Try Again
        </Button>
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <Home className="h-4 w-4" /> Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
