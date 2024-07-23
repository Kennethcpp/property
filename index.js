//index.jx will be move to api folder later

const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const authRoute = require("./routes/authRoute")
const testRoute = require("./routes/testRoute")
const leaseRoute = require("./routes/leaseRoute")
const maintenanceRoute = require("./routes/maintenanceRoute")
const propertyRoute = require("./routes/propertyRoute")
const adminTenantRoute = require("./routes/adminTenantRoute")
const cors = require('cors')
const dotenv = require("dotenv").config()









const dbconnection = require("./database/dbconfig")
  
const app = express() 
app.use(express.json())
app.use(cookieParser())
app.use(cors());

//{origin: process.env.CLIENT_URL, credentials: true}



 
const PORT = process.env.PORT || 8000

dbconnection()

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})   

app.get("/", (req, res)=>{
    return res.status(200).json({message: "welcome to delta-team backend"})
})



app.use(authRoute)
app.use(testRoute)
app.use(adminTenantRoute)
app.use(leaseRoute)
app.use(maintenanceRoute)
app.use(propertyRoute)
//app.use(router) */



 


