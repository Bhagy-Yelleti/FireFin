import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  getFilteredAndSortedTransactions,
  calculateSummary,
  getSpendingByCategory as computeSpendingByCategory,
} from '../utils/transactionHelpers';

/**
 * Transaction Store - Manages all transaction-related state
 * Uses Zustand with devtools and persist middleware
 */
export const useTransactionStore = create(
  devtools(
    persist(
      (set, get) => ({
        // State
        transactions: [],
        searchQuery: '',
        filterCategory: null,
        sortBy: 'date-new',

        // Actions - Core transaction operations
        addTransaction: (transactionData) => {
          const newTransaction = {
            id: Date.now().toString(),
            ...transactionData,
            date: new Date(transactionData.date).toISOString(),
          };
          set((state) => ({
            transactions: [newTransaction, ...state.transactions],
          }));
        },

        updateTransaction: (id, updates) => {
          set((state) => ({
            transactions: state.transactions.map((t) =>
              t.id === id ? { ...t, ...updates } : t
            ),
          }));
        },

        deleteTransaction: (id) => {
          set((state) => ({
            transactions: state.transactions.filter((t) => t.id !== id),
          }));
        },

        setTransactions: (transactions) => set({ transactions }),

        // Actions - Filter/Search operations
        setSearchQuery: (query) => set({ searchQuery: query }),
        setFilterCategory: (category) => set({ filterCategory: category }),
        setSortBy: (sortBy) => set({ sortBy }),

        // Computed selectors
        getFilteredTransactions: () => {
          const state = get();
          return getFilteredAndSortedTransactions(
            state.transactions,
            state.searchQuery,
            state.filterCategory,
            state.sortBy
          );
        },

        getSummary: () => {
          return calculateSummary(get().transactions);
        },

        getSpendingByCategory: () => {
          const spending = computeSpendingByCategory(get().transactions);
          return Object.entries(spending).map(([name, value]) => ({
            name,
            value,
          }));
        },

        getTransactionById: (id) => {
          return get().transactions.find((t) => t.id === id);
        },

        getTransactionsByType: (type) => {
          return get().transactions.filter((t) => t.type === type);
        },

        getTransactionsByCategory: (category) => {
          return get().transactions.filter((t) => t.category === category);
        },
      }),
      {
        name: 'transaction-store',
      }
    )
  )
);
