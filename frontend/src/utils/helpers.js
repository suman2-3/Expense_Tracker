// Calculate total amount
export const calculateTotal = (expenses) => {
  return expenses.reduce((sum, exp) => sum + exp.amount, 0);
};

// Bonus: category-wise total
export const calculateCategoryTotals = (expenses) => {
  const result = {};

  expenses.forEach((exp) => {
    if (!result[exp.category]) {
      result[exp.category] = 0;
    }
    result[exp.category] += exp.amount;
  });

  return result;
};