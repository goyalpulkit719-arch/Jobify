const express = require('express');
const uploadImage = require('../middleware/uploadImage.middleware');
const authController = require('../controller/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { authLimiter } = require("../middleware/rateLimit.middleware");


const router = express.Router();

router.post("/register", uploadImage.single("avatar"), authLimiter, authController.registerUser);

router.post("/login", authLimiter, authController.loginUser);

router.post("/logout",authController.logoutUser);

router.patch("/me/update", authMiddleware.authLogin, uploadImage.single("avatar") ,authController.updateProfile);

router.get("/me", authMiddleware.authLogin, authController.getProfile);

router.patch("/password", authMiddleware.authLogin, authController.changePassword);

module.exports = router;