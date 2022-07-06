const { verify } = require('jsonwebtoken');
const { getById } = require('../services/accountBook.service');
const AccountBookService = require("../services/accountBook.service");

class AccountBookController {

  // 가계부 생성
  static createForm = async function (req, res) {
    res.render("create.ejs");
  }

  static createAccoutBook = async function (req, res) {
    await AccountBookService.getUserWithToken(req, res);

    const { type, amount, purpose, payment, memo } = req.body;
    try {
      // const [result] = await AccountBookService.create(member_id, type, amount, purpose, payment, memo);
      await AccountBookService.create(req.member_id, type, amount, purpose, payment, memo);

      res.status(201).json({ message: "가계부 작성 완료!" });
      // res.status(201).render("create.ejs", {
      //   message: "가계부 등록 성공!",
      //   create: result,
      // })
    } catch (err) {
      throw err;
    }
  }

  // 가계부 수정
  static updateAccoutBook = async function (req, res) {
    const id = req.query.id;
    const { type, amount, purpose, payment, memo} = req.body;
    const accountBook = await getById(id);

    await AccountBookService.getUserWithToken(req, res);

    // if (accountBook.member_id !== req.member_id) {
    //     return res.sendStatus(403);
    // }
    
    if (!accountBook) {
      return res.status(404).json({
        message: `accountBook not found: ${id}`
      });
    }

    try {
      // const [result] = await AccountBookService.modify(type, amount, purpose, payment, memo, id);
      await AccountBookService.modify(type, amount, purpose, payment, memo, id);

      res.status(200).json({ message: "가계부 수정 성공!" });
      // res.status(200).render("update.ejs", {
      //   message: "가계부 수정 성공!",
      //   update: result,
      // });
    } catch (err) {
      throw err;
    }
  }

  // 가계부 삭제
  static deleteAccoutBook = async function (req, res) {
    const id = req.query.id;
    const accountBook = await getById(id);

    await AccountBookService.getUserWithToken(req, res);

    // if (accountBook.member_id !== req.member_id) {
    //     return res.sendStatus(403);
    // }
    
    if (!accountBook) {
      return res.status(404).json({
        message: `accountBook not found: ${id}`
      });
    }

    try {
      await AccountBookService.remove(id);
      
      res.status(200).json({ message: "가계부 삭제 성공!" });
      // res.status(200).render("delete.ejs", {
      //   message: "가계부 삭제 성공!",
      //   delete: result,
      // });
    } catch (err) {
      throw err;
    }
  }

  // 가계부 목록 조회
  static getAccountBookList = async function (req, res) {
    const member_id = "qwer1234@naver.com";
    try {
      const [result] = await AccountBookService.accountBookList(member_id);
      const [result2] = await AccountBookService.getBalance(member_id);
      let balance = "";
      try {
        balance = result2[0].balance;
      } catch (err) {
        balance = "0";
      }
      res.render("list.ejs", {
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
    const member_id = "qwer1234@naver.com";
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
    try {
      const [result] = await AccountBookService.accountBookDetail(id);
      if (result[0].memo == null) {
        result[0].memo = "없음";
      }
      res.render("detail.ejs", {
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