import React, { useEffect, useMemo, useState } from 'react';
import { CalendarDays, PencilLine, Plus, X } from 'lucide-react';
import { useTransactionStore } from '../../store/transactionStore';
import { useUiStore } from '../../store/uiStore';
import { CATEGORIES } from '../../utils/constants';
import Button from '../common/Button';

const defaultFormState = {
  date: new Date().toISOString().split('T')[0],
  amount: '',
  category: CATEGORIES[0],
  type: 'expense',
  description: '',
};

const fieldClassName =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition-all duration-300 placeholder:text-slate-500 hover:-translate-y-px hover:border-slate-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400 dark:hover:border-slate-500';

export default function TransactionForm() {
  const role = useUiStore((state) => state.role);
  const isOpen = useUiStore((state) => state.transactionFormOpen);
  const editingTransactionId = useUiStore((state) => state.editingTransactionId);
  const closeTransactionForm = useUiStore((state) => state.closeTransactionForm);
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const updateTransaction = useTransactionStore((state) => state.updateTransaction);
  const getTransactionById = useTransactionStore((state) => state.getTransactionById);

  const editingTransaction = useMemo(
    () => (editingTransactionId ? getTransactionById(editingTransactionId) : null),
    [editingTransactionId, getTransactionById]
  );

  const [formData, setFormData] = useState(defaultFormState);

  useEffect(() => {
    if (!isOpen) {
      setFormData(defaultFormState);
      return;
    }

    if (editingTransaction) {
      setFormData({
        date: new Date(editingTransaction.date).toISOString().split('T')[0],
        amount: editingTransaction.amount,
        category: editingTransaction.category,
        type: editingTransaction.type,
        description: editingTransaction.description || '',
      });
      return;
    }

    setFormData(defaultFormState);
  }, [editingTransaction, isOpen]);

  if (role !== 'admin' || !isOpen) {
    return null;
  }

  const isEditMode = Boolean(editingTransaction);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.category || !formData.date) {
      return;
    }

    const payload = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    if (isEditMode) {
      updateTransaction(editingTransaction.id, payload);
    } else {
      addTransaction(payload);
    }

    closeTransactionForm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <div
        className="absolute inset-0"
        onClick={closeTransactionForm}
        aria-hidden="true"
      />

      <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-800 sm:rounded-3xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-5 dark:border-slate-700 sm:px-6">
          <div>
            <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200">
              {isEditMode ? <PencilLine size={20} /> : <Plus size={20} />}
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              {isEditMode ? 'Edit Transaction' : 'Add Transaction'}
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {isEditMode
                ? 'Update the transaction details and save changes instantly.'
                : 'Add a new transaction and reflect it across the dashboard immediately.'}
            </p>
          </div>
          <button
            onClick={closeTransactionForm}
            className="rounded-xl p-2 text-slate-500 transition-all duration-300 hover:scale-[1.03] hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
            aria-label="Close transaction form"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto px-5 py-5 sm:px-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Date
              </label>
              <div className="relative">
                <CalendarDays
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`${fieldClassName} pl-11`}
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={fieldClassName}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={fieldClassName}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={fieldClassName}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Add a short note"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`${fieldClassName} resize-none`}
            />
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 dark:border-slate-700 sm:flex-row sm:justify-end">
            <Button onClick={closeTransactionForm} variant="secondary" className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="w-full sm:w-auto">
              {isEditMode ? 'Save Changes' : 'Add Transaction'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
