"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  completeOnboardingAction,
  skipOnboardingAction,
  type OnboardingState,
} from "@/server/actions/onboarding";
import {
  Rocket,
  Code2,
  Layers,
  Palette,
  TrendingUp,
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Plus,
  X,
  Building2,
  Sparkles,
} from "lucide-react";

interface OnboardingWizardProps {
  initialState: OnboardingState | null;
}

const ROLES = [
  {
    id: "founder",
    title: "Founder / Executive",
    description: "Building and scaling a high-velocity SaaS startup",
    icon: Rocket,
  },
  {
    id: "developer",
    title: "Software Engineer",
    description: "Writing full-stack code, APIs, and integrations",
    icon: Code2,
  },
  {
    id: "product_manager",
    title: "Product Manager",
    description: "Defining specifications, user stories, and roadmaps",
    icon: Layers,
  },
  {
    id: "designer",
    title: "UI / UX Designer",
    description: "Crafting beautiful interfaces and user journeys",
    icon: Palette,
  },
  {
    id: "growth",
    title: "Growth / Marketing",
    description: "Driving user acquisition, funnels, and conversions",
    icon: TrendingUp,
  },
  {
    id: "other",
    title: "Exploring / Other",
    description: "Experimenting with the architecture and features",
    icon: Compass,
  },
];

const COMPANY_SIZES = [
  { id: "solo", label: "Solo (Just me)" },
  { id: "2-10", label: "2 – 10 people" },
  { id: "11-50", label: "11 – 50 people" },
  { id: "50+", label: "50+ people" },
];

const PROJECT_GOALS = [
  { id: "saas", label: "B2B SaaS / Micro-SaaS" },
  { id: "ai_app", label: "AI Copilot / Agent App" },
  { id: "mobile_web", label: "Web Platform" },
  { id: "client", label: "Client Project / Agency" },
];

const ACCENT_COLORS = [
  { id: "indigo", name: "Indigo", bg: "bg-indigo-500", border: "border-indigo-500" },
  { id: "emerald", name: "Emerald", bg: "bg-emerald-500", border: "border-emerald-500" },
  { id: "violet", name: "Violet", bg: "bg-violet-500", border: "border-violet-500" },
  { id: "rose", name: "Rose", bg: "bg-rose-500", border: "border-rose-500" },
  { id: "amber", name: "Amber", bg: "bg-amber-500", border: "border-amber-500" },
  { id: "cyan", name: "Cyan", bg: "bg-cyan-500", border: "border-cyan-500" },
];

export function OnboardingWizard({ initialState }: OnboardingWizardProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form State
  const defaultOrgName =
    initialState?.defaultWorkspace?.name ||
    (initialState?.user?.fullName ? `${initialState.user.fullName}'s Team` : "My Workspace");

  const [workspaceName, setWorkspaceName] = useState<string>(defaultOrgName);
  const [accentColor, setAccentColor] = useState<string>("indigo");

  const [selectedRole, setSelectedRole] = useState<string>(
    initialState?.user?.rolePersona || "founder"
  );
  const [companySize, setCompanySize] = useState<string>(initialState?.user?.companySize || "solo");
  const [projectGoal, setProjectGoal] = useState<string>(initialState?.user?.projectGoal || "saas");

  const [inviteEmailInput, setInviteEmailInput] = useState<string>("");
  const [inviteEmails, setInviteEmails] = useState<string[]>([]);

  // Derived Slug
  const derivedSlug = workspaceName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-");

  const handleAddEmail = () => {
    const email = inviteEmailInput.trim().toLowerCase();
    if (!email) return;

    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (inviteEmails.includes(email)) {
      toast.error("This email is already added to invitations.");
      return;
    }

    setInviteEmails([...inviteEmails, email]);
    setInviteEmailInput("");
  };

  const handleRemoveEmail = (targetEmail: string) => {
    setInviteEmails(inviteEmails.filter((e) => e !== targetEmail));
  };

  const handleNextStep1 = () => {
    if (!workspaceName.trim() || workspaceName.trim().length < 2) {
      toast.error("Workspace name must be at least 2 characters.");
      return;
    }
    setCurrentStep(2);
  };

  const handleNextStep2 = () => {
    setCurrentStep(3);
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      const result = await completeOnboardingAction({
        workspaceName: workspaceName.trim(),
        rolePersona: selectedRole,
        companySize,
        projectGoal,
        logoUrl: accentColor,
        inviteEmails,
      });

      if (result.error) {
        toast.error(result.error);
        setIsSubmitting(false);
        return;
      }

      toast.success("Workspace setup completed!");
      setCurrentStep(4);

      // Auto redirect to dashboard after celebration
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 2000);
    } catch (e) {
      console.error(e);
      toast.error("An unexpected error occurred.");
      setIsSubmitting(false);
    }
  };

  const handleSkip = async () => {
    setIsSubmitting(true);
    try {
      const result = await skipOnboardingAction();
      if (result.error) {
        toast.error(result.error);
        setIsSubmitting(false);
        return;
      }
      toast.info("Onboarding skipped. Welcome to your dashboard!");
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("Failed to skip setup.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      {/* Top Escape Link */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="rounded-full px-2.5 py-0.5 text-xs font-medium">
            Setup Wizard
          </Badge>
          <span className="text-muted-foreground text-xs">
            Step {Math.min(currentStep, 3)} of 3
          </span>
        </div>
        {currentStep < 4 && (
          <button
            type="button"
            onClick={handleSkip}
            disabled={isSubmitting}
            className="text-muted-foreground hover:text-foreground text-xs underline-offset-4 transition-colors hover:underline"
          >
            Skip to Dashboard &rarr;
          </button>
        )}
      </div>

      {/* Progress Track */}
      {currentStep < 4 && (
        <div className="bg-secondary mb-8 h-1.5 w-full overflow-hidden rounded-full">
          <div
            className="bg-primary h-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      )}

      {/* STEP 1: Workspace Setup */}
      {currentStep === 1 && (
        <Card className="border shadow-lg">
          <CardHeader className="space-y-1.5 pb-4">
            <div className="bg-primary/10 text-primary mb-2 flex h-10 w-10 items-center justify-center rounded-xl">
              <Building2 className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Create your workspace</h2>
            <p className="text-muted-foreground text-sm">
              Workspaces are shared environments where your team manages projects, billing, and
              developer keys.
            </p>
          </CardHeader>

          <CardContent className="space-y-6 pt-2">
            <div className="space-y-2">
              <Label htmlFor="workspaceName" className="text-sm font-medium">
                Workspace Name
              </Label>
              <Input
                id="workspaceName"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                placeholder="e.g. Acme Corp, Nova Labs"
                className="h-10"
                autoFocus
              />
              <div className="text-muted-foreground flex items-center gap-1.5 pt-1 text-xs">
                <span>Workspace URL:</span>
                <code className="bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-[11px]">
                  app.domain.com/{derivedSlug || "workspace"}
                </code>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Workspace Brand Accent</Label>
              <p className="text-muted-foreground text-xs">
                Select a visual identifier for your workspace switcher avatar.
              </p>
              <div className="flex items-center gap-3 pt-1">
                {ACCENT_COLORS.map((color) => {
                  const isSelected = accentColor === color.id;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setAccentColor(color.id)}
                      className={`h-8 w-8 rounded-full ${color.bg} flex items-center justify-center transition-all ${
                        isSelected
                          ? "ring-primary ring-offset-background scale-110 ring-2 ring-offset-2"
                          : "opacity-80 hover:opacity-100"
                      }`}
                      title={color.name}
                    >
                      {isSelected && <CheckCircle2 className="h-4 w-4 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t pt-4">
            <Button variant="ghost" size="sm" onClick={handleSkip} disabled={isSubmitting}>
              Skip setup
            </Button>
            <Button size="sm" onClick={handleNextStep1} className="gap-1.5">
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* STEP 2: Role & Persona */}
      {currentStep === 2 && (
        <Card className="border shadow-lg">
          <CardHeader className="space-y-1.5 pb-4">
            <div className="bg-primary/10 text-primary mb-2 flex h-10 w-10 items-center justify-center rounded-xl">
              <Sparkles className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Tell us about yourself</h2>
            <p className="text-muted-foreground text-sm">
              We personalize your dashboard defaults and AI copilot suggestions based on your role.
            </p>
          </CardHeader>

          <CardContent className="space-y-6 pt-2">
            <div className="space-y-3">
              <Label className="text-sm font-medium">What best describes your role?</Label>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {ROLES.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5 ring-primary ring-1"
                          : "border-border hover:border-muted-foreground/30 hover:bg-muted/30"
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-foreground text-sm leading-tight font-semibold">
                          {role.title}
                        </div>
                        <div className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
                          {role.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Label className="text-sm font-medium">Company / Team Size</Label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {COMPANY_SIZES.map((size) => {
                  const isSelected = companySize === size.id;
                  return (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setCompanySize(size.id)}
                      className={`rounded-lg border px-3 py-2 text-center text-xs font-medium transition-all ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground font-semibold"
                          : "border-border hover:bg-muted/50 text-foreground"
                      }`}
                    >
                      {size.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Label className="text-sm font-medium">Primary Project Goal</Label>
              <div className="grid grid-cols-2 gap-2">
                {PROJECT_GOALS.map((goal) => {
                  const isSelected = projectGoal === goal.id;
                  return (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => setProjectGoal(goal.id)}
                      className={`rounded-lg border px-3 py-2 text-center text-xs font-medium transition-all ${
                        isSelected
                          ? "border-primary bg-primary/10 text-primary border-primary font-semibold"
                          : "border-border hover:bg-muted/50 text-foreground"
                      }`}
                    >
                      {goal.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentStep(1)}
              className="gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button size="sm" onClick={handleNextStep2} className="gap-1.5">
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* STEP 3: Team Collaboration */}
      {currentStep === 3 && (
        <Card className="border shadow-lg">
          <CardHeader className="space-y-1.5 pb-4">
            <div className="bg-primary/10 text-primary mb-2 flex h-10 w-10 items-center justify-center rounded-xl">
              <Rocket className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Invite team members</h2>
            <p className="text-muted-foreground text-sm">
              Invite your co-founders or colleagues to collaborate inside{" "}
              <strong>{workspaceName}</strong>. You can also skip this and add members later.
            </p>
          </CardHeader>

          <CardContent className="space-y-5 pt-2">
            <div className="space-y-2">
              <Label htmlFor="inviteEmail" className="text-sm font-medium">
                Teammate Email Address
              </Label>
              <div className="flex gap-2">
                <Input
                  id="inviteEmail"
                  type="email"
                  value={inviteEmailInput}
                  onChange={(e) => setInviteEmailInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddEmail();
                    }
                  }}
                  placeholder="colleague@company.com"
                  className="h-10"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleAddEmail}
                  className="gap-1 px-3"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </div>

            {inviteEmails.length > 0 && (
              <div className="space-y-2 pt-1">
                <Label className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                  Pending Invitations ({inviteEmails.length})
                </Label>
                <div className="flex flex-wrap gap-2">
                  {inviteEmails.map((email) => (
                    <Badge
                      key={email}
                      variant="secondary"
                      className="bg-muted flex items-center gap-1.5 px-2.5 py-1 text-xs"
                    >
                      <span>{email}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveEmail(email)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-muted/40 border-muted text-muted-foreground space-y-1 rounded-xl border p-3.5 text-xs">
              <p className="text-foreground font-semibold">💡 How invitations work:</p>
              <p>
                Each invitee receives a secure token email via Resend to activate their membership.
                You can manage roles and revoke invitations anytime in the Team Manager.
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentStep(2)}
              disabled={isSubmitting}
              className="gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleComplete} disabled={isSubmitting}>
                Skip for now
              </Button>
              <Button
                size="sm"
                onClick={handleComplete}
                disabled={isSubmitting}
                className="gap-1.5"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Completing...
                  </>
                ) : (
                  <>
                    Complete Setup
                    <CheckCircle2 className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}

      {/* STEP 4: Celebration & Launch */}
      {currentStep === 4 && (
        <Card className="border px-6 py-8 text-center shadow-lg">
          <CardContent className="space-y-5">
            <div className="mx-auto flex h-16 w-16 animate-bounce items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
              <CheckCircle2 className="h-9 w-9" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-3xl font-extrabold tracking-tight">You&apos;re all set! 🎉</h2>
              <p className="text-muted-foreground mx-auto max-w-md text-sm">
                Workspace <strong>{workspaceName}</strong> is ready. We&apos;ve customized your
                tools and developer workflows.
              </p>
            </div>

            <div className="bg-muted/30 mx-auto max-w-sm space-y-2 rounded-xl border p-4 text-left text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Workspace:</span>
                <span className="text-foreground font-semibold">{workspaceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Slug:</span>
                <span className="text-foreground font-mono">{derivedSlug || "workspace"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Role:</span>
                <span className="text-foreground font-semibold capitalize">
                  {ROLES.find((r) => r.id === selectedRole)?.title || selectedRole}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Team Size:</span>
                <span className="text-foreground font-semibold">
                  {COMPANY_SIZES.find((s) => s.id === companySize)?.label || companySize}
                </span>
              </div>
              {inviteEmails.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Invites Queued:</span>
                  <span className="text-foreground font-semibold">
                    {inviteEmails.length} members
                  </span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <Button
                size="lg"
                onClick={() => {
                  router.push("/dashboard");
                  router.refresh();
                }}
                className="gap-2 px-8"
              >
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
