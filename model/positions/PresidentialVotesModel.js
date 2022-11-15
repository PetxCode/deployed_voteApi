const mongoose = require("mongoose");

const presidentialVoteSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("presidentialVotes", presidentialVoteSchema);
