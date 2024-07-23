const Users = require("../models/userSchema")
const bcrypt = require("bcrypt")
const path = require("path")
const jsonwebtoken = require("jsonwebtoken")
const dotenv = require("dotenv")
const crypto = require("crypto")
const {sendVerification} = require("../utility/sendVerification")




const createToken = (_id) =>{
  const jwtSecretKey = process.env.JWT_ACCESSTOKEN;
  return jsonwebtoken.sign({ _id }, jwtSecretKey, {expiresIn: "1h"})
}
// i have not add full authentication and authorization
//REGISTER A USER

const register = async(req, res)=>{
  const {fullname, email, password, role, phoneNumber} = req.body
  try{
    const ExistingUser = await Users.findOne({email})
       if(ExistingUser) return res.status(401).json( "User already Exist!")
        
        const User = new Users({fullname, email, password, role, phoneNumber, emailToken: crypto.randomBytes(64).toString("hex"),
        })
      //hashe the password and set new password to be hashed password
      const hashedPassword = await bcrypt.hash(password, 12)
          
      await User.save()

      sendVerification(User)
      
      const passToken = createToken(User._id)
        return res.status(200).json({ 
              message: "successful",
              User: {_id: User._id,
                     fullname,
                       email,
                     role,
                     phoneNumber,
                     passToken}    
      })  
  } catch (error) {
    return res.status(500).json({message: error.message})
  } 
  }

  

  //login user
const login = async(req, res)=>{
  
    try{

    const {email, password} = req.body
    const User = await Users.findOne({email})
    if(!User){
      return res.status(400).json({
        message: "User not Found!."
      })
    }
// checking password match
const matchPassword = await  bcrypt.compare(password, User.password)
if(!matchPassword){
  return res.status(401).json({
    message: "Invalid Credential!."
  })
  }  
//GENERATE COOKIE PASSTOKEN AND SEND TO THE USER USING JSONWEBTOKEN


const passToken = jsonwebtoken.sign({
  id: User._id,
  role: User.email,
}, process.env.JWT_ACCESSTOKEN,{expiresIn: "7d"})

res.cookie("passToken", passToken, {
  httpOnly: true, 
  //secure: tr ue
  
}) 
return res.status(200).json({
  message: "login successful",
  passToken,
  User
})    
    } catch (error) {
    return res.status(500).json({message: "can not logIn"})
  } 
    }
  
 const logout =async(req, res)=>{
  try{

    res.clearCookie("passToken")
 return res.status(200).json({
  message: "Logout Successful"
 })
  } catch (error) {
    return res.status(500).json({message: "can't Logout!"})
  }
 
} 

//forgot password
const forgotPassword = async(req, res)=>{

  try{
    const {email} = req.body
const User = await Users.findOne({email})

if(!User){
  return res.status(400).json({message: "User Not found!"})
}


const passToken = await jsonwebtoken.sign({
  id: User._id,
 email: User.email
}, process.env.JWT_ACCESSTOKEN,{expiresIn: "1h"})

 
console.log(link) 
return res.status(200).json({
message: "successful."
})
  } catch (error) {
    return res.status(500).json({message: error.message})
  } 
} 

 
 //reset password function will come here
const resetpassword = async (req, res)=>{
  try{
    const {password, passToken} = req.body
    //const { passToken} = req.params
    console.log(req.params)
    const User = await Users.findOne({passToken})
     if(!User){
    return  res.status(200).json({
        message: "User not found"
      })
    } 
    
    const verify = jsonwebtoken.verify(passToken, User.password)
     if(!verify){
      return res.status(403).json({message: "Unauthorised!"})
    } 
    const hashedPassword = await bcrypt.hash(password, 12)
    User.password = hashedPassword
    await User.save()
     
  } catch(error){
    return res.status(500).json({message: error.message})
  }
}


const verifyEmail = async (req, res) =>{

  try {
    const emailToken = req.body.emailToken

    if(!emailToken) return res.status(404).json("EmailToken not found!")
      
      const User = await Users.findOne({emailToken })

    if(User) {
      User.emailToken = null;
      User.isVerified = true;
    
      await User.save()

      const passToken = createToken(User._id)
      return res.status(200).json({message: "successful",
        _id: User._id,
        name: User.fullname,
        email: User.email,
        role: User.role,
        phoneNumber: User.phoneNumber,
        passToken,
        isVerified: User?.isVerified,

      })
    } else res.status(404).json("Email verification failed, invalid passToken!.")
  } catch (error) {
    console.log(error)
    res.status(500).json(json(error.message))
  }
}




 

module.exports = {
  register,
  login,   
  logout,
  forgotPassword,
  resetpassword,  
  verifyEmail

}
 