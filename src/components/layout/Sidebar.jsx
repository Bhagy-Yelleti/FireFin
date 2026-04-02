import React from 'react';
import { CreditCard, LayoutDashboard, ShieldCheck, Sparkles, X } from 'lucide-react';
import { useUiStore } from '../../store/uiStore';

export default function Sidebar({ isOpen, onClose }) {
  const activeTab = useUiStore((state) => state.activeTab);
  const setActiveTab = useUiStore((state) => state.setActiveTab);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { icon: CreditCard, label: 'Transactions', id: 'transactions' },
    { icon: Sparkles, label: 'Insights', id: 'insights' },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        aria-label="Sidebar navigation"
        className={`fixed left-0 top-0 z-40 flex h-screen w-[min(18rem,85vw)] flex-col border-r border-slate-200/80 bg-white/95 shadow-2xl backdrop-blur transition-transform duration-300 dark:border-slate-700/70 dark:bg-slate-800/95 lg:sticky lg:top-0 lg:z-20 lg:w-72 lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between border-b border-slate-200/80 px-5 py-5 dark:border-slate-700/70 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 shadow-lg shadow-blue-500/20">
              <span className="text-sm font-bold text-white">FF</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">FireFin</h2>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Finance dashboard</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 transition-all duration-300 hover:scale-[1.03] hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 lg:hidden dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
            aria-label="Close navigation menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 hover:bg-blue-700'
                    : 'text-slate-700 hover:translate-x-1 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-slate-900 hover:shadow-md dark:text-slate-300 dark:hover:bg-slate-700/70 dark:hover:text-white'
                }`}
              >
                <Icon size={18} className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="m-4 rounded-2xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/60 dark:bg-blue-950/30">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-900 dark:text-blue-200">
            <ShieldCheck size={16} />
            Access Levels
          </div>
          <p className="text-sm leading-6 text-blue-800 dark:text-blue-300">
            Admin users can add and remove transactions. Viewer accounts stay read-only.
          </p>
        </div>
      </aside>
    </>
  );
}
