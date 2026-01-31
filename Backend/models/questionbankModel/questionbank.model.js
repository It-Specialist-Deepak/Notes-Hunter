const mongoose = require("mongoose");

const questionBankSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true, // e.g. "DBMS Question Bank"
            trim: true,
        },

        subject: {
            type: String,
            required: true, // DBMS, OS, CN
        },

        course: {
            type: String,
            required: true,
            set: (v) => v.trim().toLowerCase(),
        },

        courseCode: {
            type: String,
            required: true,
            trim: true,
        },

        university: {
            type: String,
            required: true,
            set: (v) => (v ? v.trim().toLowerCase() : undefined),

        },

        semester: {
            type: String, // "Semester 5"
        },

        year: {
            type: Number, // 2022, 2023
        },
        likes: { type: Number, default: 0 },
        likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        fileUrl: {
            type: String,
            required: true, // PDF URL (Cloudinary / S3 / local)
        },

        fileKey: String,

        totalPages: {
            type: Number,
        },

        tags: {
            type: String,
            enum: ["Solved", "Questions", "both"],
            default: "Questions",
        },

        downloads: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("QuestionBank", questionBankSchema);
