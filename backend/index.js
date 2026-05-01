const express = require("express");
const cors = require("cors");

require("./config/db"); // init DB

const expenseRoutes = require("./routes/expenses");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/expenses", expenseRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});