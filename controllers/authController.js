const Users = require("../models/userSchema")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")




// i have not add full authentication and authorization
//REGISTER A USER
const register = async(req, res)=>{
  try{

    const {fullname, email, password} = req.body
    const ExistingUser = await Users.findOne({email})
       if(ExistingUser){
        return res.status(401).json({
          message: "User already Exist!"
        })

       } 
      //hashe the password and set new password to be hashed password
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new Users({fullname, email, password: hashedPassword})
        await user.save()
          return res.status(200).json({ 
              message: "successful",
              user: {fullname, email}    
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
        message: "No registered user with this input."
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
const userPayload = {
  id: User._id,
  email: User.email
}
const passToken = await jsonwebtoken.sign(userPayload, process.env.PASSTOKEN,
   {expiresIn: '7d'})
res.cookie("passToken", "passToken", {
  httpOnly: true, 
  //secure: true
  //secure true should be uncommented before deployment
  
}) 
return res.status(200).json({
  message: "login successful",
  passToken,
  User
})    

    } catch (error) {
    return res.status(500).json({message: error.message})
  } 

    }
  
 const logout =async(req, res)=>{
 res.clearCookie("passToken")
 return res.status(200).json({
  message: "Logout Successful"
 })

} 

//forgot password
const forgotPassword = async(req, res)=>{

  try{

    const {fullname, email } = req.body
const User = await Users.findOne({email})

if(!User){
  return res.status(400).json({message: "User is invalid"})
}
const userPayload = {
id: User._id, 
email: User.email
} 

//generate passToken 
const passToken = jsonwebtoken.sign(userPayload, process.env.PASSTOKEN, {expiresIn: '30m'})
const websiteURL = `www.example.com/${passToken}`

//email will be send to user with the reset password url here
return res.status(200).json({
message: "successful."
})

  } catch (error) {
    return res.status(500).json({message: error.message})
  } 
} 

 
 //reset password function will come here



module.exports = {
  register,
  login, 
  logout,
  forgotPassword,

}
 