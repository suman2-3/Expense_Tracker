import { useCallback, useEffect, useState } from "react";
import { getExpenses } from "../api/expenseApi";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import FilterBar from "../components/FilterBar";
import Loader from "../components/Loader";
import Chart from "../components/Chart";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function Home() {
  const [expenses, setExpenses]         = useState([]);
  const [filters, setFilters]           = useState({ category: "", sort: "date_desc" });
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");
  const [activeTab, setActiveTab]       = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDark, setIsDark]             = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getExpenses(filters);
      setExpenses(data);
    } catch (err) {
      setError(err.error || "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const total         = expenses.reduce((sum, e) => sum + e.amount, 0);
  const average       = expenses.length ? total / expenses.length : 0;
  const categoryTotals = expenses.reduce((totals, e) => {
    const cat = e.category || "Other";
    totals[cat] = (totals[cat] || 0) + e.amount;
    return totals;
  }, {});
  const topCategory   = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a)[0];
  const sortedByDate  = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
  const latestExpense = sortedByDate[0];
  const recentExpenses = sortedByDate.slice(0, 5);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  return (
    <div
      className={`container${isSidebarOpen ? " sidebar-open" : ""}`}
      data-theme={isDark ? "dark" : "light"}
    >
      {/* Mobile backdrop */}
      <button
        className="sidebar-backdrop"
        aria-label="Close menu"
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">S</span>
          <span className="brand-name">SpendWise</span>
        </div>

        <button
          id="nav-dashboard"
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => handleTabChange("dashboard")}
        >
          <span className="nav-icon">D</span>
          <span className="nav-label">Dashboard</span>
        </button>

        <button
          id="nav-transactions"
          className={activeTab === "transactions" ? "active" : ""}
          onClick={() => handleTabChange("transactions")}
        >
          <span className="nav-icon">T</span>
          <span className="nav-label">Transactions</span>
        </button>

        <button id="nav-analytics">
          <span className="nav-icon">A</span>
          <span className="nav-label">Analytics</span>
        </button>

        <button id="nav-settings">
          <span className="nav-icon">S</span>
          <span className="nav-label">Settings</span>
        </button>
      </aside>

      {/* Main */}
      <main className="main">
        <div className="page-header">
          {/* Mobile hamburger */}
          <button
            className="menu-button"
            aria-label="Open menu"
            onClick={() => setIsSidebarOpen(true)}
          >
            <span /><span /><span />
          </button>

          <div>
            <p className="eyebrow">Expense Tracker</p>
            <h1>{activeTab === "dashboard" ? "Dashboard" : "Transactions"}</h1>
          </div>

          <div className="header-right">
            <span className="status-pill">{expenses.length} records</span>

            <button
              id="theme-toggle-btn"
              className="theme-toggle"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              onClick={() => setIsDark(!isDark)}
            >
              <span className="theme-toggle-track">
                <span className="theme-toggle-thumb">
                  {isDark ? "🌙" : "☀️"}
                </span>
              </span>
              <span className="theme-toggle-label">{isDark ? "Dark" : "Light"}</span>
            </button>
          </div>
        </div>

        {loading && <Loader />}
        {error   && <p className="error-message">{error}</p>}

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="dashboard-grid">
            {/* Stat Cards */}
            <div className="cards">
              <div className="card">
                <span>Total spent</span>
                <strong>{currencyFormatter.format(total)}</strong>
              </div>
              <div className="card">
                <span>Transactions</span>
                <strong>{expenses.length}</strong>
              </div>
              <div className="card">
                <span>Average spend</span>
                <strong>{currencyFormatter.format(average)}</strong>
              </div>
              <div className="card">
                <span>Top category</span>
                <strong>{topCategory?.[0] || "—"}</strong>
              </div>
            </div>

            {/* Chart + Snapshot */}
            <div className="dashboard-columns">
              <Chart expenses={expenses} isDark={isDark} />

              <section className="insight-panel">
                <h3>Snapshot</h3>
                <div className="insight-row">
                  <span>Highest category</span>
                  <strong>
                    {topCategory
                      ? `${topCategory[0]} (${currencyFormatter.format(topCategory[1])})`
                      : "—"}
                  </strong>
                </div>
                <div className="insight-row">
                  <span>Latest expense</span>
                  <strong>
                    {latestExpense
                      ? `${latestExpense.category || "Other"} · ${currencyFormatter.format(latestExpense.amount)}`
                      : "—"}
                  </strong>
                </div>
                <div className="category-list">
                  {Object.entries(categoryTotals).map(([cat, amount]) => (
                    <div className="category-item" key={cat}>
                      <span>{cat}</span>
                      <strong>{currencyFormatter.format(amount)}</strong>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Recent Expenses */}
            <section className="recent-panel">
              <div className="section-title">
                <h3>Recent expenses</h3>
                <button onClick={() => setActiveTab("transactions")}>View all</button>
              </div>

              {recentExpenses.length ? (
                <div className="recent-list">
                  {recentExpenses.map((expense) => (
                    <div className="recent-item" key={expense.id}>
                      <div>
                        <strong>{expense.description || expense.category || "Expense"}</strong>
                        <span>{expense.category || "Other"} · {expense.date}</span>
                      </div>
                      <strong>{currencyFormatter.format(expense.amount)}</strong>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-state">No expenses found</p>
              )}
            </section>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div className="transactions-view">
            <ExpenseForm onAdd={fetchData} />
            <FilterBar onFilter={setFilters} />
            <ExpenseList expenses={expenses} />
          </div>
        )}
      </main>
    </div>
  );
}
