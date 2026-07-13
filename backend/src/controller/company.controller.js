const mongoose = require("mongoose");
const userModel = require("../model/user.model");
const companyModel = require("../model/company.model");
const jobModel = require("../model/job.model");
const applicationModel = require("../model/application.model");
const { uploadFile } = require("../services/storage.service");

async function registerCompany(req, res) {
  try {
    const { name, industry, location } = req.body;

    if (!name || !industry || !location) {
      return res.status(400).json({
        success: false,
        message: "Name, industry and location are required.",
      });
    }

    const decoded = req.user;

    let logoUrl = "";

    if (req.file) {
      const file = req.file;
      const result = await uploadFile(
        file.buffer.toString("base64"),
        `logo_${Date.now()}`,
        "jobify/company",
      );

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
    });

    return res.status(201).json({
      success: true,
      message: "Company created successfully",
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

async function getAllCompanies(req, res) {
  try {
    const filter = {};

    if (req.query.search) {
      const search = req.query.search.trim().split("").join("|");
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          location: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (req.query.jobTypes) {
      const jobType = req.query.jobTypes.split(",");
      filter.jobTypes = {
        $in: jobType,
      };
    }

    if (req.query.workModes) {
      const workMode = req.query.workModes.split(",");
      filter.workModes = {
        $in: workMode,
      };
    }

    if (req.query.size) {
      if (req.query.size === "startup") {
        filter.employees = {
          $lte: 100,
        };
      } else if (req.query.size === "medium") {
        filter.employees = {
          $gt: 100,
          $lte: 10000,
        };
      } else if (req.query.size === "large") {
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
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

async function getCompany(req, res) {
  try {
    const id = req.params.companyId;

    const company = await companyModel
      .findById(id)
      .populate("owner", "name email avatar");

    return res.status(200).json({
      success: true,
      message: "Company Fetched successfully",
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

    if (req.file) {
      const result = await uploadFile(
        req.file.buffer.toString("base64"),
        `logo_${Date.now()}`,
        "jobify/company",
      );

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
  try {
    const companyId = req.params.companyId;

    await req.company.deleteOne();

    return res
      .status(200)
      .json({ success: true, message: "Company Deleted successfully" });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

async function getMyJobs(req, res) {
  try {
    const decoded = req.user;

    const company = await companyModel.findOne({ owner: decoded.id });

    if (!company) {
      return res
        .status(404)
        .json({
          success: false,
          hasCompany: false,
          message: "Create company first",
        });
    }

    const jobs = await jobModel
      .find({ company: company._id })
      .populate("company", "name logo")
      .sort({ createdAt: -1 });

    if (jobs.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Here are your listed jobs",
        data: [],
      });
    }

    const jobIds = jobs.map((job) => job._id);
    const applicationCounts = await applicationModel.aggregate([
      {
        $match: {
          job: { $in: jobIds },
        },
      },
      {
        $group: {
          _id: "$job",
          count: { $sum: 1 },
        },
      },
    ]);

    const applicationMap = {};

    applicationCounts.forEach((item) => {
      applicationMap[item._id.toString()] = item.count;
    });

    const jobsWithCount = jobs.map((job) => ({
      ...job.toObject(),
      applications: applicationMap[job._id.toString()] || 0,
    }));

    return res.status(200).json({
      success: true,
      hasCompany: true,
      message: "Here are your listed jobs",
      data: jobsWithCount,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

async function getDashboard(req, res) {
  try {
    const company = await companyModel.findOne({ owner: req.user.id });

    if (!company) {
      return res.status(200).json({
        success: true,
        hasCompany: false,
        message: "Create company first",
      });
    }

    const jobs = await jobModel
      .find({ company: company._id })
      .sort({ createdAt: -1 });

    const jobIds = jobs.map((job) => job._id);

    const applications = await applicationModel.find({
      job: { $in: jobIds },
    });

    const recentJobs = jobs.slice(0, 5).map((job) => ({
      _id: job._id,
      title: job.title,
      isActive: job.isActive,
      createdAt: job.createdAt,
    }));

    totalJobs = jobs.length;

    activeJobs = jobs.filter((job) => job.isActive).length;

    inactiveJobs = totalJobs - activeJobs;

    totalApplications = applications.length;

    applied = applications.filter((a) => a.status === "Applied").length;

    shortlisted = applications.filter((a) => a.status === "Shortlisted").length;

    interview = applications.filter((a) => a.status === "Interview").length;

    hired = applications.filter((a) => a.status === "Hired").length;

    rejected = applications.filter((a) => a.status === "Rejected").length;

    return res.status(200).json({
      success: true,
      message: "Company Dashboard Fetched successfully",
      hasCompany: true,
      data: {
        company,
        overview: {
          totalJobs,
          activeJobs,
          inactiveJobs,
          totalApplications,
        },
        applicationStats: {
          applied,
          shortlisted,
          interview,
          hired,
          rejected,
        },
        recentJobs,
      },
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

module.exports = {
  registerCompany,
  getAllCompanies,
  getCompany,
  modifyCompany,
  deleteCompany,
  getMyJobs,
  getDashboard,
};
