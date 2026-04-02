import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';
import Card from '../common/Card';
import { useTransactions } from '../../hooks/useTransactions';
import { useUiStore } from '../../store/uiStore';
import { getCategoryColor } from '../../utils/formatters';
import EmptyState from '../common/EmptyState';
import { SkeletonBlock, SkeletonText } from '../common/Skeleton';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

export default function SpendingCategoryChart({ isLoading = false }) {
  const { spendingByCategory } = useTransactions();
  const darkMode = useUiStore((state) => state.darkMode);

  if (!isLoading && spendingByCategory.length === 0) {
    return (
      <Card className="h-full">
        <h3 className="mb-6 text-lg font-semibold text-slate-900 dark:text-white">
          Spending by Category
        </h3>
        <EmptyState
          icon={PieChartIcon}
          title="No data available"
          description="No expense data is available for this chart yet."
        />
      </Card>
    );
  }

  const totalValue = spendingByCategory.reduce((sum, item) => sum + item.value, 0);
  const tooltipStyle = {
    backgroundColor: darkMode ? '#ffffff' : '#0f172a',
    border: `1px solid ${darkMode ? '#e2e8f0' : '#1e293b'}`,
    borderRadius: '14px',
    boxShadow: darkMode
      ? '0 16px 32px rgba(15, 23, 42, 0.12)'
      : '0 18px 40px rgba(15, 23, 42, 0.32)',
    color: darkMode ? '#0f172a' : '#ffffff',
    padding: '12px 14px',
  };

  return (
    <Card className="animate-slideUp h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Spending by Category</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Responsive pie layout with a dedicated legend so labels never clip.
          </p>
        </div>
        <div className="rounded-xl bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-900/30 dark:text-orange-200">
          Top 6
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="flex h-[340px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50 sm:h-[400px]">
            <SkeletonBlock className="h-56 w-56 rounded-full" />
          </div>
          <div className="grid content-start gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-900/50"
              >
                <div className="flex items-start gap-3">
                  <SkeletonBlock className="mt-1 h-3 w-3 rounded-full" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <SkeletonBlock className="h-4 w-24" />
                      <SkeletonBlock className="h-4 w-16" />
                    </div>
                    <SkeletonText lines={1} lineClassName="h-3" className="mt-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="h-[340px] min-w-0 sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 24, right: 24, bottom: 24, left: 24 }}>
                <Pie
                  data={spendingByCategory}
                  cx="50%"
                  cy="48%"
                  innerRadius="52%"
                  outerRadius="78%"
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                  isAnimationActive={false}
                >
                  {spendingByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getCategoryColor(entry.name)} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={tooltipStyle}
                  itemStyle={{ color: darkMode ? '#0f172a' : '#ffffff', paddingTop: 4 }}
                  labelStyle={{
                    color: darkMode ? '#0f172a' : '#ffffff',
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                  formatter={(value, _name, details) => {
                    const percentage = totalValue > 0 ? ((value / totalValue) * 100).toFixed(1) : '0.0';
                    return [`${formatCurrency(value)} (${percentage}%)`, details?.payload?.name || 'Amount'];
                  }}
                  wrapperStyle={{ outline: 'none', zIndex: 20 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid content-start gap-3">
            {spendingByCategory.map((item) => {
              const percentage = totalValue > 0 ? (item.value / totalValue) * 100 : 0;

              return (
                <div
                  key={item.name}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/60"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-1 h-3 w-3 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: getCategoryColor(item.name) }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                          {item.name}
                        </p>
                        <p className="whitespace-nowrap text-sm font-semibold text-slate-700 dark:text-slate-300">
                          {formatCurrency(item.value)}
                        </p>
                      </div>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {percentage.toFixed(1)}% of total expenses
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
}
