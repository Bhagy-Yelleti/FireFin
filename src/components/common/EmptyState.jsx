import React from 'react';
import { FileText } from 'lucide-react';

export default function EmptyState({
  title = 'No Data',
  description = 'There are no items to display.',
  icon: Icon = FileText,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300/80 bg-slate-50 px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900/50">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-slate-800">
        <Icon className="h-7 w-7 text-slate-400 dark:text-slate-500" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="max-w-md text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
}
