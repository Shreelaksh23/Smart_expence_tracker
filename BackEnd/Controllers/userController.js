const User = require("../models/User");

exports.setMonthlyBudget = async (req, res) => {
  try {
    const { budget } = req.body;

    if (!budget || budget <= 0) {
      return res.status(400).json({
        message: "Please provide a valid budget amount",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user,
      { monthlyBudget: budget },
      { new: true }
    );

    res.json({
      message: "Monthly budget updated",
      monthlyBudget: user.monthlyBudget,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
