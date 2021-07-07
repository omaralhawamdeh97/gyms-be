const express = require("express");
const passport = require("passport");
const upload = require("../middlewares/multer");
const { createGym } = require("../controllers/gymControllers");

const { signup, signin, getUsers } = require("../controllers/userControllers");

const router = express.Router();

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.post("/signup", signup);
router.get("/users", getUsers);
router.post(
  "/:userId/gyms",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createGym
);
module.exports = router;
