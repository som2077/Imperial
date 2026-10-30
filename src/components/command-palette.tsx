"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Search,
  LayoutDashboard,
  Bot,
  CreditCard,
  Settings,
  Users,
  Key,
  Webhook,
  BookOpen,
  FileText,
  History,
  Moon,
  Sun,
  Copy,
  Home,
  X,
  Image as ImageIcon,
  ShieldAlert,
  Cpu,
  Mail,
} from "lucide-react";
import { toast } from "sonner";

interface CommandItem {
  id: string;
  title: string;
  description?: string;
  category: "Dashboard" | "Platform" | "Documentation" | "Actions";
  icon: React.ComponentType<{ className?: string }>;
  perform: () => void;
  keywords?: string[];
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();

  // Listen for Cmd+K or Ctrl+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => {
          const next = !prev;
          if (next) {
            setSearch("");
            setSelectedIndex(0);
          }
          return next;
        });
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const items: CommandItem[] = useMemo(
    () => [
      // Dashboard
      {
        id: "dashboard",
        title: "Dashboard Overview",
        description: "View account performance and stats",
        category: "Dashboard",
        icon: LayoutDashboard,
        perform: () => {
          router.push("/dashboard");
          setOpen(false);
        },
        keywords: ["overview", "home", "stats"],
      },
      {
        id: "ai-studio",
        title: "AI Studio Workspace",
        description: "Vercel AI SDK Copilot with Tool Calling",
        category: "Dashboard",
        icon: Bot,
        perform: () => {
          router.push("/dashboard/ai-studio");
          setOpen(false);
        },
        keywords: ["ai", "chat", "copilot", "gpt", "studio"],
      },
      {
        id: "team",
        title: "Team & Organizations",
        description: "Manage workspaces and invite members",
        category: "Dashboard",
        icon: Users,
        perform: () => {
          router.push("/dashboard/team");
          setOpen(false);
        },
        keywords: ["organization", "members", "invite", "b2b", "tenancy"],
      },
      {
        id: "api-keys",
        title: "Developer API Keys",
        description: "Generate secret tokens for programmatic API access",
        category: "Dashboard",
        icon: Key,
        perform: () => {
          router.push("/dashboard/api-keys");
          setOpen(false);
        },
        keywords: ["secret", "developer", "tokens", "token"],
      },
      {
        id: "webhooks",
        title: "Outgoing Webhooks",
        description: "Configure real-time event webhooks for Zapier, Slack, or APIs",
        category: "Dashboard",
        icon: Webhook,
        perform: () => {
          router.push("/dashboard/webhooks");
          setOpen(false);
        },
        keywords: ["webhooks", "zapier", "slack", "events", "integrations", "api"],
      },
      {
        id: "billing",
        title: "Billing & Subscriptions",
        description: "Manage Lemon Squeezy plans and portal",
        category: "Dashboard",
        icon: CreditCard,
        perform: () => {
          router.push("/dashboard/billing");
          setOpen(false);
        },
        keywords: ["payment", "invoice", "pro", "upgrade", "lemon squeezy"],
      },
      {
        id: "settings",
        title: "Profile & Settings",
        description: "Update personal preferences and display avatar",
        category: "Dashboard",
        icon: Settings,
        perform: () => {
          router.push("/dashboard/settings");
          setOpen(false);
        },
        keywords: ["profile", "account", "email", "avatar"],
      },
      {
        id: "media",
        title: "Media & Cloud Storage",
        description: "Upload and optimize media with Cloudinary CDN",
        category: "Dashboard",
        icon: ImageIcon,
        perform: () => {
          router.push("/dashboard/media");
          setOpen(false);
        },
        keywords: ["media", "images", "upload", "cloudinary", "cdn", "photos", "storage"],
      },
      {
        id: "admin-kpis",
        title: "Super Admin Control Room",
        description: "View platform KPIs, tenant accounts, and system status",
        category: "Platform",
        icon: ShieldAlert,
        perform: () => {
          router.push("/admin");
          setOpen(false);
        },
        keywords: ["admin", "kpi", "control", "users", "superadmin"],
      },
      {
        id: "admin-jobs",
        title: "Background Cron Jobs",
        description: "Trigger scheduled maintenance, retry webhooks, cleanup DB",
        category: "Platform",
        icon: Cpu,
        perform: () => {
          router.push("/admin/jobs");
          setOpen(false);
        },
        keywords: ["cron", "jobs", "schedule", "automation", "worker", "tasks"],
      },
      {
        id: "admin-emails",
        title: "Transactional Email Studio",
        description: "Live preview Resend & React Email notification templates",
        category: "Platform",
        icon: Mail,
        perform: () => {
          router.push("/admin/emails");
          setOpen(false);
        },
        keywords: ["email", "resend", "templates", "preview", "mailer"],
      },

      // Documentation & Public
      {
        id: "home",
        title: "Marketing Homepage",
        description: "Return to the public landing page",
        category: "Platform",
        icon: Home,
        perform: () => {
          router.push("/");
          setOpen(false);
        },
        keywords: ["landing", "main"],
      },
      {
        id: "docs",
        title: "Documentation & Guides",
        description: "Technical reference and architecture docs",
        category: "Documentation",
        icon: BookOpen,
        perform: () => {
          router.push("/docs");
          setOpen(false);
        },
        keywords: ["guides", "api", "tutorial", "help"],
      },
      {
        id: "blog",
        title: "Engineering Blog",
        description: "SaaS growth tactics and articles",
        category: "Documentation",
        icon: FileText,
        perform: () => {
          router.push("/blog");
          setOpen(false);
        },
        keywords: ["articles", "posts", "read"],
      },
      {
        id: "changelog",
        title: "Product Changelog",
        description: "Release history and roadmap milestones",
        category: "Documentation",
        icon: History,
        perform: () => {
          router.push("/changelog");
          setOpen(false);
        },
        keywords: ["releases", "updates", "version"],
      },

      // Actions
      {
        id: "theme",
        title: `Switch to ${resolvedTheme === "dark" ? "Light" : "Dark"} Mode`,
        description: "Toggle system color theme",
        category: "Actions",
        icon: resolvedTheme === "dark" ? Sun : Moon,
        perform: () => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
          setOpen(false);
          toast.success(`Switched to ${resolvedTheme === "dark" ? "light" : "dark"} mode`);
        },
        keywords: ["theme", "color", "dark", "light"],
      },
      {
        id: "copy-url",
        title: "Copy App URL",
        description: "Copy web address to clipboard",
        category: "Actions",
        icon: Copy,
        perform: () => {
          navigator.clipboard.writeText(window.location.origin);
          setOpen(false);
          toast.success("App URL copied to clipboard!");
        },
        keywords: ["share", "clipboard", "link"],
      },
    ],
    [resolvedTheme, router, setTheme]
  );

  // Filter items
  const filteredItems = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.keywords?.some((k) => k.toLowerCase().includes(q))
    );
  }, [items, search]);

  // Handle keyboard navigation in list
  useEffect(() => {
    function handleListNav(e: KeyboardEvent) {
      if (!open) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev === 0 ? Math.max(0, filteredItems.length - 1) : prev - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].perform();
        }
      }
    }

    window.addEventListener("keydown", handleListNav);
    return () => window.removeEventListener("keydown", handleListNav);
  }, [open, filteredItems, selectedIndex]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 backdrop-blur-xs" />
        <Dialog.Content className="bg-card data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[20%] left-[50%] z-50 w-full max-w-xl translate-x-[-50%] overflow-hidden rounded-2xl border p-0 shadow-2xl duration-200">
          <Dialog.Title className="sr-only">Command Palette</Dialog.Title>
          <Dialog.Description className="sr-only">
            Search for commands, pages, and actions
          </Dialog.Description>

          {/* Search Bar Input */}
          <div className="bg-muted/20 flex items-center gap-3 border-b px-4 py-3.5">
            <Search className="text-muted-foreground h-5 w-5 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Type a command or search pages..."
              className="placeholder:text-muted-foreground w-full bg-transparent text-sm focus:outline-hidden"
              autoFocus
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-muted-foreground hover:text-foreground text-xs"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <kbd className="bg-muted text-muted-foreground pointer-events-none hidden h-5 items-center gap-1 rounded-sm border px-1.5 font-mono text-[10px] font-medium select-none sm:inline-flex">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <div className="max-h-80 space-y-1 overflow-y-auto p-2">
            {filteredItems.length === 0 ? (
              <div className="text-muted-foreground py-8 text-center text-sm">
                No commands or pages found for &ldquo;{search}&rdquo;.
              </div>
            ) : (
              filteredItems.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                const Icon = item.icon;

                return (
                  <div
                    key={item.id}
                    onClick={() => item.perform()}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
                      isSelected
                        ? "bg-primary text-primary-foreground font-medium"
                        : "hover:bg-accent text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                          isSelected
                            ? "bg-primary-foreground/20 text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="truncate font-semibold">{item.title}</div>
                        {item.description && (
                          <div
                            className={`truncate text-xs ${
                              isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                            }`}
                          >
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>

                    <span
                      className={`ml-2 shrink-0 rounded-sm px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
                        isSelected
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="bg-muted/40 text-muted-foreground flex items-center justify-between border-t px-4 py-2 text-[11px]">
            <div className="flex items-center gap-2">
              <span>Navigate:</span>
              <kbd className="bg-background rounded-sm border px-1">↑</kbd>
              <kbd className="bg-background rounded-sm border px-1">↓</kbd>
            </div>
            <div className="flex items-center gap-2">
              <span>Select:</span>
              <kbd className="bg-background rounded-sm border px-1">↵</kbd>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function CommandPaletteTrigger() {
  const [isMac] = useState(() =>
    typeof window !== "undefined" ? navigator.userAgent.toUpperCase().indexOf("MAC") >= 0 : false
  );

  function trigger() {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
  }

  return (
    <button
      onClick={trigger}
      className="bg-muted/30 hover:bg-accent text-muted-foreground hover:text-foreground flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium shadow-2xs transition-colors"
    >
      <Search className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">Search...</span>
      <kbd className="bg-background text-muted-foreground pointer-events-none rounded-sm border px-1.5 py-0.5 font-mono text-[10px] font-semibold">
        {isMac ? "⌘K" : "Ctrl+K"}
      </kbd>
    </button>
  );
}
