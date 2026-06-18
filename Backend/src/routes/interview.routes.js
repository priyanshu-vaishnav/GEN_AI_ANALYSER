const express = require('express')
const authMiddleware = require('../middleware/auth.middleware.js')
const generateInterviewReportController = require('../controllers/interview.controller.js')
const route = express.Router();


route.post("/aireport",authMiddleware.auth,generateInterviewReportController.generateInterviewReport)

module.exports = route
