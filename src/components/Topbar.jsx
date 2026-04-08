import React from 'react';
import { useFinFlow } from '../hooks/useFinFlow';

const Topbar = () => {
  const { role, activeSection } = useFinFlow();

  const titles = {
    overview: 'Overview',
    transactions: 'Transactions',
    insights: 'Insights',
  };

  return (
    <header className="h-16 flex items-center justify-between px-8 bg-bg border-b border-white/7 sticky top-0 z-10 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div className="text-sm font-semibold text-text-2 tracking-wider">
          {titles[activeSection] || activeSection}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3.5 py-2 border border-white/12 rounded-full text-xs font-semibold text-text-2">
          <span className="w-1.75 h-1.75 rounded-full bg-accent animate-pulse" />
          <span>{role.charAt(0).toUpperCase() + role.slice(1)}</span>
        </div>
        <div className="w-9 h-9 rounded-full bg-accent/10 border-1.5 border-accent flex items-center justify-center text-xs font-bold text-accent tracking-wider">
          NK
        </div>
      </div>
    </header>
  );
};

export default Topbar;
