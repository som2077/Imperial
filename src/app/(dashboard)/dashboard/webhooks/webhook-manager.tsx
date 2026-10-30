"use client";

import { useState } from "react";
import {
  createWebhookEndpointAction,
  deleteWebhookEndpointAction,
  toggleWebhookEndpointAction,
  testWebhookEndpointAction,
  getWebhookDeliveriesAction,
} from "@/server/actions/webhooks";
import { type WebhookEndpoint, type WebhookDelivery } from "@/db/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Webhook,
  Plus,
  Trash2,
  Send,
  History,
  Copy,
  Check,
  X,
  Radio,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface WebhookWithDeliveries extends WebhookEndpoint {
  deliveries?: WebhookDelivery[];
}

const AVAILABLE_EVENTS = [
  {
    id: "user.created",
    label: "User Registered",
    description: "Triggered when a new user signs up",
  },
  {
    id: "subscription.updated",
    label: "Subscription Updated",
    description: "Triggered when a subscription renews, upgrades, or cancels",
  },
  {
    id: "member.invited",
    label: "Team Member Invited",
    description: "Triggered when an invitation is sent",
  },
  {
    id: "api_key.created",
    label: "API Key Created",
    description: "Triggered when a developer generates a new token",
  },
  {
    id: "custom.event",
    label: "Custom Ingested Events",
    description: "Events ingested via POST /api/v1/events",
  },
];

export function WebhookManager({
  initialEndpoints,
}: {
  initialEndpoints: WebhookWithDeliveries[];
  organizationId: string;
}) {
  const [endpoints, setEndpoints] = useState<WebhookWithDeliveries[]>(initialEndpoints);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isSecretOpen, setIsSecretOpen] = useState(false);
  const [isDeliveriesOpen, setIsDeliveriesOpen] = useState(false);

  // Form State
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([
    "user.created",
    "subscription.updated",
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Revealed Secret State
  const [revealedSecret, setRevealedSecret] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false);

  // Delivery History State
  const [activeEndpointForLogs, setActiveEndpointForLogs] = useState<WebhookWithDeliveries | null>(
    null
  );
  const [deliveries, setDeliveries] = useState<WebhookDelivery[]>([]);
  const [loadingDeliveries, setLoadingDeliveries] = useState(false);

  // Testing State
  const [testingEndpointId, setTestingEndpointId] = useState<string | null>(null);

  const toggleEventSelection = (eventId: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId) ? prev.filter((e) => e !== eventId) : [...prev, eventId]
    );
  };

  const handleCreateWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toast.error("Please enter a webhook endpoint URL.");
      return;
    }
    if (selectedEvents.length === 0) {
      toast.error("Please select at least one event.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createWebhookEndpointAction({
        url,
        description,
        events: selectedEvents,
      });

      if (res.error) {
        toast.error(res.error);
      } else if (res.success && res.secret && res.endpoint) {
        setRevealedSecret(res.secret);
        setEndpoints((prev) => [res.endpoint as WebhookWithDeliveries, ...prev]);
        setIsAddOpen(false);
        setIsSecretOpen(true);
        setUrl("");
        setDescription("");
        toast.success("Webhook endpoint registered successfully!");
      }
    } catch {
      toast.error("Failed to create webhook. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (endpoint: WebhookWithDeliveries) => {
    const nextStatus = !endpoint.isActive;
    try {
      const res = await toggleWebhookEndpointAction(endpoint.id, nextStatus);
      if (res.error) {
        toast.error(res.error);
      } else {
        setEndpoints((prev) =>
          prev.map((ep) => (ep.id === endpoint.id ? { ...ep, isActive: nextStatus } : ep))
        );
        toast.success(nextStatus ? "Webhook activated" : "Webhook paused");
      }
    } catch {
      toast.error("Failed to toggle webhook status");
    }
  };

  const handleDelete = async (endpointId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this webhook endpoint? Delivery logs will also be removed."
      )
    ) {
      return;
    }

    try {
      const res = await deleteWebhookEndpointAction(endpointId);
      if (res.error) {
        toast.error(res.error);
      } else {
        setEndpoints((prev) => prev.filter((ep) => ep.id !== endpointId));
        toast.success("Webhook endpoint deleted");
      }
    } catch {
      toast.error("Failed to delete webhook endpoint");
    }
  };

  const handleTestPing = async (endpointId: string) => {
    setTestingEndpointId(endpointId);
    try {
      const res = await testWebhookEndpointAction(endpointId);
      if (res.error) {
        toast.error(res.error);
      } else if (res.success) {
        toast.success(
          `Ping delivered successfully! Status ${res.status} OK in ${res.durationMs}ms`
        );
      } else {
        toast.error(`Endpoint returned HTTP ${res.status} (in ${res.durationMs}ms)`);
      }
    } catch {
      toast.error("Test ping request failed.");
    } finally {
      setTestingEndpointId(null);
    }
  };

  const handleViewDeliveries = async (endpoint: WebhookWithDeliveries) => {
    setActiveEndpointForLogs(endpoint);
    setIsDeliveriesOpen(true);
    setLoadingDeliveries(true);
    try {
      const logs = await getWebhookDeliveriesAction(endpoint.id);
      setDeliveries(logs);
    } catch {
      toast.error("Could not load delivery history");
    } finally {
      setLoadingDeliveries(false);
    }
  };

  const copySecret = () => {
    if (revealedSecret) {
      navigator.clipboard.writeText(revealedSecret);
      setHasCopied(true);
      toast.success("Signing secret copied to clipboard!");
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Configured Endpoints</h2>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Receive automated real-time HTTP POST notifications when events occur in your SaaS.
          </p>
        </div>

        <Button onClick={() => setIsAddOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Add Webhook Endpoint
        </Button>
      </div>

      {/* Endpoints List */}
      {endpoints.length === 0 ? (
        <Card className="border-dashed py-12 text-center">
          <CardContent className="space-y-4">
            <div className="bg-primary/10 text-primary mx-auto flex h-12 w-12 items-center justify-center rounded-full">
              <Webhook className="h-6 w-6" />
            </div>
            <div className="mx-auto max-w-md space-y-1">
              <h3 className="text-base font-semibold">No Webhooks Configured</h3>
              <p className="text-muted-foreground text-xs">
                Connect your workspace to Zapier, Make, Slack, or your custom API backend by adding
                an HTTP endpoint.
              </p>
            </div>
            <Button onClick={() => setIsAddOpen(true)} variant="outline" className="gap-2 text-xs">
              <Plus className="h-3.5 w-3.5" /> Add First Endpoint
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {endpoints.map((ep) => (
            <Card key={ep.id} className="relative overflow-hidden">
              <div className="flex flex-col items-start justify-between gap-4 p-5 md:flex-row md:items-center">
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="max-w-md truncate font-mono text-sm font-semibold">
                      {ep.url}
                    </span>
                    <Badge variant={ep.isActive ? "default" : "secondary"} className="text-[10px]">
                      {ep.isActive ? "Active" : "Paused"}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground text-xs">
                    {ep.description || "No description provided"}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {ep.events.map((evt) => (
                      <span
                        key={evt}
                        className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 font-mono text-[10px]"
                      >
                        {evt}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="border-border flex w-full shrink-0 items-center justify-end gap-2 border-t pt-2 md:w-auto md:border-0 md:pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTestPing(ep.id)}
                    disabled={testingEndpointId === ep.id}
                    className="gap-1.5 text-xs"
                  >
                    <Send className="h-3.5 w-3.5" />
                    {testingEndpointId === ep.id ? "Pinging..." : "Test Ping"}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDeliveries(ep)}
                    className="gap-1.5 text-xs"
                  >
                    <History className="h-3.5 w-3.5" /> Logs
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleStatus(ep)}
                    className="text-xs"
                  >
                    {ep.isActive ? "Pause" : "Resume"}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(ep.id)}
                    className="text-destructive hover:bg-destructive/10 h-8 w-8"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Webhook Dialog */}
      <Dialog.Root open={isAddOpen} onOpenChange={setIsAddOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="animate-in fade-in fixed inset-0 z-50 bg-black/50 backdrop-blur-xs" />
          <Dialog.Content className="bg-card text-card-foreground animate-in zoom-in-95 fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-6 shadow-xl">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <Webhook className="text-primary h-5 w-5" />
                <Dialog.Title className="text-lg font-bold">Add Webhook Endpoint</Dialog.Title>
              </div>
              <Dialog.Close asChild>
                <button className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </Dialog.Close>
            </div>

            <form onSubmit={handleCreateWebhook} className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <Label htmlFor="webhook-url">Endpoint URL</Label>
                <Input
                  id="webhook-url"
                  placeholder="https://your-domain.com/api/webhook"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="font-mono text-xs"
                  required
                />
                <p className="text-muted-foreground text-[11px]">
                  Must be a publicly accessible HTTPS or HTTP URL.
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="webhook-desc">Description</Label>
                <Input
                  id="webhook-desc"
                  placeholder="e.g. Production Zapier Sync"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="text-xs"
                />
              </div>

              <div className="space-y-2">
                <Label>Events to Subscribe</Label>
                <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
                  {AVAILABLE_EVENTS.map((evt) => {
                    const isChecked = selectedEvents.includes(evt.id);
                    return (
                      <div
                        key={evt.id}
                        onClick={() => toggleEventSelection(evt.id)}
                        className={`flex cursor-pointer items-start gap-2.5 rounded-lg border p-2 text-left transition-colors ${
                          isChecked
                            ? "border-primary bg-primary/5"
                            : "border-border hover:bg-muted/50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="text-primary focus:ring-primary mt-0.5 rounded"
                        />
                        <div>
                          <div className="text-xs font-semibold">{evt.label}</div>
                          <div className="text-muted-foreground text-[11px]">{evt.description}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t pt-2">
                <Dialog.Close asChild>
                  <Button type="button" variant="outline" size="sm">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Button type="submit" size="sm" disabled={isSubmitting}>
                  {isSubmitting ? "Registering..." : "Create Webhook"}
                </Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Secret Reveal Modal */}
      <Dialog.Root open={isSecretOpen} onOpenChange={setIsSecretOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="animate-in fade-in fixed inset-0 z-50 bg-black/60 backdrop-blur-xs" />
          <Dialog.Content className="bg-card text-card-foreground animate-in zoom-in-95 fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-6 shadow-xl">
            <div className="mb-2 flex items-center gap-2 text-emerald-500">
              <ShieldCheck className="h-6 w-6" />
              <Dialog.Title className="text-lg font-bold">Webhook Signing Secret</Dialog.Title>
            </div>
            <Dialog.Description className="text-muted-foreground mb-4 text-xs">
              Use this secret to verify incoming HMAC SHA-256 signatures in the{" "}
              <code className="bg-muted rounded px-1 font-mono">X-Webhook-Signature</code> header.
            </Dialog.Description>

            <div className="bg-muted/50 mb-4 flex items-center justify-between gap-2 rounded-lg border p-3 font-mono text-xs">
              <span className="truncate">{revealedSecret}</span>
              <Button size="icon" variant="ghost" onClick={copySecret} className="h-7 w-7 shrink-0">
                {hasCopied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>

            <div className="mb-4 flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/10 p-2.5 text-xs text-amber-600 dark:text-amber-400">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>Make sure to copy this secret now. It will not be shown again.</span>
            </div>

            <div className="flex justify-end">
              <Button size="sm" onClick={() => setIsSecretOpen(false)}>
                Done
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Deliveries History Modal */}
      <Dialog.Root open={isDeliveriesOpen} onOpenChange={setIsDeliveriesOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="animate-in fade-in fixed inset-0 z-50 bg-black/50 backdrop-blur-xs" />
          <Dialog.Content className="bg-card text-card-foreground animate-in zoom-in-95 fixed top-1/2 left-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between border-b pb-3">
              <div>
                <Dialog.Title className="flex items-center gap-2 text-base font-bold">
                  <History className="text-primary h-4 w-4" /> Delivery History
                </Dialog.Title>
                <p className="text-muted-foreground mt-0.5 max-w-md truncate font-mono text-xs">
                  {activeEndpointForLogs?.url}
                </p>
              </div>
              <Dialog.Close asChild>
                <button className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </Dialog.Close>
            </div>

            {loadingDeliveries ? (
              <div className="text-muted-foreground py-8 text-center text-xs">
                Loading recent delivery logs...
              </div>
            ) : deliveries.length === 0 ? (
              <div className="text-muted-foreground py-8 text-center text-xs">
                No delivery logs recorded yet. Try clicking &quot;Test Ping&quot; to send an event.
              </div>
            ) : (
              <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
                {deliveries.map((del) => {
                  const isOk =
                    del.responseStatus && del.responseStatus >= 200 && del.responseStatus < 300;
                  return (
                    <div
                      key={del.id}
                      className="bg-muted/20 flex items-center justify-between gap-3 rounded-lg border p-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold ${
                              isOk
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "bg-destructive/10 text-destructive"
                            }`}
                          >
                            {del.responseStatus || "ERR"}
                          </span>
                          <span className="font-mono font-semibold">{del.event}</span>
                        </div>
                        <p className="text-muted-foreground max-w-xs truncate font-mono text-[11px]">
                          {del.responseBody || "Empty response"}
                        </p>
                      </div>

                      <div className="text-muted-foreground shrink-0 space-y-0.5 text-right text-[11px]">
                        <div className="flex items-center justify-end gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{del.durationMs}ms</span>
                        </div>
                        <div>{new Date(del.createdAt).toLocaleTimeString()}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-4 flex justify-end border-t pt-4">
              <Dialog.Close asChild>
                <Button size="sm" variant="outline">
                  Close
                </Button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Developer API Reference Card */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="text-primary h-4 w-4" />
              <CardTitle className="text-sm">Developer REST API & HMAC Verification</CardTitle>
            </div>
            <Link
              href="/docs/public-api-and-webhooks"
              className="text-primary inline-flex items-center gap-1 text-xs font-medium hover:underline"
            >
              API Reference Guide <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
          <CardDescription className="text-xs">
            Authenticate programmatically using Bearer tokens at{" "}
            <code className="bg-background rounded px-1 py-0.5 font-mono text-[11px]">
              /api/v1/me
            </code>{" "}
            and ingest custom webhook events via{" "}
            <code className="bg-background rounded px-1 py-0.5 font-mono text-[11px]">
              /api/v1/events
            </code>
            .
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
