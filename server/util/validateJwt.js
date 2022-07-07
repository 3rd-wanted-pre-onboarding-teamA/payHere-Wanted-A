const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

/**
 * @code writer 장덕수
 * @description access 토큰을 기반으로 사용자 인증 유효성 검사하는 메소드
 *
 * @returns res.user (토큰으로 확인한 유저의 정보)
 */
const authenticateAccessToken = (req, res, next) => {
  let authHeader = req.headers["authorization"];
  console.log("@@@@@@@@@@@@@@@@@@@@@@");
  console.log(req.headers);
  console.log("@@@@@@@@@@@@@@@@@@@@@@");
  let token = authHeader && authHeader.split(" ")[1];

  if (!token) {
      console.log("wrong token format or token is not sended");
      return res.sendStatus(400);
  }

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (error, user) => {
      if (error) {
          console.log(error);
          return res.sendStatus(403);
      }
      
      req.user = user;
      next();
  });
};

module.exports = authenticateAccessToken;