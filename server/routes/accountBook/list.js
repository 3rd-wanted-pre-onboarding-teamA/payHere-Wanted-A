const express = require("express");
const router = express.Router();
const pool = require("../../../DB/config");
// const connection = require("../../../DB/config");

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
  const member_id = "qwer1234@naver.com"; // req.session.member_id

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const sql1 = `select * from account_book where member_id = '${member_id}' and state = 0 order by reg_date desc;`;
      const [rows1] = await connection.query(sql1);
      const sql2 = `select balance from have_money where member_id = '${member_id}';`;
      const [rows2] = await connection.query(sql2);
      sendData.message = "가계부 리스트가 조회되었습니다."
      sendData.list = rows1
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