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

const create = async (type, amount, state, memo) => {
    return pool 
        .execute(`INSERT INTO account_book (type, amount, date, state, memo) VALUES(?,?,?,?,?)`, [type, amount, new Date(), state, memo])
        .then(result => getById(result[0].insertId));
}

router.post("/createAction", async (req, res) => {
    const { type, amount, date, state, memo } = req.body;

    
});

module.exports = router;