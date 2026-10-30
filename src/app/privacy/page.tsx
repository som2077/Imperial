import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy describing how we collect, protect, and use user information.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="border-b py-4">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-lg font-bold">
            <Sparkles className="text-primary h-5 w-5" />
            <span>SaaS Starter</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm"
            >
              <ArrowLeft className="h-4 w-4" /> Home
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-4 py-12 sm:px-8">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8 text-sm">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <div className="text-muted-foreground space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-foreground mb-2 text-lg font-semibold">
              1. Information We Collect
            </h2>
            <p>
              We collect information you provide directly to us when registering for an account,
              updating your profile, or contacting support. This includes your name, email address,
              and profile picture.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 text-lg font-semibold">
              2. How We Use Information
            </h2>
            <p>
              We use your information to operate, maintain, and provide the features of our service,
              process transactions through Lemon Squeezy, communicate with you regarding updates,
              and prevent fraudulent activity.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 text-lg font-semibold">3. Cookies & Analytics</h2>
            <p>
              We utilize analytics tools like PostHog and Google Analytics to understand user
              engagement and improve platform performance. You can manage or disable cookie
              preferences directly in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 text-lg font-semibold">
              4. Data Security & Storage
            </h2>
            <p>
              Your data is stored securely using industry-standard PostgreSQL infrastructure
              provided by Supabase. We implement strict access controls and encryption to protect
              your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 text-lg font-semibold">
              5. Your Data Rights (GDPR & CCPA)
            </h2>
            <p>
              Depending on your location, you have rights to access, update, or request the deletion
              of your personal data. You may delete your account and personal data at any time from
              your settings page.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 text-lg font-semibold">6. Contact Information</h2>
            <p>
              If you have questions or concerns about this Privacy Policy, please reach out to us at
              support@example.com.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
