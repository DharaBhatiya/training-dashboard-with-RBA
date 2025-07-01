const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleCheck"); 
const {
  getTrainees,
  assignModule,
  getTraineeProgress,
  removeModule,
} = require("../controllers/instructorController");


router.get("/trainees", auth, getTrainees);
router.post("/assign-module", auth, assignModule);
router.get("/progress/:traineeId", auth, getTraineeProgress);
router.delete("/remove-module/:moduleId", auth, removeModule);

module.exports = router;
