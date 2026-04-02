import React from 'react';

export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/70 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:shadow-slate-950/30 dark:hover:border-slate-600 dark:hover:shadow-slate-950/50 overflow-visible sm:p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
