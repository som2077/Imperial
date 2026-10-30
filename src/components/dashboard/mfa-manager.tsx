"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getMfaFactorsAction,
  enrollMfaAction,
  verifyMfaEnrollmentAction,
  unenrollMfaAction,
  MfaFactor,
} from "@/server/actions/mfa";
import { toast } from "sonner";
import {
  ShieldCheck,
  ShieldAlert,
  Loader2,
  Copy,
  Check,
  Smartphone,
  KeyRound,
  Trash2,
} from "lucide-react";

export function MfaManager() {
  const [factors, setFactors] = useState<MfaFactor[]>([]);
  const [isMfaEnabled, setIsMfaEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  // Enrollment dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [factorId, setFactorId] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);

  // Disable confirmation
  const [disablingId, setDisablingId] = useState<string | null>(null);

  async function refreshFactors() {
    setLoading(true);
    const result = await getMfaFactorsAction();
    setFactors(result.factors);
    setIsMfaEnabled(result.isMfaEnabled);
    setLoading(false);
  }

  useEffect(() => {
    let isMounted = true;
    getMfaFactorsAction().then((result) => {
      if (isMounted) {
        if (result.error) {
          console.warn("MFA factors load warning:", result.error);
        }
        setFactors(result.factors);
        setIsMfaEnabled(result.isMfaEnabled);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  async function startEnrollment() {
    setEnrolling(true);
    setVerificationCode("");
    const result = await enrollMfaAction();
    setEnrolling(false);

    if (result.error || !result.factorId) {
      toast.error(result.error || "Failed to start 2FA enrollment");
      return;
    }

    setFactorId(result.factorId);
    setQrCodeUrl(result.qrCodeUrl || null);
    setSecret(result.secret || null);
    setDialogOpen(true);
  }

  async function handleVerify() {
    if (!factorId || verificationCode.trim().length !== 6) {
      toast.error("Please enter a valid 6-digit verification code");
      return;
    }

    setVerifying(true);
    const result = await verifyMfaEnrollmentAction(factorId, verificationCode.trim());
    setVerifying(false);

    if (result.success) {
      toast.success("Two-Factor Authentication successfully activated!");
      setDialogOpen(false);
      await refreshFactors();
    } else {
      toast.error(result.error || "Invalid verification code. Please try again.");
    }
  }

  async function handleDisable(id: string) {
    setDisablingId(id);
    const result = await unenrollMfaAction(id);
    setDisablingId(null);

    if (result.success) {
      toast.success("Two-Factor Authentication disabled");
      await refreshFactors();
    } else {
      toast.error(result.error || "Failed to disable 2FA");
    }
  }

  function handleCopySecret() {
    if (secret) {
      navigator.clipboard.writeText(secret);
      setCopiedSecret(true);
      toast.success("Secret key copied to clipboard");
      setTimeout(() => setCopiedSecret(false), 2000);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <KeyRound className="text-primary h-5 w-5" />
              Two-Factor Authentication (2FA / TOTP)
            </CardTitle>
            <CardDescription>
              Add an extra layer of defense using Google Authenticator, 1Password, or Authy.
            </CardDescription>
          </div>
          {loading ? (
            <Loader2 className="text-muted-foreground h-5 w-5 animate-spin" />
          ) : isMfaEnabled ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" /> Enabled
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <ShieldAlert className="h-3.5 w-3.5" /> Not Enabled
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {loading ? (
          <div className="text-muted-foreground flex items-center justify-center py-6 text-sm">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading 2FA security status...
          </div>
        ) : isMfaEnabled ? (
          <div className="space-y-3">
            <div className="bg-muted/30 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Authenticator App Active</p>
                    <p className="text-muted-foreground text-xs">
                      Time-based One-Time Passwords (TOTP) are protecting your account logins.
                    </p>
                  </div>
                </div>

                {factors
                  .filter((f) => f.status === "verified")
                  .map((factor) => (
                    <Button
                      key={factor.id}
                      variant="destructive"
                      size="sm"
                      disabled={disablingId === factor.id}
                      onClick={() => handleDisable(factor.id)}
                      className="text-xs"
                    >
                      {disablingId === factor.id ? (
                        <>
                          <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> Disabling...
                        </>
                      ) : (
                        <>
                          <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Disable 2FA
                        </>
                      )}
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-muted/20 rounded-lg border p-4">
            <p className="text-muted-foreground text-sm">
              When 2FA is active, logging in requires both your password and a unique 6-digit
              security code generated on your mobile phone or security key.
            </p>
          </div>
        )}
      </CardContent>

      {!isMfaEnabled && !loading && (
        <CardFooter className="bg-muted/10 border-t py-3">
          <Button onClick={startEnrollment} disabled={enrolling} className="gap-2">
            {enrolling ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Generating QR Code...
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" /> Setup Two-Factor Authentication
              </>
            )}
          </Button>
        </CardFooter>
      )}

      {/* 2FA Enrollment Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Smartphone className="text-primary h-5 w-5" /> Setup Authenticator App
            </DialogTitle>
            <DialogDescription>
              Scan the QR code with Google Authenticator, Authy, or 1Password.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {qrCodeUrl && (
              <div className="flex justify-center p-2">
                <div className="rounded-xl border bg-white p-3 shadow-xs dark:bg-white">
                  <Image
                    src={qrCodeUrl}
                    alt="2FA QR Code"
                    width={180}
                    height={180}
                    className="h-44 w-44"
                    unoptimized
                  />
                </div>
              </div>
            )}

            {secret && (
              <div className="space-y-1.5">
                <Label className="text-muted-foreground text-xs">Manual Setup Key</Label>
                <div className="flex items-center gap-2">
                  <code className="bg-muted flex-1 rounded-md border px-2.5 py-1.5 font-mono text-xs select-all">
                    {secret}
                  </code>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCopySecret}
                    className="gap-1 text-xs"
                  >
                    {copiedSecret ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    Copy
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="code" className="text-sm font-semibold">
                Enter 6-Digit Code
              </Label>
              <Input
                id="code"
                type="text"
                maxLength={6}
                placeholder="123456"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ""))}
                className="text-center font-mono text-lg tracking-widest"
                autoComplete="one-time-code"
              />
              <p className="text-muted-foreground text-xs">
                Enter the six digits displayed on your authenticator screen.
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleVerify}
              disabled={verifying || verificationCode.trim().length !== 6}
            >
              {verifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
                </>
              ) : (
                "Verify & Activate"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
