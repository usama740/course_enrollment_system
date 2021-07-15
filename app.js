const express = require("express");
const dotenv = require("dotenv");
const app = express()
const connection_db = require("./config/db")
const multer = require('multer')


const fileStorage = multer.diskStorage({
    destination: (req , file , cd)=>{
        cd(null , 'images')
    },
    filename: (req , file , cd)=>{
        cd(null , new Date().toISOString()+ "-" +file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

app.use(express.json())
app.use(multer({storage: fileStorage ,fileFilter: fileFilter}).single('profile_image'))


app.get('/' , (req , res , next)=>{
    res.status(200).json({
        "msg" : "success"
    })
})

// Add User routes
userRoutes = require('./routes/userRoutes')
app.use('/user' , userRoutes)

// Add Course routes
courseRoutes = require('./routes/courseRoutes')
app.use('/course' , courseRoutes)

// Add Student routes
studentRoutes = require('./routes/studentRoutes')
app.use('/student' , studentRoutes)

const PORT = process.env.PORT || 5000;
connection_db()
app.listen(PORT , console.log(`Server running on port ${PORT}`))