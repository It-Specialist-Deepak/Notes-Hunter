const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../../config/S3.js");
const Note = require("../../models/NotesModel/notes.model.js");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const User = require("../../models/user.model.js")


module.exports.uploadNote = async (req, res) => {
  try {
    const { title, description, subject, category, type, subcategory, pages } = req.body;
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

module.exports.getAllNotes = async (req, res) => {
  try {
    // 1️⃣ Extract query params with defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // 2️⃣ Fetch paginated notes
    const notes = await Note.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // newest first

    // 3️⃣ Get total count for pagination metadata
    const totalNotes = await Note.countDocuments();

    // 4️⃣ Calculate total pages
    const totalPages = Math.ceil(totalNotes / limit);

    // 5️⃣ Send response
    res.status(200).json({
      success: true,
      page,
      totalPages,
      totalNotes,
      notes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
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


module.exports.SaveNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if note exists
    const noteExists = await Note.findById(noteId);
    if (!noteExists)
      return res.status(404).json({ message: "Notes not found" });

    // Check if note is already saved
    const alreadySaved = user.savedNotes.includes(noteId);

    if (alreadySaved) {
      // Remove note from saved list
      user.savedNotes = user.savedNotes.filter(
        (id) => id.toString() !== noteId.toString()
      );
      await user.save();
      return res.json({
        message: "Notes removed from saved list",
        saved: false,
      });
    } else {
      // Add note to saved list
      user.savedNotes.push(noteId);
      await user.save();
      return res.json({
        message: "Notes saved successfully",
        saved: true,
      });
    }
  } catch (error) {
    console.error("Toggle Save Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getSavedNotes = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("savedNotes");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.savedNotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports.getRecommendedNotes = async (req, res) => {
  try {
    const { noteId } = req.params;

    // 1️⃣ Find the current note
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // 2️⃣ Find notes with the same subcategory (exclude current note)
    const recommendedNotes = await Note.find({
      subcategory: note.subcategory,
      _id: { $ne: note._id },
    })
      .limit(5) // show top 5 recommendations
      .sort({ createdAt: -1 }); // newest first

    // 3️⃣ Return recommended notes
    res.status(200).json({
      success: true,
      subcategory: note.subcategory,
      total: recommendedNotes.length,
      recommendedNotes,
    });
  } catch (error) {
    console.error("Error fetching recommended notes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};