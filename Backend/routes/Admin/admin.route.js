const express = require ("express");
const router = express.Router()
const { getAdminStats } = require("../../controllers/Admin/admin.controller");
const adminAuthMiddleware = require("../../middleware/adminAuth.middleware");

router.get("/admin-stats" , adminAuthMiddleware , getAdminStats);
module.exports = router ;
