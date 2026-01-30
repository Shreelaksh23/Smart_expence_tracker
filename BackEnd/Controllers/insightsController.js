const Expense = require("../models/Expense");
const User = require("../models/User");

exports.getMonthlyInsights = async (req, res) => {
  try {
    const userId = req.user;

    const now = new Date();
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    // 1️⃣ Get all expenses for current month
    const expenses = await Expense.find({
      user: userId,
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });

    // 2️⃣ Total spent
    const totalSpent = expenses.reduce(
      (sum, exp) => sum + exp.amount,
      0
    );

    // 3️⃣ Category-wise summary
    const categorySummary = {};
    expenses.forEach((exp) => {
      categorySummary[exp.category] =
        (categorySummary[exp.category] || 0) + exp.amount;
    });

    // 4️⃣ DAILY TOTALS (🔥 NEW PART)
    const dailyMap = {};

    expenses.forEach((exp) => {
      const day = new Date(exp.date).getDate(); // 1–31
      dailyMap[day] = (dailyMap[day] || 0) + exp.amount;
    });

    const dailyTotals = Object.keys(dailyMap)
      .sort((a, b) => a - b)
      .map((day) => ({
        date: day.toString().padStart(2, "0"),
        amount: dailyMap[day],
      }));

    // 5️⃣ Budget logic
    const user = await User.findById(userId);
    const budget = user.monthlyBudget || 0;

    let budgetUsedPercent = 0;
    let warning = null;

    if (budget > 0) {
      budgetUsedPercent = Math.round(
        (totalSpent / budget) * 100
      );

      if (budgetUsedPercent >= 80) {
        warning = "You have used more than 80% of your budget";
      }
    }

    // 6️⃣ Final response
    res.json({
      totalSpent,
      categorySummary,
      dailyTotals, // 🔥 USED BY CHARTS
      budget,
      budgetUsedPercent,
      warning,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
