const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

/**
 * @code writer 장덕수
 * @description access token을 secret key 기반으로 생성
 *
 * @returns jwt access token
 */
const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_TOKEN, {
      expiresIn: "15m",   // 15분 간격으로 access 토큰 발급
  });
};

/**
 * @code writer 장덕수
 * @description refersh token을 secret key  기반으로 생성
 *
 * @returns jwt refresh token
 */
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_TOKEN, {
      expiresIn: "60 days",   // 60일 기준으로 refresh 토큰 발급
  });
};

module.exports = { generateAccessToken, generateRefreshToken };