/**
 * Custom hooks for transaction operations
 * Encapsulates store logic for cleaner component usage
 */

import { useTransactionStore } from '../store/transactionStore';
import { useUiStore } from '../store/uiStore';

/**
 * Hook for transaction filtering and sorting
 */
export const useFilteredTransactions = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const searchQuery = useTransactionStore((state) => state.searchQuery);
  const filterCategory = useTransactionStore((state) => state.filterCategory);
  const sortBy = useTransactionStore((state) => state.sortBy);
  const setSearchQuery = useTransactionStore((state) => state.setSearchQuery);
  const setFilterCategory = useTransactionStore((state) => state.setFilterCategory);
  const setSortBy = useTransactionStore((state) => state.setSortBy);

  const filtered = useTransactionStore((state) => state.getFilteredTransactions());

  return {
    filtered,
    transactions,
    searchQuery,
    filterCategory,
    sortBy,
    setSearchQuery,
    setFilterCategory,
    setSortBy,
  };
};

/**
 * Hook for transaction summary (income, expenses, balance)
 */
export const useTransactionSummary = () => {
  const summary = useTransactionStore((state) => state.getSummary());
  return summary;
};

/**
 * Hook for spending by category data
 */
export const useSpendingByCategory = () => {
  return useTransactionStore((state) => state.getSpendingByCategory());
};

/**
 * Hook for transaction CRUD operations
 */
export const useTransactionActions = () => {
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const updateTransaction = useTransactionStore((state) => state.updateTransaction);
  const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);

  return { addTransaction, updateTransaction, deleteTransaction };
};

/**
 * Legacy hook for backward compatibility
 */
export const useTransactions = () => {
  const filtered = useFilteredTransactions();
  const summary = useTransactionSummary();
  const spending = useSpendingByCategory();

  return {
    transactions: filtered.transactions,
    filteredTransactions: filtered.filtered,
    totalIncome: summary.totalIncome,
    totalExpenses: summary.totalExpenses,
    balance: summary.balance,
    spendingByCategory: spending,
    searchQuery: filtered.searchQuery,
    filterCategory: filtered.filterCategory,
    sortBy: filtered.sortBy,
  };
};

/**
 * Hook for user role and permissions
 */
export const useUserRole = () => {
  const role = useUiStore((state) => state.role);
  const setRole = useUiStore((state) => state.setRole);
  const isAdmin = role === 'admin';

  return { role, setRole, isAdmin };
};

/**
 * Hook for theme management
 */
export const useTheme = () => {
  const darkMode = useUiStore((state) => state.darkMode);
  const toggleDarkMode = useUiStore((state) => state.toggleDarkMode);
  const setDarkMode = useUiStore((state) => state.setDarkMode);

  return { darkMode, toggleDarkMode, setDarkMode };
};

/**
 * Hook for UI navigation state
 */
export const useNavigation = () => {
  const activeTab = useUiStore((state) => state.activeTab);
  const setActiveTab = useUiStore((state) => state.setActiveTab);
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const setSidebarOpen = useUiStore((state) => state.setSidebarOpen);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);

  return {
    activeTab,
    setActiveTab,
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
  };
};

/**
 * Hook for combined app state
 */
export const useAppState = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const userRole = useUserRole();
  const transactionSummary = useTransactionSummary();

  return { theme, navigation, userRole, transactionSummary };
};
