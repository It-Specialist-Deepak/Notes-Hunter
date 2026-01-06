const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../../config/S3.js");
const PreviousYearPaper = require("../../models/paperModel/previousPaper.model.js");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const User = require("../../models/user.model.js")

module.exports.UploadPaper = async (req, res) => {
  try {
    // Check file
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Generate unique file key
    const fileKey = `papers/${Date.now()}-${req.file.originalname}`;

    // Upload to S3
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileKey,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      })
    );

    // Construct file URL
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

    // Create document in DB
    const paper = new PreviousYearPaper({
      title: req.body.title,
      subject: req.body.subject,
      course: req.body.course,
      category: req.body.category,
      subcategory: req.body.subcategory,
      semester: req.body.semester,
      university: req.body.university,
      year: req.body.year,
      examType: req.body.examType,
      paperType: req.body.paperType,
      fileUrl,
      fileKey,
    });

    await paper.save();

    res.status(201).json({
      success: true,
      message: "Previous year paper uploaded successfully",
      data: paper,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

module.exports.AllUniversities = async (req, res) => {
  try {
    // Fetch all distinct university names from the collection
    const universities = await PreviousYearPaper.distinct("university");

    // Sort alphabetically for cleaner UI
    universities.sort();

    res.status(200).json({
      success: true,
      count: universities.length,
      universities,
    });
  } catch (error) {
    console.error("Error fetching universities:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching universities",
    });
  }
}

module.exports.AlluniversityCourse = async (req, res) => {
  try {
    const { university } = req.params;

    if (!university) {
      return res.status(400).json({
        success: false,
        message: "University parameter is required",
      });
    }

    // Fetch distinct courses for the selected university
    const courses = await PreviousYearPaper.distinct("course", {
      university,
    });

    // Sort alphabetically
    courses.sort((a, b) => a.localeCompare(b));

    res.status(200).json({
      success: true,
      university,
      count: courses.length,
      courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching courses",
    });
  }
};

module.exports.CategoriesByCourse = async (req, res) => {
  try {
    const { university, course } = req.params;

    if (!university || !course) {
      return res.status(400).json({
        success: false,
        message: "University and course parameters are required",
      });
    }

    // Express already decodes URL params
    // university -> "delhi university"
    // course -> "bachelor of technology"

    const categories = await PreviousYearPaper.distinct("category", {
      university: university.trim(),
      course: course.trim(),
    });

    if (!categories.length) {
      return res.status(404).json({
        success: false,
        message: `No categories found for '${course}' at '${university}'`,
      });
    }

    return res.status(200).json({
      success: true,
      university,
      course,
      count: categories.length,
      categories: categories.sort(),
    });

  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching categories",
    });
  }
};

module.exports.GetPapersByUniversityCourseCategory = async (req, res) => {
  try {
    const { university, course, category } = req.params;

    if (!university || !course || !category) {
      return res.status(400).json({
        success: false,
        message: "University, course and category parameters are required",
      });
    }

    // Convert slugs → readable text
    const uni = university.replace(/-/g, " ").trim();
    const crs = course.replace(/-/g, " ").trim();
    const cat = category.replace(/-/g, " ").trim();

    const papers = await PreviousYearPaper.find({
      university: { $regex: new RegExp(`^${uni}$`, "i") },
      course: { $regex: new RegExp(`^${crs}$`, "i") },
      category: { $regex: new RegExp(`^${cat}$`, "i") },
    }).sort({ year: -1, semester: 1 });

    if (!papers.length) {
      return res.status(404).json({
        success: false,
        message: `No papers found for '${cat}' in '${crs}' at '${uni}'`,
      });
    }

    res.status(200).json({
      success: true,
      count: papers.length,
      university: uni,
      course: crs,
      category: cat,
      papers,
    });
  } catch (error) {
    console.error("Error fetching papers:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching papers",
    });
  }
};

// controllers by category

module.exports.GetAllCategories = async (req, res) => {
  try {
    // Fetch all unique categories (case-insensitive normalization)
    const categories = await PreviousYearPaper.distinct("category");

    if (!categories.length) {
      return res.status(404).json({
        success: false,
        message: "No categories found",
      });
    }

    // Sort alphabetically for cleaner frontend display
    const sortedCategories = categories.sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );

    res.status(200).json({
      success: true,
      count: sortedCategories.length,
      categories: sortedCategories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching categories",
    });
  }
};
// Assuming you are using Express.js
// Route example: GET /api/papers/:category?page=1&limit=12

module.exports.GetPapersByCategory = async (req, res) => {
  try {
    const { category } = req.params; // now from route params
    const page = parseInt(req.query.page) || 1;  // default page 1
    const limit = parseInt(req.query.limit) || 12; // default 12 per page
    const skip = (page - 1) * limit;

    // Validate category
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category parameter is required",
      });
    }

    // Convert category to lowercase for consistency
    const cat = category.trim().toLowerCase();

    // Fetch papers for given category with pagination
    const papers = await PreviousYearPaper.find({ category: cat })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // newest first

    // Total count for pagination
    const totalPapers = await PreviousYearPaper.countDocuments({ category: cat });

    // Handle empty results
    if (!papers.length) {
      return res.status(404).json({
        success: false,
        message: `No papers found for category '${category}'`,
      });
    }

    // Success response
    res.status(200).json({
      success: true,
      category: category,
      currentPage: page,
      totalPages: Math.ceil(totalPapers / limit),
      totalPapers,
      count: papers.length,
      papers,
    });
  } catch (error) {
    console.error("Error fetching papers by category:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching papers",
    });
  }
};

module.exports.LikePapers = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ from token (middleware)
    const { paperId } = req.body; // ✅ from request body

    // Validate paperId
    if (!paperId) {
      return res.status(400).json({ message: "Paper ID is required" });
    }

    // Find paper
    const paper = await PreviousYearPaper.findById(paperId);
    if (!paper) return res.status(404).json({ message: "Paper not found" });

    // Check if already liked
    const alreadyLiked = paper.likedBy.includes(userId);

    if (alreadyLiked) {
      // ✅ Unlike
      paper.likes = Math.max(paper.likes - 1, 0);
      paper.likedBy = paper.likedBy.filter((id) => id.toString() !== userId);
      await paper.save();

      return res.json({
        success: true,
        message: "Unliked successfully",
        likes: paper.likes,
      });
    } else {
      // ✅ Like
      paper.likes += 1;
      paper.likedBy.push(userId);
      await paper.save();

      return res.json({
        success: true,
        message: "Liked successfully",
        likes: paper.likes,
      });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports.DownloadPaper = async (req, res) => {
  try {
    const { paperId } = req.params;

    // 1️⃣ Find paper in DB
    const paper = await PreviousYearPaper.findById(paperId);
    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    // 2️⃣ Increment download count
    paper.downloads = (paper.downloads || 0) + 1;
    await paper.save();

    // 3️⃣ Generate pre-signed S3 download URL (valid for 60 sec)
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: paper.fileKey, // same as fileKey used in S3
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

    // 4️⃣ Return download URL
    res.json({
      success: true,
      message: "Download link generated successfully",
      downloadUrl: signedUrl,
    });

  } catch (error) {
    console.error("Error generating download link:", error);
    res.status(500).json({ message: "Error generating download link" });
  }
};


module.exports.SavePaper = async (req, res) => {
  try {
    const { paperId } = req.params;
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if note exists
    const paperExists = await PreviousYearPaper.findById(paperId);
    if (!paperExists)
      return res.status(404).json({ message: "Paper not found" });

    // Check if note is already saved
    const alreadySaved = user.savedPapers.includes(paperId);

    if (alreadySaved) {
      // Remove note from saved list
      user.savedPapers = user.savedPapers.filter(
        (id) => id.toString() !== paperId.toString()
      );
      await user.save();
      return res.json({
        message: "Paper removed from saved list",
        saved: false,
      });
    } else {
      // Add note to saved list
      user.savedPapers.push(paperId);
      await user.save();
      return res.json({
        message: "Paper saved successfully",
        saved: true,
      });
    }
  } catch (error) {
    console.error("Toggle Save Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getSavedpapers = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("savedPapers");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.savedPapers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
