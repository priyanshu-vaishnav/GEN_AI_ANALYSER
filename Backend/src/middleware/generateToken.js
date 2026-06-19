const jwt = require("jsonwebtoken");
const cookies = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

async function genreateToken(res, user) {
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWSKEY,
    { expiresIn: "24h" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 din
  });
}

module.exports = genreateToken;
