import React from 'react';
import { FileText } from 'lucide-react';

export default function EmptyState({
  title = 'No Data',
  description = 'There are no items to display.',
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <FileText className="mb-4 h-12 w-12 text-slate-400 dark:text-slate-500" />
      <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="max-w-md text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
}
