const organisationModel = require("../model/organisationModel");
const candidateModel = require("../model/candidateModel");

const createOrganisation = async (req, res) => {
  try {
    const { organisationName, email } = req.body;

    const organisation = await organisationModel.create({
      organisationName,
      email,
    });

    return res.json({
      message: "Organisation created",
      data: organisation,
    });
  } catch (err) {
    return res.json({ message: err });
  }
};

const getOrganisation = async (req, res) => {
  try {
    const organisation = await organisationModel.find();

    return res.json({
      message: "Organisation found",
      data: organisation,
    });
  } catch (err) {
    return res.json({ message: err });
  }
};
const getCandidates = async (req, res) => {
  try {
    const organisation = await candidateModel.find();

    return res.json({
      message: "Organisation found",
      data: organisation,
    });
  } catch (err) {
    return res.json({ message: err });
  }
};

const getOrganisationMembers = async (req, res) => {
  try {
    const organisation = await organisationModel
      .findById(req.params.id)
      .populate({ path: "user", options: { sort: { createdAt: -1 } } });

    return res.status(200).json({
      message: "Organisation Members found",
      data: organisation,
    });
  } catch (err) {
    return res.status(404).json({ message: `Error: ${err}` });
  }
};

module.exports = {
  createOrganisation,
  getOrganisation,
  getCandidates,
  getOrganisationMembers,
};
