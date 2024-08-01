const https = require('https') 
const {paystackPayment} = require("../utility/paystackPayment")
const jsonwebtoken = require("jsonwebtoken")
const path = require('path');
const multer = require('multer')
const Property = require('../models/propertySchema');
const Users = require("../models/userSchema")
//const PostDetail = require("../models/postDetailsSchema")








exports.createProperty =  async (req, res) => {

    try {
        const passToken = req.cookies.passToken

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
        
        await propertys.save();
        res.status(200).json({message: "Successfull",
            title: propertys.title,
             price: propertys.price, 
             images: propertys.images,
            address: propertys.address, 
            city: propertys.city, 
            bedroom: propertys.bedroom,
            bathroom: propertys.bathroom, 
            type: propertys.type, 
            property: propertys.property,
            
            
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};


exports.getProperty = async (propertyId, userId) => {
    try {
      const property = await Property.findById(propertyId);
  
      if (!property) {
        return { error: 'Property not found' };
      }
  
      if (property.userId.toString() !== userId.toString()) {
        return { error: 'Unauthorized access' };
      }
      console.log(property)
      return { property };
    } catch (error) {
      return { error: 'An error occurred' };
    }
  };

exports.updateProperty = async(req, res) =>{
    try{

        return  res.status(200).json({message: "Successful!"})
    } catch (error) {
        console.log(error)
    } return res.status(500).json({message: "Failed to update Post"})

}

exports.deleteProperty = async(req, res) =>{
    const id = req.params.id
    const passToken = req.cookies.passToken
    try{

        if(Property.User._Id !== passToken) {
            return res.status(404).json({message: "not authorized!"})
        }
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
        const property = await Property.findById(id);
        if (!property || property.type !== 'sale') {
            return res.status(404).json({ msg: 'Not available for sale!' });
        }
      
        const initializeTransaction = await paystack.transaction.initialize({
            email: Users.email,
            amount: property.price * 100,
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
          const transaction = initializeTransaction.data;
         property.isAvailable = false,
          property.isforSale = false,
        await property.save()
       
        return res.status(200).send(transaction);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


