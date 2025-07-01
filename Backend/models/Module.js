const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Module", moduleSchema);
