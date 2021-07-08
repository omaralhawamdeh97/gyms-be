const express = require("express");
const passport = require("passport");
const upload = require("../middlewares/multer");

const {
  signup,
  signin,
  getUsers,
  fetchUser,
  updateUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.post("/signup", signup);
router.get("/users", getUsers);
router.put(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  updateUser
);
module.exports = router;
