const AccountBookService = require("../services/accountBook.service");

class AccountBookController {
  // 가계부 등록 form
  static create = async function (req, res) {
    res.status(200).render("create.ejs");
  };

  // 가계부 생성 동작
  static createAccoutBook = async function (req, res) {
    const member_id = "sylee199877@gmail.com";
    const { type, amount, purpose, payment, memo } = req.body;
    try {
      await AccountBookService.create(member_id, type, amount, purpose, payment, memo);
      res.status(201).json({ message: "가계부가 등록됐습니다." });
    } catch (err) {
      throw err;
    }
  };

  // 가계부 수정 form
  static update = async function (req, res) {
    const id = req.query.id;
    try {
      const [result] = await AccountBookService.accountBookDetail(id);
      if (result[0].memo == null) {
        result[0].memo = "없음";
      }
      res.status(200).render("update.ejs", {
        message: "가계부가 수정되었습니다",
        detail: result[0],
      });
    } catch (err) {
      throw err;
    }
  };

  // 가계부 수정
  static updateAccountBook = async function (req, res) {
    const { account_book_id, type, amount, purpose, payment, memo } = req.body;
    try {
      await AccountBookService.modify(type, amount, purpose, payment, memo, account_book_id);
      res.status(200).json({ message: "가계부가 수정되었습니다." });
    } catch (err) {
      throw err;
    }
  };

  // 가계부 삭제
  static deleteAccoutBook = async function (req, res) {
    const id = req.query.id;

    try {
      await AccountBookService.remove(id);
      res.status(200).json({ message: "가계부 삭제 성공!" });
    } catch (err) {
      throw err;
    }
  };

  // 가계부 목록 조회
  static getAccountBookList = async function (req, res) {
    const member_id = "sylee199877@gmail.com";
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

  // 삭제된 가계부 목록 조회
  static getAccountBookDeletedList = async function (req, res) {
    const member_id = "sylee199877@gmail.com";
    try {
      const [result] = await AccountBookService.accountBookDeletedList(member_id);
      res.render("deletedList.ejs", {
        message: "삭제된 가계부 리스트가 조회되었습니다.",
        deletedList: result,
      });
    } catch (err) {
      throw err;
    }
  };

  // 상세보기 조회
  static getAccountBookDetail = async function (req, res) {
    const id = req.query.id;
    if (id == undefined) {
      return res.render("error.ejs", { status: 404, message: "잘못된 경로입니다." });
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

  // 복원하기 기능
  static putAccountBookRestore = async function (req, res) {
    const id = req.query.id;
    if (id == undefined) {
      return res.render("error.ejs", { status: 404, message: "잘못된 경로입니다." });
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