const mongoose = require("mongoose");

const secretaryVoteSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("secretaryVotes", secretaryVoteSchema);
