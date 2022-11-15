const express = require("express");
const {
  createPresident,
  readPresident,
  readPresidentFromUsers,
} = require("../controller/secretaryController");

const router = express.Router();

router.route("/:id/create").post(createPresident);
router.route("/view").get(readPresident);
router.route("/:id/view").get(readPresidentFromUsers);

module.exports = router;
