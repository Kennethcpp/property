const mongoose = require("mongoose")

const costomerSchema = new mongoose.Schema({

    email:{
        type: String,
        require: true,
        unique: true
    },
    plan: {
        type: String,
        
    },
    amount: {
        type: Number,
        require: true
        
    },
    name:{
        type: String,
    },
},
{ timestamps: true }
)



const costomer = new mongoose.model("costomer", costomerSchema)

module.exports = costomer