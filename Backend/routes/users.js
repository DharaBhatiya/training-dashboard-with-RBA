const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { updateProfile } = require("../controllers/userController");

router.put("/update", auth, updateProfile);

module.exports = router;
