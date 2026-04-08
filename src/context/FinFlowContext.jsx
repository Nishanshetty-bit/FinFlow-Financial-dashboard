import React, { createContext, useCallback, useEffect, useState } from 'react';
import { SEED_TRANSACTIONS } from '../utils/constants';

export const FinFlowContext = createContext();

export const FinFlowProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [role, setRole] = useState('viewer');
  const [theme, setThemeState] = useState('dark');
  const [filters, setFilters] = useState({ search: '', type: '', category: '' });
  const [sort, setSort] = useState('date-desc');
  const [activeSection, setActiveSection] = useState('overview');
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);

  // Load state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('finflow_transactions');
      setTransactions(saved ? JSON.parse(saved) : [...SEED_TRANSACTIONS]);
      const savedTheme = localStorage.getItem('finflow_theme');
      if (savedTheme) setThemeState(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme || 'dark');
    } catch {
      setTransactions([...SEED_TRANSACTIONS]);
    }
  }, []);

  // Save transactions to localStorage
  const saveTransactions = useCallback((newTransactions) => {
    setTransactions(newTransactions);
    localStorage.setItem('finflow_transactions', JSON.stringify(newTransactions));
  }, []);

  // Theme management
  const toggleTheme = useCallback(() => {
    setThemeState(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('finflow_theme', newTheme);
      return newTheme;
    });
  }, []);

  // Toast notification
  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  }, []);

  // Add/Edit transaction
  const saveTransaction = useCallback((desc, amount, category, type, date, id) => {
    if (!desc || !amount || amount <= 0 || !date) {
      showToast('Please fill all fields correctly.', 'error');
      return false;
    }

    if (id) {
      const idx = transactions.findIndex(t => t.id === id);
      if (idx !== -1) {
        const updated = [...transactions];
        updated[idx] = { id, desc, amount, category, type, date };
        saveTransactions(updated);
        showToast('Transaction updated!', 'success');
      }
    } else {
      const newTransactions = [
        { id: Date.now().toString(36) + Math.random().toString(36).slice(2), desc, amount, category, type, date },
        ...transactions,
      ];
      saveTransactions(newTransactions);
      showToast('Transaction added!', 'success');
    }
    setEditingId(null);
    return true;
  }, [transactions, saveTransactions, showToast]);

  // Delete transaction
  const deleteTransaction = useCallback((id) => {
    if (window.confirm('Delete this transaction?')) {
      const newTransactions = transactions.filter(t => t.id !== id);
      saveTransactions(newTransactions);
      showToast('Transaction deleted.', 'success');
    }
  }, [transactions, saveTransactions, showToast]);

  const value = {
    transactions,
    setTransactions,
    role,
    setRole,
    theme,
    setThemeState,
    toggleTheme,
    filters,
    setFilters,
    sort,
    setSort,
    activeSection,
    setActiveSection,
    editingId,
    setEditingId,
    toast,
    showToast,
    saveTransaction,
    deleteTransaction,
    saveTransactions,
  };

  return (
    <FinFlowContext.Provider value={value}>
      {children}
    </FinFlowContext.Provider>
  );
};
