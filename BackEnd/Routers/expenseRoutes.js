const express=require("express");
const{addExpense,getExpenses,updateExpense,deleteExpense}=require("../Controllers/expenseController.js");
const protect = require("../middleware/authMiddleware");

const router = express.Router();
router.use(protect); 

router.post("/",addExpense);
router.get("/",getExpenses);
router.put("/:id",updateExpense);
router.delete("/:id",deleteExpense);

module.exports=router;