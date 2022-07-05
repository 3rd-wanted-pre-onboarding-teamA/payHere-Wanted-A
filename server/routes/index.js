const express = require("express");
const signUP = require("./auth/signUp");
const login = require("./auth/login");
const token = require("./auth/token");

const router = express.Router();

router.use("/auth", signUP);
router.use("/auth", login);
router.use("/auth", token);

module.exports = router;
