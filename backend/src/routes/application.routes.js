const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const jobMiddleware = require('../middleware/job.middleware');
const applicationController = require('../controller/application.controller');


const router = express.Router();


router.post('/apply/:jobId', authMiddleware.authCandidate, applicationController.applyJob);

router.get('/myApplications', authMiddleware.authCandidate, applicationController.getMyApplications);

router.get('/detail/:applicationId', authMiddleware.authCompany, applicationController.applicationStatus);

router.get('/companyApplications', authMiddleware.authCompany, applicationController.getCompanyApplications);

router.patch('/updateStatus/:applicationId', authMiddleware.authCompany, applicationController.updateStatus);

router.delete('/withdraw/:applicationId', authMiddleware.authCandidate, applicationController.withdrawApplication);

router.get("/job/:jobId", authMiddleware.authCompany, applicationController.getJobApplications );

module.exports = router;    