const express = require('express')
const router = express.Router()
const {saveCourse , courseListOfCurrentUser} = require('../controller/courseController')
const {bookMiddleware} = require('../middleware/bookMiddleware')

router.use(bookMiddleware)
router
.route('/save' )
.post(saveCourse)

router
.route('/course-list' )
.get(courseListOfCurrentUser)
module.exports = router