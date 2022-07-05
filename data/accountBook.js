const pool = require('../DB/config.js');

/**
 * @code writer 이승연
 * @description 가계부 CRRUD 관련 공통 메서드 생성
 *
 * @POST ("/accountBook/updateAction?id=1")
 *
 * @returns json
 */

const SELECT_JOIN = 
    'SELECT ac.account_book_id, ac.member_id, ac.type, ac.amount, ac.state, ac.memo, m.member_name FROM account_book as ac JOIN member as m ON ac.member_id=m.member_id';
// 내림차순 조회하기 위함
const ORDER_DESC = 'ORDER BY ac.date DESC';

const getById = async id => {
    return pool
        .execute(`${SELECT_JOIN} WHERE ac.account_book_id=?`, [id])
        .then(result => result[0][0]);
}

module.exports = {
    getById
}
