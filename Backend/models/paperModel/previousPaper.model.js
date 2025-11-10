const mongoose = require("mongoose");

const previousYearPaperSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
      set: (v) => v.trim().toLowerCase(),
    },
     category: {
      type: String,
      required: true,
      set: (v) => v.trim().toLowerCase(),
    },
    subcategory: {
      type: String,
      set: (v) => (v ? v.trim().toLowerCase() : undefined),
    },
    semester: {
      type: String,
      required: true,
    },
    university: {
      type: String,
      required: true,
      set: (v) => (v ? v.trim().toLowerCase() : undefined),
      
    },
    year: {
      type: Number,
      required: true,
    },
    examType: {
      type: String,
      enum: ["midterm", "endterm", "supplementary"],
      default: "endterm",
    },
    paperType: {
      type: String,
      enum: ["question-paper", "solution", "both"],
      default: "question-paper",
    },
    fileUrl: {
      type: String, // PDF link (Firebase, AWS S3, etc.)
      required: true,
    },
    fileKey: String,
    views: {
      type: Number,
      default: 0,
    },
    downloads: {
      type: Number,
      default: 0,
    },
    likes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports =  mongoose.model("PreviousYearPaper", previousYearPaperSchema);
