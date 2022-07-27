const pool = require("../db/config");

class AuthService {
  static async join(member_id, member_pw, member_name, phone_number) {
    /** 
     * 기능: 회원가입 메소드
     * 작성자: 장덕수
     */
    const sql = `INSERT INTO member (member_id, member_pw, member_name, phone_number) VALUES ('${member_id}', '${member_pw}', '${member_name}', '${phone_number}');`;
    let connection = null;
    try {
      connection = await pool.getConnection(async (conn) => conn);
      const [result] = await connection.query(sql);
      return result;
    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  }

  static async checkId(member_id) {
    /** 
     * 기능: 아이디 중복 확인 메소드
     * 작성자: 장덕수
     */
    const sql = `SELECT member_id FROM member WHERE member_id = '${member_id}'`;
    let connection = null;
    try {
      connection = await pool.getConnection(async (conn) => conn);
      const [result] = await connection.query(sql);
      return result;
    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  }

  static async insertBalance(member_id, balance) {
    /** 
     * 기능: 회원가입 시 잔액 입력
     * 작성자: 장덕수
     */
    const sql = `INSERT INTO have_money (member_id, balance) VALUES ('${member_id}', '${balance}');`;
    let connection = null;
    try {
      connection = await pool.getConnection(async (conn) => conn);
      const [result] = await connection.query(sql);
      return result;
    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  }

  static async checkUser(member_id) {
    /** 
     * 기능: 로그인 시 유저 정보 조회 메소드
     * 작성자: 장덕수
     */
    const sql = `SELECT member_id, member_pw FROM member WHERE member_id = '${member_id}'`;
    let connection = null;
    try {
      connection = await pool.getConnection(async (conn) => conn);
      const [result] = await connection.query(sql);
      return result;
    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  }

  static async searchRefreshToken(member_id) {
    /** 
     * 기능: resfresh토큰 조회
     * 작성자: 장덕수
     */
    const sql = `SELECT refresh_token FROM refresh_token WHERE member_id = '${member_id}'`;
    let connection = null;
    try {
      connection = await pool.getConnection(async (conn) => conn);
      const [result] = await connection.query(sql);
      return result;
    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  }

  static async saveRefreshToken(member_id, token) {
    /** 
     * 기능: 로그인 시 refresh토큰 DB 저장
     * 작성자: 장덕수
     */
    const sql = `INSERT INTO refresh_token (member_id, refresh_token) VALUES ('${member_id}', '${token}');`;
    let connection = null;
    try {
      connection = await pool.getConnection(async (conn) => conn);
      const [result] = await connection.query(sql);
      return result;
    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  }

  static async mypage(member_id) {
    /** 
     * 기능: mypage 정보 조회 메소드
     * 작성자: 장덕수
     */
    const sql = `
      SELECT member.member_id, member.member_name, member.phone_number, have_money.balance 
      FROM member 
      JOIN have_money ON member.member_id = have_money.member_id
      WHERE member.member_id = '${member_id}';
    `;
    let connection = null;
    try {
      connection = await pool.getConnection(async (conn) => conn);
      const [result] = await connection.query(sql);
      return result;
    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  }

  static async logout(member_id) {
    /** 
     * 기능: 로그아웃 시 리프레시 토큰 데이터 삭제
     * 작성자: 장덕수
     */
    const sql = `DELETE FROM refresh_token WHERE member_id = '${member_id}';`;
    let connection = null;
    try {
      connection = await pool.getConnection(async (conn) => conn);
      const [result] = await connection.query(sql);
      return result;
    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  }
}

module.exports = AuthService;