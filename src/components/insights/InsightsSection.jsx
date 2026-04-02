import React, { useMemo } from 'react';
import { AlertCircle, Lightbulb, TrendingDown, TrendingUp } from 'lucide-react';
import { useTransactionStore } from '../../store/transactionStore';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/formatters';
import { SkeletonBlock, SkeletonText } from '../common/Skeleton';
import EmptyState from '../common/EmptyState';

export default function InsightsSection({ isLoading = false }) {
  const transactions = useTransactionStore((state) => state.transactions);

  const insights = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === 'expense');
    const categoryMap = {};

    expenses.forEach((t) => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });

    const highestCategory = Object.entries(categoryMap).sort(([, a], [, b]) => b - a)[0];

    const months = {};
    transactions.forEach((t) => {
      const date = new Date(t.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!months[monthKey]) {
        months[monthKey] = { income: 0, expense: 0 };
      }

      if (t.type === 'income') {
        months[monthKey].income += t.amount;
      } else {
        months[monthKey].expense += t.amount;
      }
    });

    const sortedMonths = Object.keys(months).sort().reverse();
    const currentMonth = months[sortedMonths[0]] || { income: 0, expense: 0 };
    const previousMonth = months[sortedMonths[1]] || { income: 0, expense: 0 };

    const spendingTrend =
      previousMonth.expense > 0
        ? ((currentMonth.expense - previousMonth.expense) / previousMonth.expense) * 100
        : 0;

    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

    return {
      highestCategory,
      currentMonth,
      previousMonth,
      spendingTrend,
      savingsRate,
      totalIncome,
      totalExpenses,
      categoryMap,
    };
  }, [transactions]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="space-y-3">
          <SkeletonBlock className="h-10 w-72 max-w-full" />
          <SkeletonBlock className="h-4 w-[32rem] max-w-full" />
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="h-full">
              <SkeletonText lines={1} lineClassName="h-5" className="mb-4 max-w-[10rem]" />
              <SkeletonText lines={4} lineClassName="h-4" />
            </Card>
          ))}
        </div>
        <Card>
          <SkeletonText lines={1} lineClassName="h-5" className="mb-6 max-w-[12rem]" />
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <SkeletonBlock className="h-4 w-24" />
                  <SkeletonBlock className="h-4 w-16" />
                </div>
                <SkeletonBlock className="h-2 w-full" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <EmptyState
          icon={Lightbulb}
          title="No insights available yet"
          description="Add a few transactions to unlock savings trends, category breakdowns, and smart tips."
        />
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Insights and Analytics
        </h1>
        <p className="max-w-2xl text-base text-slate-700 dark:text-slate-300">
          Clear summaries, savings context, and practical tips based on your recent activity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Highest Spending</h3>
          {insights.highestCategory ? (
            <div>
              <p className="mb-2 text-2xl font-bold text-red-600 dark:text-red-400">
                {formatCurrency(insights.highestCategory[1])}
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Largest category: {insights.highestCategory[0]}
              </p>
              <div className="mt-4">
                <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-2 rounded-full bg-red-500"
                    style={{
                      width: `${Math.min((insights.highestCategory[1] / insights.totalExpenses) * 100, 100)}%`,
                    }}
                  />
                </div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {((insights.highestCategory[1] / insights.totalExpenses) * 100).toFixed(1)}% of total spending
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">No data available</p>
          )}
        </Card>

        <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Spending Trend</h3>
          <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">Current Month</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {formatCurrency(insights.currentMonth.expense)}
              </p>
            </div>
            <div
              className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold ${
                insights.spendingTrend > 0
                  ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300'
                  : 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300'
              }`}
            >
              {insights.spendingTrend > 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
              {insights.spendingTrend > 0 ? '+' : ''}
              {insights.spendingTrend.toFixed(1)}%
            </div>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Previous month: {formatCurrency(insights.previousMonth.expense)}
          </p>
        </Card>

        <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Savings Rate</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-slate-700 dark:text-slate-300">Income</span>
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                  {formatCurrency(insights.totalIncome)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-slate-700 dark:text-slate-300">Expenses</span>
                <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                  {formatCurrency(insights.totalExpenses)}
                </span>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">Savings</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(insights.totalIncome - insights.totalExpenses)}
                  </p>
                </div>
                <div
                  className={`rounded-xl px-3 py-2 text-lg font-bold ${
                    insights.savingsRate > 0
                      ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                      : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300'
                  }`}
                >
                  {insights.savingsRate.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Smart Tips</h3>
          <div className="space-y-3">
            {insights.savingsRate < 20 && (
              <TipCard
                tone="warning"
                text="Budget alert: your savings rate is below 20%. Consider trimming discretionary spending."
              />
            )}
            {insights.spendingTrend > 10 && (
              <TipCard
                tone="danger"
                text={`Spending is up ${insights.spendingTrend.toFixed(1)}% this month. Review the categories driving the increase.`}
              />
            )}
            {insights.highestCategory && (
              <TipCard
                tone="info"
                text={`${insights.highestCategory[0]} is your largest expense category. Look for recurring opportunities to reduce it.`}
              />
            )}
            {insights.savingsRate >= 20 && insights.spendingTrend <= 10 && (
              <TipCard
                tone="success"
                text="Your savings pace looks healthy and spending is under control. Keep this consistency going."
              />
            )}
          </div>
        </Card>
      </div>

      <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <h3 className="mb-6 text-lg font-semibold text-slate-900 dark:text-white">Spending Breakdown</h3>
        <div className="space-y-4">
          {Object.entries(insights.categoryMap)
            .sort(([, a], [, b]) => b - a)
            .map(([category, amount]) => (
              <div key={category}>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{category}</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {formatCurrency(amount)}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                    style={{
                      width: `${(amount / insights.totalExpenses) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}

function TipCard({ tone, text }) {
  const toneClassMap = {
    warning: 'border-orange-200 bg-orange-50 text-orange-900 dark:border-orange-800/40 dark:bg-orange-900/20 dark:text-orange-200',
    danger: 'border-red-200 bg-red-50 text-red-900 dark:border-red-800/40 dark:bg-red-900/20 dark:text-red-200',
    info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800/40 dark:bg-blue-900/20 dark:text-blue-200',
    success: 'border-green-200 bg-green-50 text-green-900 dark:border-green-800/40 dark:bg-green-900/20 dark:text-green-200',
  };

  return (
    <div className={`rounded-xl border p-3 text-sm font-medium leading-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${toneClassMap[tone]}`}>
      {text}
    </div>
  );
}
