const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getAssignedModules,
  markModuleComplete,
} = require("../controllers/traineeController");

router.get("/modules", auth, getAssignedModules);
router.put("/complete/:id", auth, markModuleComplete);

module.exports = router;
