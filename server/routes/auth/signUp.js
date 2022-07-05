const dotenv = require("dotenv");
const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const auth = require("../../../models/auth");

dotenv.config();
const router = express.Router();

// 회원가입
router.post(
  "/newUserAction",
  body("member_id").isEmail().withMessage("이메일 형식에 맞게 작성해주세요!"), // member-id는 email 형식이어야 한다.
  body("member_pw")
    .isLength({ min: 6 })
    .withMessage("6글자 이상 작성해주세요!"), // 비밀번호는 최소 6글자 이상이어야 한다.
  body("member_name")
    .isLength({ max: 10 })
    .withMessage("10글자 미만으로 작성해주세요!"), // 유저 이름은 10글자 이하여야 한다.
  body("phone_number").isMobilePhone(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.errors.map((obj) => obj.msg) }); // 위 사항을 어겼을 시 400 반환
    }

    const { member_id, member_pw, member_name, phone_number } = req.body;
    const hashedPassword = await bcrypt.hash(member_pw, 10);  // 패스워드 암호화

    // member 테이블에 유저 정보 저장
    auth.signUp(member_id, hashedPassword, member_name, phone_number);

    // json 응답 통해 메시지와 jwt 토큰 전달
    return res.status(201).json({
      message: "회원가입이 완료되었습니다."
    });
  }
);

// 아이디 중복 검사
/**
 * TODO: 아이디 중복 검사 메소드(or api) 구현
 */
router.post("/checkIdAction", async (req, res) => {
  const { member_id } = req.body;
  const user = await auth.checkId(member_id);
  console.log(user);
  if (user[0]) return res.json({
    message: "사용 중인 아이디입니다.",
    success: false
  });
  else return res.json({
    message: "사용 가능한 아이디입니다.",
    success: true
  })
});

module.exports = router;
