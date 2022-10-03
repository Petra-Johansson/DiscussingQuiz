const mongoose = require("mongoose");

const forumSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      unique: true
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    text: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Food", "Music", "Animals", "Economy", "Other"],
      default: "Other",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Forumpost", forumSchema);
