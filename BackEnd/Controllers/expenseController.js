const Expense=require("../models/Expense.js");

exports.addExpense = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { title, amount, category, notes } = req.body;

    if (!title || !amount) {
      return res
        .status(400)
        .json({ message: "Title and amount are required" });
    }

    const expense = await Expense.create({
      user: req.user,
      title,
      amount,
      category,
      notes,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get user expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user })
      .sort({ createdAt: -1 });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//update the expenses
exports.updateExpense=async (req,res)=>{
    try {
        const expense=await Expense.findById(req.params.id);

        if(!expense){
            return res.status(404).json({message:"Expense not found"});
        }

        if(expense.user.toString() !== req.user){
            return res.status(401).json({message:"Not authorized"})
        }

        const updated=await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//delete expense
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await expense.deleteOne();

    res.json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};