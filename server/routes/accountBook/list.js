const express = require("express");
const router = express.Router();
const pool = require("../../../DB/config");

/**
 * @code writer 허정연
 * @description 가계부 리스트 구현
 *
 * @GET ("/accountBook/list")
 *
 * @returns json
 */

router.get("/", async (req, res) => {
  let sendData = {};
  const member_id = "qwer1234@naver.com";

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      // 사용자가 작성한 가계부 목록 중 삭제되지 않은 상태인 내용만 추출해 날짜로 내림차순 정렬
      const sql1 = `select * from account_book where member_id = '${member_id}' and state = 0 order by reg_date desc;`;
      const [rows1] = await connection.query(sql1);
      // 사용자 잔액 조회
      const sql2 = `select balance from have_money where member_id = '${member_id}';`;
      const [rows2] = await connection.query(sql2);
      sendData.message = "가계부 리스트가 조회되었습니다."
      sendData.list = rows1
      // 데이터가 없을 때의 예외처리
      try {
        sendData.balance = rows2[0].balance
      } catch (err) {
        sendData.balance = "0"
      }
      console.log(sendData);
    } catch (err) {
      console.log(err);
      sendData.message = err
    } finally {
      connection.release();
      res.render("list.ejs", sendData);
    }
  } catch (err) {
    console.log(err)
  }
});

module.exports = router;