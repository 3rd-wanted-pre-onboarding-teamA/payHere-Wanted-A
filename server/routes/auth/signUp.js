const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const auth = require("../../../models/auth");

const router = express.Router();

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
    const hashedPassword = await bcrypt.hash(member_pw, 10);
    auth.signUp(member_id, hashedPassword, member_name, phone_number);

    return res.status(201).json({ message: "회원가입이 완료되었습니다." });
  }
);

module.exports = router;
