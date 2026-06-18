const express = require('express')
const authMiddleware = require('../middleware/auth.middleware.js')
const interviewController = require('../controllers/interview.controller.js')
const route = express.Router();


route.post("/aireport",authMiddleware.auth,interviewController.generateInterviewReport)
route.get("/myreports",authMiddleware.auth,interviewController.getUserReports)

module.exports = route
