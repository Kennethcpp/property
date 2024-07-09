
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

const dbconnection = async()=>{
    try{

        await mongoose.connect(process.env.MONGODB_URL)
        .then(()=> console.log("database connected successful..."))

    } catch (error) {
        console.log("Unable to connect to database")
    }

}

module.exports = dbconnection