import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="bg-primary/10 text-primary mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
        <Sparkles className="h-8 w-8" />
      </div>

      <span className="text-primary mb-2 text-sm font-semibold tracking-widest uppercase">
        Error 404
      </span>
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Page Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md text-base">
        The page you are looking for doesn&apos;t exist or has been moved to another URL.
      </p>

      <div className="flex items-center gap-4">
        <Link href="/">
          <Button className="gap-2">
            <Home className="h-4 w-4" /> Go to Home
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
