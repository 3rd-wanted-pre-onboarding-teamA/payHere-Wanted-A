const express = require("express");
const router = express.Router();
const create = require('./accountBook/create.js');

module.exports = router;

// 가계부 생성
router.use("/accoutBook", create);