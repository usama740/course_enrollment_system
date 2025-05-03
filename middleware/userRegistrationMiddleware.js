
const User = require('../model/user')
const {emailReg} = require('../utils/utils')


 exports.validateUserRegistration = async (req , res , next)=>{
    errors = []
    const {name , email , password} = req.body
    if(!Object.keys(req.body).includes("name")){
        errors.push("Please enter name.")
    }else if(name.length > 20 ){
        errors.push("Name should not be greater than 20 charectors.")
    }

    if(!Object.keys(req.body).includes("email")){
        errors.push("Please enter email.")
    }else if(!emailReg.test(email)){
        errors.push("Please enter correct email.")
    }else if(await User.findOne({email:email})){
        
        errors.push("Email already exists.")
    }

    if(!Object.keys(req.body).includes("password")){
        errors.push("Please enter password.")
    }else if(password.length < 6){
        errors.push("Password should not be less than 5 charectors.")
    }

    if(errors.length !=0){
        res.status(400).json({
            "errors" : errors
        })
    }    
    next()
}

