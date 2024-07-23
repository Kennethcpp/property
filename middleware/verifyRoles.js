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


const verifyToken = async(req, res, next)=>{
   try {
    const passToken = req.cookies.passToken

    if(!passToken) {
        return res.status(401).json({ message: "not Authenticated!"})
    } 
    
     await jsonwebtoken.verify(passToken, process.env.JWT_ACCESSTOKEN, async (err, payload)=>{
        if(err) return res.status(403).json({message: "Invalid Token!"})
         req.UserId = payload.id
        next()
       })

   } catch (error) {
    return res.status(500).json({message: error.message})
  }
}


const verifyTenants =  (permissions)=>{

    try{
        
        return (req, res, next) =>{
            const userRole = req.body.role
            if (permissions.includes(userRole)) {
                next()
            } else {
                return res.status(401).json("Your are not a tenant!")
            }
        }
    } catch (error){
        return res.status(500).json({message: error.message})
    }
}

const verifyAdmin =  (permissions)=>{

    try{
        
        return (req, res, next) =>{
            const userRole = req.body.role
            if (permissions.includes(userRole)) {
                next()
            } else {
                return res.status(401).json("Your are not an Admin!")
            }
        }
    } catch (error){
        return res.status(500).json({message: error.message})
    }
}




module.exports = {
    verifyToken,
    verifyTenants,
    verifyAdmin,
    shouldBeLogedIn
}