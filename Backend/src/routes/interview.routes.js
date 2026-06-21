const express = require('express')
const multer = require("multer");
const authMiddleware = require('../middleware/auth.middleware.js')
const interviewController = require('../controllers/interview.controller.js')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const route = express.Router();


route.post("/aireport",upload.single("resumeFile"),authMiddleware.auth,interviewController.generateInterviewReport)
route.get("/myreports",authMiddleware.auth,interviewController.getUserReports)

module.exports = route
