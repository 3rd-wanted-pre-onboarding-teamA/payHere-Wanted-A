const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE
});

module.exports = function () {
  return {
    init: function () {
      return pool;
    },
    open: function (conn) {
      conn.connect(function (err) {
        if (err) {
          console.log("연결 중 에러 발생: " + err);
        } else {
          console.log("mysql 연결 성공");
        }
      });
    },
  };
};
