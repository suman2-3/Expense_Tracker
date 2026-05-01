const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const { validateExpense } = require("../utils/validation");

// POST /expenses
const createExpense = (req, res) => {
  const { amount, category, description, date, id } = req.body;

  const error = validateExpense({ amount, date });
  if (error) {
    return res.status(400).json({ error });
  }

  const expenseId = id || uuidv4();

  try {
    db.prepare(`
      INSERT INTO expenses (id, amount, category, description, date)
      VALUES (?, ?, ?, ?, ?)
    `).run(expenseId, amount, category, description, date);

    return res.status(201).json({ id: expenseId });
  } catch (err) {
    // retry-safe
    const existing = db
      .prepare("SELECT * FROM expenses WHERE id = ?")
      .get(expenseId);

    if (existing) {
      return res.status(200).json(existing);
    }

    return res.status(500).json({ error: "Server error" });
  }
};

// GET /expenses
const getExpenses = (req, res) => {
  const { category, sort } = req.query;

  let query = "SELECT * FROM expenses";
  let params = [];

  if (category) {
    query += " WHERE category = ?";
    params.push(category);
  }

  if (sort === "date_desc") {
    query += " ORDER BY date DESC";
  }

  const expenses = db.prepare(query).all(...params);

  res.json(expenses);
};

module.exports = { createExpense, getExpenses };