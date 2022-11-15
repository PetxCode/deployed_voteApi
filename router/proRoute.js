const express = require("express");
const router = express.Router();
const {
  createPresident,
  readPresident,
  readPresidentFromUsers,
} = require("../controller/proController");

router.route("/:id/create").post(createPresident);
router.route("/view").get(readPresident);
router.route("/:id/view").get(readPresidentFromUsers);

module.exports = router;
