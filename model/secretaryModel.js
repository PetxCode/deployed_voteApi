const mongoose = require("mongoose");

const secretarySchema = new mongoose.Schema(
  {
    // _id: { type: String, unique: true },
    fullName: {
      type: String,
    },
    position: {
      type: String,
    },
    image: {
      type: String,
    },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],

    voter: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "voters",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("secretarys", secretarySchema);
