"use client";

import { useState } from "react";
import { createApiKeyAction, revokeApiKeyAction } from "@/server/actions/api-keys";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import * as Dialog from "@radix-ui/react-dialog";
import { Key, Plus, Copy, Check, Trash2, ShieldAlert, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import type { ApiKey } from "@/db/schema";

interface ApiKeysManagerProps {
  initialKeys: ApiKey[];
}

export function ApiKeysManager({ initialKeys }: ApiKeysManagerProps) {
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [loading, setLoading] = useState(false);

  // One-time reveal modal state
  const [revealedKey, setRevealedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleCreateKey(e: React.FormEvent) {
    e.preventDefault();
    if (!keyName.trim() || loading) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("name", keyName);

    const result = await createApiKeyAction(formData);

    if (result.error) {
      toast.error(result.error);
    } else if (result.rawKey) {
      setRevealedKey(result.rawKey);
      setIsCreateOpen(false);
      setKeyName("");
      toast.success("API key generated successfully!");
      // Optimistically update list
      setKeys((prev) => [
        {
          id: Math.random().toString(),
          userId: "",
          name: result.name || "API Key",
          keyPrefix: result.keyPrefix || "sk_live_••••",
          keyHash: "",
          lastUsedAt: null,
          createdAt: new Date(),
        },
        ...prev,
      ]);
    }

    setLoading(false);
  }

  async function handleRevokeKey(id: string) {
    if (!confirm("Are you sure you want to revoke this API key? This action cannot be undone.")) {
      return;
    }

    const result = await revokeApiKeyAction(id);
    if (result.error) {
      toast.error(result.error);
    } else {
      setKeys((prev) => prev.filter((k) => k.id !== id));
      toast.success("API key revoked.");
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Active API Keys</h2>
          <p className="text-muted-foreground mt-0.5 text-sm">
            Keys allow programmatic access to your SaaS API endpoints. Keep your keys secret.
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)} className="gap-2 font-semibold">
          <Plus className="h-4 w-4" /> Create Secret Key
        </Button>
      </div>

      {/* Keys Table Card */}
      <Card>
        <CardContent className="p-0">
          {keys.length === 0 ? (
            <div className="space-y-3 py-12 text-center">
              <div className="bg-muted text-muted-foreground mx-auto flex h-10 w-10 items-center justify-center rounded-full">
                <Key className="h-5 w-5" />
              </div>
              <p className="text-foreground text-sm font-medium">No API keys generated yet</p>
              <p className="text-muted-foreground mx-auto max-w-sm text-xs">
                Create a secret API key to authenticate requests from your backend services, CLI, or
                external applications.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCreateOpen(true)}
                className="mt-2"
              >
                Create your first key
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[500px] divide-y text-sm">
                <div className="text-muted-foreground bg-muted/30 grid grid-cols-12 px-6 py-3 text-xs font-semibold tracking-wider uppercase">
                  <div className="col-span-4">Name</div>
                  <div className="col-span-4">Secret Key Prefix</div>
                  <div className="col-span-2">Created</div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>

                {keys.map((k) => (
                  <div
                    key={k.id}
                    className="hover:bg-muted/10 grid grid-cols-12 items-center px-6 py-4 transition-colors"
                  >
                    <div className="col-span-4 flex items-center gap-2 font-medium">
                      <Key className="text-primary h-4 w-4 shrink-0" />
                      <span className="truncate">{k.name}</span>
                    </div>

                    <div className="text-muted-foreground col-span-4 font-mono text-xs">
                      <span className="bg-muted rounded-sm border px-2 py-1">{k.keyPrefix}</span>
                    </div>

                    <div className="text-muted-foreground col-span-2 text-xs">
                      {new Date(k.createdAt).toLocaleDateString()}
                    </div>

                    <div className="col-span-2 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRevokeKey(k.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 gap-1 px-2"
                        title="Revoke key"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="text-xs">Revoke</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Key Modal Dialog */}
      <Dialog.Root open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-background/80 fixed inset-0 z-50 backdrop-blur-xs" />
          <Dialog.Content className="bg-card fixed top-[40%] left-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] rounded-2xl border p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b pb-3">
              <Dialog.Title className="text-lg font-bold">Create Secret API Key</Dialog.Title>
              <Dialog.Close asChild>
                <button aria-label="Close" className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Description className="text-muted-foreground mb-4 text-xs">
              Enter a friendly label to identify this key in your logs and dashboard.
            </Dialog.Description>

            <form onSubmit={handleCreateKey} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keyName">Key Label / Name</Label>
                <Input
                  id="keyName"
                  placeholder="e.g. Production Backend, Webhook Sync"
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading || !keyName.trim()}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                    </>
                  ) : (
                    "Generate Key"
                  )}
                </Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* One-Time Secret Key Reveal Modal */}
      <Dialog.Root open={!!revealedKey} onOpenChange={() => setRevealedKey(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-background/80 fixed inset-0 z-50 backdrop-blur-xs" />
          <Dialog.Content className="bg-card fixed top-[40%] left-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] space-y-4 rounded-2xl border p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <Key className="h-5 w-5" />
                <Dialog.Title className="text-lg font-bold">Secret Key Created</Dialog.Title>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-900 dark:text-amber-200">
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
              <p className="leading-relaxed">
                <strong>Important:</strong> Please copy this secret key now. For your security, you
                will not be able to see it again after closing this window.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Your Secret API Key</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={revealedKey || ""}
                  readOnly
                  className="bg-muted selection:bg-primary selection:text-primary-foreground font-mono text-xs"
                />
                <Button
                  onClick={() => revealedKey && copyToClipboard(revealedKey)}
                  className="shrink-0 gap-1.5 px-4 font-semibold"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="outline" onClick={() => setRevealedKey(null)}>
                I Have Saved My Key
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
