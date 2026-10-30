"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sendTestEmailAction } from "@/server/actions/admin";
import { toast } from "sonner";
import {
  Mail,
  Smartphone,
  Monitor,
  Send,
  Loader2,
  ExternalLink,
  Users,
  KeyRound,
  CreditCard,
  Terminal,
} from "lucide-react";

const TEMPLATES = [
  {
    id: "welcome",
    name: "Welcome Onboarding",
    description: "Sent automatically to new users upon successful registration.",
    icon: Mail,
    badge: "Auth & Onboarding",
  },
  {
    id: "team-invite",
    name: "Team Invitation",
    description: "Sent when an organization owner or admin invites a colleague.",
    icon: Users,
    badge: "B2B Multi-Tenancy",
  },
  {
    id: "magic-link",
    name: "Magic Link / OTP",
    description: "Sent for passwordless authentication with 1-click link and 6-digit code.",
    icon: KeyRound,
    badge: "Security & 2FA",
  },
  {
    id: "receipt",
    name: "Payment Receipt",
    description: "Sent upon successful Stripe or Lemon Squeezy checkout or renewal.",
    icon: CreditCard,
    badge: "Billing & Invoices",
  },
];

export function EmailPreviewClient() {
  const [activeTemplate, setActiveTemplate] = useState("welcome");
  const [deviceView, setDeviceView] = useState<"desktop" | "mobile">("desktop");
  const [testEmail, setTestEmail] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSendTest(e: React.FormEvent) {
    e.preventDefault();
    if (!testEmail || sending) return;

    setSending(true);
    const result = await sendTestEmailAction(activeTemplate, testEmail);
    setSending(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(`Test email dispatched to ${testEmail}! (Check console if in dev mode)`);
    }
  }

  const previewUrl = `/api/emails/preview?type=${activeTemplate}`;

  return (
    <div className="space-y-6">
      {/* Top Banner with Standalone Command */}
      <Card className="from-primary/5 via-muted/30 to-background border-primary/20 bg-gradient-to-r">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Mail className="text-primary h-5 w-5" />
              <h2 className="text-base font-bold">Transactional Email Suite</h2>
              <Badge variant="outline" className="text-xs">
                React Email + Resend
              </Badge>
            </div>
            <p className="text-muted-foreground text-xs">
              Preview responsive email templates or run the standalone developer server.
            </p>
          </div>

          <div className="bg-muted flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-xs">
            <Terminal className="text-muted-foreground h-3.5 w-3.5" />
            <span>npm run email</span>
            <span className="text-muted-foreground">(port 3001)</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Template Selection & Test Send */}
        <div className="space-y-6 lg:col-span-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Select Template</CardTitle>
              <CardDescription className="text-xs">
                Choose a transactional email template to preview
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 p-3 pt-0">
              {TEMPLATES.map((tpl) => {
                const Icon = tpl.icon;
                const isActive = activeTemplate === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => setActiveTemplate(tpl.id)}
                    className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-all ${
                      isActive
                        ? "border-primary bg-primary/5 shadow-xs"
                        : "bg-muted/30 hover:bg-muted/60 border-transparent"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="truncate text-xs font-semibold">{tpl.name}</span>
                        <span className="text-muted-foreground text-[10px]">{tpl.badge}</span>
                      </div>
                      <p className="text-muted-foreground mt-0.5 line-clamp-2 text-[11px]">
                        {tpl.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {/* Test Dispatch Form */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Dispatch Test Email</CardTitle>
              <CardDescription className="text-xs">
                Send a sample of the selected template to test inbox
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSendTest} className="space-y-3">
                <Input
                  type="email"
                  placeholder="your-email@example.com"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="text-xs"
                  required
                />
                <Button
                  type="submit"
                  size="sm"
                  className="w-full gap-1.5 text-xs"
                  disabled={sending}
                >
                  {sending ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Dispatching...
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" /> Send Test Email
                    </>
                  )}
                </Button>
                <p className="text-muted-foreground text-center text-[11px]">
                  Simulates in terminal if <code>RESEND_API_KEY</code> is not configured.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Live Iframe Preview */}
        <div className="space-y-3 lg:col-span-8">
          <div className="flex items-center justify-between">
            <div className="bg-muted/40 flex items-center gap-1 rounded-lg border p-1">
              <Button
                variant={deviceView === "desktop" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setDeviceView("desktop")}
                className="h-7 gap-1.5 text-xs"
              >
                <Monitor className="h-3.5 w-3.5" /> Desktop
              </Button>
              <Button
                variant={deviceView === "mobile" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setDeviceView("mobile")}
                className="h-7 gap-1.5 text-xs"
              >
                <Smartphone className="h-3.5 w-3.5" /> Mobile (375px)
              </Button>
            </div>

            <Button variant="outline" size="sm" asChild className="h-7 gap-1.5 text-xs">
              <a href={previewUrl} target="_blank" rel="noreferrer">
                Open Fullscreen <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>

          <div className="bg-muted/20 flex min-h-[580px] justify-center rounded-xl border p-4">
            <div
              className={`overflow-hidden rounded-lg border bg-white shadow-md transition-all duration-300 dark:border-zinc-800 ${
                deviceView === "mobile" ? "w-[380px]" : "w-full max-w-[620px]"
              }`}
            >
              <iframe
                key={`${activeTemplate}-${deviceView}`}
                src={previewUrl}
                title="Email Preview"
                className="h-[560px] w-full border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
