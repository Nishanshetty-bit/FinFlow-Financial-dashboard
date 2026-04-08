import React from 'react';
import { useFinFlow } from './hooks/useFinFlow';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Toast from './components/Toast';
import Overview from './components/Overview';
import Transactions from './components/Transactions';
import Insights from './components/Insights';
import './App.css';

const App = () => {
  const { activeSection } = useFinFlow();

  return (
    <div className="flex min-h-screen overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-sidebar-w flex flex-col min-h-screen">
        {/* Topbar */}
        <Topbar />

        {/* Content */}
        <div className="flex-1 px-4 md:px-8 py-8 overflow-y-auto">
          {activeSection === 'overview' && <Overview />}
          {activeSection === 'transactions' && <Transactions />}
          {activeSection === 'insights' && <Insights />}
        </div>
      </main>

      {/* Toast */}
      <Toast />
    </div>
  );
};

export default App;
