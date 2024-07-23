
const Users = require("../models/userSchema")
const cors = require('cors')
const jsonwebtoken = require("jsonwebtoken")
const bcrypt = require("bcrypt")



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
  let errors =[]
  if(!Users){
    errors.push("User not found")
  }else if(!passToken){
    errors.push("Access has been denied.")
  }
  next()
  
}




  




module.exports = {
  validateReg,
  validateEmail,
  validatelogin,
  validateDeletedUser,
  validateForgotPassword,
}