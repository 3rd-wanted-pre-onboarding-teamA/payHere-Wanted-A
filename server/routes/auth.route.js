const express = require("express");
const AuthController = require("../controllers/auth.controller");
const authValidator = require("../util/authValidator");
const router = express.Router();

router.get("/newUser", AuthController.signUp);
router.post("/newUserAction", authValidator, AuthController.signUpAction);
router.post("/checkIdAction", AuthController.checkId);
router.get("/login", AuthController.login);
router.post("/loginAction", AuthController.loginAction);
router.post("/refresh", AuthController.refresh);

module.exports = router;