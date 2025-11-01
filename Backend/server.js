const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/DB");

dotenv.config(); // Load environment variables
const app = express();
connectDB();
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:8000", // frontend URL (change if needed)
    credentials: true, // allow cookies and auth headers
  })
);
// Import routes
const AuthRoute = require("./routes/auth/Auth.router");

// Routes
app.use("/api/v1/user", AuthRoute);

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to NotesHunter");
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
