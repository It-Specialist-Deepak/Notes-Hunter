// seedNotes.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Note = require("../models/NotesModel/notes.model"); // adjust path as needed

dotenv.config(); // to load MONGO_URI from .env

// --- Connect to MongoDB ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed", err));

// --- Random Data Generators ---
const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"];
const categories = ["engineering", "science", "commerce", "arts"];
const types = ["handwritten", "typed", "summary"];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// --- Create Fake Notes ---
const generateNotes = (count = 50) => {
  const notes = [];
  for (let i = 0; i < count; i++) {
    notes.push({
      title: `Sample Note ${i + 1}`,
      description: `This is a sample description for note ${i + 1}.`,
      subject: randomItem(subjects),
      category: randomItem(categories),
      subcategory: "semester " + randomInt(1, 6),
      pages: randomInt(10, 200),
      type: randomItem(types),
      fileUrl: `https://example.com/sample${i + 1}.pdf`,
      fileName: `sample${i + 1}.pdf`,
      downloads: randomInt(0, 1000),
      likes: randomInt(0, 100),
      likedBy: [],
      comments: [],
    });
  }
  return notes;
};

// --- Insert Notes ---
async function seedNotes() {
  try {
    await Note.deleteMany(); // clear old data
    const notes = generateNotes(50); // create 25 sample notes
    console.log(notes)
    await Note.insertMany(notes);
    console.log(`✅ ${notes.length} notes inserted successfully`);
  } catch (err) {
    console.error("❌ Error inserting notes:", err);
  } finally {
    mongoose.connection.close();
  }
}

seedNotes();
