const mongoose = require("mongoose");

const organisationSchema = new mongoose.Schema(
  {
    organisationName: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },

    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("organisations", organisationSchema);
