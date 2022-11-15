const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    orgName: {
      type: String,
    },
    position: {
      type: String,
    },
    orgEmail: {
      type: String,
    },
    voteCode: {
      type: String,
    },
    organisationName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organisations",
    },

    president: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "presidents",
      },
    ],

    vicePresident: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vicePresidents",
      },
    ],

    secretary: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "secretarys",
      },
    ],

    socialSecretary: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "socialSecretarys",
      },
    ],

    pro: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pros",
      },
    ],

    legal: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "legals",
      },
    ],

    voter: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "voters",
      },
    ],

    verified: {
      type: Boolean,
    },
    superAdmin: {
      type: Boolean,
    },
    token: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
