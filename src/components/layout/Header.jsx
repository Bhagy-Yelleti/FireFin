import React from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import { useUiStore } from '../../store/uiStore';

const controlClassName =
  'rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:border-slate-500 dark:hover:bg-slate-600 dark:focus-visible:ring-offset-slate-800';

export default function Header({ onMenuClick }) {
  const darkMode = useUiStore((state) => state.darkMode);
  const toggleDarkMode = useUiStore((state) => state.toggleDarkMode);
  const role = useUiStore((state) => state.role);
  const setRole = useUiStore((state) => state.setRole);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur dark:border-slate-700/70 dark:bg-slate-800/95">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <button
            onClick={onMenuClick}
            className="rounded-xl p-2 text-slate-600 transition-all duration-200 hover:scale-[1.03] hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 lg:hidden dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>
          <div className="min-w-0">
            <h1 className="hidden bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-xl font-bold text-transparent sm:block sm:text-2xl">
              FireFin
            </h1>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white sm:hidden">FireFin</h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={controlClassName}
            aria-label="Select user role"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>

          <button
            onClick={toggleDarkMode}
            className="group relative rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm transition-all duration-200 hover:scale-[1.03] hover:border-slate-300 hover:bg-slate-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-600 dark:focus-visible:ring-offset-slate-800"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun size={20} className="transition-transform duration-300 group-hover:rotate-90" />
            ) : (
              <Moon size={20} className="transition-transform duration-300 group-hover:-rotate-12" />
            )}
            <span className="pointer-events-none absolute bottom-full right-0 mb-2 rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 dark:bg-white dark:text-slate-900">
              {darkMode ? 'Light mode' : 'Dark mode'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
