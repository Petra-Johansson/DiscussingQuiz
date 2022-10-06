const mongoose = require("mongoose");

const forumSchema = new mongoose.Schema(
  {
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
      enum: ["Food", "Music", "Animals", "Computers", "Other"],
      default: "Other",
    },
    user_id: {
      type:String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Forumpost", forumSchema);
