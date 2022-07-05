const db = require("../DB/dbConnect");

class auth {
  // 회원가입 메소드
  static async signUp(member_id, member_pw, member_name, phone_number) {
    const sql = `INSERT INTO member (member_id, member_pw, member_name, phone_number) VALUES (?, ?, ?, ?);`;
    try {
      const [result] = await db
        .promise()
        .query(sql, [member_id, member_pw, member_name, phone_number]);
      return result;
    } 
    catch (err) {
      throw err;
    }
  }

  // 아이디 중복 확인 메소드
  static async idCheck(member_id) {
    const sql = `SELECT (member_id) FROM member WHERE member_id = ${member_id}`;
    try {
      const [result] = await db
        .promise()
        .query(sql, [member_id]);
        return result;
    }
    catch (err) {
      throw err;
    }
  }
}

module.exports = auth;
