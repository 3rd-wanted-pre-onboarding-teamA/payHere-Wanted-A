const express = require("express");
const signUP = require("./auth/signUp");
const login = require("./auth/login");
const token = require("./auth/token");

const router = express.Router();
const list = require("./accountBook/list");
const deletedList = require("./accountBook/deletedList");
const restore = require("./accountBook/restore");
const detail = require("./accountBook/detail");

router.use("/accountBook/list", list);
router.use("/accountBook/deletedList", deletedList);
router.use("/accountBook/restore", restore);
router.use("/accountBook/detail", detail);

router.use("/auth", signUP);
router.use("/auth", login);
router.use("/auth", token);

module.exports = router;
