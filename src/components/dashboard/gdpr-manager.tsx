"use client";

import { useState } from "react";
import { exportUserDataAction, deleteAccountAction } from "@/server/actions/gdpr";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Dialog from "@radix-ui/react-dialog";
import { Download, AlertOctagon, Trash2, X, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

export function GdprManager() {
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [confirmationInput, setConfirmationInput] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const res = await exportUserDataAction();
      if (res.error) {
        toast.error(res.error);
      } else if (res.jsonData) {
        // Trigger automated browser download
        const blob = new Blob([res.jsonData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `account-data-export-${new Date().toISOString().split("T")[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast.success("Account data bundle downloaded successfully!");
      }
    } catch {
      toast.error("Failed to generate data export.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmationInput !== "DELETE") {
      toast.error("Please type DELETE in capital letters to confirm.");
      return;
    }

    setIsDeleting(true);
    try {
      const res = await deleteAccountAction(confirmationInput);
      if (res?.error) {
        toast.error(res.error);
      }
    } catch {
      // redirect() throws an error in Next.js Server Actions which is expected
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 border-t pt-4">
      {/* Data Export Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Download className="text-primary h-5 w-5" />
            <CardTitle>Data Portability (GDPR Export)</CardTitle>
          </div>
          <CardDescription>
            Download a full, machine-readable JSON archive of your personal profile, workspace
            details, subscriptions, and API keys.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportData}
            disabled={isExporting}
            className="gap-2 text-xs"
          >
            <Download className="h-4 w-4" />
            {isExporting ? "Generating Export..." : "Download Account Data (.json)"}
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone Card */}
      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader>
          <div className="text-destructive flex items-center gap-2">
            <AlertOctagon className="h-5 w-5" />
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
          </div>
          <CardDescription>
            Permanently delete your account, cancel all active subscriptions, and remove your
            workspaces. This action is irreversible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setIsDeleteOpen(true)}
            className="gap-2 text-xs"
          >
            <Trash2 className="h-4 w-4" /> Delete Account Permanently
          </Button>
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      <Dialog.Root open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="animate-in fade-in fixed inset-0 z-50 bg-black/60 backdrop-blur-xs" />
          <Dialog.Content className="bg-card text-card-foreground border-destructive/40 animate-in zoom-in-95 fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between border-b pb-3">
              <div className="text-destructive flex items-center gap-2">
                <ShieldAlert className="h-5 w-5" />
                <Dialog.Title className="text-base font-bold">
                  Confirm Account Deletion
                </Dialog.Title>
              </div>
              <Dialog.Close asChild>
                <button className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </Dialog.Close>
            </div>

            <form onSubmit={handleDeleteAccount} className="space-y-4">
              <p className="text-muted-foreground text-xs leading-relaxed">
                This will permanently delete your account, organizations, developer API keys, and
                active subscriptions. All associated data will be immediately purged.
              </p>

              <div className="space-y-2">
                <label className="block text-xs font-semibold">
                  To confirm, type{" "}
                  <span className="text-destructive font-mono font-bold">DELETE</span> below:
                </label>
                <Input
                  value={confirmationInput}
                  onChange={(e) => setConfirmationInput(e.target.value)}
                  placeholder="DELETE"
                  className="font-mono text-xs"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 border-t pt-2">
                <Dialog.Close asChild>
                  <Button type="button" variant="outline" size="sm">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Button
                  type="submit"
                  variant="destructive"
                  size="sm"
                  disabled={confirmationInput !== "DELETE" || isDeleting}
                >
                  {isDeleting ? "Deleting Account..." : "Confirm & Delete"}
                </Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
