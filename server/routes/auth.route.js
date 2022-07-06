const express = require("express");
const authController = require("../controllers/auth.controller");
const authValidator = require("../util/authValidator");
const router = express.Router();

router.post("/newUserAction", authValidator, authController.signUp);
router.post("/checkIdAction", authController.checkId);
router.post("/loginAction", authController.login);
router.post("/refresh", authController.refresh);

module.exports = router;