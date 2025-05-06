// components/PaymentsChart.jsx
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// props: [{ amount: number, date: string }]
const PaymentsChart = ({ data }) => {
  // Group by date and sum the amounts
  const aggregatedData = data.reduce((acc, { date, amount }) => {
    const day = new Date(date).toISOString().split("T")[0]; // YYYY-MM-DD
    if (!acc[day]) acc[day] = 0;
    acc[day] += amount;
    return acc;
  }, {});

  const chartData = Object.entries(aggregatedData)
    .map(([date, total]) => ({ date, total }))
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // ensure sorted

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value}`} />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorTotal)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentsChart;
