const pool = require("../DB/config");

/**
 * @code writer 장덕수
 * @description 사용자 인증 시 사용되는 sql구문 클래스로 정의
 *
 * @auth.signUp 회원가입 메소드
 * @auth.checkId 아이디 중복 확인 메소드
 * @auth.checkUser 로그인 시 유저 정보 조회 메소드
 * 
 * @returns sql구문으로 인한 DB 생성 및 조회
 */
class auth {
  // 회원가입 메소드
  static async signUp(member_id, member_pw, member_name, phone_number) {
    const sql = `INSERT INTO member (member_id, member_pw, member_name, phone_number) VALUES ('${member_id}', '${member_pw}', '${member_name}', '${phone_number}');`;
    try {
      const connection = await pool.getConnection(async (conn) => conn);
      const [result] = await connection.query(sql);
      connection.release();
      return result;
    }
    catch (err) {
      throw err;
    }
  }
  
  // 아이디 중복 확인 메소드
  static async checkId(member_id) {
    const sql = `SELECT member_id FROM member WHERE member_id = '${member_id}'`;
    try {
      const connection = await pool.getConnection(async (conn) => conn);
      const [result] = await connection.query(sql);
      connection.release();
      return result;
    }
    catch (err) {
      throw err;
    }
  }

  // 로그인 시 유저 정보 조회 메소드
  static async checkUser(member_id) {
    const sql = `SELECT member_id, member_pw FROM member WHERE member_id = '${member_id}'`;
    try {
      const connection = await pool.getConnection(async (conn) => conn);
      const [result] = await connection.query(sql);
      connection.release();
      return result;
    }
    catch (err) {
      throw err;
    }
  }
}

module.exports = auth;