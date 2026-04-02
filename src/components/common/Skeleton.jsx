import React from 'react';

export function SkeletonBlock({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-slate-200/80 dark:bg-slate-700/80 ${className}`}
      aria-hidden="true"
    />
  );
}

export function SkeletonText({ lines = 3, lineClassName = 'h-4', className = '' }) {
  return (
    <div className={`space-y-3 ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonBlock
          key={index}
          className={`${lineClassName} ${index === lines - 1 ? 'w-2/3' : 'w-full'}`}
        />
      ))}
    </div>
  );
}
