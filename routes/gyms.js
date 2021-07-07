const express = require("express");
const upload = require("../middlewares/multer");
const passport = require("passport");
const { getGyms, createGym } = require("../controllers/gymControllers");
const router = express.Router();

router.get("/", getGyms);
module.exports = router;
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createGym
);
