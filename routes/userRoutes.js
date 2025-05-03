const express = require('express')
const router = express.Router()
const {registerUser , loginUser} = require('../controller/userController')
const {validateUserRegistration} = require('../middleware/userRegistrationMiddleware')

router
.route('/register' )
.post(
    validateUserRegistration,
    registerUser
    )

router
.route('/login' )
.post(
    loginUser
    )

module.exports = router