const jwt = require("jsonwebtoken");
const User = require('../model/user')


exports.studentMiddleware = async (req , res , next)=>{

    const { authorization } = req.headers;

    if (authorization && authorization.startsWith("Bearer")) {

        let token = authorization.split(" ")
        
        if(!token.length > 1){
            res.status(403).json({
                "message" : "Authorization fail"
            })
        }
        
        const decript = jwt.verify(token[1], process.env.JWT_SECRET)
        
        req.user = await User.findById(decript.id)
        
        if(req.user.role != "student"){
            res.status(403).json({
                "message" : "Only student can access this routes."
            })
        }
        
        next()
    }else{
        res.status(403).json({
            "message" : "Authorization fail"
        })
    }
    

    

}