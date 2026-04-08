import React, { useState } from 'react';
import { useFinFlow } from '../hooks/useFinFlow';

const Sidebar = () => {
  const { setActiveSection, role, setRole, toggleTheme, theme, activeSection } = useFinFlow();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'overview', icon: '⬡', label: 'Overview' },
    { id: 'transactions', icon: '⇄', label: 'Transactions' },
    { id: 'insights', icon: '◎', label: 'Insights' },
  ];

  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 md:hidden p-2 hover:bg-surface rounded-lg"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 w-60 h-screen bg-bg-2 border-r border-white/7 flex flex-col z-30 transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="px-5 py-6 border-b border-white/7 flex items-center justify-between">
          <div className="flex items-center gap-2 text-text no-underline">
            <span className="text-xl text-accent">◈</span>
            <span className="text-lg font-black tracking-tighter">FinFlow</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden hover:bg-surface p-1 rounded"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex items-center gap-3 px-3.5 py-1.75 rounded-lg text-sm font-medium transition-all ${
                activeSection === item.id
                  ? 'text-accent bg-accent/10'
                  : 'text-text-2 hover:text-text hover:bg-surface'
              } relative`}
            >
              {activeSection === item.id && (
                <div className="absolute left-0 top-1/4 h-1/2 w-0.75 bg-accent rounded-r-sm" />
              )}
              <span className="text-base w-5 text-center transition-transform hover:scale-110">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-6 border-t border-white/7 flex flex-col gap-4">
          {/* Role Switcher */}
          <div>
            <label className="text-xs uppercase tracking-widest text-text-3 font-semibold block mb-2">
              Role
            </label>
            <div className="flex bg-bg-3 rounded-lg p-0.75 gap-0.75">
              {['viewer', 'admin'].map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 px-0 py-1 rounded border-none cursor-pointer font-semibold text-0.8rem transition-all ${
                    role === r
                      ? 'bg-surface-2 text-text shadow-sm'
                      : 'text-text-2 hover:text-text'
                  }`}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Toggle */}
          <div>
            <label className="text-xs uppercase tracking-widest text-text-3 font-semibold block mb-2">
              Theme
            </label>
            <button
              onClick={toggleTheme}
              className="w-full bg-bg-3 border border-white/7 rounded-lg p-2 cursor-pointer flex items-center justify-center gap-2 text-sm font-semibold text-text-2 hover:text-text hover:bg-surface transition-all"
            >
              <span className={theme === 'dark' ? 'inline' : 'hidden'}>◐</span>
              <span className={theme === 'light' ? 'inline' : 'hidden'}>○</span>
              <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
