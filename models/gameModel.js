const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Questions",
    },
  ],
  score: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Score",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mogoose.model("Game", gameSchema);
