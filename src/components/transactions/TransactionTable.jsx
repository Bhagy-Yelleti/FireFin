import React from 'react';
import { Edit2, SearchX, Trash2 } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { useFilteredTransactions, useTransactionActions, useUserRole } from '../../hooks/useTransactions';
import { useUiStore } from '../../store/uiStore';
import { formatCurrency } from '../../utils/formatters';
import { formatTransactionDate } from '../../utils/transactionHelpers';
import { getTransactionTypeVariant } from '../../utils/uiHelpers';
import EmptyState from '../common/EmptyState';
import { SkeletonBlock } from '../common/Skeleton';

export default function TransactionTable({ isLoading = false }) {
  const { filtered } = useFilteredTransactions();
  const { isAdmin } = useUserRole();
  const { deleteTransaction } = useTransactionActions();
  const openEditTransaction = useUiStore((state) => state.openEditTransaction);

  if (isLoading) {
    return (
      <Card className="animate-fadeIn overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="min-w-[760px] w-full">
            <TableHead isAdmin={isAdmin} />
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {Array.from({ length: 6 }).map((_, index) => (
                <tr key={index}>
                  {Array.from({ length: isAdmin ? 6 : 5 }).map((_, cellIndex) => (
                    <td key={cellIndex} className="px-5 py-4">
                      <SkeletonBlock className="h-5 w-full max-w-[8rem]" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    );
  }

  if (filtered.length === 0) {
    return (
      <Card className="animate-fadeIn">
        <EmptyState
          icon={SearchX}
          title="No transactions found"
          description="Try changing filters or search query."
        />
      </Card>
    );
  }

  return (
    <Card className="animate-fadeIn overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full">
          <TableHead isAdmin={isAdmin} />
          <TableBody
            transactions={filtered}
            isAdmin={isAdmin}
            onDelete={deleteTransaction}
            onEdit={openEditTransaction}
          />
        </table>
      </div>
    </Card>
  );
}

function TableHead({ isAdmin }) {
  const headers = [
    { label: 'Date', alignClass: 'text-left' },
    { label: 'Category', alignClass: 'text-left' },
    { label: 'Description', alignClass: 'text-left' },
    { label: 'Amount', alignClass: 'text-right' },
    { label: 'Type', alignClass: 'text-center' },
  ];

  return (
    <thead>
      <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700/60 dark:bg-slate-800/80">
        {headers.map((header) => (
          <th
            key={header.label}
            className={`px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 dark:text-slate-300 ${header.alignClass}`}
          >
            {header.label}
          </th>
        ))}
        {isAdmin && (
          <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 dark:text-slate-300">
            Actions
          </th>
        )}
      </tr>
    </thead>
  );
}

function TableBody({ transactions, isAdmin, onDelete, onEdit }) {
  return (
    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
      {transactions.map((transaction, idx) => (
        <TransactionRow
          key={transaction.id}
          transaction={transaction}
          isAdmin={isAdmin}
          onDelete={onDelete}
          onEdit={onEdit}
          delay={idx * 0.05}
        />
      ))}
    </tbody>
  );
}

function TransactionRow({ transaction, isAdmin, onDelete, onEdit, delay }) {
  const variant = getTransactionTypeVariant(transaction.type);

  return (
    <tr
      className="transition-all duration-300 hover:-translate-y-px hover:bg-slate-50 hover:shadow-[inset_0_0_0_1px_rgba(148,163,184,0.18)] dark:hover:bg-slate-700/20"
      style={{ animation: `fadeIn 0.3s ease-out ${delay}s backwards` }}
    >
      <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900 dark:text-white">
        {formatTransactionDate(transaction.date)}
      </td>
      <td className="px-5 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">
        {transaction.category}
      </td>
      <td className="max-w-[18rem] px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
        <span className="block truncate">{transaction.description || 'No description'}</span>
      </td>
      <td
        className={`whitespace-nowrap px-5 py-4 text-right text-sm font-semibold ${
          transaction.type === 'income'
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-600 dark:text-red-400'
        }`}
      >
        {formatCurrency(transaction.amount)}
      </td>
      <td className="px-5 py-4 text-center">
        <Badge variant={variant}>
          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
        </Badge>
      </td>
      {isAdmin && (
        <td className="px-5 py-4">
          <div className="flex justify-center gap-2">
            <ActionButton
              icon={<Edit2 size={18} />}
              title="Edit"
              onClick={() => onEdit(transaction.id)}
            />
            <ActionButton
              icon={<Trash2 size={18} />}
              title="Delete"
              variant="danger"
              onClick={() => onDelete(transaction.id)}
            />
          </div>
        </td>
      )}
    </tr>
  );
}

function ActionButton({ icon, title, variant = 'default', onClick }) {
  const variantClass = {
    default:
      'text-slate-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400',
    danger:
      'text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400',
  }[variant];

  return (
    <button
      onClick={onClick}
      className={`rounded-lg p-2 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${variantClass}`}
      title={title}
      aria-label={title}
    >
      {icon}
    </button>
  );
}
