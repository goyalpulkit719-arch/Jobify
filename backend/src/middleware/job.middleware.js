const mongoose = require('mongoose');
const jobModel = require('../model/job.model');

async function isJobOwner(req, res, next) {

    try {
        
        const id = req.params.jobId;
        
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({success: false,  message: "Invalid jobId" });
        }
        
        const decoded = req.user;
        const job = await jobModel.findById(id);
        
        if(!job) {
            return res.status(404).json({success: false, message: "Job not found"});
        }
        
        if(job.createdBy.toString() !== decoded.id) {
            return res.status(403).json({success: false, message: "Only owner can modify/delete"});
        }
        
        req.job = job;
        return next();
        
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false, 
            message: "Internal Server Error",
        });
    }


};


module.exports = { isJobOwner }