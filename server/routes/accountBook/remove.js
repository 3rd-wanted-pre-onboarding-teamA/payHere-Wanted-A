const pool = require('../../../DB/config.js');
const express = require('express');
const { getById } = require('../../../data/accountBook.js');
const router = express.Router();

/**
 * @code writer 이승연
 * @description 가계부 삭제 구현 (state 컬럼 업데이트)
 *
 * @POST ("/delete?id=1")
 *
 * @returns json
 */

router.put("/", async (req, res) => {
    let sendData = {};
    const id = req.query.id;
    const member_id = "tester2@test.com";
    const accountBook = await getById(id);
    console.log(accountBook);

    // if (accountBook.member_id !== req.member_id) {
    //     return res.sendStatus(403);
    // }

    if (!accountBook) {
        return res.status(404).json({ message: `accountBook not found: ${id}` });
    }

    try {
        const connection = await pool.getConnection(async conn => conn);

        try {
            // ⭐️ Soft Delete 
            // 나중에 삭제한 가계부를 복구하는 로직이 있으므로
            // 데이터베이스에서 destroy하는 것이 아닌, 상태 컬럼을 변경시켜 삭제했음을 알림 (state=1)
            const sql = `UPDATE account_book SET state=1 WHERE account_book_id=?`;
            const [row] = await connection.query(sql, [id]);
            sendData.delete = row;
            console.log(sendData);
        } catch (err) {
            console.log(err);
        } finally {
            connection.release();
            res.status(200).json({ message: "가계부 삭제 성공!" });
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;