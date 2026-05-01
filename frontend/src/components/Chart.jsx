import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Chart({ expenses, isDark = true }) {
  const categoryTotals = expenses.reduce((totals, expense) => {
    const category = expense.category || "Other";
    totals[category] = (totals[category] || 0) + expense.amount;
    return totals;
  }, {});

  const data = Object.entries(categoryTotals).map(([name, amount]) => ({
    name,
    amount,
  }));

  const axisColor = isDark ? "#9aa8bd" : "#64748b";
  const tooltipBg = isDark ? "#172033" : "#ffffff";
  const tooltipBorder = isDark ? "#2f3b52" : "#dde6f0";
  const tooltipText = isDark ? "#f8fafc" : "#172033";
  const tooltipItem = isDark ? "#38bdf8" : "#0ea5e9";
  const cursorFill = isDark ? "rgba(56,189,248,0.08)" : "rgba(14,165,233,0.08)";
  const barTop = isDark ? "#38bdf8" : "#0ea5e9";
  const barBot = isDark ? "#22c55e" : "#16a34a";

  return (
    <section className="chart-box">
      <h3>Spending by category</h3>
      {data.length ? (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="name" stroke={axisColor} tick={{ fill: axisColor }} />
            <YAxis stroke={axisColor} tick={{ fill: axisColor }} />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                borderColor: tooltipBorder,
                borderRadius: "8px",
                color: tooltipText,
                boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
              }}
              itemStyle={{ color: tooltipItem, fontWeight: "bold" }}
              cursor={{ fill: cursorFill }}
            />
            <Bar dataKey="amount" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={barTop} stopOpacity={0.85} />
                <stop offset="95%" stopColor={barBot} stopOpacity={0.85} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="empty-state">No chart data yet</p>
      )}
    </section>
  );
}
