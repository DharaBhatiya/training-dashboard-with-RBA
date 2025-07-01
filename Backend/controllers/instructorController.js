const User = require("../models/User");
const Module = require("../models/Module");
const mongoose = require("mongoose");
const ModuleAssignment = require("../models/ModuleAssignment");

//GET http://localhost:5000/api/instructor/trainees
const getTrainees = async (req, res) => {
  try {
    const trainees = await User.find({ role: "trainee" }).select("-password");
    const traineesWithProgress = await Promise.all(
      trainees.map(async (trainee) => {
        const assignments = await ModuleAssignment.find({
          traineeId: trainee._id,
        });
        const total = assignments.length;
        const completed = assignments.filter((a) => a.completed).length;
        const progress =
          total === 0 ? 0 : Math.round((completed / total) * 100);

        return {
          _id: trainee._id,
          name: trainee.name,
          progress: `${progress}%`,
        };
      })
    );

    res.json(traineesWithProgress);
  } catch (error) {
    console.error("Error fetching trainees with progress:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//POST http://localhost:5000/api/instructor/assign-module
const assignModule = async (req, res) => {
  try {
    const { traineeId, moduleId } = req.body;

    if (!traineeId || !moduleId) {
      return res
        .status(400)
        .json({ message: "Trainee ID and Module ID are required" });
    }

    const newAssignment = new ModuleAssignment({
      traineeId,
      moduleId,
      completed: false,
    });

    await newAssignment.save();

    res.status(201).json({ message: "Module assigned successfully" });
  } catch (err) {
    console.error("Assignment Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET http://localhost:5000/api/instructor/progress/<trsineeId>
const getTraineeProgress = async (req, res) => {
  const { traineeId } = req.params;
  try {
    const modules = await Module.find({ userId: traineeId });
    res.json(modules);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

//DELETE /api/instructor/remove-module/<moduleId>
const removeModule = async (req, res) => {
  const { moduleId } = req.params;
  try {
    await Module.findByIdAndDelete(moduleId);
    res.json({ msg: "Module deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  getTrainees,
  assignModule,
  getTraineeProgress,
  removeModule,
};
