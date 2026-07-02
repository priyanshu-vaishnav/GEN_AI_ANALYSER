const userModel = require("../models/user.model.js")
const blacklistTokenModel = require("../models/blacklistToken.model.js")
const generateToken = require("../middleware/generateToken.js");
const interviewReportModel = require("../models/interviewReport.model.js");



async function register(req, res) {

  try {

    const { username, email, password } = req.body;
    if (!username || !email || !password
    ) {
      return res.status(400).json({ message: "please enter all the details" })
    }
    const user = await userModel.create({
      username,
      email,
      password
    })

    generateToken(res, user)

    return res.status(200).json({
      message: "Success register"
    })

  } catch (err) {


    return res.status(400).json(
      {
        message: err.errors
      }
    )
  }




}
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "please enter all the details" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    generateToken(res, user);

    // Agar hook me user state set karni hai, to message ke sath user data bhi bhejein
    res.status(200).json({
      message: "Success login",
      user: user // Taaki setUser(data.user) kar sakein
    });

  } catch (err) {
    // Server crash hone par exact system message bhejein (err.message)
    res.status(500).json({
      message: err.message || "Internal Server Error"
    });
  }
}


async function logout(req, res) {

  const blacklistToken = await blacklistTokenModel.create({
    token: req.cookies.token,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  })
  await blacklistToken.save()

  res.clearCookie("token")
  res.status(200).json({
    message: "Success logout"
  })

}


async function getMe(req, res) {

  const totalReports = await interviewReportModel.countDocuments()

  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(300).json({
        message: "no user found",
        totalReports: totalReports
      })
    }
    const isAnyReport = await interviewReportModel.find({ user: req.userId });

    res.status(200).json({
      username: user.username,
      email: user.email,
      totalReports: totalReports


    })
  }
  catch (err) {
    return res.status(500).json({
      message: "something went wrong"
    })
  }
}

async function forgetPassword(req, res) {

  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      message: "no email is given "
    })
  }

  console.log(email, password)

  console.log("step2")
  try {
    const user = await userModel.findOne({ email: email })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    user.password = password
    await user.save()


    console.log("step3")
    res.status(200).json({
      message: "password change successfully"
    })

  } catch (err) {
    return res.status(500).json({
      message: err
    })
  }

}
module.exports = { register, getMe, login, logout, forgetPassword }