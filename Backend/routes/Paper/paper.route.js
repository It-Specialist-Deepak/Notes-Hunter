const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken.middleware");
const uploadMiddleware = require("../../middleware/upload.middleware.js");
const adminAuthMiddleware = require("../../middleware/adminAuth.middleware.js");
const {
  UploadPaper,
  AllUniversities,
  AlluniversityCourse,
  CategoriesByCourse,
  GetPapersByUniversityCourseCategory,
  GetPapersByCategory,
  GetAllCategories,
  LikePapers,
  DownloadPaper,
  SavePaper,
  getSavedpapers,
} = require("../../controllers/Paper/paper.controller");
// university view routes
router.post("/upload-paper", verifyToken, uploadMiddleware, adminAuthMiddleware ,UploadPaper);
router.get("/all-universities", AllUniversities);
router.get("/all-university-course/:university", AlluniversityCourse);
router.get("/all-course-category/:university/:course", CategoriesByCourse);
router.get("/by-university-course-category/:university/:course/:category",GetPapersByUniversityCourseCategory);
// category view routes
router.get("/getcategory", GetAllCategories);
router.get("/getpapers-bycategory/:category", GetPapersByCategory);
// other common Routes
router.patch("/like-paper", verifyToken, LikePapers);
router.get("/download-paper/:paperId", DownloadPaper);
router.post("/save-papers/:paperId", verifyToken, SavePaper);
router.get("/saved-papers", verifyToken, getSavedpapers);

module.exports = router;
