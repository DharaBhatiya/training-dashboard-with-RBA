const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getModules,
  updateProgress,
  markAsCompleted,
  getModuleStats,
} = require("../controllers/moduleController");

router.get("/", auth, getModules);
router.put("/update", auth, updateProgress);
router.put("/mark-complete", auth, markAsCompleted);
router.get("/stats", auth, getModuleStats);

module.exports = router;
