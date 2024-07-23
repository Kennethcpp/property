const Users = require("../models/userSchema")
const jsonwebtoken = require("jsonwebtoken")

const getAllTenant = async(req, res)=>{
    try{
        const User = await Users.find()
        return res.status(200).json({ message: "successful",
          count: User.length,
          User
        })
    } catch(error){
        return res.status(500).json({message: "Can't get All the Tenant Now!"})
    }
}

const getOneTenant = async(req, res)=>{
    try{

        const {id} = req.params
    const User = await Users.findById(id)
    return res.status(200).json({
      message: "successful",
      User
    })

    } catch(err){
        return res.tsatus(500).json({message: "Can't get This Users!"})
    }
}

const updateTenant = async(req, res)=>{
    try{

        const {id} = req.params.id
      const {fullname, email, password, phoneNumber} = req.body

      const updateTenant = await Users.findByIdAndUpdate(
      id,
      {fullname, email, password, phoneNumber},
      {new: true}
    )
      return res.status(200).json({
        message: "Your Record was updated successfully.",
        User: updateTenant 
      })

    } catch(err){
        return res.tsatus(500).json({message: "Can Not Update This Users!"})
    }
}

const deleteTenant = async(req, res)=>{
    try{

        const { id } = req.params
        const deleteTenant = await Users.findByIdAndDelete(id)
    
        return res.status(200).json({
          message: "deleted successfully."
        })

    } catch(err){
        return res.tsatus(500).json({message: "Can't get Users!"})
    }
}


module.exports = {
    getAllTenant,
    getOneTenant,
    updateTenant,
    deleteTenant

}