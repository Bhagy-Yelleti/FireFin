import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useTransactionStore } from '../../store/transactionStore';
import { useUiStore } from '../../store/uiStore';
import { CATEGORIES } from '../../utils/constants';
import Button from '../common/Button';
import Card from '../common/Card';

const fieldClassName =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition-all duration-200 placeholder:text-slate-500 hover:border-slate-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400 dark:hover:border-slate-500';

export default function TransactionForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: CATEGORIES[0],
    type: 'expense',
    description: '',
  });

  const role = useUiStore((state) => state.role);
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  if (role === 'viewer') {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.amount && formData.category && formData.date) {
      addTransaction({
        ...formData,
        amount: parseFloat(formData.amount),
      });
      setFormData({
        date: new Date().toISOString().split('T')[0],
        amount: '',
        category: CATEGORIES[0],
        type: 'expense',
        description: '',
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <div className="mb-6">
          <Button onClick={() => setIsOpen(true)} variant="primary" icon={<Plus size={18} />}>
            Add Transaction
          </Button>
        </div>
      )}

      {isOpen && (
        <Card className="animate-fadeIn">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Add Transaction</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Capture income and expenses with clean, readable metadata.
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-xl p-2 text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
              aria-label="Close transaction form"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={fieldClassName}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Amount (INR)
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

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Description
              </label>
              <input
                type="text"
                name="description"
                placeholder="Optional details"
                value={formData.description}
                onChange={handleChange}
                className={fieldClassName}
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button onClick={() => setIsOpen(false)} variant="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Add Transaction
              </Button>
            </div>
          </form>
        </Card>
      )}
    </>
  );
}
