const express = require("express");
const router = express.Router();
const pool = require("../../../DB/config");

/**
 * @code writer 허정연
 * @description 삭제한 가계부 복원
 *
 * @GET ("/accountBook/restore?id=1")
 *
 * @returns json
 */

router.get("/", async (req, res) => {
  let sendData = {};
  const id = req.query.id;

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const sql = `update account_book set state = 0 where account_book_id = ${id};`;
      const [rows] = await connection.query(sql);
      sendData.message = "삭제한 가계부가 다시 복원되었습니다.";
      console.log(sendData);
    } catch (err) {
      console.log(err);
    } finally {
      connection.release();
      res.json(sendData);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
