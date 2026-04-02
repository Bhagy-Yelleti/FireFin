import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

export const useUiStore = create(
  devtools(
    persist(
      (set) => ({
        role: 'viewer',
        darkMode: false,
        sidebarOpen: false,
        activeTab: 'dashboard',
        transactionFormOpen: false,
        editingTransactionId: null,
        toasts: [],

        setRole: (role) => set({ role }),
        toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
        setDarkMode: (isDark) => set({ darkMode: isDark }),
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),
        setActiveTab: (tab) => set({ activeTab: tab }),

        openAddTransaction: () =>
          set({
            transactionFormOpen: true,
            editingTransactionId: null,
          }),
        openEditTransaction: (transactionId) =>
          set({
            transactionFormOpen: true,
            editingTransactionId: transactionId,
          }),
        closeTransactionForm: () =>
          set({
            transactionFormOpen: false,
            editingTransactionId: null,
          }),

        addToast: ({ title, description }) =>
          set((state) => ({
            toasts: [
              ...state.toasts,
              {
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                title,
                description,
              },
            ],
          })),
        removeToast: (id) =>
          set((state) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id),
          })),
      }),
      {
        name: 'ui-store',
        partialize: (state) => ({
          role: state.role,
          darkMode: state.darkMode,
          activeTab: state.activeTab,
        }),
      }
    )
  )
);
