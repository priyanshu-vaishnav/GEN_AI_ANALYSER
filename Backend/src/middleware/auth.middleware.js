const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
    try {
        let token;

        // 1. Pehle check karein ki kya Header me Bearer token aa raha hai (For Production/LocalStorage)
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        } 
        // 2. Agar header me nahi mila, toh Cookies me check karein (Backup / For Localhost)
        else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        // Agar dono jagah se token nahi mila
        if (!token) {
            return res.status(401).json({
                msg: "No token provided"
            });
        }

        // Token verify karein
        const decoded = jwt.verify(token, process.env.JWSKEY);

        req.user = decoded;
        req.userId = decoded.id; // Agar token me payload me id bheja hai toh sahi hai
        next();

    } catch (error) {
        return res.status(401).json({
            msg: "Invalid token: " + error.message
        });
    }
}

module.exports = { auth };