import mongoose from "mongoose";

const previousYearPaperSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  university: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  examType: {
    type: String,
    enum: ["midterm", "endterm", "supplementary"],
    default: "endterm"
  },
  paperType: {
    type: String,
    enum: ["question-paper", "solution", "both"],
    default: "question-paper"
  },
  fileUrl: {
    type: String, // PDF link (Firebase, AWS S3, etc.)
    required: true
  },

  views: {
    type: Number,
    default: 0
  },
  downloads: {
    type: Number,
    default: 0
  },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
}, { timestamps: true });

export default mongoose.model("PreviousYearPaper", previousYearPaperSchema);
