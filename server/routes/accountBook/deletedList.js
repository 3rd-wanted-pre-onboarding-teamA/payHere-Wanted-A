const express = require("express");
const router = express.Router();
const pool = require("../../../DB/config");

/**
 * @code writer 허정연
 * @description 삭제한 가계부 리스트 구현
 *
 * @GET ("/accountBook/deletedList")
 *
 * @returns json
 */

router.get("/", async (req, res) => {
  let sendData = {};
  const member_id = "qwer1234@naver.com";

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const sql = `select * from account_book where member_id = '${member_id}' and state = 1;`;
      const [rows] = await connection.query(sql);
      sendData.deletedList = rows;
      console.log(sendData);
    } catch (err) {
      console.log(err);
    } finally {
      connection.release();
      res.render("deletedList.ejs", sendData);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
