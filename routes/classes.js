const express = require("express");
const upload = require("../middlewares/multer");
const passport = require("passport");
const {
  createClass,
  getClasses,
} = require("../controllers/classesControllers");
const router = express.Router();

router.get("/", getClasses);
module.exports = router;
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createClass
);
