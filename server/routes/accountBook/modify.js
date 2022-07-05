const pool = require('../../../DB/config.js');
const express = require('express');
const router = express.Router();

const { getById } = require('../../../data/accountBook.js');

/**
 * @code writer 이승연
 * @description 가계부 등록 구현
 *
 * @POST ("/accountBook/updateAction?id=1")
 *
 * @returns json
 */

router.put("/", async (req, res) => {
    let sendData = {};
    const id = req.query.id;
    const member_id = "tester2@test.com";
    const { type, amount, purpose, payment, memo} = req.body;
    const accountBook = await getById(id);
    // console.log(accountBook);

    // if (accountBook.member_id !== req.member_id) {
    //     return res.sendStatus(403);
    // }

    if (!accountBook) {
        return res.status(404).json({ message: `accountBook not found: ${id}` })
    }

    try {
        const connection = await pool.getConnection(async conn => conn);

        try {
            const sql = `UPDATE account_book SET type=?, amount=?, purpose=?, payment=?, memo=? WHERE account_book_id=?`;
            const [row] = await connection.query(sql, [type, amount, purpose, payment, memo, id]);
            sendData.modify = row;
            console.log(sendData);
        } catch (err) {
            console.log(err);
        } finally {
            connection.release();
            res.status(200).json({ message: "가계부 수정 성공!" });
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;