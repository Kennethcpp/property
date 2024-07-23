//index.jx will be move to api folder later

const express = require("express")
const cors = require('cors')
const https = require('https')
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const path = require('node:path');
const cookieParser = require("cookie-parser")
const usersRoute = require("./routes/usersRoute")
const adminTenantRoute = require("./routes/adminTenantRoute")
const leaseRoute = require("./routes/leaseRoute")
const maintenanceRoute = require("./routes/maintenanceRoute")
const propertyRoute = require("./routes/propertyRoute")
const testRoute = require("./routes/testRoute")
const paystackRoute = require("./routes/paystackRoute")

const dbconnection = require("./database/dbconfig")

 
const app = express()   


app.set("view engine", "ejs")
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));

//{origin: process.env.CLIENT_URL, credentials: true}
app.use(usersRoute)
app.use(adminTenantRoute)
app.use(leaseRoute)
app.use(maintenanceRoute)
app.use(propertyRoute) 
app.use(testRoute)
app.use(paystackRoute)
 


 
const PORT = process.env.PORT || 8000

dbconnection()

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})   

app.get("/", (req, res)=>{
   res.render("index.ejs")
})




 


