const { PutObjectCommand } = require("@aws-sdk/client-s3");
const QuestionBank = require("../../models/questionbankModel/questionbank.model");
const s3 = require("../../config/S3");

module.exports.uploadQuestionBank = async (req, res) => {
  try {
    const {
      title,
      subject,
      course,
      courseCode,
      university,
      semester,
      year,
      tags,
    } = req.body;

    // Required field validation
    if (!title || !subject || !course || !courseCode || !university || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing or PDF not uploaded",
      });
    }

    // Allow only PDF files
    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({
        success: false,
        message: "Only PDF files are allowed",
      });
    }

    // Generate S3 file key
    const fileKey = `question-banks/${Date.now()}-${req.file.originalname}`;

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

    // Save to MongoDB
    const questionBank = await QuestionBank.create({
      title,
      subject,
      course,
      courseCode,
      university,
      semester,
      year: year ? Number(year) : undefined,
      tags: tags || "Questions",
      fileUrl,
      fileKey,
    });

    res.status(201).json({
      success: true,
      message: "Question bank uploaded successfully",
      data: questionBank,
    });

  } catch (error) {
    console.error("QuestionBank upload error:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading question bank",
      error: error.message,
    });
  }
};

module.exports.AllQuestionBankUniversities = async (req, res) => {
  try {
    // Fetch distinct university names from QuestionBank collection
    const universities = await QuestionBank.distinct("university");

    // Remove empty / null values (safety)
    const filteredUniversities = universities.filter(Boolean);

    // Sort alphabetically
    filteredUniversities.sort();

    res.status(200).json({
      success: true,
      count: filteredUniversities.length,
      universities: filteredUniversities,
    });
  } catch (error) {
    console.error("Error fetching question bank universities:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching universities",
    });
  }
};
module.exports.AllQuestionBankUniversityCourses = async (req, res) => {
  try {
    let { university } = req.params;

    if (!university) {
      return res.status(400).json({
        success: false,
        message: "University parameter is required",
      });
    }

    // Normalize (important because university is stored lowercase)
    university = university.trim().toLowerCase();

    // Fetch distinct courses for the selected university
    const courses = await QuestionBank.distinct("course", { university });

    // Remove empty values (safety)
    const filteredCourses = courses.filter(Boolean);

    // Sort alphabetically
    filteredCourses.sort((a, b) => a.localeCompare(b));

    res.status(200).json({
      success: true,
      university,
      count: filteredCourses.length,
      courses: filteredCourses,
    });
  } catch (error) {
    console.error("Error fetching question bank courses:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching courses",
    });
  }
};

module.exports.getQuestionBanksByUniversityAndCourse = async (req, res) => {
  try {
    let { university, course } = req.params;

    if (!university || !course) {
      return res.status(400).json({
        success: false,
        message: "University and course parameters are required",
      });
    }

    // Normalize (important: stored lowercase)
    university = university.trim().toLowerCase();
    course = course.trim().toLowerCase();

    // Fetch question banks
    const questionBanks = await QuestionBank.find({
      university,
      course,
    }).sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      success: true,
      count: questionBanks.length,
      questionBanks,
    });
  } catch (error) {
    console.error("Error fetching question banks:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching question banks",
    });
  }
};


module.exports.getRecommendedQuestionBanks = async (req, res) => {
  try {
    const { questionBankId } = req.params;

    // 1️⃣ Find current question bank
    const questionBank = await QuestionBank.findById(questionBankId);
    if (!questionBank) {
      return res.status(404).json({ message: "Question bank not found" });
    }

    // 2️⃣ Find recommended question banks (same subject, exclude current)
    const recommendedQuestionBanks = await QuestionBank.find({
      subject: questionBank.subject,
      _id: { $ne: questionBank._id },
    })
      .limit(5)
      .sort({ createdAt: -1 });

    // 3️⃣ Response
    res.status(200).json({
      success: true,
      subject: questionBank.subject,
      total: recommendedQuestionBanks.length,
      recommendedQuestionBanks,
    });
  } catch (error) {
    console.error("Error fetching recommended question banks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};