
const jsonwebtoken = require("jsonwebtoken")
const bcrypt = require("bcrypt")
 


 

const shouldBeLogedIn = async(req, res)=>{
    try{
        console.log(req.UserId)
    return res.status(200).json({message: "You are Authenticated!"})

    } catch (error) {
        return res.status(500).json({message: error.message})
      } 
}
 
const shouldBeAdmin = async(req, res)=>{
    try{
        const passToken = req.cookies.passToken

        if(!passToken) return res.status(401).json({ message: "not Authenticated!"})
        
      await jsonwebtoken.verify(passToken, process.env.JWT_ACCESSTOKEN, async (err, payload)=>{
        if(err) return res.status(403).json({message: "Invalid Token!"})
        if(!payload.isAdmin){
            return res.status(403).json({message: "You are not an Admin!"})
        }
       })
    return res.status(200).json({message: "You are Authenticated!"})

    } catch (error) {
        return res.status(500).json({message: error.message})
      } 

}
 

///






module.exports = {
    shouldBeLogedIn,
    shouldBeAdmin

}