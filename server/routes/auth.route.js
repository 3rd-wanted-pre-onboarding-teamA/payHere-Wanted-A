const express = require("express");
const AuthController = require("../controllers/auth.controller");
const authValidator = require("../util/authValidator");
const router = express.Router();

router.post("/newUserAction", authValidator, AuthController.signUp);
router.post("/checkIdAction", AuthController.checkId);
router.post("/loginAction", AuthController.login);
router.post("/refresh", AuthController.refresh);

module.exports = router;