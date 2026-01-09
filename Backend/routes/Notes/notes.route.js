const express = require("express")
const { uploadNote , PreviewNotes , GetAllCategories ,GetNotesByCategory , LikeNotes , DownloadNotes , SaveNote , getSavedNotes , getAllNotes , getRecommendedNotes } = require( "../../controllers/Notes/notes.controller.js");
const uploadMiddleware = require("../../middleware/upload.middleware.js")
const verifyToken = require( "../../middleware/verifyToken.middleware.js")
const adminAuthMiddleware = require("../../middleware/adminAuth.middleware.js")
const router = express.Router();

router.post("/upload", uploadMiddleware, adminAuthMiddleware , uploadNote);
// Notes by category
router.get("/preview-notes/:noteId" , PreviewNotes);
router.get("/get-category" , GetAllCategories);
router.get("/getnotes-byCategory/:category" , GetNotesByCategory);

// gets all notes
router.get("/get-allnotes", getAllNotes);
router.patch("/likeNotes", verifyToken , LikeNotes);
router.get("/download-notes/:noteId", DownloadNotes);
router.post("/save-notes", verifyToken , SaveNote);
router.get("/saved-notes", verifyToken, getSavedNotes);
router.post("/recommended-notes/:noteId" ,  getRecommendedNotes);

module.exports = router;
