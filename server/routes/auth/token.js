const dotenv = require("dotenv");
const express = require("express");
const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../../util/generateToken");

dotenv.config();
const router = express.Router();

/**
 * @code writer 장덕수
 * @description access 토큰 만료시, 재발급하는 api
 *
 * @POST ("/auth/refresh")
 *
 * @returns json (accessToken, refreshToken)
 */
router.post("/refresh", (req, res) => { // access token을 refresh token 기반으로 재발급
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
});

module.exports = router;