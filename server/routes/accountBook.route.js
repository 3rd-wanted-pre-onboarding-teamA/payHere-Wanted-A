const express = require("express");
const router = express.Router();
const AccountBookController = require("../controllers/accountBook.controller")

router.get("/list", AccountBookController.getAccountBookList);
router.get("/deletedList", AccountBookController.getAccountBookDeletedList);
router.get("/detail", AccountBookController.getAccountBookDetail);
router.get("/restore", AccountBookController.putAccountBookRestore);

module.exports = router;