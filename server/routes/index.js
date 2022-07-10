const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");

const auth = require("./auth.route");
const accountBook = require("./accountBook.route");

router.use("/auth", auth);
router.use("/accountBook", accountBook);
router.get("/", AuthController.login);

module.exports = router;