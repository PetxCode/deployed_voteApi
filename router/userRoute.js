const express = require("express");
const {
  createUser,
  readUsers,
  readOrgUsers,
  VerifiedUser,
  VerifiedUserFinally,
  signinUser,
  resetPassword,
  changePassword,
  readUser,
  searchUser,
  searchForUser,
  workOut,
} = require("../controller/userController");

const upload = require("../util/multer");

const router = express.Router();

router.route("/create").post(upload, createUser);
router.route("/signin").post(signinUser);

router.route("/").get(readUsers);
router.route("/:id").get(readUser);

router.route("/organisation/:id").get(readOrgUsers);

router.route("/:id/token").post(VerifiedUser);

// goto view!
// router.route("/:id/view").post(VerifiedUserFinally);

router.route("/:id/verify").post(VerifiedUserFinally);

router.route("/:id/:token/changePassword").post(changePassword);

router.route("/resetPassword").post(resetPassword);
router.route("/search").get(searchUser);
router.route("/searchUser").get(searchForUser);
router.route("/word/start").get(workOut);

module.exports = router;
