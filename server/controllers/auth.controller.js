const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const AuthService = require("../services/auth.service");
const { generateAccessToken, generateRefreshToken } = require("../util/generateToken");

dotenv.config();

class AuthController {
  // 회원가입 브라우저 화면
  static join = async function (req, res) {
    try {
      res.status(200).render("join.ejs");
    } catch (err) {
      throw err;
    }
  };

  // 회원가입
  static joinAction = async function (req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.errors.map((obj) => obj.msg) }); // 위 사항을 어겼을 시 400 반환
      }

      const { member_id, member_pw, member_name, phone_number, balance } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(member_pw, salt); // 패스워드 암호화

      const exUser = await AuthService.checkId(member_id);
      if (exUser[0]) {
        return res.render("error.ejs", { status: 500, message: "서버 에러입니다." });
      } else {
        // member 테이블에 유저 정보 저장
        AuthService.join(member_id, hashedPassword, member_name, phone_number);

        // have_money 테이블에 잔액 정보 저장
        AuthService.insertBalance(member_id, balance);

        // json 응답 통해 메시지와 jwt 토큰 전달
        return res.status(201).json({
          message: "회원가입이 완료되었습니다.",
        });
      }
    } catch (err) {
      throw err;
    }
  };

  // 회원가입 시 아이디 중복검사
  static checkId = async function (req, res) {
    try {
      const errors = validationResult(req); // 이메일 형식이 아니라면 에러
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.errors.map((obj) => obj.msg) });
      }

      const { member_id } = req.body;
      const user = await AuthService.checkId(member_id);
      console.log(user);
      if (user[0])
        return res.json({
          message: "사용 중인 아이디입니다.",
          success: false,
        });
      else
        return res.json({
          message: "사용 가능한 아이디입니다.",
          success: true,
        });
    } catch (err) {
      throw err;
    }
  };

  // 로그인 브라우저 화면
  static login = async function (req, res) {
    try {
      res.status(200).render("login.ejs");
    } catch (err) {
      throw err;
    }
  };

  // 로그인
  static loginAction = async function (req, res) {
    try {
      const errors = validationResult(req); // 이메일 형식이 아니라면 에러
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.errors.map((obj) => obj.msg) });
      }

      const { member_id, member_pw } = req.body;

      const user = await AuthService.checkUser(member_id);

      if (!user[0])
        return res.status(400).json({
          message: "유효하지 않은 아이디입니다.",
          success: false,
        });

      const isMatch = await bcrypt.compare(member_pw, user[0].member_pw);
      if (!isMatch)
        return res.status(400).json({
          message: "유효하지 않은 비민번호입니다.",
          success: false,
        });

      const accessToken = generateAccessToken(user[0].member_id);

      const exToken = await AuthService.searchRefreshToken(member_id);
      if (!exToken[0]) {
        const refreshToken = generateRefreshToken(user[0].member_id);
        await AuthService.saveRefreshToken(member_id, refreshToken); // 리프레시 토큰 DB에 저장
      }

      res.setHeader("Authorization", "Bearer" + accessToken);
      res.cookie("access-token", accessToken);
      res.status(200).json({
        message: "로그인이 되었습니다.",
      });
    } catch (err) {
      throw err;
    }
  };

  // mypage 조회
  static mypage = async function (req, res) {
    const userId = req.user.id;
    try {
      if (!userId) return res.status(401);
      const [result] = await AuthService.mypage(userId);
      res.status(200).render("mypage.ejs", {
        myInfo: result,
      });
    } catch (err) {
      throw err;
    }
  };

  // access토큰 만료 시 재발급
  static refresh = async function (req, res) {
    const authHeader = req.headers["cookie"];
    const token = authHeader.replace("access-token=", "");

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
      if (error) return res.sendStatus(403);
      const accessToken = generateAccessToken(user.id);
      res.setHeader("Authorization", "Bearer" + accessToken);
      res.cookie("access-token", accessToken);
      res.status(200).json({
        message: "엑세스 토큰이 재발급되었습니다."
      });
    });
  };

  // 로그아웃 시 리프레시 토큰 삭제
  static logout = async function (req, res) {
    const userId = req.user.id;
    try {
      await AuthService.logout(userId);
      return res.clearCookie("access-token").status(200).json({ message: "로그아웃 되었습니다." });
    } catch (err) {
      throw err;
    }
  };
}

module.exports = AuthController;
