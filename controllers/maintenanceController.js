const MaintenanceRequest = require("../models/MaintenanceSchema");

exports.createMaintenanceRequest = async (req, res) => {
    const { propertyId, description } = req.body;
    try {
        const maintenanceRequest = new MaintenanceRequest({
            property: propertyId,
            tenant: req.User._id,
            description
        });
        await maintenanceRequest.save();
        res.json(maintenanceRequest);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getMaintenanceRequest = async (req, res) => {
    try {
        const maintenanceRequest = await MaintenanceRequest.findById(req.params._id).populate('property').populate('tenant');
        if (!maintenanceRequest) {
            return res.status(404).json({ msg: 'Maintenance request not found' });
        }
        res.json(maintenanceRequest);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateMaintenanceRequest = async (req, res) => {
    const { status } = req.body;
    try {
        const maintenanceRequest = await MaintenanceRequest.findById(req.params.id);
        if (!maintenanceRequest) {
            return res.status(404).json({ msg: 'Maintenance request not found' });
        }
        maintenanceRequest.status = status;
        await maintenanceRequest.save();
        res.json(maintenanceRequest);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


