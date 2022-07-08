const express = require("express");
const router = express.Router();
const AccountBookController = require("../controllers/accountBook.controller")

router.get("/create", AccountBookController.create);
router.post("/createAction", AccountBookController.createAccoutBook);
router.get("/update", AccountBookController.update)
router.get("/updateAction", AccountBookController.updateAccoutBook);
router.put("/delete", AccountBookController.deleteAccoutBook);
router.get("/list", AccountBookController.getAccountBookList);
router.get("/deletedList", AccountBookController.getAccountBookDeletedList);
router.get("/detail", AccountBookController.getAccountBookDetail);
router.get("/restore", AccountBookController.putAccountBookRestore);

module.exports = router;