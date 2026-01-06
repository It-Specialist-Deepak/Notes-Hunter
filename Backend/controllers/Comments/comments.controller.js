const jwt = require("jsonwebtoken");
const User = require("../../models/user.model.js");
const Note = require("../../models/NotesModel/notes.model.js");


module.exports.addComment = async (req, res) => {
  try {
    // ✅ Extract token from cookies (or Authorization header)
    const token = req.cookies.token || req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized: Token missing" });

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Extract noteId and text
    const { noteId } = req.params;
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    // ✅ Find note
    const note = await Note.findById(noteId);
    if (!note) return res.status(404).json({ message: "Note not found" });

    // ✅ Create comment object
    const newComment = {
      user: user._id,
      text,
    };

    // ✅ Push new comment
    note.comments.push(newComment);
    await note.save();

    // ✅ Populate user info for frontend display
    const updatedNote = await Note.findById(noteId)
      .populate("comments.user", "name email"); // populate user fields you need

    res.status(201).json({
      message: "Comment added successfully",
      comments: updatedNote.comments,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getComments = async (req, res) => {
  try {
    const { noteId } = req.params;
    const note = await Note.findById(noteId).populate("comments.user", "name email");

    if (!note) {
      return res.status(404).json({ message: "Notes not found" });
    }
    res.status(200).json({
      message: "Comments fetched successfully",
      comments: note.comments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.deleteComment = async (req, res) => {
  try {
    const { noteId, commentId } = req.params;
    const note = await Note.findById(noteId);

    if (!note) return res.status(404).json({ message: "Notes not found" });

    const comment = note.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comments not found" });
    // ✅ Check ownership or admin role
    const isOwner = comment.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    comment.deleteOne(); // ✅ safer in Mongoose 7+
    await note.save();

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};