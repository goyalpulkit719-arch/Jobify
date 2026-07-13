const userModel = require("../model/user.model");
const applicationModel = require("../model/application.model");
const jobModel = require("../model/job.model");
const companyModel = require("../model/company.model");
const candidateModel = require("../model/candidate.model");

async function applyJob(req, res) {
  try {
    const jobId = req.params.jobId;
    const userId = req.user.id;

    const existingApplication = await applicationModel.findOne({
      job: jobId,
      candidate: userId,
    });

    if (existingApplication) {
      return res
        .status(409)
        .json({ success: false, message: "Already applied" });
    }

    const profile = await candidateModel.findOne({ owner: userId });

    if (!profile.resume) {
      return res
        .status(400)
        .json({ success: false, message: "Upload resume in your profile" });
    }

    const job = await jobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const companyId = job.company;

    const application = await applicationModel.create({
      candidate: userId,
      job: jobId,
      company: companyId,
      resume: profile.resume,
    });

    const populatedApplication = await application.populate([
      {
        path: "job",
        select: "title employmentType minSalary maxSalary location workMode",
      },
      {
        path: "company",
        select: "name logo",
      },
    ]);

    return res.status(201).json({
      success: true,
      message: "Application created",
      data: populatedApplication,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: "Already applied" });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

async function getMyApplications(req, res) {
  try {
    const userId = req.user.id;

    let filter = {
      candidate: userId,
    };

    if (req.query.status) {
      const statuses = req.query.status.split(",");

      filter.status = {
        $in: statuses,
      };
    }

    if (req.query.search) {
      const companies = await companyModel
        .find({
          name: {
            $regex: req.query.search,
            $options: "i",
          },
        })
        .select("_id");
      const companyIds = companies.map((company) => company._id);

      const jobs = await jobModel
        .find({
          title: {
            $regex: req.query.search,
            $options: "i",
          },
        })
        .select("_id");
      const jobIds = jobs.map((job) => job._id);

      filter.$or = [
        {
          company: {
            $in: companyIds,
          },
        },
        {
          job: {
            $in: jobIds,
          },
        },
      ];
    }

    let sortOption = { createdAt: -1 };
    if (req.query.sort === "oldest") {
      sortOption = { createdAt: 1 };
    } else if (req.query.sort === "newest") {
      sortOption = { createdAt: -1 };
    }

    const applications = await applicationModel
      .find(filter)
      .populate(
        "job",
        "title location employmentType workMode minSalary maxSalary isActive",
      )
      .populate("company", "name logo")
      .sort(sortOption);

    return res.status(200).json({
      success: true,
      message: "Your applications were fetched successfully",
      data: applications,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

async function applicationStatus(req, res) {
  try {
    const company = await companyModel.findOne({
      owner: req.user.id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    const applicationId = req.params.applicationId;

    const application = await applicationModel
      .findById(applicationId)
      .populate("job", "title minSalary maxSalary location jobType")
      .populate("candidate", "name email avatar phone");

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    if (application.company.toString() !== company._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = application.candidate._id;
    const profile = await candidateModel.findOne({ owner: userId });

    return res.status(200).json({
      success: true,
      message: "Application fetched successfully",
      data: { application, userProfile: profile },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Interval server error" });
  }
}

async function getCompanyApplications(req, res) {
  try {
    const company = await companyModel.findOne({
      owner: req.user.id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    let filter = {
      company: company._id,
    };

    if (req.query.status) {
      const statuses = req.query.status.split(",");

      filter.status = {
        $in: statuses,
      };
    }

    const applications = await applicationModel
      .find(filter)
      .populate("job", "title")
      .populate("candidate", "name avatar email location")
      .sort({ appliedAt: -1 });

    const groupedApplications = {};

    applications.forEach((application) => {
      const jobId = application.job._id.toString();

      if (!groupedApplications[jobId]) {
        groupedApplications[jobId] = {
          jobId: application.job._id,
          title: application.job.title,
          applications: [],
        };
      }

      groupedApplications[jobId].applications.push({
        _id: application._id,
        candidate: application.candidate,
        status: application.status,
        appliedAt: application.createdAt,
      });
    });

    return res.status(200).json({
      success: true,
      message: "Applications fetched successfully",
      data: { applications: Object.values(groupedApplications) },
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

async function updateStatus(req, res) {
  try {
    const company = await companyModel.findOne({
      owner: req.user.id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    const applicationId = req.params.applicationId;

    const application = await applicationModel.findById(applicationId);

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    if (application.company.toString() !== company._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    application.status = req.body.status;
    await application.save();

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: application,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

async function withdrawApplication(req, res) {
  try {
    const applicationId = req.params.applicationId;

    const application = await applicationModel.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (application.candidate.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await application.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Application withdrawn successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

async function getJobApplications(req, res) {
    try {
        const company = await companyModel.findOne({
            owner: req.user.id,
        });

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found",
            });
        }

        const job = await jobModel.findById(req.params.jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        if (job.company.toString() !== company._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const applications = await applicationModel
            .find({ job: job._id })
            .populate(
                "candidate",
                "name avatar email location"
            )
            .sort({ appliedAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Applications fetched successfully",
            data: {
                jobTitle: job.title,
                applications,
            },
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

module.exports = {
  applyJob,
  getMyApplications,
  applicationStatus,
  getCompanyApplications,
  updateStatus,
  withdrawApplication,
  getJobApplications,
};
