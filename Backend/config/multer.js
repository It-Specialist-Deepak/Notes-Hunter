const multer = require("multer");
// Store files temporarily in memory
const storage = multer.memoryStorage();

// File filter: only accept PDFs
function fileFilter(req, file, cb) {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
}

// Multer configuration with 100 MB file limit
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB
});

module.exports = upload;
