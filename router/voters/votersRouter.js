const express = require("express");
const router = express.Router();
const {
  createVote,
  readVote,
  readYourVoters,
  readPresidencyVote,
} = require("../../controller/voters/presidentVoters");

router.route("/:id/:voterID/create").post(createVote);
router.route("/view").get(readVote);
router.route("/president/view").get(readPresidencyVote);

router.route("/:id/view").get(readYourVoters);

module.exports = router;
