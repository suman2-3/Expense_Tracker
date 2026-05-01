const express = require("express");
const cors = require("cors");

require("./config/db"); // init DB

const expenseRoutes = require("./routes/expenses");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/expenses", expenseRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Expense Tracker API is running",
    endpoints: ["/expenses"],
  });
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
