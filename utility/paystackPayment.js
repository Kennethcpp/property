const propertyController = require("../controllers/propertyController")
const customer = require("../models/customerSchema")
const cors = require('cors')

const https = require('https')

const paystackPayment = async(req, res)=>{

try{

 
  const https = require('https')


const params = JSON.stringify({

  "email": email,

  "amount": amount,


  "plan": "PLN_tk31kcu9tg9z06s"

})


const options = {

  hostname: 'api.paystack.co',

  port: 443,

  path: '/transaction/initialize',

  method: 'POST',

  headers: {

    Authorization: 'Bearer sk_live_d29d630d37035b556da5f20c5712f8b9f61b0cbc',

    'Content-Type': 'application/json'

  }

}


const req = https.request(options, res => {

  let data = ''


  res.on('data', (chunk) => {

    data += chunk

  });


  res.on('end', () => {

    console.log(JSON.parse(data))

  })

}).on('error', error => {

  console.error(error)

})


req.write(params)

req.end()
await customers.save()
} catch(error){
    return res.status(500).json({message: error.message})
}
}


    


module.exports = {paystackPayment}
