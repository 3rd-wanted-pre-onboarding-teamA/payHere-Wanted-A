const express = require("express");
const signUP = require("./auth/signUp");

const router = express.Router();

router.use("/auth", signUP);

module.exports = router;
