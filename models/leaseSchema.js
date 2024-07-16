const mongoose = require("mongoose")

const LeaseSchema = new mongoose.Schema({
    property: { type: mongoose.Schema.Types.ObjectId,
     ref: 'Property',
      required: true
     },
    tenant: { type: mongoose.Schema.Types.ObjectId,
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
    payments: [{ amount: Number,
     date: Date
     }]
});


const Lease = new mongoose.model("Lease", LeaseSchema)

module.exports = Lease
//module.exports = mongoose.model('Lease', LeaseSchema);
 