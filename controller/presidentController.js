const userModel = require("../model/userModel");
const mongoose = require("mongoose");
const { acceptance } = require("../util/email");
const PresidentModel = require("../model/PresidentModel");
const candidateModel = require("../model/candidateModel");

const testPro = async (req, res) => {
  try {
    const read = await candidateModel.create({
      fullName: "Starttt",
    });

    return res.json({ message: "Reading all President", data: read });
  } catch (error) {
    return res.json({ message: error });
  }
};

const readPresident = async (req, res) => {
  try {
    const read = await PresidentModel.find();
    console.log(read);
    return res.json({ message: "Reading all President", data: read });
  } catch (error) {
    return res.json({ message: error });
  }
};

const readPresidentFromUsers = async (req, res) => {
  try {
    const read = await userModel.findById(req.params.id).populate({
      path: "president",
      options: { sort: { createdAt: -1 } },
    });

    return res.json({
      message: "Reading all Organisation Users",
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

    if (!candidate) {
      if (user) {
        const getUser = await userModel.findById(user?._id);

        const positioned = await PresidentModel.create({
          _id: user._id,
          fullName: user?.fullName,
          image: user?.image,
          position: "President",
          user,
        });

        getUser?.president.push(new mongoose.Types.ObjectId(positioned._id));
        getUser?.save();

        await candidateModel.create({
          fullName: user?.fullName,
          position: positioned?.position,
          user,
        });

        await userModel.findByIdAndUpdate(
          req?.params.id,
          {
            position: "President",
          },
          { new: true }
        );

        acceptance(email, positioned).then((result) => {
          console.log("sent: ", result);
        });

        return res.json({
          message: `Position as ${positioned.position} has been created for ${user?.fullName}`,
        });
      } else {
        return res.json({
          message: `You can't register because ${fullName} doesn't exist`,
        });
      }
    } else {
      return res.json({
        message: `You can't register '${name}' because he/she has already been registered, for the position of ${candidate.position}.`,
      });
    }
  } catch (err) {
    return res.json({ message: `error message: ${err}` });
  }
};

const readCandidate = async (req, res) => {
  try {
    const read = await candidateModel.find();
    return res.json({ message: "Reading all candidate", data: read });
  } catch (error) {
    return res.json({ message: error });
  }
};

module.exports = {
  readPresident,
  readPresidentFromUsers,
  createPresident,
  readCandidate,
  testPro,
};
