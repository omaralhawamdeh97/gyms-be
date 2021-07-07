const express = require("express");
const upload = require("../middlewares/multer");
const passport = require("passport");
const {
  createSession,
  getSessions,
} = require("../controllers/sessionsControllers");
const router = express.Router();

router.get("/", getSessions);
module.exports = router;
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createSession
);
