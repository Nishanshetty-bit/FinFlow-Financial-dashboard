import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useFinFlow } from '../hooks/useFinFlow';
import {
  computeSummary,
  computeCategoryTotals,
  computeMonthlyData,
  getMonthKey,
  monthLabel,
  fmt,
  CATEGORY_COLORS,
  CATEGORY_EMOJI,
} from '../utils/constants';

const Insights = () => {
  const { transactions, theme } = useFinFlow();
  const monthlyChartRef = useRef(null);
  const monthlyChartInstance = useRef(null);

  const { income, expense } = computeSummary(transactions);
  const catTotals = computeCategoryTotals(transactions, 'expense');
  const topCategory = catTotals[0];

  const avgTx = transactions.length > 0 ? (income + expense) / transactions.length : 0;
  const expenseRatio = income > 0 ? ((expense / income) * 100).toFixed(1) + '%' : '—';

  // Most active month
  const monthCounts = {};
  transactions.forEach((t) => {
    const k = getMonthKey(t.date);
    monthCounts[k] = (monthCounts[k] || 0) + 1;
  });
  const maxMonth = Object.entries(monthCounts).sort((a, b) => b[1] - a[1])[0] || [];

  // Monthly Comparison Chart
  useEffect(() => {
    if (!monthlyChartRef.current) return;

    const { keys, income: incomeData, expense: expenseData } = computeMonthlyData(transactions, 6);
    const labels = keys.map(monthLabel);
    const isDark = theme === 'dark';
    const incomeColor = isDark ? '#57ffc9' : '#1a9970';
    const expenseColor = isDark ? '#ff6b8a' : '#cc3355';

    if (monthlyChartInstance.current) {
      monthlyChartInstance.current.destroy();
    }

    const canvas = monthlyChartRef.current;
    monthlyChartInstance.current = new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Income',
            data: incomeData,
            backgroundColor: incomeColor + '55',
            borderColor: incomeColor,
            borderWidth: 1.5,
            borderRadius: 6,
            borderSkipped: false,
          },
          {
            label: 'Expenses',
            data: expenseData,
            backgroundColor: expenseColor + '55',
            borderColor: expenseColor,
            borderWidth: 1.5,
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: isDark ? '#9090a8' : '#5a5a6e',
              font: { family: 'DM Mono', size: 11 },
              usePointStyle: true,
              pointStyleWidth: 8,
            },
          },
          tooltip: {
            backgroundColor: isDark ? '#1e1e28' : '#fff',
            borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
            borderWidth: 1,
            titleColor: isDark ? '#9090a8' : '#5a5a6e',
            bodyColor: isDark ? '#f0f0f5' : '#1a1a25',
            bodyFont: { family: 'DM Mono', size: 12 },
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${fmt(ctx.raw)}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
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
      if (monthlyChartInstance.current) {
        monthlyChartInstance.current.destroy();
      }
    };
  }, [transactions, theme]);

  return (
    <div className="space-y-7">
      {/* Section Intro */}
      <div>
        <h1 className="text-4xl font-black tracking-tighter text-text leading-tight">
          Smart <em className="font-serif italic text-accent font-normal">Insights</em>
        </h1>
        <p className="mt-1 text-sm text-text-3 font-mono tracking-wider">
          AI-powered observations from your data
        </p>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Top Spending Category */}
        <div className="border border-accent/25 rounded-2xl p-5.5 flex items-start gap-4 hover:border-white/12 hover:-translate-y-0.5 hover:shadow-elevation transition-all" style={{ background: 'linear-gradient(135deg, var(--surface) 0%, var(--accent) 10%, var(--surface) 100%)' }}>
          <div className="text-5xl text-accent flex-shrink-0 leading-none">▲</div>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest text-text-2 font-semibold mb-1">Top Spending Category</p>
            <p className="font-mono text-xl font-medium text-text">{topCategory ? topCategory[0] : '—'}</p>
            <p className="text-xs text-text-2 font-mono mt-1">
              {topCategory ? fmt(topCategory[1]) + ' spent' : ''}
            </p>
          </div>
        </div>

        {/* Avg Transaction */}
        <div className="bg-surface border border-white/7 rounded-2xl p-5.5 flex items-start gap-4 hover:border-white/12 hover:-translate-y-0.5 hover:shadow-elevation transition-all">
          <div className="text-5xl text-accent flex-shrink-0 leading-none">◈</div>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest text-text-3 font-semibold mb-1">Avg. Transaction</p>
            <p className="font-mono text-xl font-medium text-text">{fmt(avgTx)}</p>
            <p className="text-xs text-text-3 font-mono mt-1">per transaction overall</p>
          </div>
        </div>

        {/* Expense Ratio */}
        <div className="bg-surface border border-white/7 rounded-2xl p-5.5 flex items-start gap-4 hover:border-white/12 hover:-translate-y-0.5 hover:shadow-elevation transition-all">
          <div className="text-5xl text-accent flex-shrink-0 leading-none">◑</div>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest text-text-3 font-semibold mb-1">Expense Ratio</p>
            <p className="font-mono text-xl font-medium text-text">{expenseRatio}</p>
            <p className="text-xs text-text-3 font-mono mt-1">expenses to income</p>
          </div>
        </div>

        {/* Most Active Month */}
        <div className="bg-surface border border-white/7 rounded-2xl p-5.5 flex items-start gap-4 hover:border-white/12 hover:-translate-y-0.5 hover:shadow-elevation transition-all">
          <div className="text-5xl text-accent flex-shrink-0 leading-none">⬡</div>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest text-text-3 font-semibold mb-1">Most Active Month</p>
            <p className="font-mono text-xl font-medium text-text">{maxMonth[0] ? monthLabel(maxMonth[0]) : '—'}</p>
            <p className="text-xs text-text-3 font-mono mt-1">
              {maxMonth[1] ? maxMonth[1] + ' transactions' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Monthly Comparison Chart */}
      <div className="bg-surface border border-white/7 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-text-2 tracking-wider mb-5">Monthly Income vs Expenses</h3>
        <div className="h-72 relative">
          <canvas ref={monthlyChartRef} />
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-surface border border-white/7 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-text-2 tracking-wider mb-5">Category Breakdown</h3>
        <div className="space-y-3.5 pt-1">
          {catTotals.slice(0, 8).map(([name, amt]) => {
            const max = catTotals.length > 0 ? catTotals[0][1] : 1;
            const pct = ((amt / max) * 100).toFixed(1);
            const color = CATEGORY_COLORS[name] || '#8395a7';
            return (
              <div key={name} className="flex items-center gap-4">
                <div className="w-28 text-sm text-text-2 font-medium flex-shrink-0">
                  {CATEGORY_EMOJI[name] || ''} {name}
                </div>
                <div className="flex-1 h-2 bg-bg-3 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-800 ease-out"
                    style={{ width: pct + '%', background: color }}
                  />
                </div>
                <div className="w-20 text-xs text-right text-text-3 font-mono flex-shrink-0">
                  {fmt(amt)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Insights;
