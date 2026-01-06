const jwt = require("jsonwebtoken");
const User = require("../models/user.model")
const adminAuthMiddleware = async (req, res, next) => {
  try {
    // 1️⃣ Read token
    const token =
      req.cookies.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token)
      return res.status(401).json({ message: "Access denied. No token provided." });

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded; // attach decoded data (e.g. id)

    // 3️⃣ Find user in DB
    const user = await User.findById(decoded.id);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    // 4️⃣ Check if user is admin
    if (user.role !== "admin")
      return res.status(403).json({ message: "Access denied. Admins only." });

    // 5️⃣ Attach user to req and continue
    req.user = user;
    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    res.status(401).json({ message: "Invalid or expired token." });
  }
};
module.exports = adminAuthMiddleware ;