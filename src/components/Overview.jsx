import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useFinFlow } from '../hooks/useFinFlow';
import {
  computeSummary,
  computeCategoryTotals,
  computeBalanceTrend,
  fmt,
  fmtDate,
  CATEGORY_COLORS,
  CATEGORY_EMOJI,
  monthLabel,
} from '../utils/constants';

const Overview = () => {
  const { transactions, theme, setActiveSection } = useFinFlow();
  const trendChartRef = useRef(null);
  const donutChartRef = useRef(null);
  const trendChartInstance = useRef(null);
  const donutChartInstance = useRef(null);
  const [periodMonths, setPeriodMonths] = React.useState(6);

  const { income, expense, balance, savingsRate } = computeSummary(transactions);

  // Balance Trend Chart
  useEffect(() => {
    if (!trendChartRef.current) return;

    const { labels, balance: balanceData } = computeBalanceTrend(transactions, periodMonths);
    const isDark = theme === 'dark';
    const accentColor = isDark ? '#c9ff57' : '#4a8c00';

    const canvas = trendChartRef.current;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 220);
    gradient.addColorStop(0, 'rgba(201,255,87,0.25)');
    gradient.addColorStop(1, 'rgba(201,255,87,0)');

    if (trendChartInstance.current) {
      trendChartInstance.current.destroy();
    }

    trendChartInstance.current = new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            data: balanceData,
            borderColor: accentColor,
            backgroundColor: gradient,
            borderWidth: 2.5,
            pointRadius: 4,
            pointBackgroundColor: accentColor,
            pointBorderColor: 'transparent',
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: isDark ? '#1e1e28' : '#fff',
            borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
            borderWidth: 1,
            titleColor: isDark ? '#9090a8' : '#5a5a6e',
            bodyColor: accentColor,
            bodyFont: { family: 'DM Mono', size: 13 },
            callbacks: { label: (ctx) => ' ' + fmt(ctx.raw) },
          },
        },
        scales: {
          x: {
            grid: { color: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)', drawBorder: false },
            ticks: { color: isDark ? '#5a5a72' : '#9a9aae', font: { family: 'DM Mono', size: 11 } },
            border: { display: false },
          },
          y: {
            grid: { color: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)', drawBorder: false },
            ticks: {
              color: isDark ? '#5a5a72' : '#9a9aae',
              font: { family: 'DM Mono', size: 11 },
              callback: (v) => '₹' + (v / 1000).toFixed(0) + 'k',
            },
            border: { display: false },
          },
        },
      },
    });

    return () => {
      if (trendChartInstance.current) {
        trendChartInstance.current.destroy();
      }
    };
  }, [transactions, theme, periodMonths]);

  // Spending Donut Chart
  useEffect(() => {
    if (!donutChartRef.current) return;

    const cats = computeCategoryTotals(transactions, 'expense').slice(0, 6);
    const labels = cats.map((c) => c[0]);
    const data = cats.map((c) => +c[1].toFixed(2));
    const colors = labels.map((l) => CATEGORY_COLORS[l] || '#8395a7');
    const isDark = theme === 'dark';

    if (donutChartInstance.current) {
      donutChartInstance.current.destroy();
    }

    const canvas = donutChartRef.current;
    donutChartInstance.current = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{ data, backgroundColor: colors, borderWidth: 0, hoverOffset: 6 }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: isDark ? '#1e1e28' : '#fff',
            borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
            borderWidth: 1,
            titleColor: isDark ? '#9090a8' : '#5a5a6e',
            bodyColor: isDark ? '#f0f0f5' : '#1a1a25',
            callbacks: {
              label: (ctx) => ` ${fmt(ctx.raw)} (${((ctx.raw / data.reduce((s, v) => s + v, 0)) * 100).toFixed(1)}%)`,
            },
          },
        },
      },
    });

    return () => {
      if (donutChartInstance.current) {
        donutChartInstance.current.destroy();
      }
    };
  }, [transactions, theme]);

  const recent = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);
  const cats = computeCategoryTotals(transactions, 'expense');
  const total = cats.reduce((s, c) => s + c[1], 0);

  return (
    <div className="space-y-7">
      {/* Section Intro */}
      <div>
        <h1 className="text-4xl font-black tracking-tighter text-text leading-tight">
          Financial <em className="font-serif italic text-accent font-normal">Overview</em>
        </h1>
        <p className="mt-1 text-sm text-text-3 font-mono tracking-wider">April 2026 · Updated just now</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Balance */}
        <div className="bg-surface border border-accent/20 rounded-2xl p-6 relative overflow-hidden hover:border-white/12 hover:-translate-y-0.5 hover:shadow-elevation transition-all">
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-accent rounded-full blur-3xl opacity-15" />
          <p className="text-xs uppercase tracking-widest text-text-3 font-semibold mb-3">Total Balance</p>
          <p className="font-mono text-2xl font-medium text-accent mb-2">{fmt(balance)}</p>
          <p className="text-xs font-mono text-income">+2.4% this month</p>
        </div>

        {/* Total Income */}
        <div className="bg-surface border border-white/7 rounded-2xl p-6 hover:border-white/12 hover:-translate-y-0.5 hover:shadow-elevation transition-all">
          <p className="text-xs uppercase tracking-widest text-text-3 font-semibold mb-3">Total Income</p>
          <p className="font-mono text-2xl font-medium text-text mb-2">{fmt(income)}</p>
          <p className="text-xs font-mono text-income">↑ vs last month</p>
        </div>

        {/* Total Expenses */}
        <div className="bg-surface border border-white/7 rounded-2xl p-6 hover:border-white/12 hover:-translate-y-0.5 hover:shadow-elevation transition-all">
          <p className="text-xs uppercase tracking-widest text-text-3 font-semibold mb-3">Total Expenses</p>
          <p className="font-mono text-2xl font-medium text-text mb-2">{fmt(expense)}</p>
          <p className="text-xs font-mono text-expense">↑ vs last month</p>
        </div>

        {/* Savings Rate */}
        <div className="bg-surface border border-white/7 rounded-2xl p-6 hover:border-white/12 hover:-translate-y-0.5 hover:shadow-elevation transition-all">
          <p className="text-xs uppercase tracking-widest text-text-3 font-semibold mb-3">Savings Rate</p>
          <p className="font-mono text-2xl font-medium text-text mb-2">{savingsRate}%</p>
          <p className="text-xs font-mono text-text-3">of income saved</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Balance Trend Chart */}
        <div className="lg:col-span-2 bg-surface border border-white/7 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-text-2 tracking-wider">Balance Trend</h3>
            <div className="flex gap-1">
              {[6, 3, 1].map((m) => (
                <button
                  key={m}
                  onClick={() => setPeriodMonths(m)}
                  className={`px-3 py-1.5 border rounded-lg cursor-pointer font-mono text-xs transition-all ${
                    periodMonths === m
                      ? 'border-accent text-accent bg-accent/10'
                      : 'border-white/7 text-text-3 hover:border-white/12 hover:text-text'
                  }`}
                >
                  {m}M
                </button>
              ))}
            </div>
          </div>
          <div className="h-56 relative">
            <canvas ref={trendChartRef} />
          </div>
        </div>

        {/* Spending Donut Chart */}
        <div className="bg-surface border border-white/7 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-text-2 tracking-wider mb-5">Spending Breakdown</h3>
          <div className="h-52 relative mb-4">
            <canvas ref={donutChartRef} />
          </div>
          <div className="space-y-2">
            {cats.slice(0, 6).map(([name, amt]) => (
              <div key={name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-sm"
                    style={{ background: CATEGORY_COLORS[name] || '#8395a7' }}
                  />
                  <span className="text-text-2 font-medium">{name}</span>
                </div>
                <span className="text-text-3 font-mono text-xs">
                  {((amt / total) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-surface border border-white/7 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-text-2">Recent Activity</span>
          <button
            onClick={() => setActiveSection('transactions')}
            className="bg-none border-none text-xs font-semibold text-accent cursor-pointer hover:opacity-70 transition-opacity"
          >
            See all →
          </button>
        </div>
        <div className="space-y-2">
          {recent.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-2xl text-text-3 mb-3">◌</p>
              <p className="text-sm text-text-3">No transactions yet</p>
            </div>
          ) : (
            recent.map((t, i) => (
              <div
                key={t.id}
                className="flex items-center gap-4 px-0 py-2.5 border-b border-white/7 last:border-b-0 animate-in"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div
                  className="w-8 h-8 rounded flex items-center justify-center text-sm flex-shrink-0"
                  style={{ background: `${CATEGORY_COLORS[t.category]}22`, color: CATEGORY_COLORS[t.category] }}
                >
                  {CATEGORY_EMOJI[t.category] || '💰'}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-text">{t.desc}</p>
                  <p className="text-xs text-text-3 font-mono mt-0.5">
                    {fmtDate(t.date)} · {t.category}
                  </p>
                </div>
                <p className={`font-mono text-sm font-medium ${t.type === 'income' ? 'text-income' : 'text-expense'}`}>
                  {t.type === 'income' ? '+' : '-'}
                  {fmt(t.amount)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
