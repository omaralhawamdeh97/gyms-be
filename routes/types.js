const express = require("express");
const upload = require("../middlewares/multer");
const passport = require("passport");
const { getTypes, createType } = require("../controllers/typeControllers");
const router = express.Router();

router.get("/", getTypes);
router.post("/", createType);
module.exports = router;
