const express = require("express");
const router = express.Router();
const pool = require("../../../DB/config");

/**
 * @code writer 허정연
 * @description 가계부 상세보기 구현
 *
 * @GET ("/accountBook/detail?id=1")
 *
 * @returns json
 */

router.get("/", async (req, res) => {
  let sendData = {};
  const id = req.query.id;

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      // 상세 정보 조회
      const sql = `select * from account_book where account_book_id = ${id};`;
      const [rows] = await connection.query(sql);
      sendData.message = "가계부 상세 정보가 조회되었습니다.";
      // 저장된 memo가 값이 없으면 "없음"이라는 데이터 삽입 
      if (rows[0].memo == null) {
        rows[0].memo = "없음";
      }
      sendData.detail = rows[0];
      console.log(sendData);
    } catch (err) {
      console.log(err);
      sendData.message = err;
    } finally {
      connection.release();
      res.render("detail.ejs", sendData);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
