const mongoose = require("mongoose");

const moduleAssignmentSchema = new mongoose.Schema({
  traineeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("ModuleAssignment", moduleAssignmentSchema);
