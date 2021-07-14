const express = require("express");
const dotenv = require("dotenv");
const app = express()

app.get('/' , (req , res , next)=>{
    res.status(200).json({
        "msg" : "success"
    })
})

dotenv.config();
const PORT = process.env.PORT || 5000;
app.listen(PORT , console.log(`Server running on port ${PORT}`))