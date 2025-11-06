const express = require("express");
const router = express.Router()
const { Register , Login , ForgetPassword , ResetPassword , Logout } = require("../../controllers/Auth/auth.controller")

router.post("/register", Register)
router.post("/login", Login)
router.post("/forget-password", ForgetPassword)
router.post("/reset-password/:token", ResetPassword)
router.post("/logout", Logout)
module.exports = router;