//Forgot Password Email For Verification......
const {sendEmail} = require("./sendMail")

const passwordResetEmail = (User) =>{
    const Transporter = sendEmail()

     const mailDetails = {
        from: '"Smart PropertyEx" <info@youthrive.com>',
        to: User.email,
        subject: "Verify your email now!..",
        html: `
           <div>
           <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333333; margin: 0; padding: 0;">
            <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <div style="background-color: #4CAF50; color: #ffffff; padding: 20px; text-align: center;">
                <h1>Thanks for using our Services!</h1>
            </div>
            <div style="padding: 20px;">
                <h1>Hello, ${User.fullname} </h1>
                <h3>. You have successfully reset your password!</h3>
                <p>Please click the button below to login now!:</p>
                <a href="https://localhost:8081/login/"style="display: inline-block; padding: 10px 40px; margin: 20px 0; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px;">Verify Email</a>
                <p>If you have any questions or need assistance, feel free to contact our support team.</p>
                <p>Best regards,</p>
                <p>The [Smart PropertyEx] Delta Team</p>
            </div>
            <div style="background-color: #f4f4f4; color: #777777; text-align: center; padding: 10px; font-size: 12px;">
                <p>&copy; 2024 [Smart PropertyEx]. All rights reserved.</p>
                <p><a href="[Unsubscribe Link]" style="color: #777777;">Unsubscribe</a></p>
            </div>
        </div>
     </body>
        </div> 
        `
     };

     Transporter.sendMail(mailDetails, (error, info) => {
        if(error) {
            console.log(error)
        } else{
            console.log("Verification Email Sent!")
        }
    })
}

module.exports = { passwordResetEmail}