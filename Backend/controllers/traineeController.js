const ModuleAssignment = require("../models/ModuleAssignment");
const Module = require("../models/Module");

const getAssignedModules = async (req, res) => {
  try {
    const traineeId = req.user.id;

    const assignments = await ModuleAssignment.find({ traineeId })
      .populate("moduleId", "title") 
      .exec();

    res.json(assignments);
  } catch (err) {
    console.error("Error fetching assigned modules:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const markModuleComplete = async (req, res) => {
  try {
    const moduleAssignment = await ModuleAssignment.findByIdAndUpdate(
      req.params.id,
      { completed: true },
      { new: true }
    );

    if (!moduleAssignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json(moduleAssignment);
  } catch (err) {
    console.error("Error marking complete:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAssignedModules,
  markModuleComplete,
};
