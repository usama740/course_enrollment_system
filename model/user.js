const mongoose = require('mongoose')
const validator = require('validator')
const bycrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true , 'Please enter name.'],
        trim: true,
        maxLength : [20 , 'Name shouldnot be greater than 20 charectors.']
    },
    email:{
        type: String,
        required: [true , 'Please enter email.'],
        unique: [true , 'Email already exist.'],
        validate: [validator.isEmail , 'Email address incorrect.']
    },
    role:{
        type:String,
        required: [true],
        default: "teacher"
    },
    password:{
        type: String,
        required: [true , 'Please enter password.'],
        minLength: [6, 'Password must be greater than 5'],
        select: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    },

    profile_image:{
        type: String
    },


})

// Encrypt password

userSchema.pre('save' , async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bycrypt.hash(this.password , 10)
})

userSchema.methods.getJwtToken = function(){
    return jwt.sign(
        {
            id:this._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn : process.env.JWT_EXPIRES_TIME
        }
 
    )
}

userSchema.methods.comparePassword = async function(enteredPaswword){
    return await bycrypt.compare(enteredPaswword , this.password)
}


module.exports = mongoose.model('user' , userSchema)