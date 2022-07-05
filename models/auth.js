const pool = require("../DB/config");

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
}

module.exports = auth;
