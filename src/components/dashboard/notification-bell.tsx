"use client";

import { useState, useEffect } from "react";
import {
  getUserNotificationsAction,
  markNotificationAsReadAction,
  markAllNotificationsAsReadAction,
} from "@/server/actions/notifications";
import { type Notification } from "@/db/schema";
import { useAppStore } from "@/lib/store/use-app-store";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Bell, Check, Info, CheckCircle2, AlertTriangle, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const { unreadNotificationsCount, setUnreadNotificationsCount, clearUnreadNotifications } =
    useAppStore();

  useEffect(() => {
    async function loadNotifications() {
      try {
        const res = await getUserNotificationsAction();
        setNotifications(res.notifications);
        setUnreadNotificationsCount(res.unreadCount);
      } catch (err) {
        console.warn("Could not load initial notifications:", err);
      }
    }
    loadNotifications();
  }, [setUnreadNotificationsCount]);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markNotificationAsReadAction(id);
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
      setUnreadNotificationsCount(Math.max(0, unreadNotificationsCount - 1));
    } catch {
      toast.error("Failed to update notification");
    }
  };

  const handleMarkAllRead = async () => {
    setLoading(true);
    try {
      await markAllNotificationsAsReadAction();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      clearUnreadNotifications();
      toast.success("All notifications marked as read");
    } catch {
      toast.error("Failed to clear notifications");
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />;
      case "warning":
      case "alert":
        return <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />;
      default:
        return <Info className="text-primary mt-0.5 h-4 w-4 shrink-0" />;
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label="View notifications"
          className="text-muted-foreground hover:text-foreground hover:bg-accent focus:ring-primary/20 relative rounded-lg p-2 transition-colors focus:ring-2 focus:outline-hidden"
        >
          <Bell className="h-5 w-5" />
          {unreadNotificationsCount > 0 && (
            <span className="bg-destructive text-destructive-foreground animate-in zoom-in absolute top-1 right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-bold shadow-xs">
              {unreadNotificationsCount > 9 ? "9+" : unreadNotificationsCount}
            </span>
          )}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="bg-card text-card-foreground animate-in fade-in zoom-in-95 z-50 w-80 rounded-xl border p-0 shadow-xl sm:w-96"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Notifications</span>
              {unreadNotificationsCount > 0 && (
                <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-[10px] font-semibold">
                  {unreadNotificationsCount} new
                </span>
              )}
            </div>

            {unreadNotificationsCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                disabled={loading}
                className="text-muted-foreground hover:text-primary flex items-center gap-1 text-xs font-medium transition-colors"
              >
                <Check className="h-3 w-3" /> Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="divide-border max-h-80 divide-y overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="text-muted-foreground space-y-1 px-4 py-8 text-center text-xs">
                <Bell className="text-muted-foreground/40 mx-auto mb-2 h-6 w-6" />
                <p className="font-medium">No notifications yet</p>
                <p className="text-[11px]">
                  You&apos;ll be alerted when team or billing events occur.
                </p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => !n.isRead && handleMarkAsRead(n.id)}
                  className={`flex cursor-pointer items-start gap-3 p-3.5 transition-colors ${
                    !n.isRead ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/50"
                  }`}
                >
                  {getTypeIcon(n.type)}
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`truncate text-xs font-semibold ${!n.isRead ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {n.title}
                      </span>
                      {!n.isRead && (
                        <span className="bg-primary h-1.5 w-1.5 shrink-0 rounded-full" />
                      )}
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-[11px] leading-relaxed">
                      {n.message}
                    </p>
                    <div className="text-muted-foreground/80 flex items-center justify-between pt-1 text-[10px]">
                      <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                      {n.link && (
                        <Link
                          href={n.link}
                          className="text-primary inline-flex items-center gap-0.5 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View <ExternalLink className="h-2.5 w-2.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
