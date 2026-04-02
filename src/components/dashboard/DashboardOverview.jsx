import React from 'react';
import { TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { useTransactionSummary } from '../../hooks/useTransactions';
import SummaryCard from './SummaryCard';
import BalanceTrendChart from './BalanceTrendChart';
import SpendingCategoryChart from './SpendingCategoryChart';

export default function DashboardOverview() {
  const { totalIncome, totalExpenses, balance } = useTransactionSummary();

  return (
    <div className="space-y-8">
      <div className="animate-slideUp">
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Dashboard
        </h1>
        <p className="max-w-2xl text-base text-slate-700 dark:text-slate-300">
          Your financial overview at a glance, with clear trends and category insights.
        </p>
      </div>

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
    <div className="animate-fadeIn h-full" style={{ animationDelay: `${delay}s` }}>
      <SummaryCard
        title={title}
        amount={amount}
        icon={icon}
        color={colorMap[type] || colorMap.balance}
      />
    </div>
  );
}
