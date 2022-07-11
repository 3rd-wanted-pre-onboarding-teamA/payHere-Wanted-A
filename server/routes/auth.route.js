const express = require("express");
const AuthController = require("../controllers/auth.controller");
const { authValidator, checkEmail } = require("../util/authValidator");
const authenticateAccessToken = require("../util/validateJwt");
const router = express.Router();

router.get("/join", AuthController.join);
router.post("/joinAction", authValidator, AuthController.joinAction);
router.post("/checkIdAction", checkEmail, AuthController.checkId);
router.get("/login", AuthController.login);
router.post("/loginAction", checkEmail, AuthController.loginAction);
router.get("/mypage", authenticateAccessToken, AuthController.mypage);
router.post("/refresh", AuthController.refresh);
router.get("/logout", authenticateAccessToken, AuthController.logout);

module.exports = router;