const mongoose = require("mongoose")

const LeaseSchema = new mongoose.Schema({
  //mongoose.Schema.Types.ObjectId,
   email:{
    type: String,
    require: true
   },
    startDate: { type: Date,
     required: true
     },
    endDate: { type: Date,
     required: true 
    },
    yearlyRent: { type: Number,
     required: true
     },
     isTenant: {
      type: Boolean, 
      default: true 
     },
    payments: [{ amount: Number,
     date: Date
     }]
},
{ timestamps: true }
);


const Lease = new mongoose.model("Lease", LeaseSchema)

module.exports = Lease

  