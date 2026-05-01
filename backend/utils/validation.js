// validate expense input
const validateExpense = ({ amount, date }) => {
  if (!amount || amount <= 0) {
    return "Amount must be greater than 0";
  }

  if (!date) {
    return "Date is required";
  }

  return null;
};

module.exports = { validateExpense };