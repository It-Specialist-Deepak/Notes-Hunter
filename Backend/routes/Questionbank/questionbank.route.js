const express = require("express");
const router = express.Router();
const upload = require("../../config/multer");
const {uploadQuestionBank , AllQuestionBankUniversities , AllQuestionBankUniversityCourses , getQuestionBanksByUniversityAndCourse , getRecommendedQuestionBanks} = require("../../controllers/Questionbank/questionbank.controller.js");
const uploadMiddleware = require("../../middleware/upload.middleware.js");
const adminMiddleware = require("../../middleware/adminAuth.middleware.js")

// Get All Universities (Public Route)
router.get("/all-universities", AllQuestionBankUniversities);
router.get("/university-courses/:university", AllQuestionBankUniversityCourses);
router.get("/questionbank/:university/:course", getQuestionBanksByUniversityAndCourse);
router.get("/recommended-questionbanks/:questionBankId", getRecommendedQuestionBanks);

// Upload Question Bank (Protected Route)
router.post("/upload-questionbank", adminMiddleware, uploadMiddleware , uploadQuestionBank);

module.exports = router;