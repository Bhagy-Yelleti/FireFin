import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

export const useUiStore = create(
  devtools(
    persist(
      (set) => ({
        role: 'viewer',
        darkMode: false,
        sidebarOpen: true,
        activeTab: 'dashboard',
        transactionFormOpen: false,
        editingTransactionId: null,

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
      }),
      {
        name: 'ui-store',
      }
    )
  )
);
