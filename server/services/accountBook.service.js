const pool = require("../../db/config");

class AccountBookService {

  static async accountBookList(member_id) {
    const sql = `select * from account_book where member_id = '${member_id}' and state = 0 order by reg_date desc;`;
    let connection = null;
    try {
      connection = await pool.getConnection(async (conn) => conn);
      return await connection.query(sql);
    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  }

  static async getBalance(member_id) {
    const sql = `select balance from have_money where member_id = '${member_id}';`;
    let connection = null;
    try {
      connection = await pool.getConnection(async (conn) => conn);
      return await connection.query(sql);
    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  }

  static async accountBookDeletedList(member_id) {
    const sql = `select * from account_book where member_id = '${member_id}' and state = 1 order by reg_date desc;`;
    let connection = null;
    try {
      connection = await pool.getConnection(async (conn) => conn);
      return await connection.query(sql);
    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  }

  static async accountBookDetail(id) {
    const sql = `select * from account_book where account_book_id = ${id};`;
    let connection = null;
    try {
      connection = await pool.getConnection(async (conn) => conn);
      return await connection.query(sql);
    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  }

  static async accountBookRestore(id) {
    const sql = `update account_book set state = 0 where account_book_id = ${id};`;
    let connection = null;
    try {
      connection = await pool.getConnection(async (conn) => conn);
      await connection.query(sql);
    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  }
}

module.exports = AccountBookService;