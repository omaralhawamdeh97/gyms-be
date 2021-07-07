const express = require("express");
const passport = require("passport");

const { signup, signin, getUsers } = require("../controllers/userControllers");

const router = express.Router();

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.post("/signup", signup);
router.get("/users", getUsers);
module.exports = router;
