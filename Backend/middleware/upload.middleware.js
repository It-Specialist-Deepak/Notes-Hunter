const upload = require("../config/multer");

// Custom middleware to handle Multer errors globally
const uploadMiddleware = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      if (err.message === "Only PDF files are allowed!") {
        return res.status(400).json({ message: "Only PDF files are allowed!" });
      }

      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "File size cannot exceed 100 MB." });
      }

      return res.status(400).json({ message: err.message });
    }

    next();
  });
};

module.exports = uploadMiddleware;
