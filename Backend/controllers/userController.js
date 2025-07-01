const User = require("../models/User");

const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send("Server error");
  }
};
module.exports = {
  updateProfile,
};
