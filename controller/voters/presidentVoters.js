const userModel = require("../../model/userModel");
const { Request, Response } = require("express");
const mongoose = require("mongoose");
const { acceptance } = require("../../util/email");

const PresidentModel = require("../../model/secretaryModel");

const PresidentialVotesModel = require("../../model/positions/PresidentialVotesModel");
const votersModel = require("../../model/votersModel");

const candidateModel = require("../../model/candidateModel");
const presyModel = require("../../votes/president/presyModel");

const readPresidencyVote = async (req, res) => {
  try {
    const read = await presyModel.find();
    return res.json({ message: "Reading all Voters", data: read });
  } catch (error) {
    return res.json({ message: error });
  }
};

const readVote = async (req, res) => {
  try {
    const read = await votersModel.find();
    return res.json({ message: "Reading all Voters", data: read });
  } catch (error) {
    return res.json({ message: error });
  }
};

const readYourVoters = async (req, res) => {
  try {
    const read = await userModel.findById(req.params.id).populate({
      path: "voter",
      options: { sort: { createdAt: -1 } },
    });

    return res.json({
      message: `Reading ${read?.fullName} voters`,
      data: read,
    });
  } catch (error) {
    return res.json({ message: error });
  }
};

const createVote = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.voterID);
    const getUser = await userModel.findById(req.params.id);

    const getVote = await presyModel.findById(req.params.voterID);
    const getPresidentVote = await PresidentModel.findById(req.params.voterID);

    if (!getVote) {
      const vote = await votersModel.create({
        user,
        fullName: user?.fullName,
      });

      await presyModel.create({
        _id: user?._id,
        fullName: user?.fullName,
        user,
        voter: user,
      });

      await votersModel.create({
        _id: user?._id,
        fullName: user?.fullName,
        user,
        voter: user,
      });

      getUser.voter?.push(new mongoose.Types.ObjectId(vote._id));
      getUser.save();

      // getPresidentVote!.voter?.push(new mongoose.Types.ObjectId(user!._id));
      // getPresidentVote!.save();

      return res.status(201).json({ message: "vote added" });
    } else {
      return res.json({ message: `You've Already voted for President` });
    }
  } catch (err) {
    return res.json({ message: `error message: ${err}` });
  }
};

module.exports = {
  readVote,
  readYourVoters,
  createVote,
  readPresidencyVote,
};

// export const deleteVote = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const getUser = await userModel.findById(req.params.id);
//     const voter = await votersModel.findByIdAndRemove(req.params.votersID);

//     getUser?.voter?.pull!(new mongoose.Types.ObjectId(voter!._id));
//     getUser?.save();
//     console.log(getUser?.voter);
//     console.log(voter);

//     return res.status(201).json({ message: "voter deleted" });
//   } catch (err) {
//     return res.json({ message: `error message: ${err}` });
//   }
// };
