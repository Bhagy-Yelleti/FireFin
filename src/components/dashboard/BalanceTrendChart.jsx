import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Card from '../common/Card';
import { useUiStore } from '../../store/uiStore';
import EmptyState from '../common/EmptyState';
import { SkeletonBlock, SkeletonText } from '../common/Skeleton';
import { BarChart3 } from 'lucide-react';

const formatCompactCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);

const formatFullCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

export default function BalanceTrendChart({ isLoading = false }) {
  const darkMode = useUiStore((state) => state.darkMode);

  const generateTrendData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let balance = 50000;

    return months.map((month, index) => {
      balance += Math.sin(index * 0.5) * 5000 + Math.random() * 3000;
      return {
        month,
        balance: Math.max(balance, 10000),
      };
    });
  };

  const data = generateTrendData();
  const gridStroke = darkMode ? '#334155' : '#cbd5e1';
  const axisStroke = darkMode ? '#94a3b8' : '#64748b';
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
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Balance Trend</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            A twelve-month balance view with extra chart padding for label safety.
          </p>
        </div>
        <div className="rounded-xl bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-200">
          12 Months
        </div>
      </div>

      <div className="h-[360px] min-w-0 sm:h-[400px]">
        {isLoading ? (
          <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/50">
            <SkeletonText lines={2} lineClassName="h-4" className="max-w-xs" />
            <SkeletonBlock className="h-52 w-full rounded-3xl" />
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonBlock key={index} className="h-3" />
              ))}
            </div>
          </div>
        ) : data.length === 0 ? (
          <EmptyState
            icon={BarChart3}
            title="No data available"
            description="No balance data is available for this chart yet."
          />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 24, bottom: 20, left: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} opacity={0.6} />
              <XAxis
                dataKey="month"
                stroke={axisStroke}
                tickLine={false}
                axisLine={false}
                tick={{ fill: axisStroke, fontSize: 12 }}
                interval={0}
                padding={{ left: 8, right: 8 }}
              />
              <YAxis
                stroke={axisStroke}
                tickLine={false}
                axisLine={false}
                tick={{ fill: axisStroke, fontSize: 12 }}
                width={84}
                tickFormatter={formatCompactCurrency}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                itemStyle={{ color: darkMode ? '#0f172a' : '#ffffff', paddingTop: 4 }}
                labelStyle={{
                  color: darkMode ? '#0f172a' : '#ffffff',
                  fontWeight: 700,
                  marginBottom: 4,
                }}
                formatter={(value) => [formatFullCurrency(value), 'Balance']}
                wrapperStyle={{ outline: 'none', zIndex: 20 }}
                cursor={{
                  strokeDasharray: '5 5',
                  stroke: '#3b82f6',
                  opacity: 0.7,
                }}
              />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: '#1d4ed8', stroke: darkMode ? '#ffffff' : '#0f172a', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
