const pool = require('../../../DB/config.js');
const express = require('express');
const router = express.Router();

// 사용자 아이디(이메일)에 따른 가계부 게시물 1개 조회하기 (join 사용)
const SELECT_JOIN = 
    'SELECT ac.account_book_id, ac.member_id, ac.type, ac.amount, ac.state, ac.memo, m.name FROM account_book as ac JOIN member as m ON ac.member_id=m.member_id';
// 내림차순 조회하기 위함
const ORDER_DESC = 'ORDER BY ac.date DESC';

const getById = async id => {
    return pool
        .execute(`${SELECT_JOIN} WHERE ac.account_book_id=?`, [id])
        .then(result => result[0][0]);
}

router.post("/", async (req, res) => {
    let sendData = {};
    let member_id = 'tester2@test.com';
    const { type, amount, purpose, payment, memo, state} = req.body;

    try {
        const connection = await pool.getConnection(async conn => conn);

        try {
            const sql = `INSERT INTO account_book (member_id, type, amount, purpose, payment, memo, state) VALUES ?`;
            const contents = req.body;
            console.log(contents);
            const values = [
                [member_id, type, amount, purpose, payment, memo,
                state]
            ];
            const [row] = await connection.query(sql, [values]);
            sendData.create = row;
            console.log(sendData);
        } catch (err) {
            console.log(err);
        } finally {
            connection.release();
            res.status(201).json({ message: "가계부 작성 완료!" })
            res.render("create.ejs", sendData);
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;