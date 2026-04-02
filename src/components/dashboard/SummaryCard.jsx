import React from 'react';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/formatters';

export default function SummaryCard({ title, amount, icon: Icon, color }) {
  return (
    <Card className="group h-full">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <h3 className="mb-2 break-words text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {formatCurrency(amount)}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Updated today</p>
        </div>
        {Icon && (
          <div
            className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${color} shadow-lg transition-transform duration-200 group-hover:scale-105`}
          >
            <Icon size={22} className="text-white" />
          </div>
        )}
      </div>
    </Card>
  );
}
