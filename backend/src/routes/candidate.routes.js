const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const candidateController = require('../controller/candidate.controller');
const uploadResume= require('../middleware/uploadResume.middleware');

const router = express.Router();


router.patch('/profile/update', authMiddleware.authCandidate, uploadResume.single("resume") ,candidateController.updateProfile);

router.get('/profile', authMiddleware.authCandidate, candidateController.getProfile);

router.get('/profile/:id', authMiddleware.authCompany, candidateController.candidateProfile);


module.exports = router;