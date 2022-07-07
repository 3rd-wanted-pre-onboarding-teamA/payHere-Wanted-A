const express = require("express");
const router = express.Router();

const auth = require("./auth.route");
const accountBook = require("./accountBook.route");

router.use("/auth", auth);
router.use("/accountBook", accountBook);

module.exports = router;
