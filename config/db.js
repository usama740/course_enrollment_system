const mongoose = require('mongoose')
const dotenv = require("dotenv");

dotenv.config();
const connection_db = async ()=>{

    try{

        const mongoConnection = await mongoose.connect(process.env.CONNECTION_STRING , { 
            useNewUrlParser: true ,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

    }catch(error){
        console.error(`error : ${error}`)
    }
}
module.exports = connection_db