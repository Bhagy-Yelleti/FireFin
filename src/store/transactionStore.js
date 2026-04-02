import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  getFilteredAndSortedTransactions,
  calculateSummary,
  getSpendingByCategory as computeSpendingByCategory,
} from '../utils/transactionHelpers';

export const useTransactionStore = create(
  devtools(
    persist(
      (set, get) => ({
        transactions: [],
        searchQuery: '',
        filterCategory: null,
        sortBy: 'date-new',

        addTransaction: (transactionData) => {
          const newTransaction = {
            id: Date.now().toString(),
            ...transactionData,
            amount: Number(transactionData.amount),
            date: new Date(transactionData.date).toISOString(),
          };

          set((state) => ({
            transactions: [newTransaction, ...state.transactions],
          }));
        },

        updateTransaction: (id, updates) => {
          set((state) => ({
            transactions: state.transactions.map((t) =>
              t.id === id
                ? {
                    ...t,
                    ...updates,
                    amount: Number(updates.amount ?? t.amount),
                    date: updates.date ? new Date(updates.date).toISOString() : t.date,
                  }
                : t
            ),
          }));
        },

        deleteTransaction: (id) => {
          set((state) => ({
            transactions: state.transactions.filter((t) => t.id !== id),
          }));
        },

        setTransactions: (transactions) => set({ transactions }),
        setSearchQuery: (query) => set({ searchQuery: query }),
        setFilterCategory: (category) => set({ filterCategory: category }),
        setSortBy: (sortBy) => set({ sortBy }),

        getFilteredTransactions: () => {
          const state = get();
          return getFilteredAndSortedTransactions(
            state.transactions,
            state.searchQuery,
            state.filterCategory,
            state.sortBy
          );
        },

        getSummary: () => calculateSummary(get().transactions),

        getSpendingByCategory: () => {
          const spending = computeSpendingByCategory(get().transactions);
          return Object.entries(spending).map(([name, value]) => ({
            name,
            value,
          }));
        },

        getTransactionById: (id) => get().transactions.find((t) => String(t.id) === String(id)),
        getTransactionsByType: (type) => get().transactions.filter((t) => t.type === type),
        getTransactionsByCategory: (category) =>
          get().transactions.filter((t) => t.category === category),
      }),
      {
        name: 'transaction-store',
      }
    )
  )
);
