const express = require("express");
const router = express.Router();
const AccountBookController = require("../controllers/accountBook.controller")
const authenticateAccessToken = require("../util/validateJwt");

router.get("/create", authenticateAccessToken, AccountBookController.create);
router.post("/createAction", authenticateAccessToken, AccountBookController.createAccoutBook);
router.get("/update", authenticateAccessToken, AccountBookController.update);
router.put("/updateAction", authenticateAccessToken, AccountBookController.updateAccountBook);
router.get("/delete", authenticateAccessToken, AccountBookController.deleteAccoutBook);
router.get("/list", authenticateAccessToken, AccountBookController.getAccountBookList);
router.get("/deletedList", authenticateAccessToken, AccountBookController.getAccountBookDeletedList);
router.get("/detail", authenticateAccessToken, AccountBookController.getAccountBookDetail);
router.get("/restore", authenticateAccessToken, AccountBookController.putAccountBookRestore);

module.exports = router;