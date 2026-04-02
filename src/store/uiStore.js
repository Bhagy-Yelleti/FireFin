import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

/**
 * UI Store - Manages all UI state and user preferences
 * Handles themes, navigation, user roles, and UI toggles
 */
export const useUiStore = create(
  devtools(
    persist(
      (set) => ({
        // User/Role Management
        role: 'viewer',

        // Theme Management
        darkMode: false,

        // Navigation State
        sidebarOpen: true,
        activeTab: 'dashboard',

        // Actions - Role Management
        setRole: (role) => set({ role }),

        // Actions - Theme Management
        toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
        setDarkMode: (isDark) => set({ darkMode: isDark }),

        // Actions - Navigation
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),
        setActiveTab: (tab) => set({ activeTab: tab }),

        // Computed selectors
        isAdmin: () => {
          const state = get();
          return state.role === 'admin';
        },
      }),
      {
        name: 'ui-store',
      }
    )
  )
);
