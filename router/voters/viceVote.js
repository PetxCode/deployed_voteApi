const express = require("express");
const router = express.Router();
const {
  createVote,
  readVote,
  readYourVoters,
  readPresidencyVote,
  // deleteVote,
} = require("../../controller/voters/vicePresyVote");

router.route("/:id/:voterID/create").post(createVote);
router.route("/vicepresident/view").get(readPresidencyVote);
router.route("/view").get(readVote);

router.route("/:id/view").get(readYourVoters);

module.exports = router;
