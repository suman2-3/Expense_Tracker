import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_API_URL || "https://expense-tracker-znsb.onrender.com";

// Create expense (POST)
export const createExpense = async (expense) => {
  try {
    const res = await axios.post(`${BASE_URL}/expenses`, expense);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: "Network error" };
  }
};

// Get expenses (GET with filters)
export const getExpenses = async ({ category, sort }) => {
  try {
    const res = await axios.get(`${BASE_URL}/expenses`, {
      params: {
        category: category || undefined,
        sort: sort || undefined,
      },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: "Fetch failed" };
  }
};
