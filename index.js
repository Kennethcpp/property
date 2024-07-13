//index.jx will be move to api folder later

const express = require("express")
const cookieParser = require('cookie-parser')
const routes = require("./routes/routers")
const cors = require('cors')
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const dbconnection = require("./database/dbconfig")
  




const app = express() 

app.use(express.json())

app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));




 
const PORT = process.env.PORT || 8000

dbconnection()

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})   

app.get("/", (req, res)=>{
    return res.status(200).json({message: "welcome to delta-team backend"})
})


app.use(routes)


 


