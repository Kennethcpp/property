const https = require('https') 
const {paystackPayment} = require("../utility/paystackPayment")
const jsonwebtoken = require("jsonwebtoken")
const path = require('path');
const multer = require('multer')
const Property = require('../models/propertySchema');
const Users = require("../models/userSchema")




exports.createProperty =  async (req, res) => {

    try {
        const { title, price, address, city, bedroom, bathroom, type, property } = req.body;
        const images = req.files ? req.files.map(file => file.path) : [];

        const propertys = new Property({
            
            title,
             price, 
             images,
            address, 
            city, 
            bedroom,
            bathroom, 
            type, 
            property,
           
        });
        const propToken = jsonwebtoken.sign({
            id: propertys._id,
            
          }, process.env.PROPERTY_TOKEN)
          
          res.cookie("propToken", propToken, {
            httpOnly: true, 
            //secure: true
            
          }) 
        
        await propertys.save();
        res.status(200).json({message: "Successfull",
          id: propertys._id,
            title: propertys.title,
             price: propertys.price, 
             images: propertys.images,
            address: propertys.address, 
            city: propertys.city, 
            bedroom: propertys.bedroom,
            bathroom: propertys.bathroom, 
            type: propertys.type, 
            property: propertys.property,
            propToken
            
            
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};


exports.getProperty= async(req, res)=>{
    try{

        const {id} = req.params
    const propertys = await Property.findById(id)
    return res.status(200).json({
      message: "successful",
      propertys
    })

    } catch(err){
        return res.tsatus(500).json({message: "Can't get This property at the moment!"})
    }
}

exports.updateProperty = async(req, res)=>{
    try{

        const {id} = req.params
      const {title, price, images, address, city, bedroom, bathroom, type, property} = req.body

      const updateProperty = await Users.findByIdAndUpdate(
      id,
      {title, price, images, address, city, bedroom,bathroom, type, property},
      {new: true}
    )
      return res.status(200).json({
        message: "Your Record was updated successfully.",
        propertys: updateProperty 
      })

    } catch(err){
        return res.tsatus(500).json({message: "Can Not Update This Property!"})
    }
}

exports.deleteProperty = async(req, res) =>{
    const id = req.params
    try{

        await Property.findByIdAndDelete(id)
        return  res.status(200).json({message: "Successful!"})
    } catch (error) {
        console.log(error)
    } return res.status(500).json({message: "Failed to delete  Post"})

}

exports.buyProperty = async (req, res) => {
    const { type } = req.body;
    const { id } = req.params
    try {
        const propertys = await Property.findById(id);
        if (!propertys || propertys.type !== 'sale') {
            return res.status(404).json({ msg: 'Not available for sale!' });
        }else{

            const initializeTransaction = await paystack.transaction.initialize({
                email: Users.email,
                amount: propertys.price * 100,
                plan: `${process.env.PAYSTACK_PLAN_CODE}`,
                channels: ['card'], // limiting the checkout to show card, as it's the only channel that subscriptions are currently available through
                callback_url: `${process.env.SERVER_URL}/account.html`,
              });
            
              if (initializeTransaction.status === false) {
                return console.log(
                  'Error initializing transaction: ',
                  initializeTransaction.message
                );
              }
        }  
          const transaction = initializeTransaction.data;
         propertys.isAvailable = false,
          propertys.isforSale = false,
        await propertys.save()
       
        return res.status(200).send(transaction);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


