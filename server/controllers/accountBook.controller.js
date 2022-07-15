const AccountBookService = require("../services/accountBook.service");
const error = require("../db/error");

class AccountBookController {
  static create = async function (req, res) {
    /** 
     * 기능: 가계부 등록 form
     * 작성자: 이승연
     */
    res.status(200).render("create.ejs");
  };

  static createAccoutBook = async function (req, res) {
    /** 
     * 기능: 가계부 생성 동작
     * 작성자: 이승연
     */
    const member_id = req.user.id;
    const { type, amount, purpose, payment, memo } = req.body;
    try {
      await AccountBookService.create(member_id, type, amount, purpose, payment, memo);
      res.status(201).json({ message: "가계부가 등록되었습니다." });
    } catch (err) {
      throw err;
    }
  };

  static update = async function (req, res) {
    /** 
     * 기능: 가계부 수정 form
     * 작성자: 이승연
     */
    const id = req.query.id;
    if (id == undefined) {
      return res.status(404).render("error.ejs", error.NOT_FOUND);
    }
    try {
      const [result] = await AccountBookService.accountBookDetail(id);
      res.status(200).render("update.ejs", {
        message: "가계부가 수정되었습니다",
        accountBook: result[0],
      });
    } catch (err) {
      throw err;
    }
  };

  static updateAccountBook = async function (req, res) {
    /** 
     * 기능: 가계부 수정
     * 작성자: 이승연
     */
    const { account_book_id, type, amount, purpose, payment, memo } = req.body;
    try {
      await AccountBookService.modify(type, amount, purpose, payment, memo, account_book_id);
      res.status(200).json({ message: "가계부가 수정되었습니다." });
    } catch (err) {
      throw err;
    }
  };

  static deleteAccoutBook = async function (req, res) {
    /** 
     * 기능: 가계부 삭제
     * 작성자: 이승연
     */
    const id = req.query.id;
    if (id == undefined) {
      return res.status(404).render("error.ejs", error.NOT_FOUND);
    }
    try {
      await AccountBookService.remove(id);
      res.status(200).json({ message: "삭제되었습니다." });
    } catch (err) {
      throw err;
    }
  };

  static getAccountBookList = async function (req, res) {
    /** 
     * 기능: 가계부 목록 조회
     * 작성자: 허정연
     */
    const member_id = req.user.id;
    try {
      const [result] = await AccountBookService.accountBookList(member_id);
      const [result2] = await AccountBookService.getBalance(member_id);
      let balance = "";
      try {
        balance = result2[0].balance;
      } catch (err) {
        balance = "0";
      }
      res.status(200).render("list.ejs", {
        message: "가계부 리스트가 조회되었습니다.",
        list: result,
        balance: balance,
      });
    } catch (err) {
      throw err;
    }
  };

  static getAccountBookDeletedList = async function (req, res) {
    /** 
     * 기능: 삭제된 가계부 목록 조회
     * 작성자: 허정연
     */
    const member_id = req.user.id;
    try {
      const [result] = await AccountBookService.accountBookDeletedList(member_id);
      res.status(200).render("deletedList.ejs", {
        message: "삭제된 가계부 리스트가 조회되었습니다.",
        deletedList: result,
      });
    } catch (err) {
      return res.status(500).render("error.ejs", error.INTERNAL_SERVER_ERROR);
    }
  };

  static getAccountBookDetail = async function (req, res) {
    /** 
     * 기능: 상세보기 조회
     * 작성자: 허정연
     */
    const id = req.query.id;
    if (id == undefined) {
      return res.status(404).render("error.ejs", error.NOT_FOUND);
    }
    try {
      const [result] = await AccountBookService.accountBookDetail(id);
      if (result[0].memo == null) {
        result[0].memo = "없음";
      }
      res.status(200).render("detail.ejs", {
        message: "상세정보가 조회되었습니다.",
        detail: result[0],
      });
    } catch (err) {
      throw err;
    }
  };

  static putAccountBookRestore = async function (req, res) {
    /** 
     * 기능: 복원하기
     * 작성자: 허정연
     */
    const id = req.query.id;
    if (id == undefined) {
      return res.status(404).render("error.ejs", error.NOT_FOUND);
    }
    try {
      await AccountBookService.accountBookRestore(id);
      res.json({
        message: "삭제한 가계부가 다시 복원되었습니다.",
      });
    } catch (err) {
      throw err;
    }
  };
}

module.exports = AccountBookController;