const express = require("express");
const router = express.Router();
const {
  register,
  login,
  updateUser,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.put("/update", updateUser);

module.exports = router;
