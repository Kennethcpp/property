const jsonwebtoken = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Users = require("../models/userSchema")





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


const verifyTenants =  (passToken)=>{
    
   
    

  return async (req, res, next) =>{
      const passToken = req.cookies.passToken
      if (!passToken) {
          res.status(401).json({
            message: 'Access Denied!.'
          });
        } else {
          await jsonwebtoken.verify(passToken, process.env.JWT_ACCESSTOKEN, function (error, payload) {
            if (error) {
              res.status(401).json({
                message: 'Invalid Token'
              });
            } else {
              if (payload.role.includes('tenant')) {
                next();
              } else {
                res.status(403).json({
                  message: 'You are not Authorisez!.'
                })
              }
            }
          });
        };
      
  }

}

const verifyAdmin =  (passToken)=>{
    
   
    

        return async (req, res, next) =>{
            const passToken = req.cookies.passToken
            if (!passToken) {
                res.status(401).json({
                  message: 'Access Denied! please login first!.'
                });
              } else {
                const decoded = await jsonwebtoken.verify(passToken, process.env.JWT_ACCESSTOKEN, function (error, payload) {
                  if (error) {
                    res.status(401).json({
                      message: 'Invalid Token'
                    });
                  } else {
                    if (payload.role.includes('manager' || 'owner')) {
                      next();
                    } else {
                      res.status(403).json({
                        message: 'You are not Authorisez!.'
                      })
                    }
                  }
                
                });
              };
            
        }
    
}


// VERIFY PROTERTY OWNER
const verifyOwner =  (passToken)=>{
    
   
    

  return async (req, res, next) =>{
      const propToken = req.cookies.propToken
      if (!propToken) {
          res.status(401).json({
            message: 'Access Denied! Invalid passtoken!.'
          });
        } else {
          const decoded = await jsonwebtoken.verify(propToken, process.env.PROPERTY_TOKEN, function (error, payload) {
            if (error) {
              res.status(401).json({
                message: 'Invalid Token'
              });
            } else {
              if (payload.propertys.includes(propertys._id)) {
                next();
              } else {
                res.status(403).json({
                  message: 'You are not Authorisez!.'
                })
              }
            }
          
          });
        };
      
  }

}

// Middleware to check if the user owns the post
async function checkPostOwnership(req, res, next) {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}





module.exports = {
    verifyToken,
    verifyTenants,
    verifyAdmin,
    shouldBeLogedIn,
    verifyOwner
   
  
}