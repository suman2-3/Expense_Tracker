const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function Summary({ expenses }) {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const categoryTotals = expenses.reduce((totals, expense) => {
    const category = expense.category || "Other";
    totals[category] = (totals[category] || 0) + expense.amount;
    return totals;
  }, {});

  return (
    <div className="panel summary-panel">
      <h3>Summary</h3>
      <p>
        <strong>Total: {currencyFormatter.format(total)}</strong>
      </p>

      <h4>By Category</h4>
      <ul>
        {Object.entries(categoryTotals).map(([category, amount]) => (
          <li key={category}>
            {category}: {currencyFormatter.format(amount)}
          </li>
        ))}
      </ul>
    </div>
  );
}
