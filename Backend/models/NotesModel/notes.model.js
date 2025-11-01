import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  subject: {
    type: String,
    required: true
  },
  course: {
    type: String
  },
//   semester: {
//     type: String
//   },
  type: {
    type: String,
    enum: ["handwritten", "typed", "summary"],
    default: "handwritten"
  },
  fileUrl: {
    type: String, // Link to PDF/image (stored in Firebase, AWS, etc.)
    required: true
  },
 
  downloads: {
    type: Number,
    default: 0
  },
  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, min: 1, max: 5 },
      comment: String
    }
  ],
}, { timestamps: true });

export default mongoose.model("Note", noteSchema);
