const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../../config/S3.js");
const Note = require("../../models/NotesModel/notes.model.js");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");


module.exports.uploadNote = async (req, res) => {
  try {
    const { title, description, subject, category, type, subcategory, pages } =
      req.body;
    console.log(req.body);
    const file = req.file;

    // Double-check (in case no file is uploaded)
    if (!file) {
      return res.status(400).json({ message: "Please upload a PDF file." });
    }

    // Create a unique file name inside "notes" folder
    const fileName = `notes/${Date.now()}-${file.originalname}`;

    // Upload file to S3
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(uploadParams));

    // Generate file URL
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    // Save file info in MongoDB
    const note = new Note({
      title,
      description,
      subject,
      category,
      subcategory,
      pages,
      type,
      fileUrl,
      fileName
    });
    console.log(note);
    await note.save();

    res.status(201).json({
      message: "Note uploaded successfully",
      note,
    });
  } catch (error) {
    console.error("Error uploading note:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
module.exports.GetNotes = async (req, res) => {
  try {
    const { category, subcategory } = req.query;
    let query = {};

    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;

    const notes = await Note.find(query);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes" });
  }
};

module.exports.LikeNotes = async (req, res) => {
  try {
    const userId = req.user.id; // from token 
    const { noteId } = req.body; // now from body

    if (!noteId) {
      return res.status(400).json({ message: "Note ID is required" });
    }

    const note = await Note.findById(noteId);
    if (!note) return res.status(404).json({ message: "Note not found" });

    const alreadyLiked = note.likedBy.includes(userId);

    if (alreadyLiked) {
      // ✅ Unlike
      note.likes = Math.max(note.likes - 1, 0);
      note.likedBy = note.likedBy.filter(id => id.toString() !== userId);
      await note.save();
      return res.json({ message: "Unliked successfully", likes: note.likes });
    } else {
      // ✅ Like
      note.likes += 1;
      note.likedBy.push(userId);
      await note.save();
      return res.json({ message: "Liked successfully", likes: note.likes });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.DownloadNotes = async (req, res) => {
  try {
    const { noteId } = req.params;

    // 1. Find note in DB
    const note = await Note.findById(noteId);
    if (!note) return res.status(404).json({ message: "Note not found" });

    // 2. Increment download count
    note.downloads = (note.downloads || 0) + 1;
    await note.save();

    // 3. Generate pre-signed URL (valid for 60 sec)
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: note.fileName, // fileKey = S3 object key, e.g. "uploads/notes123.pdf"
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 }); // 1 minute validity

    // 4. Return the URL
    res.json({ downloadUrl: signedUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating download link" });
  }
};