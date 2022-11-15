const mongoose = require("mongoose");

const vicePresySchema = new mongoose.Schema(
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

module.exports = mongoose.model("vicePresys", vicePresySchema);
