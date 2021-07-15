Course = require('../model/course')

exports.saveCourse = async(req , res , next)=>{
    
    const {name} = req.body
    teacher = req.user

    const course = await Course.create({
        name,
        teacher
    })

    res.status(201).json({
        success: true,
        course
    })

}


exports.courseListOfCurrentUser = async(req , res , next)=>{
    
    const course = await Course.find({teacher:req.user})
    res.status(200).json({
        success: true,
        course
    })

}

exports.courseEnrolment = async(req , res , next)=>{
    
    const name = req.body.name
    const course = await Course.findOneAndUpdate(
        {name:name},
        {$addToSet:{students:req.user}},
        {new:true}
        )
    res.status(200).json({
        success: true,
        course
    })

}


exports.coursesListOfCurrentStudent = async(req , res , next)=>{
    
    const courses = await Course.find({ students: { $in: req.user }}).select("name")
    res.status(200).json({
        success: true,
        courses
    })

}
