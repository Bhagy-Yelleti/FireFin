import React from 'react';
import { Download, Plus, Search } from 'lucide-react';
import { useTransactionStore } from '../../store/transactionStore';
import { useUiStore } from '../../store/uiStore';
import { CATEGORIES } from '../../utils/constants';
import Button from '../common/Button';

const fieldClassName =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 shadow-sm transition-all duration-300 placeholder:text-slate-500 hover:-translate-y-px hover:border-slate-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400 dark:hover:border-slate-500';

export default function TransactionHeader() {
  const setSearchQuery = useTransactionStore((state) => state.setSearchQuery);
  const setFilterCategory = useTransactionStore((state) => state.setFilterCategory);
  const setSortBy = useTransactionStore((state) => state.setSortBy);
  const transactions = useTransactionStore((state) => state.transactions);
  const role = useUiStore((state) => state.role);
  const openAddTransaction = useUiStore((state) => state.openAddTransaction);
  const addToast = useUiStore((state) => state.addToast);

  const handleExportCSV = () => {
    if (transactions.length === 0) {
      addToast({
        title: 'No transactions to export',
        description: 'Add or restore transactions before exporting CSV.',
      });
      return;
    }

    const headers = ['Date', 'Category', 'Amount', 'Type', 'Description'];
    const rows = transactions.map((t) => [
      new Date(t.date).toLocaleDateString(),
      t.category,
      t.amount,
      t.type,
      t.description,
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    addToast({
      title: 'CSV exported successfully',
      description: 'Your transactions were exported successfully.',
    });
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Transactions
          </h2>
          <p className="max-w-2xl text-base text-slate-700 dark:text-slate-300">
            Search, manage, and export your latest activity with role-aware controls.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={handleExportCSV} variant="secondary" icon={<Download size={18} />}>
            Export CSV
          </Button>
          {role === 'admin' && (
            <Button onClick={openAddTransaction} variant="primary" icon={<Plus size={18} />}>
              Add Transaction
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="group relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"
            />
            <input
              type="text"
              placeholder="Search transactions..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`${fieldClassName} pl-11`}
            />
          </div>
        </div>

        <select
          onChange={(e) => setFilterCategory(e.target.value || null)}
          className={fieldClassName}
          aria-label="Filter transactions by category"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setSortBy(e.target.value)}
          className={fieldClassName}
          aria-label="Sort transactions"
        >
          <option value="date-new">Newest First</option>
          <option value="date-old">Oldest First</option>
          <option value="amount-high">Highest Amount</option>
          <option value="amount-low">Lowest Amount</option>
        </select>
      </div>
    </div>
  );
}
