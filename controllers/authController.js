const Users = require("../models/userSchema")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")
const dotenv = require("dotenv")




// i have not add full authentication and authorization
//REGISTER A USER
const register = async(req, res)=>{
  const {fullname, email, password, role} = req.body
  try{
    const ExistingUser = await Users.findOne({email})
       if(ExistingUser){
        return res.status(401).json({
          message: "User already Exist!"
        })

       } 
      //hashe the password and set new password to be hashed password
      const hashedPassword = await bcrypt.hash(password, 12)
      const User = new Users({fullname, email, password: hashedPassword})
        await User.save()
        const payload = { User: { id: User.id, role: User.role } };
        const token = jwt.sign(payload, process.env.JWT_ACCESSTOKEN, { expiresIn: '1h' });
          //res.json({ token })
          return res.status(200).json({ 
              message: "successful",
              user: {fullname, email, role}    
      })  
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
  }

  //login user
const login = async(req, res,)=>{
  const {email, password} = req.body
    try{
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
const age = 1000 *60 * 24 * 7
const payload = { Users: { id: User.id, role: User.role } };
const passToken = jsonwebtoken.sign({
  id: User.id,
  isAdmin: true
}, process.env.JWT_ACCESSTOKEN,{expiresIn: age})

res.cookie("passToken", passToken, {
  httpOnly: true, 
  //secure: tr ue
  maxAge: age
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


const passToken = await jsonwebtoken.sign({
  id: User.id,
}, process.env.JWT_ACCESSTOKEN,{expiresIn: "7d"})

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
 