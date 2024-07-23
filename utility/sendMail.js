 //Nodemailer
const nodemailer = require("nodemailer")


 //EMAIL FOR REGISTRATION CONFIRMATION   
const sendEmail = ()=>{

 const Transporter = nodemailer.createTransport({
        service: "gmail",
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    
     return Transporter 
}
    
    

module.exports = {sendEmail}
    
    
    
  