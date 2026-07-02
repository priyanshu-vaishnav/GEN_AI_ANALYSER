const { body, validationResult } = require("express-validator")

const authValidations = [

    body('username').trim()
        .notEmpty().withMessage("name can not be empty ")
        .isLength({ min: 6, max: 50 }).withMessage("Name must be at least 6 charachters long")
        .matches(/^[a-zA-Z\s]+$/).withMessage("name only contain letters and alphabets"),

    body('email').trim().notEmpty().withMessage("email Cannot be empty")
        .isEmail().withMessage("Please enter a valid email")
        .normalizeEmail()
    ,
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]/)
        .withMessage('Password must contain uppercase, lowercase, number, and special character'),

    (req, res, next) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {

          console.log(errors.array().at(0).msg)
          return  res.status(400).json({ errors: errors.array() })

        }
        next()


    }
]

module.exports = { authValidations }