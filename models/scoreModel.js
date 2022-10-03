const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Score", scoreSchema);
