const jwt = require("jsonwebtoken")


async function auth(req,res,next){

     try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) { 
            return res.status(401).json({
                message: "Unauthorized Access !"
            })
        }

        const decoded = jwt.verify(token, process.env.JWSKEY);

        req.user = decoded;
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({
            msg: "Invalid token: " + error.message
        })
    }


}

module.exports = {auth}