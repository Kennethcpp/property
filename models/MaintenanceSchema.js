const mongoose = require('mongoose');

const MaintenanceRequestSchema = new mongoose.Schema({
    property: { 
      type: mongoose.Schema.Types.ObjectId,
       ref: 'Property',
        required: true 
      },
    tenant: { 
      type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
        required: true 
      },
    description: { 
      type: String, 
      required: true
     },
    status: { 
      type: String,
       enum: ['pending', 'in_progress', 'completed'],
        default: 'pending'
       }
});

const MaintenanceRequest = new mongoose.model("MaintenanceRequest", MaintenanceRequestSchema)
module.exports = MaintenanceRequest  