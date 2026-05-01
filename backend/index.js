const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;


app.post("/expenses", (req, res) => {
  const { amount, category, description, date, id } = req.body;

  // Basic validation (bonus)
  if (!amount || amount <= 0 || !date) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const expenseId = id || uuidv4();

  try {
    db.prepare(`
      INSERT INTO expenses (id, amount, category, description, date)
      VALUES (?, ?, ?, ?, ?)
    `).run(expenseId, amount, category, description, date);

    res.status(201).json({ id: expenseId });
  } catch (err) {
    // Retry-safe: if same ID already exists
    const existing = db
      .prepare("SELECT * FROM expenses WHERE id = ?")
      .get(expenseId);

    if (existing) {
      return res.status(200).json(existing);
    }

    res.status(500).json({ error: "Server error" });
  }
});


app.get("/expenses", (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});