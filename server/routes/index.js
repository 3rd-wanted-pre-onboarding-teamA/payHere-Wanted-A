const express = require("express");
const router = express.Router();
const list = require("./accountBook/list");
const deletedList = require("./accountBook/deletedList");

router.use("/accountBook/list", list);
router.use("/accountBook/deletedList", deletedList);

module.exports = router;
