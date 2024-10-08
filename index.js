
const express = require("express")
const cors = require('cors')
const https = require('https')
const http = require("http")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const path = require('node:path');
const cookieParser = require("cookie-parser")
const usersRoute = require("./routes/usersRoute")
const leaseRoute = require("./routes/leaseRoute")
const maintenanceRoute = require("./routes/maintenanceRoute")
const propertyRoute = require("./routes/propertyRoute")
const testRoute = require("./routes/testRoute")
const paystackRoute = require("./routes/paystackRoute")
const chatRoute = require("./routes/chatRoute")
const messageRoute = require("./routes/messageRoute")
const dbconnection = require("./database/dbconfig")
const {Server} = require("socket.io")
const Paystack = require('@paystack/paystack-sdk');
const crypto = require('crypto');



const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express()   
app.use(express.json())
app.use(cookieParser())
app.use(cors());
const server = http.createServer(app)

const PORT = process.env.PORT || 8000

dbconnection()   

app.get("/", (req, res)=>{
    return res.status(200).json({message: "API WORKING FINE"})
})
 
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})











const io = new Server(server, {
    cors:{
        methods: ["GET", "POST"]
    }
})  
io.on("connection", (socket)=>{
    console.log(`User Connected: ${socket.id}`)

    socket.on("join_room", (data)=>{
        socket.join(data)
        console.log(`User with ID: ${socket.id} has joined room: ${data}`)
    })

    socket.on("send_message", (data)=>{
        socket.to(data.room).emit("receive_message", data)
    })
    socket.on("disconnect", ()=>{
        console.log("User Disconnected", socket.id)
    })
})

app.use((req, res, next) => {
    req.Users = {
        roles: ['tenant'] // This should come from your user authentication logic
    };
    next();
});
//{origin: process.env.CLIENT_URL, credentials: true}
app.use(usersRoute)
app.use(leaseRoute)
app.use(maintenanceRoute)
app.use(propertyRoute) 
app.use(testRoute)
app.use(paystackRoute)
app.use(chatRoute)
app.use(messageRoute)
 
 

 





 


