const userModel = require("../model/userModel");
const { Request, Response } = require("express");
const mongoose = require("mongoose");
const { acceptance } = require("../util/email");

const PresidentModel = require("../model/socialSecretaryModel");

const candidateModel = require("../model/candidateModel");

const readPresident = async (req, res) => {
  try {
    const read = await PresidentModel.find();
    return res.json({ message: "Reading all Social-Secretary", data: read });
  } catch (error) {
    return res.json({ message: error });
  }
};

const readPresidentFromUsers = async (req, res) => {
  try {
    const read = await userModel.findById(req.params.id).populate({
      path: "socialSecretary",
      options: { sort: { createdAt: -1 } },
    });

    return res.json({
      message: "Reading all Social-Secretary Post",
      data: read,
    });
  } catch (error) {
    return res.json({ message: error });
  }
};

const createPresident = async (req, res) => {
  try {
    const { fullName } = req.body;

    const user = await userModel.findById(req?.params.id);
    let name = user?.fullName;
    let email = user?.email;
    let id = user?._id;

    const candidate = await candidateModel.findOne({ fullName: name });

    if (candidate !== null) {
      return res.json({
        message: `You can't register '${name}' because he/she has already been registered, for the position of ${candidate.position}.`,
      });
    }

    if (user) {
      const getUser = await userModel.findById(user?._id);

      const positioned = await PresidentModel.create({
        _id: user._id,
        fullName: user?.fullName,
        position: "Social-Secretary",
        user,
      });

      getUser?.socialSecretary.push(
        new mongoose.Types.ObjectId(positioned._id)
      );
      getUser?.save();

      await candidateModel.create({
        fullName: user?.fullName,
        position: positioned?.position,
        user,
      });

      await userModel.findByIdAndUpdate(
        req?.params.id,
        {
          position: "Social Secretary",
        },
        { new: true }
      );

      acceptance(email, user, fullName).then((result) => {
        console.log("sent: ", result);
      });
      // console.log("getting data: ", getUser);
      return res.json({
        message: `Position as ${positioned.position} has been created for ${user?.fullName}`,
      });
    } else {
      return res.json({
        message: `You can't register because ${fullName} doesn't exist`,
      });
    }

    // return res.end();
  } catch (err) {
    return res.json({ message: `error message: ${err}` });
  }
};

module.exports = {
  readPresident,
  readPresidentFromUsers,
  createPresident,
};
