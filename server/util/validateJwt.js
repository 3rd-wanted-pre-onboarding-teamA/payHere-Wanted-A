const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const AuthService = require("../services/auth.service");
const { generateAccessToken } = require("../util/generateToken");
dotenv.config();

const authenticateAccessToken = (req, res, next) => {
  /** 
   * 기능: access 토큰을 기반으로 사용자 인증 유효성 검사하는 메소드
   * 작성자: 장덕수
   */
  const authHeader = req.headers["cookie"];
  if (authHeader === undefined) {
    res.status(403).send("로그인이 필요합니다.");
  }

  const token = authHeader.replace("access-token=", "");  // 쿠키에 있는 엑세스 토큰 추출

  if (!token) {
      console.log("wrong token format or token is not sended");
      return res.sendStatus(400).json({
        message: "토큰 형식이 잘못되었거나, 토큰이 전달되지 않았습니다."
      });
  }

  
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN, async (error, user) => {
    if (error) {    // 엑세스 토큰이 만료되었다면 리프레시 토큰을 활용해 엑세스 토큰 재발급
      // access 토큰 디코딩하여 user 정보 조회
      const decoded = jwt.decode(token);
    
      // 디코딩 결과가 없으면 권한 없음 응답
      if (decoded === null) {
        return res.status(401).send({
          message: "해당 토큰이 권한이 없습니다."
        });
      }
    
      // 디코딩된 값에서 유저 id 가져와 리프레시 토큰 검증
      const refreshToken = await AuthService.searchRefreshToken(decoded.id);
      if (!refreshToken) return res.sendStatus(401);
    
      jwt.verify(refreshToken[0].refresh_token, process.env.JWT_REFRESH_TOKEN, (error, user) => {
        if (error) {
          return res.status(403).send("로그인이 필요합니다.");
        }
        const accessToken = generateAccessToken(user.id);
        res.setHeader("Authorization", "Bearer" + accessToken);
        res.cookie("access-token", accessToken);
        req.user = user;
        next();
      });
    } else {
      req.user = user;
      next();
    }
  });
};

module.exports = authenticateAccessToken;