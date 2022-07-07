const express = require("express");
const AuthController = require("../controllers/auth.controller");
const { authValidator, checkEmail } = require("../util/authValidator");
const authenticateAccessToken = require("../util/validateJwt");
const router = express.Router();

router.get("/newUser", AuthController.signUp);
router.post("/newUserAction", authValidator, AuthController.signUpAction);
router.post("/checkIdAction", checkEmail, AuthController.checkId);
router.get("/login", AuthController.login);
router.post("/loginAction", checkEmail, AuthController.loginAction);
router.get("/mypage", authenticateAccessToken, AuthController.mypage);
router.post("/refresh", AuthController.refresh);

module.exports = router;