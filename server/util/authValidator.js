const { body } = require("express-validator");

const authValidator = [
  body("member_id")
    .isEmail()
    .withMessage("이메일 형식에 맞게 작성해주세요!"), // member-id는 email 형식이어야 한다.
  body("member_pw")
    .isLength({ min: 6 })
    .withMessage("6글자 이상 작성해주세요!"), // 비밀번호는 최소 6글자 이상이어야 한다.
  body("member_name")
    .isLength({ min: 2, max: 10 })
    .withMessage("10글자 미만으로 작성해주세요!"), // 유저 이름은 10글자 이하여야 한다.
  body("phone_number")
    .isMobilePhone()
    .withMessage("전화번호 형식에 맞게 입력해주세요!"),
  body("balance")
    .isNumeric()
    .withMessage("숫자만 입력해주세요!")  // 잔액은 숫자로만 받는다.
];

const checkEmail = [
  body("member_id")
    .isEmail()
    .withMessage("이메일 형식에 맞게 작성해주세요!")
];

module.exports = { authValidator, checkEmail };