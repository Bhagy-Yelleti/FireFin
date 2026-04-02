/**
 * UI and styling utility functions
 * Centralized styling logic for consistent UI patterns
 */

/**
 * Get transaction type badge color
 * @param {string} type - 'income' or 'expense'
 * @returns {string}
 */
export const getTransactionTypeVariant = (type) => {
  return type === 'income' ? 'success' : 'danger';
};

/**
 * Get transaction amount text color
 * @param {string} type - 'income' or 'expense'
 * @returns {string} Tailwind classes
 */
export const getAmountColorClass = (type) => {
  return type === 'income'
    ? 'text-green-600 dark:text-green-400'
    : 'text-red-600 dark:text-red-400';
};

/**
 * Get icon background color based on type
 * @param {string} type - 'balance', 'income', 'expense'
 * @returns {string} Gradient classes
 */
export const getCardIconGradient = (type) => {
  const gradients = {
    balance: 'bg-gradient-to-br from-blue-500 to-blue-600',
    income: 'bg-gradient-to-br from-green-500 to-green-600',
    expense: 'bg-gradient-to-br from-red-500 to-red-600',
  };
  return gradients[type] || gradients.balance;
};

/**
 * Get category color for charts
 * @param {string} category
 * @returns {string} Hex color
 */
export const getCategoryChartColor = (category) => {
  const colors = {
    'Food': '#3B82F6',
    'Transport': '#10B981',
    'Shopping': '#F59E0B',
    'Entertainment': '#EF4444',
    'Utilities': '#8B5CF6',
    'Other': '#EC4899',
  };
  return colors[category] || '#6B7280';
};

/**
 * Status badge styling
 * @param {string} status
 * @returns {string} Tailwind badge classes
 */
export const getStatusBadgeClass = (status) => {
  const statuses = {
    pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
    completed: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    failed: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  };
  return statuses[status] || statuses.pending;
};

/**
 * Role-based visibility helper
 * @param {string} userRole
 * @param {Array} allowedRoles
 * @returns {boolean}
 */
export const canViewFeature = (userRole, allowedRoles) => {
  return allowedRoles.includes(userRole);
};

/**
 * Combine multiple Tailwind classes with null/undefined filtering
 * @param {...string} classes
 * @returns {string}
 */
export const clsx = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Get responsive grid columns
 * @param {number} cols - Number of columns on desktop
 * @returns {string}
 */
export const getResponsiveGrid = (cols = 3) => {
  return `grid-cols-1 md:grid-cols-2 lg:grid-cols-${cols}`;
};
