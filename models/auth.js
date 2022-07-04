const db = require("../DB/dbConnect");

class auth {
  static async signUp(member_id, member_pw, member_name, phone_number) {
    const sql = `INSERT INTO member (member_id, member_pw, member_name, phone_number) VALUES (?, ?, ?, ?);`;
    try {
      const [result] = await db
        .promise()
        .query(sql, [member_id, member_pw, member_name, phone_number]);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = auth;
