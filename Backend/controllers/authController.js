const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//signup :- POST http://localhost:5000/api/auth/register
const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role,
    });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({
      msg: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).send("Server error");
  }
};

//login :- POST http://localhost:5000/api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    res.json({ token, user });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Update profile :- PUT http://localhost:5000/api/users/update
const updateUser = async (req, res) => {
  const { name, password } = req.body;
  try {
    const updates = {};
    if (name) updates.name = name;
    if (password) updates.password = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select("-password");

    res.json(updatedUser);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  register,
  login,
  updateUser,
};
