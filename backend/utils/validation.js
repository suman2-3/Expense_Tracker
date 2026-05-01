// validate expense input
const validateExpense = ({ amount, date }) => {
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    return "Amount must be greater than 0";
  }

  if (!date) {
    return "Date is required";
  }

  return null;
};

module.exports = { validateExpense };
