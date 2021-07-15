const mongoose = require('mongoose')
const validator = require('validator')
const bycrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
const bookSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true , 'Please enter book name.'],
        trim: true,
        maxLength : [20 , 'Name shouldnot be greater than 20 charectors.']
    },

    teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    students:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ]
   

})

// Encrypt password

module.exports = mongoose.model('book' , bookSchema)