const mongoose = require("mongoose");
const Module = require("../models/Module");

//GET http://localhost:5000/api/modules
const getModules = async (req, res) => {
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (err) {
    console.error("Error in getModules:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// PUT http://localhost:5000/api/modules/update
const updateProgress = async (req, res) => {
  const { moduleId, progress } = req.body;
  if (!moduleId || progress == null) {
    return res.status(400).json({ msg: "Module ID and progress are required" });
  }
  try {
    const module = await Module.findByIdAndUpdate(
      moduleId,
      { progress },
      { new: true }
    );
    if (!module) {
      return res.status(404).json({ msg: "Module not found" });
    }
    res.json(module);
  } catch (err) {
    console.error("Error in updateProgress:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

//PUT http://localhost:5000/api/modules/mark-complete
const markAsCompleted = async (req, res) => {
  const { moduleId } = req.body;
  if (!moduleId) {
    return res.status(400).json({ msg: "Module ID is required" });
  }
  try {
    const module = await Module.findByIdAndUpdate(
      moduleId,
      { completed: true, progress: 100 },
      { new: true }
    );
    if (!module) {
      return res.status(404).json({ msg: "Module not found" });
    }
    res.json(module);
  } catch (err) {
    console.error("Error in markAsCompleted:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// GET http://localhost:5000/api/modules/stats
const getModuleStats = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const total = await Module.countDocuments({ userId });
    const completed = await Module.countDocuments({ userId, completed: true });
    const pending = total - completed;

    res.json({ total, completed, pending });
  } catch (err) {
    console.error("Error in getModuleStats:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  getModules,
  updateProgress,
  markAsCompleted,
  getModuleStats,
};
