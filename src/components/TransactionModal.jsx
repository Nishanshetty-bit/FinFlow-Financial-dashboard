import React, { useState, useEffect } from 'react';
import { useFinFlow } from '../hooks/useFinFlow';

const TransactionModal = ({ isOpen, onClose, initialData = null }) => {
  const { saveTransaction } = useFinFlow();
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [type, setType] = useState('expense');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    if (initialData) {
      setDesc(initialData.desc);
      setAmount(initialData.amount);
      setCategory(initialData.category);
      setType(initialData.type);
      setDate(initialData.date);
    } else {
      setDesc('');
      setAmount('');
      setCategory('Food');
      setType('expense');
      setDate(new Date().toISOString().slice(0, 10));
    }
  }, [initialData, isOpen]);

  const handleSave = () => {
    const success = saveTransaction(desc, parseFloat(amount), category, type, date, initialData?.id);
    if (success) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-bg-2 border border-white/12 rounded-2xl w-full max-w-96 shadow-elevation animate-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/7">
          <h2 className="text-base font-bold text-text">
            {initialData ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button
            onClick={onClose}
            className="bg-none border-none text-text-3 cursor-pointer text-base hover:text-text transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-widest text-text-3 font-semibold">
                Description
              </label>
              <input
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="e.g. Netflix subscription"
                className="px-3.5 py-2.5 bg-bg-3 border border-white/7 rounded-2.5 text-text font-display text-sm outline-none transition-colors hover:border-white/12 focus:border-accent"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-widest text-text-3 font-semibold">
                Amount (₹)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="px-3.5 py-2.5 bg-bg-3 border border-white/7 rounded-2.5 text-text font-display text-sm outline-none transition-colors hover:border-white/12 focus:border-accent"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-widest text-text-3 font-semibold">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3.5 py-2.5 bg-bg-3 border border-white/7 rounded-2.5 text-text font-display text-sm outline-none transition-colors hover:border-white/12 focus:border-accent cursor-pointer"
              >
                <option>Food</option>
                <option>Shopping</option>
                <option>Transport</option>
                <option>Housing</option>
                <option>Entertainment</option>
                <option>Health</option>
                <option>Education</option>
                <option>Salary</option>
                <option>Freelance</option>
                <option>Investment</option>
                <option>Other</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-widest text-text-3 font-semibold">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="px-3.5 py-2.5 bg-bg-3 border border-white/7 rounded-2.5 text-text font-display text-sm outline-none transition-colors hover:border-white/12 focus:border-accent cursor-pointer"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          {/* Row 3 */}
          <div className="mb-4">
            <label className="text-xs uppercase tracking-widest text-text-3 font-semibold block mb-1.5">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-bg-3 border border-white/7 rounded-2.5 text-text font-display text-sm outline-none transition-colors hover:border-white/12 focus:border-accent"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 justify-end px-6 py-4 border-t border-white/7">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-transparent border border-white/12 rounded-2.5 cursor-pointer font-display text-sm font-semibold text-text-2 transition-all hover:border-text-2 hover:text-text"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-accent border-none rounded-2.5 cursor-pointer font-display text-sm font-bold text-bg-2 transition-all hover:bg-opacity-90 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Save Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
