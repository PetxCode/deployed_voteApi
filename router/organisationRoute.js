const express = require("express");
const {
  createOrganisation,
  getCandidates,
  getOrganisation,
  getOrganisationMembers,
} = require("../controller/organisationController");

const router = express.Router();

router.route("/create").post(createOrganisation);

router.route("/").get(getOrganisation);
router.route("/candidates").get(getCandidates);
router.route("/:id/view").get(getOrganisationMembers);

module.exports = router;
