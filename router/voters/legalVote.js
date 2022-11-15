const express = require("express");
const {
  createVote,
  readVote,
  readYourVoters,
  readPresidencyVote,
} = require("../../controller/voters/legalVote");

const router = express.Router();

router.route("/:id/:voterID/create").post(createVote);
router.route("/legal/view").get(readPresidencyVote);
router.route("/view").get(readVote);

router.route("/:id/view").get(readYourVoters);
module.exports = router;
