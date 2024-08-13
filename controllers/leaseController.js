
const Users = require("../models/userSchema")
const Property = require('../models/propertySchema');
const Lease = require("../models/leaseSchema")
const jsonwebtoken = require('jsonwebtoken')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);




exports.createLease = async (req, res) => {
    const {email, startDate, endDate, yearlyRent } = req.body;
    const {id} = req.params
    try {
         const propertys =  await Property.findById(id)
         if(!propertys){
            return res.status(401).json({message: 'this property is not available!'})
         }
        
         const User = await Users.findOne({email})
         if(!User)  {
            return res.status(403).json({message: "user not rigistered! please register first"})
         }
         if(propertys, User ) {
            const leaseToken = await jsonwebtoken.sign({
                id: Lease._id,
                id: User.email,
                id: propertys._id
            }, process.env.PROPERTY_TOKEN )

            const lease = new Lease({
                email,
                startDate,
                endDate,
                yearlyRent,
            });
            await lease.save().then(
                  await paystack.transaction.initialize({
                    email: email,
                    amount: amount * 100,
                    plan: `${process.env.PAYSTACK_PLAN_CODE}`,
                    channels: ['card'], // limiting the checkout to show card, as it's the only channel that subscriptions are currently available through
                    callback_url: `${process.env.SERVER_URL}/account.html`,
                  })

                  
            )
            return res.status(200).json({message: 'payment Successful!',
                lease,
                leaseToken
            })
          
         }else{
            return res.status(500).json({message: 'payment was not Successful try again!',
                

            })
         }   
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.getLease = async (req, res) => {
    try {
        const leaseToken = req.params
        const checkInfo = await jsonwebtoken.verify({leaseToken})

        if(leaseToken.include(propertys._id, Lease._id, User.email)){
            return res.status(200).json({
                message: "success!",
                checkInfo
            })
        }else {
            return res.status(401).json({message: 'Lease not found!'})
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};
