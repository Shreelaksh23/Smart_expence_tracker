const express = require("express");
const { setMonthlyBudget } = require("../Controllers/userController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.put("/budget", protect, setMonthlyBudget);

module.exports = router;
