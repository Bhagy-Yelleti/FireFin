/**
 * Transaction filtering, sorting, and calculation utilities
 * Encapsulates business logic for transaction operations
 */

export const SORT_OPTIONS = {
  DATE_NEW: 'date-new',
  DATE_OLD: 'date-old',
  AMOUNT_HIGH: 'amount-high',
  AMOUNT_LOW: 'amount-low',
};

/**
 * Filter transactions by search query and category
 * @param {Array} transactions
 * @param {string} searchQuery
 * @param {string|null} filterCategory
 * @returns {Array}
 */
export const filterTransactions = (transactions, searchQuery, filterCategory) => {
  return transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !filterCategory || transaction.category === filterCategory;
    return matchesSearch && matchesFilter;
  });
};

/**
 * Sort transactions based on sort criteria
 * @param {Array} transactions
 * @param {string} sortBy
 * @returns {Array}
 */
export const sortTransactions = (transactions, sortBy) => {
  const sorted = [...transactions];

  switch (sortBy) {
    case SORT_OPTIONS.AMOUNT_HIGH:
      return sorted.sort((a, b) => b.amount - a.amount);
    case SORT_OPTIONS.AMOUNT_LOW:
      return sorted.sort((a, b) => a.amount - b.amount);
    case SORT_OPTIONS.DATE_NEW:
      return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    case SORT_OPTIONS.DATE_OLD:
      return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    default:
      return sorted;
  }
};

/**
 * Filter and sort transactions in a single operation
 * @param {Array} transactions
 * @param {string} searchQuery
 * @param {string|null} filterCategory
 * @param {string} sortBy
 * @returns {Array}
 */
export const getFilteredAndSortedTransactions = (
  transactions,
  searchQuery,
  filterCategory,
  sortBy
) => {
  const filtered = filterTransactions(transactions, searchQuery, filterCategory);
  return sortTransactions(filtered, sortBy);
};

/**
 * Calculate financial summaries
 * @param {Array} transactions
 * @returns {Object} { totalIncome, totalExpenses, balance }
 */
export const calculateSummary = (transactions) => {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
  };
};

/**
 * Get spending breakdown by category
 * @param {Array} transactions
 * @returns {Object} Spending by category
 */
export const getSpendingByCategory = (transactions) => {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
};

/**
 * Generate balance trend data for charts
 * @param {Array} transactions
 * @param {number} months - Number of months to generate
 * @returns {Array}
 */
export const generateBalanceTrendData = (transactions, months = 12) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let balance = 50000;
  
  return monthNames.slice(0, months).map((month) => {
    balance += Math.sin(monthNames.indexOf(month) * 0.5) * 5000 + Math.random() * 3000;
    return {
      month,
      balance: Math.max(balance, 10000),
    };
  });
};

/**
 * Format transaction date
 * @param {string|Date} date
 * @returns {string}
 */
export const formatTransactionDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
};

/**
 * Format transaction amount with sign
 * @param {number} amount
 * @param {string} type - 'income' or 'expense'
 * @returns {string}
 */
export const formatTransactionAmount = (amount, type) => {
  const sign = type === 'income' ? '+' : '-';
  return `${sign}₹${amount.toLocaleString('en-IN')}`;
};
