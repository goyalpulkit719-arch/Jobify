const companyModel = require('../model/company.model');
const mongoose = require('mongoose');

async function isCompanyOwner(req, res, next) {

    try {
        
        const decoded = req.user;
        const companyId = req.params.companyId;
        
        if (!mongoose.Types.ObjectId.isValid(companyId)) {
            return res.status(400).json({success: false,  message: "Invalid company id" });
        }
        
        const company = await companyModel.findById(companyId);
        if(!company) {
            return res.status(404).json({success: false, message: "Company not found"});
        }
        
        if(decoded.id !== company.owner.toString()) {
            return res.status(403).json({success: false, message: "Only owner can modify/delete"});
        }
        
        req.company = company;
        next();
        
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false, 
            message: "Internal Server Error",
        });
    }

}

module.exports = { isCompanyOwner };