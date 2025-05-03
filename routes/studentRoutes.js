const express = require('express')
const router = express.Router()
const {courseEnrolment , coursesListOfCurrentStudent} = require('../controller/courseController')
const {studentMiddleware} = require('../middleware/studentMiddleware')

router.use(studentMiddleware)

router
.route('/course-enrolment' )
.post(
    courseEnrolment
    )

router
.route('/courses' )
.get(
    coursesListOfCurrentStudent
    )

module.exports = router