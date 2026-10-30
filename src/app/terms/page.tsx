import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using our SaaS service.",
};

export default function TermsPage() {
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
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight">Terms of Service</h1>
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
            <h2 className="text-foreground mb-2 text-lg font-semibold">1. Agreement to Terms</h2>
            <p>
              By accessing or using our website and services, you agree to be bound by these Terms
              of Service. If you disagree with any part of these terms, you may not access the
              service.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 text-lg font-semibold">
              2. Subscriptions & Billing
            </h2>
            <p>
              Certain aspects of the service are provided on a recurring subscription basis.
              Payments are processed securely via Lemon Squeezy (our Merchant of Record). You may
              cancel your subscription at any time through your dashboard customer portal.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 text-lg font-semibold">3. User Accounts</h2>
            <p>
              When you create an account with us, you must provide accurate and complete
              information. You are responsible for safeguarding your password and session
              credentials.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 text-lg font-semibold">4. Acceptable Use</h2>
            <p>
              You agree not to misuse the service, interfere with normal operations, or use our
              platform for any unlawful activities, spam, or distribution of malicious software.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 text-lg font-semibold">
              5. Limitation of Liability
            </h2>
            <p>
              In no event shall SaaS Starter or its suppliers be liable for any damages arising out
              of the use or inability to use the services, even if notified of the possibility of
              such damage.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 text-lg font-semibold">6. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact support via the contact
              information on our website.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
