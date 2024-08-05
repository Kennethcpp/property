
const Users = require("../models/userSchema")
const cors = require('cors')
const jsonwebtoken = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { updateSearchIndex } = require("../models/propertySchema")



//validating register details
const validateReg = async(req, res, next)=>{
  

    const {email, fullname, password, role, phoneNumber} = req.body
    let errors =[]
  if(!email){
    errors.push("please enter email address")
  } else if(!validateEmail(email)){
    errors.push("Invalid email address.")
  }
 
//validating fullname
  if(!fullname){
    errors.push("please enter your fullname")
  }

  //validating role
  if(!role){
    errors.push("please enter your Role")
  } 
  //validating phone Number
  if(!phoneNumber){
    errors.push("please enter a correct Phone Number")
  } else if(phoneNumber.length < 11){
    errors.push("phone Number must be 11 character")
  }

//validating password 
  if(!password){
    errors.push("please enter password")
  } else if(password.length < 6){
    errors.push("password must be 6 character and above")
  }
      if(errors.length > 0){
        return res.status(400).json({
          message: errors
        })
      } 
      next()
}

const validateEmail = (email) => {
  const emailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

  return emailPattern.test(email);
 
};
//validating user login details
const validatelogin = async(req, res, next)=>{
  try{
  const {email, password } = req.body

  let errors =[]
  
  if(!email){
    errors.push("enter your email")
  }
  else if(!validateEmail(email)){
    errors.push("Invalid email address.")
  }
  if(!password){
    errors.push("enter your password.")

   }
     
  if(errors.length > 0){
    return res.status(400).json({
      message: errors
    })
  } 
  next()

  } catch (error) {
    return res.status(500).json({message: error.message})
  } 
  
}

const validateDeletedUser = async(req, res, next)=>{

  const { deletedUser} = req.params
  let errors =[]
  if(!deletedUser){
    errors.push("User does not exist!..")
  } 
  next()
}

const validateForgotPassword = async(req, res, next)=>{

  const { email } = req.body
  const passToken = req.cookies.passToken
  let errors =[]
  
  if(!Users){
    errors.push("User not found")
  }else if(!passToken)
  if(!passToken) {
      return res.status(401).json({ message: "not Authenticated!"})
  } 
  
   await jsonwebtoken.verify(passToken, process.env.JWT_ACCESSTOKEN, async (err, payload)=>{
      if(err) return res.status(403).json({message: "Invalid Forgot Password Token!"})
       req.UserId = payload.id
      next()
     })
  
}

const validateResetPassword = async(req, res, next) =>{
  try{

    let errors =[]
    const { Password} = req.body
    const { resetToken} = req.params
    if(!(resetToken))
      errors.push("Not Authorisez!")

    const verify = jsonwebtoken.verify({resetToken})
    if(!verify) 
      errors.push("Not verified cridentials!")

      // update the password here
    if(Password.length < 6) {
      errors.push("Password must be more than 6 characters length!")
    }
    next()
  } catch (error) {
    return res.status(500).json({message: 'Please Authenticate!'})
  }
}


  




module.exports = {
  validateReg,
  validateEmail,
  validatelogin,
  validateDeletedUser,
  validateForgotPassword,
  validateResetPassword
 
}