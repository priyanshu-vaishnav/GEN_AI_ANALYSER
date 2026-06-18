const jwt = require('jsonwebtoken')
const cookies = require("cookie-parser");
const dotenv = require('dotenv')
dotenv.config();

async function genreateToken(res ,user) {

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWSKEY, { expiresIn: '24h' })

    
    res.cookie("token", token, {
  httpOnly: true,
  secure: true,      // KHOOB ZAROORI: Kyunki Render HTTPS use karta hai
  sameSite: "none",   // SABSE IMPORTANT: Cross-domain (Vercel to Render) ke liye yeh 'none' hona hi chahiye
  maxAge: 24 * 60 * 60 * 1000 // 1 din
});



}

module.exports = genreateToken