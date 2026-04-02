import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  type = 'button',
  onClick,
  className = '',
  disabled = false,
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none dark:focus-visible:ring-offset-slate-900';

  const variants = {
    primary:
      'bg-blue-600 text-white shadow-sm shadow-blue-500/20 hover:scale-[1.01] hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.99] active:bg-blue-800',
    secondary:
      'border border-slate-200 bg-slate-100 text-slate-900 shadow-sm hover:scale-[1.01] hover:border-slate-300 hover:bg-slate-200 hover:shadow-md active:scale-[0.99] dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600',
    danger:
      'bg-red-600 text-white shadow-sm shadow-red-500/20 hover:scale-[1.01] hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/20 active:scale-[0.99] active:bg-red-800',
    ghost:
      'text-slate-700 hover:scale-[1.01] hover:bg-slate-100 hover:text-slate-900 active:scale-[0.99] dark:text-slate-300 dark:hover:bg-slate-700/70 dark:hover:text-white',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base',
  };

  const disabledClasses = disabled ? 'cursor-not-allowed opacity-50' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
