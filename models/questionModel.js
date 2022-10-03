const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
    },
    type: {
      type: String,
    },
    difficulty: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    incorrectAnswer: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
