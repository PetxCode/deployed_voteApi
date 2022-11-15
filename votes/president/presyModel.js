const mongoose = require("mongoose");

const presySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    voter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "voters",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("presys", presySchema);
