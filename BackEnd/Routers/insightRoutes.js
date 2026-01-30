const express = require("express");
const { getMonthlyInsights } = require("../Controllers/insightsController.js");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/monthly", protect, getMonthlyInsights);

module.exports = router;
