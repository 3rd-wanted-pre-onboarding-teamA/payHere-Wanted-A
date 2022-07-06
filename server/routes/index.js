const express = require("express");
const router = express.Router();
const create = require('./accountBook/create.js');
const modify = require('./accountBook/modify.js');
const remove = require('./accountBook/remove.js');

// 가계부 생성
router.use("/accountBook/createAction", create);

// 가계부 수정
router.use("/accountBook/updateAction", modify);

// 가계부 삭제 (to 삭제 리스트)
router.use("/accountBook/delete", remove);

module.exports = router;