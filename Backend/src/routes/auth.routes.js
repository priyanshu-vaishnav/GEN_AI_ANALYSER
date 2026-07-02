const express = require("express")
const authControllers = require('../controllers/auth.controllers.js')
const authMiddleware = require('../middleware/auth.middleware.js')
const {authValidations} = require('../middleware/auth.validation.js')
const route = express.Router();

route.post('/register',authValidations,authControllers.register)
route.get('/getme',authMiddleware.auth,authControllers.getMe)
route.post('/login',authControllers.login)
route.post('/logout',authControllers.logout)
route.put('/forgetpassword',authControllers.forgetPassword)


module.exports = route