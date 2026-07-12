const mongoose = require('mongoose');
const userModel = require('../model/user.model');
const companyModel = require('../model/company.model');
const jobModel = require('../model/job.model');
const { uploadFile } = require('../services/storage.service');  


async function registerCompany(req, res) {

    try{    
        const { name, industry, location } = req.body;

        if(!name || !industry || !location) {
            return res.status(400).json({success: false, message: "Name, industry and location are required."});
        }

        const decoded = req.user;

        let logoUrl = "";

        if(req.file) {
            const file = req.file;
            const result = await uploadFile(file.buffer.toString('base64'), `logo_${Date.now()}`, "jobify/company");

            logoUrl = result.url;
        }

        const company = await companyModel.create({
            owner: decoded.id,
            name: req.body.name,
            logo: logoUrl,
            website: req.body.website,
            industry: req.body.industry,
            location: req.body.location,
            description: req.body.description,
            employees: req.body.employees,
            founded: req.body.founded,
            jobTypes: req.body.jobTypes ? JSON.parse(req.body.jobTypes) : [],
            workModes: req.body.workModes ? JSON.parse(req.body.workModes) : [],
        })

        return res.status(201).json({
            success: true, 
            message: "Company created successfully",
            data: company,
        })
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false, 
            message: "Internal Server Error",
        });
    }
};


async function getAllCompanies(req, res) {

    try{     

        const filter = {};

        if(req.query.search) {
            const search = req.query.search.trim().split("").join("|");
            filter.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i",
                    }
                },
                {
                    location: {
                        $regex: search,
                        $options: "i",
                    }
                }
            ]
        }

        if(req.query.jobTypes) {
            const jobType = req.query.jobTypes.split(",");
            filter.jobTypes = {
                $in: jobType,
            }
        }

        if(req.query.workModes) {
            const workMode = req.query.workModes.split(",");
            filter.workModes = {
                $in: workMode,
            }
        }

        if (req.query.size) {
            if (req.query.size === "startup") {
                filter.employees = {
                    $lte: 100,
                };
            }
            else if (req.query.size === "medium") {
                filter.employees = {
                    $gt: 100,
                    $lte: 10000,
                };
            }
            else if (req.query.size === "large") {
                filter.employees = {
                    $gt: 10000,
                };
            }
        }

        let companiesQuery = companyModel.find(filter);

        const limit = Number(req.query.limit);

        if (limit > 0) {
        companiesQuery = companiesQuery.limit(limit);
        }

        const companies = await companiesQuery;

        return res.status(200).json({
            success: true, 
            message: "Companies Fetched successfully",
            data: companies,
        })
    }
     catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false, 
            message: "Internal Server Error",
        });
    }

};


async function getCompany(req, res) {

    try{    
        const id = req.params.companyId;

        const company = await companyModel.findById(id).populate("owner", "name email avatar");

        return res.status(200).json({
            success: true, 
            message: "Company Fetched successfully",
            data: company,
        })
    }
     catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false, 
            message: "Internal Server Error",
        });
    }
};


async function modifyCompany(req, res) {

    try { 
        const company = req.company;

        const updateData = {};

        if (req.body.industry !== undefined) {
            updateData.industry = req.body.industry;
        }

        if (req.body.location !== undefined) {
            updateData.location = req.body.location;
        }

        if (req.body.description !== undefined) {
            updateData.description = req.body.description;
        }

        if (req.body.employees !== undefined) {
            updateData.employees = req.body.employees;
        }

        if (req.body.founded !== undefined) {
            updateData.founded = req.body.founded;
        }

        if (req.body.jobTypes !== undefined) {
            updateData.jobTypes = JSON.parse(req.body.jobTypes);
        }

        if (req.body.workModes !== undefined) {
            updateData.workModes = JSON.parse(req.body.workModes);
        }

        if(req.file) {
            const result = await uploadFile(req.file.buffer.toString('base64'), `logo_${Date.now()}`, "jobify/company");
            
            updateData.logo = result.url;
        }

        Object.assign(company, updateData);
        await company.save();

        return res.status(200).json({
            success: true, 
            message: "Company Updated successfully",
            data: company,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false, 
            message: "Internal Server Error",
        });
    }

}


async function deleteCompany(req, res) {

    try{    
        const companyId = req.params.companyId;

        await req.company.deleteOne();

        return res.status(200).json({success: true, message: "Company Deleted successfully"});
    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false, 
            message: "Internal Server Error",
        });
    }

}


async function getMyJobs(req, res) {

    try{

        const decoded = req.user;
        
        const company = await companyModel.findOne({owner: decoded.id,});

        if(!company) {
            return res.status(404).json({success: false, message: "Create company first"});
        }

        let filter = {
            company: company._id,
        };

        if (req.query.search) {

            filter.$or = [
                {
                    title: {
                        $regex: req.query.search,
                        $options: "i"
                    }
                },
                {
                    location: {
                        $regex: req.query.search,
                        $options: "i"
                    }
                },
            ]
        }

        if(req.query.workMode) {
            const workModes = req.query.workMode.split(",");
            filter.workMode = {
                $in: workModes,
            }
        }

        if(req.query.employmentType) {
            const employmentTypes = req.query.employmentType.split(",");
            filter.employmentType = {
                $in: employmentTypes,
            }
        }

        if(req.query.salary) {
            filter.maxSalary = {
                $gte: Number(req.query.salary),
            }
        }

        let sortOption = { createdAt: -1 };

        if (req.query.sort === "oldest") {
            sortOption = { createdAt: 1 };
        }
        else if (req.query.sort === "newest") {
            sortOption = { createdAt: -1 };
        }
        else if (req.query.sort === "salary_desc") {
            sortOption = { maxSalary: -1 };
        }
        else if(req.query.sort === "salary_asc"){
            sortOption = { maxSalary: 1 };
        }

        const jobs = await jobModel.find(filter).populate("company", "name logo").sort(sortOption);

        return res.status(200).json({
            success: true, 
            message: "Here are your listed jobs",
            data: jobs,
        })

    }
    catch(err) {
        console.log(err);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }

};


module.exports = { registerCompany, getAllCompanies, getCompany, modifyCompany, deleteCompany, getMyJobs }

