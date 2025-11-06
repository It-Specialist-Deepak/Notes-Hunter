const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true } // keep comment ID
);

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: String,
    subject: { type: String, required: true },
    category: {
      type: String,
      required: true,
      set: (v) => v.trim().toLowerCase(),
    },
    subcategory: {
      type: String,
      set: (v) => (v ? v.trim().toLowerCase() : undefined),
    },
    pages: { type: Number, required: true },
    type: {
      type: String,
      enum: ["handwritten", "typed", "summary"],
      default: "handwritten",
    },
    fileUrl: { type: String, required: true },
    fileName: String,
    downloads: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [commentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
