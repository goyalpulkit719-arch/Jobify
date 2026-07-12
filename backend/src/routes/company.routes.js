const express = require('express');
const companyController = require('../controller/company.controller');
const authMiddleware = require('../middleware/auth.middleware');
const companyMiddleware = require('../middleware/company.middleware');
const uploadImage = require('../middleware/uploadImage.middleware');


const router = express.Router();

router.post('/register', authMiddleware.authCompany, uploadImage.single("logo"), companyController.registerCompany);

router.get('/all', companyController.getAllCompanies);

router.get('/details/:companyId', companyController.getCompany);

router.patch('/edit/:companyId', authMiddleware.authCompany, companyMiddleware.isCompanyOwner, uploadImage.single("logo"), companyController.modifyCompany);

router.delete('/delete/:companyId', authMiddleware.authCompany, companyMiddleware.isCompanyOwner, companyController.deleteCompany);

router.get('/myJobs', authMiddleware.authCompany, companyController.getMyJobs);


module.exports = router;