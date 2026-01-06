const express = require("express");
const router = express.Router()
const { addComment , getComments , deleteComment} = require("../../controllers/Comments/comments.controller");
const verifyToken = require("../../middleware/verifyToken.middleware");

router.post("/add-comment/:noteId" , verifyToken , addComment);
router.get("/get-comment/:noteId" , getComments);
router.delete("/delete-comment/:noteId/:commentId" , verifyToken , deleteComment)

module.exports = router ;