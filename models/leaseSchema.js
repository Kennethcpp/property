const mongoose = require("mongoose")

const LeaseSchema = new mongoose.Schema({
  //mongoose.Schema.Types.ObjectId,
    property: { type: String,
     ref: 'Property',
      required: true
     },
     //mongoose.Schema.Types.ObjectId,
    tenant: { type: String,
     ref: 'User',
      required: true 
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
});


const Lease = new mongoose.model("Lease", LeaseSchema)

module.exports = Lease

  