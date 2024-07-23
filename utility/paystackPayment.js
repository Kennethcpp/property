const propertyController = require("../controllers/propertyController")
const cors = require('cors')

const https = require('https')

const paystackPayment = (req, res)=>{

try{

    const https = require('https')

    const params = JSON.stringify({
        "email": "customer@email.com",
        "amount": "15000000"
      })
      
      const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
          Authorization: 'Bearer sk_test_33d8f6fd38feb1a347831e22d8340dd46cb0f398',
          'Content-Type': 'application/json'
        }
      }
      
      const reqpaystack = https.request(options, respaystack => {
        let data = ''
      
        respaystack.on('data', (chunk) => { 
          data += chunk
        });
      
        respaystack.on('end', () => {
          console.log(JSON.parse(data))
        })
      }).on('error', error => {
        console.error(error)
      })
      
      reqpaystack.write(params)
      reqpaystack.end()

} catch(error){
    return res.status(500).json({message: error.message})
}
}


    


module.exports = {paystackPayment}