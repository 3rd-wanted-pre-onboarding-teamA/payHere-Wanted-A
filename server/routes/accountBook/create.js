const pool = require('../../../DB/config.js');
const express = require('express');
const router = express.Router();
const { getById } = require('../../../data/accountBook.js')

/**
 * @code writer 이승연
 * @description 가계부 등록 구현
 *
 * @POST ("/accountBook/createAction")
 *
 * @returns json
 */

router.post("/", async (req, res) => {
    let sendData = {};
    let member_id = 'tester2@test.com';
    const { type, amount, purpose, payment, memo} = req.body;

    try {
        const connection = await pool.getConnection(async conn => conn);

        try {
            const sql = `INSERT INTO account_book (member_id, type, amount, purpose, payment, memo) VALUES ?`;
            const values = [
                [member_id, type, amount, purpose, payment, memo]
            ];
            const [row] = await connection.query(sql, [values]);
            sendData.create = row;
            console.log(sendData);
        } catch (err) {
            console.log(err);
        } finally {
            connection.release();
            res.status(201).json({ message: "가계부 작성 완료!" })
            // return res.render("create.ejs", sendData);
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;