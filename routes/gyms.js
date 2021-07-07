const express = require("express");
const upload = require("../middlewares/multer");
const passport = require("passport");
const { getGyms } = require("../controllers/gymControllers");
const router = express.Router();

router.get("/", getGyms);
module.exports = router;
