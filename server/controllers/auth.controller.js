const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const authService = require("../services/auth.service");
const { generateAccessToken, generateRefreshToken } = require("../util/generateToken");

dotenv.config();

class authController {
  // 회원가입
  static signUp = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.errors.map((obj) => obj.msg) }); // 위 사항을 어겼을 시 400 반환
    }

    const { member_id, member_pw, member_name, phone_number } = req.body;
    const hashedPassword = await bcrypt.hash(member_pw, 10);  // 패스워드 암호화

    // member 테이블에 유저 정보 저장
    authService.signUp(member_id, hashedPassword, member_name, phone_number);

    // json 응답 통해 메시지와 jwt 토큰 전달
    return res.status(201).json({
      message: "회원가입이 완료되었습니다."
    });
  }

  // 회원가입 시 아이디 중복검사
  static checkId = async function (req, res) {
    const { member_id } = req.body;
    const user = await authService.checkId(member_id);
    console.log(user);
    if (user[0]) return res.json({
      message: "사용 중인 아이디입니다.",
      success: false
    });
    else return res.json({
      message: "사용 가능한 아이디입니다.",
      success: true
    });
  }

  // 로그인
  static login = async function (req, res) {
    const { member_id, member_pw } = req.body;

    const user = await authService.checkUser(member_id);

    if (!user[0]) return res.json({
      message: "유효하지 않은 아이디입니다.",
      success: false
    });

    const isMatch = await bcrypt.compare(member_pw, user[0].member_pw);
    if (!isMatch) return res.json({
      message: "유효하지 않은 비민번호입니다.",
      success: false
    });

    const accessToken = generateAccessToken(user[0].member_id);
    const refreshToken = generateRefreshToken(user[0].member_id);

    res.json({ accessToken, refreshToken });
  }

  // access토큰 만료 시 재발급
  static refresh = function (req, res) {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN,
      (error, user) => {
        if (error) return res.sendStatus(403);

        const accessToken = generateAccessToken(user.id);

        res.json({ accessToken });
      }
    );
  }
}

module.exports = authController;