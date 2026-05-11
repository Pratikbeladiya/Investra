import React, { useMemo } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AnalyticsPanel = ({ holdings, totalValue }) => {
  const chartData = useMemo(() => {
    const totalHoldings = holdings.reduce((sum, item) => sum + item.latestPrice * item.qty, 0);
    const invested = holdings.reduce((sum, item) => sum + item.avgPrice * item.qty, 0);
    // const profit = totalHoldings - invested;

    return [
      { name: 'Invested', value: invested },
      { name: 'Current', value: totalHoldings },
      { name: 'Cash', value: totalValue - totalHoldings },
    ];
  }, [holdings, totalValue]);

  const lineChartData = useMemo(() => {
    const base = holdings.length ? holdings[0].latestPrice * holdings[0].qty : 0;
    const timelineData = Array.from({ length: 7 }, (_, idx) => ({
      day: `Day ${idx + 1}`,
      value: Math.max(0, base + idx * 2500 + Math.sin(idx) * 1200),
    }));

    return {
      labels: timelineData.map(item => item.day),
      datasets: [
        {
          label: 'Portfolio Value',
          data: timelineData.map(item => item.value),
          borderColor: '#4f46e5',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          borderWidth: 3,
          pointRadius: 4,
          pointBackgroundColor: '#4f46e5',
          tension: 0.4,
        },
      ],
    };
  }, [holdings]);

  const pieChartData = useMemo(() => ({
    labels: chartData.map(item => item.name),
    datasets: [
      {
        data: chartData.map(item => item.value),
        backgroundColor: ['#6366f1', '#2563eb', '#10b981'],
        borderWidth: 0,
      },
    ],
  }), [chartData]);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Analytics</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">Portfolio performance</h3>
          <p className="mt-2 text-sm text-slate-500">Mixed view of holdings, cash, and equity performance.</p>
        </div>
        <div className="rounded-3xl bg-slate-50 px-4 py-3 text-slate-700">
          <p className="text-sm text-slate-500">Total assets</p>
          <p className="mt-1 text-xl font-semibold">₹{totalValue.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="min-h-[260px]">
          <Line
            data={lineChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    color: '#e2e8f0',
                    borderDash: [3, 3],
                  },
                  ticks: {
                    color: '#64748b',
                  },
                },
                y: {
                  grid: {
                    color: '#e2e8f0',
                    borderDash: [3, 3],
                  },
                  ticks: {
                    color: '#64748b',
                  },
                },
              },
            }}
          />
        </div>

        <div className="rounded-3xl bg-slate-50 p-5">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Allocation</p>
          <div className="mt-6 h-72">
            <Pie
              data={pieChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
          <div className="mt-4 grid gap-3">
            {chartData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: ['#6366f1', '#2563eb', '#10b981'][index] }}
                  />
                  <span className="text-sm text-slate-700">{item.name}</span>
                </div>
                <span className="text-sm font-semibold text-slate-900">₹{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
