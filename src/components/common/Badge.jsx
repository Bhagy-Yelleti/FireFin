import React from 'react';

export default function Badge({ children, variant = 'default' }) {
  const variants = {
    default:
      'border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-600 dark:bg-slate-700/40 dark:text-slate-300',
    success:
      'border border-green-200 bg-green-50 font-semibold text-green-700 dark:border-green-800/40 dark:bg-green-900/20 dark:text-green-300',
    danger:
      'border border-red-200 bg-red-50 font-semibold text-red-700 dark:border-red-800/40 dark:bg-red-900/20 dark:text-red-300',
    warning:
      'border border-yellow-200 bg-yellow-50 font-semibold text-yellow-700 dark:border-yellow-800/40 dark:bg-yellow-900/20 dark:text-yellow-300',
    info:
      'border border-blue-200 bg-blue-50 font-semibold text-blue-700 dark:border-blue-800/40 dark:bg-blue-900/20 dark:text-blue-300',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition-all duration-200 ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
