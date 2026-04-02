import React, { useEffect, useState } from 'react';
import Layout from './components/layout/Layout';
import DashboardOverview from './components/dashboard/DashboardOverview';
import TransactionForm from './components/transactions/TransactionForm';
import TransactionHeader from './components/transactions/TransactionHeader';
import TransactionTable from './components/transactions/TransactionTable';
import InsightsSection from './components/insights/InsightsSection';
import { useUiStore } from './store/uiStore';
import { useTransactionStore } from './store/transactionStore';
import { mockTransactions } from './data/mockData';

export default function App() {
  const activeTab = useUiStore((state) => state.activeTab);
  const darkMode = useUiStore((state) => state.darkMode);
  const setDarkMode = useUiStore((state) => state.setDarkMode);
  const transactions = useTransactionStore((state) => state.transactions);
  const setTransactions = useTransactionStore((state) => state.setTransactions);
  const setActiveTab = useUiStore((state) => state.setActiveTab);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('ui-store');
    if (storedDarkMode) {
      try {
        const parsed = JSON.parse(storedDarkMode);
        if (parsed.state && typeof parsed.state.darkMode === 'boolean') {
          setDarkMode(parsed.state.darkMode);
        }
      } catch (error) {
        console.error('Failed to parse dark mode from localStorage:', error);
      }
    }
  }, [setDarkMode]);

  useEffect(() => {
    setActiveTab('dashboard');
    if (!transactions || transactions.length === 0) {
      setTransactions(mockTransactions);
    }
  }, [setActiveTab, setTransactions, transactions]);

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <div key={activeTab} className="animate-pageEnter space-y-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <DashboardOverview isLoading={isLoading} />
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="space-y-6">
            <TransactionHeader />
            <TransactionForm />
            <TransactionTable isLoading={isLoading} />
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-6">
            <InsightsSection isLoading={isLoading} />
          </div>
        )}
      </div>
    </Layout>
  );
}
