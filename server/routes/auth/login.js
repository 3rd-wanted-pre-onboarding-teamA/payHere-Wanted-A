const dotenv = require("dotenv");
const express = require("express");
const bcrypt = require("bcrypt");
const auth = require("../../../models/auth");
const { generateAccessToken, generateRefreshToken } = require("../../util/generateToken");

dotenv.config();
const router = express.Router();

/**
 * @code writer 장덕수
 * @description 사용자 로그인 api 작성
 *
 * @POST ("/auth/loginAction")
 *
 * @returns json (accessToken, refreshToken)
 */
router.post("/loginAction", async (req, res) => {
  const { member_id, member_pw } = req.body;

  const user = await auth.checkUser(member_id);

  if (!user[0]) return res.json({
    message: "유효하지 않은 아이디입니다.",
    success: false
  });
  
  const isMatch = await bcrypt.compare(member_pw, user[0].member_pw);
  console.log(isMatch);
  console.log();
  if (!isMatch) return res.json({
    message: "유효하지 않은 비민번호입니다.",
    success: false
  });

  const accessToken = generateAccessToken(user[0].member_id);
  const refreshToken = generateRefreshToken(user[0].member_id);

  res.json({ accessToken, refreshToken });
});

module.exports = router;