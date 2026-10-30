import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { SupportedLocale } from "@/lib/i18n/config";

export interface ImpersonatedUser {
  id: string;
  email: string;
  name?: string | null;
}

interface AppState {
  // UI preferences
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Language & i18n
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;

  // Workspace context
  activeWorkspaceId: string | null;
  setActiveWorkspaceId: (id: string | null) => void;

  // Notification badge state
  unreadNotificationsCount: number;
  setUnreadNotificationsCount: (count: number) => void;
  decrementUnreadNotifications: () => void;
  clearUnreadNotifications: () => void;

  // Super Admin impersonation banner state
  impersonatedUser: ImpersonatedUser | null;
  setImpersonatedUser: (user: ImpersonatedUser | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Default initial states
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      // Default locale
      locale: "en",
      setLocale: (locale) => set({ locale }),

      activeWorkspaceId: null,
      setActiveWorkspaceId: (id) => set({ activeWorkspaceId: id }),

      unreadNotificationsCount: 0,
      setUnreadNotificationsCount: (count) => set({ unreadNotificationsCount: Math.max(0, count) }),
      decrementUnreadNotifications: () =>
        set((state) => ({
          unreadNotificationsCount: Math.max(0, state.unreadNotificationsCount - 1),
        })),
      clearUnreadNotifications: () => set({ unreadNotificationsCount: 0 }),

      impersonatedUser: null,
      setImpersonatedUser: (user) => set({ impersonatedUser: user }),
    }),
    {
      name: "saas-app-store",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? window.localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        activeWorkspaceId: state.activeWorkspaceId,
        locale: state.locale,
      }),
    }
  )
);
