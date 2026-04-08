import React from 'react';
import { useFinFlow } from '../hooks/useFinFlow';

const Toast = () => {
  const { toast } = useFinFlow();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      <div
        className={`px-5 py-3.5 bg-surface-2 border-1.5 rounded-lg text-sm text-text shadow-elevation flex items-center gap-2.5 min-w-56 ${
          toast.type === 'success' ? 'border-l-3 border-l-income' : 'border-l-3 border-l-expense'
        }`}
      >
        <span>{toast.type === 'success' ? '✓' : '✕'}</span>
        {toast.msg}
      </div>
    </div>
  );
};

export default Toast;
