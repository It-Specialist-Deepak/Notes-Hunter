const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Blacklist = require("../models/blacklistToken.model");
const User = require("../models/user.model");
const verifyToken = async (req, res, next) => {
  try {
    // 1️⃣ Get token from cookie or header
    const token =
      req.cookies?.token || req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied. No token provided." });
    }

    // 2️⃣ Check blacklist
    const isBlacklisted = await Blacklist.findOne({ token });
    if (isBlacklisted) {
      return res
        .status(401)
        .json({ message: "Token is revoked (already logged out)" });
    }

    // 3️⃣ Verify JWT
    const decoded  = jwt.verify(token, process.env.JWT_KEY);
    var objectId =  new mongoose.Types.ObjectId(decoded.id);
    // 4️⃣ Fetch user from DB using decoded._id
    const user = await User.findById(objectId).select("_id name email role");
  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;s
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
