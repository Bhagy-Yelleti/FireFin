import React from 'react';
import { ArrowUpRight, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { useTransactionSummary } from '../../hooks/useTransactions';
import { useUiStore } from '../../store/uiStore';
import SummaryCard from './SummaryCard';
import BalanceTrendChart from './BalanceTrendChart';
import SpendingCategoryChart from './SpendingCategoryChart';

export default function DashboardOverview() {
  const { totalIncome, totalExpenses, balance } = useTransactionSummary();
  const darkMode = useUiStore((state) => state.darkMode);

  return (
    <div className="space-y-8">
      <section className="animate-slideUp overflow-hidden rounded-[28px] border border-slate-200/80 bg-white px-6 py-7 shadow-sm shadow-slate-200/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800 dark:shadow-slate-950/30 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-300">
              FireFin Workspace
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Welcome back, Bhagya
              <span className="ml-2 inline-block">👋</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-700 dark:text-slate-300 sm:text-lg">
              Track your spending, savings, and financial insights in one place with a clean,
              responsive control center.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:w-[22rem]">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/60">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Active Theme
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                {darkMode ? 'Dark mode' : 'Light mode'}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/60">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Net Position
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {balance >= 0 ? 'Positive' : 'Needs attention'}
                  </p>
                </div>
                <ArrowUpRight
                  className={`h-5 w-5 ${balance >= 0 ? 'text-green-500' : 'text-red-500'}`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <SummaryCardWrapper delay={0.1} title="Total Balance" amount={balance} icon={Wallet} type="balance" />
        <SummaryCardWrapper delay={0.2} title="Total Income" amount={totalIncome} icon={TrendingUp} type="income" />
        <SummaryCardWrapper delay={0.3} title="Total Expenses" amount={totalExpenses} icon={TrendingDown} type="expense" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="animate-slideUp" style={{ animationDelay: '0.4s' }}>
          <BalanceTrendChart />
        </div>
        <div className="animate-slideUp" style={{ animationDelay: '0.5s' }}>
          <SpendingCategoryChart />
        </div>
      </div>
    </div>
  );
}

function SummaryCardWrapper({ delay, title, amount, icon, type }) {
  const colorMap = {
    balance: 'bg-gradient-to-br from-blue-500 to-blue-600',
    income: 'bg-gradient-to-br from-green-500 to-green-600',
    expense: 'bg-gradient-to-br from-red-500 to-red-600',
  };

  return (
    <div className="h-full animate-fadeIn" style={{ animationDelay: `${delay}s` }}>
      <SummaryCard
        title={title}
        amount={amount}
        icon={icon}
        color={colorMap[type] || colorMap.balance}
      />
    </div>
  );
}
