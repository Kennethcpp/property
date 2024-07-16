const jsonwebtoken = require("jsonwebtoken")

const verifyToken = async (req, res, next)=>{
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


const verifyAdmin = async = (req, res, next)=>{

    try{
        const passToken = req.cookies.passToken

        if(!passToken) return res.status(401).json({ message: "not Authenticated!"})
        
         jsonwebtoken.verify(passToken, process.env.JWT_ACCESSTOKEN, async (err, payload)=>{
        if(err) return res.status(403).json({message: "Invalid Token!"})
        if(!payload.isAdmin){
            return res.status(403).json({message: "You are not an Admin!"})
        }
       })

    } catch (error){
        return res.status(500).json({message: error.message})
    }
    next()
}


module.exports = {
    verifyToken,
    verifyAdmin
}