"use client";

import { useEffect, useState } from "react";
import { getImpersonationStatusAction, exitImpersonationAction } from "@/server/actions/admin";
import { Button } from "@/components/ui/button";
import { AlertTriangle, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function ImpersonationBanner() {
  const [impersonatedUser, setImpersonatedUser] = useState<{
    id: string;
    email: string;
    fullName?: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await getImpersonationStatusAction();
        if (res.isImpersonating && res.user) {
          setImpersonatedUser(res.user);
        } else {
          setImpersonatedUser(null);
        }
      } catch (err) {
        console.warn("Could not check impersonation status:", err);
      }
    }
    checkStatus();
  }, []);

  if (!impersonatedUser) return null;

  const handleExit = async () => {
    setLoading(true);
    try {
      await exitImpersonationAction();
      toast.success("Exited impersonation mode.");
      router.push("/admin");
      router.refresh();
    } catch {
      toast.error("Failed to exit impersonation mode.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in slide-in-from-top flex items-center justify-between gap-3 border-b border-amber-500/30 bg-amber-500/15 px-4 py-2.5 text-xs text-amber-700 shadow-xs dark:text-amber-300">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
        <span>
          <strong className="font-semibold">Super Admin Impersonation:</strong> You are currently
          viewing the workspace as{" "}
          <span className="font-mono font-medium underline">
            {impersonatedUser.fullName || impersonatedUser.email}
          </span>
          . All actions performed will reflect on this account.
        </span>
      </div>

      <Button
        variant="destructive"
        size="sm"
        onClick={handleExit}
        disabled={loading}
        className="h-7 shrink-0 gap-1.5 text-xs"
      >
        <LogOut className="h-3 w-3" />
        Exit Impersonation
      </Button>
    </div>
  );
}
