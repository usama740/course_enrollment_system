const User  = require('../model/user')


exports.registerUser = async (req , res , next)=>{
    
    const {name , email , password } = req.body
    
    
    if (!req.file){
        res.status(422).json({
            "message" : "image did not save"
        })
    }

    const profile_image = req.file.filename
    let role
    if(Object.keys(req.body).includes("role")){
        role = req.body.role
    }else{
        role = "student"
    }

    const user = await User.create({
        name,
        email,
        password,
        role,
        profile_image
    })

    const token =  user.getJwtToken()

    res.status(201).json({
        success: true,
        token
    })
}

exports.loginUser = async (req , res , next)=>{

    const {email , password} = req.body
    
    if(!email || !password){
        res.status(400).json({
            "message" : "Please enter email and password."
        })
    }

    const user = await User.findOne({email}).select("+password")

    if(!user){
        res.status(401).json({
            "message" : "Invalid email or password."
        })
    }

    
    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched){
        res.status(400).json({
            "message" : "Invalid email or password."
        })
    }

    const token = user.getJwtToken()
     
    res.status(200).json({
        success:true,
        token
    })

}