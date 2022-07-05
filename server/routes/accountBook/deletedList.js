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
      // 사용자가 작성한 가계부 목록 중 state가 삭제된 상태(1)인 데이터만 추출해 날짜로 내림차순 정렬
      const sql = `select * from account_book where member_id = '${member_id}' and state = 1 order by reg_date desc;`;
      const [rows] = await connection.query(sql);
      sendData.message = "삭제된 가계부 리스트가 조회되었습니다."
      sendData.deletedList = rows;
      console.log(sendData);
    } catch (err) {
      console.log(err);
      sendData.message = err
    } finally {
      connection.release();
      res.render("deletedList.ejs", sendData);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
