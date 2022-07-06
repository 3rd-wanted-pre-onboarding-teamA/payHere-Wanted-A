const express = require("express");
const router = express.Router();

const accountBook = require("./accountBook.route");
router.use("/accountBook", accountBook);

module.exports = router;
