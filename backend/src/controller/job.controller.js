const jobModel = require('../model/job.model');
const companyModel = require('../model/company.model');


async function registerJob(req, res) {

    try {
        const decoded = req.user;

        const company = await companyModel.findOne({owner: decoded.id})

        if(!company) {
            return res.status(400).json({success: false, message: "Create a company before registering job"});
        }

        const {title, employmentType, location, workMode } = req.body;

        if(!title || !employmentType || !location || !workMode) {
            return res.status(400).json({success: false, message: "Title, EmploymentType, Location and WorkMode is required"});
        }

        if(Number(req.body.minSalary) >= Number(req.body.maxSalary)) {
            return res.status(400).json({success: false, message: "minSalary must be lesser than maxSalary"})
        }


        const job = await jobModel.create({
            createdBy: decoded.id,
            company: company._id,
            title: title,
            employmentType: employmentType,
            minSalary: req.body.minSalary,
            maxSalary: req.body.maxSalary,
            location: location,
            workMode: workMode,
            benefits: req.body.benefits,
            description: req.body.description,
            isActive: true,
        });

        return res.status(201).json({
            success: true, 
            message: "Job registered successfully",
            data: {job,
            logo: company.logo,}
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


async function getAllJobs(req, res) {

    try{   
        let filter = {
            isActive: true,
        };

        if (req.query.search) {

            const search = req.query.search.trim().split(" ").join("|");

            const companies = await companyModel.find({
                name: {
                    $regex: search,
                    $options: "i",
                }
            }).select("_id");
            
            const companyIds = companies.map(company => company._id);

            filter.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    location: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    company: {
                        $in: companyIds,
                    }
                }
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
            };
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

        let jobsQuery = jobModel
            .find(filter)
            .populate("company", "logo name")
            .sort(sortOption);

        const limit = Number(req.query.limit);

        if (limit > 0) {
            jobsQuery = jobsQuery.limit(limit);
        }

        const jobs = await jobsQuery;

        return res.status(200).json({
            success: true, 
            message: "Jobs Fetched successfully",
            data: jobs,
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


async function getJobDetails(req, res) {

    try{    
        const jobId = req.params.jobId;

        const job = await jobModel.findById(jobId).populate("company", "name logo website").populate("createdBy", "name");

        if(!job) {
            return res.status(404).json({success: false, message: "Job Not Found"});
        }

        return res.status(200).json({
            success: true, 
            message: "Job details fetched successfully",
            data: job,
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


async function modifyJob(req, res) {

    try {
    
        const job = req.job;
        
        const updateData = {};

        const { employmentType, minSalary, maxSalary, location, workMode, benefits, description } = req.body;

        if(employmentType) updateData.employmentType = employmentType;
        if(minSalary != undefined) updateData.minSalary = minSalary;
        if(maxSalary != undefined) updateData.maxSalary = maxSalary;
        if(location) updateData.location = location;
        if(workMode) updateData.workMode = workMode;
        if(benefits != undefined) updateData.benefits = benefits;
        if(description != undefined) updateData.description = description;

        const newMin = updateData.minSalary ?? job.minSalary;
        const newMax = updateData.maxSalary ?? job.maxSalary;

        if (newMin >= newMax) {
            return res.status(400).json({
                success: false, 
                message: "minSalary must be less than maxSalary",
            });
        }

        Object.assign(job, updateData);
        await job.save();

        return res.status(200).json({
            success: true, 
            message: "Job updated successfully",
            data: job,
        })

    
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false, 
            message: "Internal Server Error",
        });
    }

}


async function inActiveJob(req, res) {
    const job = req.job;
    job.isActive = false;
    await job.save();

    return res.json({
        success: true, 
        message: "Job inActive successfully"
    })
}

async function toggleJobStatus(req, res) {
    try {
        const job = req.job;

        job.isActive = !job.isActive;

        await job.save();

        return res.status(200).json({
            success: true, 
            message: `Job ${job.isActive ? "activated" : "deactivated"} successfully`,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false, 
            message: "Internal Server Error",
        });
    }
}


module.exports = { registerJob, getAllJobs, getJobDetails, modifyJob, toggleJobStatus };