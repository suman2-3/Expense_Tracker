const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function ExpenseList({ expenses }) {
  if (!expenses.length) {
    return <p className="panel empty-state">No expenses found</p>;
  }

  return (
    <div className="panel table-panel">
      <h3>Expense List</h3>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{currencyFormatter.format(expense.amount)}</td>
                <td>{expense.category || "Other"}</td>
                <td>{expense.description || "-"}</td>
                <td>{expense.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
