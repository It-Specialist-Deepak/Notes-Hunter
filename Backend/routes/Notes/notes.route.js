const express = require("express")
const  upload = require( "../../config/multer.js");
const { uploadNote , GetNotes , LikeNotes , DownloadNotes } = require( "../../controllers/Notes/notes.controller.js");
const uploadMiddleware = require("../../middleware/upload.middleware.js")
const verifyToken = require( "../../middleware/verifyToken.middleware.js")
const router = express.Router();

router.post("/upload", uploadMiddleware, uploadNote);
router.get("/getnotes" , GetNotes);
router.patch("/likeNotes", verifyToken , LikeNotes);
router.post("/download-notes/:noteId", DownloadNotes);
module.exports = router;
