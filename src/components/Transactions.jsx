import React, { useState, useMemo } from 'react';
import { useFinFlow } from '../hooks/useFinFlow';
import {
  fmt,
  fmtDate,
  CATEGORY_COLORS,
  CATEGORY_EMOJI,
} from '../utils/constants';
import TransactionModal from './TransactionModal';

const Transactions = () => {
  const { transactions, role, filters, setFilters, sort, setSort, deleteTransaction } = useFinFlow();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const categories = useMemo(
    () => [...new Set(transactions.map((t) => t.category))].sort(),
    [transactions]
  );

  const filteredTransactions = useMemo(() => {
    let txs = [...transactions];
    const { search, type, category } = filters;

    if (search) {
      const q = search.toLowerCase();
      txs = txs.filter(
        (t) =>
          t.desc.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
      );
    }
    if (type) txs = txs.filter((t) => t.type === type);
    if (category) txs = txs.filter((t) => t.category === category);

    const [sortKey, sortDir] = sort.split('-');
    txs.sort((a, b) => {
      let va, vb;
      if (sortKey === 'date') {
        va = new Date(a.date);
        vb = new Date(b.date);
      } else {
        va = a.amount;
        vb = b.amount;
      }
      return sortDir === 'desc' ? vb - va : va - vb;
    });

    return txs;
  }, [transactions, filters, sort]);

  const handleEdit = (t) => {
    setEditingTransaction(t);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  return (
    <div className="space-y-6">
      {/* Section Intro */}
      <div>
        <h1 className="text-4xl font-black tracking-tighter text-text">Transactions</h1>
        <p className="mt-1 text-sm text-text-3 font-mono tracking-wider">
          {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Admin Panel */}
      {role === 'admin' && (
        <div>
          <button
            onClick={() => {
              setEditingTransaction(null);
              setIsModalOpen(true);
            }}
            className="px-5 py-2.5 bg-accent text-bg-2 border-none rounded-lg cursor-pointer font-display text-sm font-bold tracking-wider transition-all hover:bg-opacity-90 hover:-translate-y-0.5 hover:shadow-lg"
          >
            + Add Transaction
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="relative flex-1 min-w-52">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-3 text-base pointer-events-none">
            ⌕
          </span>
          <input
            type="text"
            placeholder="Search transactions…"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-9 pr-3.5 py-2.5 bg-surface border border-white/7 rounded-lg text-text font-display text-sm outline-none transition-colors focus:border-accent"
          />
        </div>

        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="px-3.5 py-2.5 bg-surface border border-white/7 rounded-lg text-text font-display text-sm outline-none cursor-pointer transition-colors focus:border-accent"
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="px-3.5 py-2.5 bg-surface border border-white/7 rounded-lg text-text font-display text-sm outline-none cursor-pointer transition-colors focus:border-accent"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-3.5 py-2.5 bg-surface border border-white/7 rounded-lg text-text font-display text-sm outline-none cursor-pointer transition-colors focus:border-accent"
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-surface border border-white/7 rounded-2xl overflow-hidden">
        {filteredTransactions.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-2.5rem text-text-3 mb-3">◌</p>
            <p className="text-sm text-text-3">No transactions found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-5 py-3.5 text-left text-xs uppercase tracking-widest text-text-3 font-semibold bg-bg-3 border-b border-white/7">
                    Date
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs uppercase tracking-widest text-text-3 font-semibold bg-bg-3 border-b border-white/7">
                    Description
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs uppercase tracking-widest text-text-3 font-semibold bg-bg-3 border-b border-white/7">
                    Category
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs uppercase tracking-widest text-text-3 font-semibold bg-bg-3 border-b border-white/7">
                    Type
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs uppercase tracking-widest text-text-3 font-semibold bg-bg-3 border-b border-white/7">
                    Amount
                  </th>
                  {role === 'admin' && (
                    <th className="px-5 py-3.5 text-left text-xs uppercase tracking-widest text-text-3 font-semibold bg-bg-3 border-b border-white/7">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((t) => {
                  const color = CATEGORY_COLORS[t.category] || '#8395a7';
                  return (
                    <tr key={t.id} className="border-b border-white/7 hover:bg-bg-3 transition-colors">
                      <td className="px-5 py-3.5 text-sm text-text-3 font-mono">
                        {fmtDate(t.date)}
                      </td>
                      <td className="px-5 py-3.5 text-sm font-semibold text-text">
                        {t.desc}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border"
                          style={{
                            background: `${color}15`,
                            borderColor: `${color}33`,
                            color: color,
                          }}
                        >
                          {CATEGORY_EMOJI[t.category] || ''} {t.category}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            t.type === 'income'
                              ? 'bg-income/10 text-income'
                              : 'bg-expense/10 text-expense'
                          }`}
                        >
                          {t.type}
                        </span>
                      </td>
                      <td className={`px-5 py-3.5 font-mono font-medium text-sm ${
                        t.type === 'income' ? 'text-income' : 'text-expense'
                      }`}>
                        {t.type === 'income' ? '+' : '-'}
                        {fmt(t.amount)}
                      </td>
                      {role === 'admin' && (
                        <td className="px-5 py-3.5 flex gap-1">
                          <button
                            onClick={() => handleEdit(t)}
                            className="px-2.5 py-1.5 bg-accent/10 border-none rounded cursor-pointer text-xs font-semibold text-accent transition-all hover:bg-accent hover:text-bg-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteTransaction(t.id)}
                            className="px-2.5 py-1.5 bg-expense/10 border-none rounded cursor-pointer text-xs font-semibold text-expense transition-all hover:bg-expense hover:text-text"
                          >
                            Del
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialData={editingTransaction}
      />
    </div>
  );
};

export default Transactions;
