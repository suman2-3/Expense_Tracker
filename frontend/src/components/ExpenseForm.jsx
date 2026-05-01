import { useState } from "react";
import { createExpense } from "../api/expenseApi";

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.amount || form.amount <= 0 || !form.date) {
      return setError("Amount must be greater than 0 and date is required");
    }

    setLoading(true);

    try {
      const payload = {
        ...form,
        amount: Number(form.amount),
        id: crypto.randomUUID(),
      };

      await createExpense(payload);
      onAdd();

      setForm({
        amount: "",
        category: "",
        description: "",
        date: "",
      });
    } catch (err) {
      setError(err.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="panel form-panel" onSubmit={handleSubmit}>
      <h3>Add Expense</h3>

      {error && <p className="error-message">{error}</p>}

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
}
