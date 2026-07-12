const express = require('express');
const jobController = require('../controller/job.controller');
const authMiddleware = require('../middleware/auth.middleware');
const jobMiddleware = require('../middleware/job.middleware');

const router = express.Router();


router.post("/register", authMiddleware.authCompany, jobController.registerJob);

router.get("/all", jobController.getAllJobs);

router.get("/details/:jobId", jobController.getJobDetails);

router.patch("/edit/:jobId", authMiddleware.authCompany, jobMiddleware.isJobOwner, jobController.modifyJob);

router.patch("/toggleStatus/:jobId", authMiddleware.authCompany, jobMiddleware.isJobOwner, jobController.toggleJobStatus);

module.exports = router;