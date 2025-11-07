const express = require("express")
const  upload = require( "../../config/multer.js");
const { uploadNote , GetNotes , LikeNotes , DownloadNotes , SaveNote , getSavedNotes , getAllNotes , getRecommendedNotes } = require( "../../controllers/Notes/notes.controller.js");
const uploadMiddleware = require("../../middleware/upload.middleware.js")
const verifyToken = require( "../../middleware/verifyToken.middleware.js")
const router = express.Router();

router.post("/upload", uploadMiddleware, uploadNote);
router.get("/getnotes" , GetNotes);
router.get("/get-allnotes", getAllNotes);
router.patch("/likeNotes", verifyToken , LikeNotes);
router.post("/download-notes/:noteId", DownloadNotes);
router.post("/save-notes/:noteId", verifyToken , SaveNote);
router.get("/saved-notes", verifyToken, getSavedNotes);
router.post("/recommended-notes/:noteId" ,  getRecommendedNotes);

module.exports = router;
