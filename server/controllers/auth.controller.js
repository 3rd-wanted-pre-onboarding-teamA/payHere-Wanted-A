const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const authService = require("../services/auth.service");

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
}

module.exports = authController;