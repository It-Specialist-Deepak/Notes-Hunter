const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PreviousYearPaper = require("../models/paperModel/previousPaper.model");

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ---------------------------------------------
// ENGINEERING DATA MAP
// ---------------------------------------------
const engineeringData = {
  "Computer Science Engineering": [
    "Data Structures",
    "Operating Systems",
    "Computer Networks",
    "DBMS",
    "AI & Machine Learning",
    "Software Engineering",
    "Compiler Design",
    "Cloud Computing",
  ],
  "Information Technology": [
    "Web Technologies",
    "Cyber Security",
    "Database Systems",
    "Software Project Management",
    "Network Security",
    "Data Analytics",
  ],
  "Mechanical Engineering": [
    "Thermodynamics",
    "Fluid Mechanics",
    "Machine Design",
    "Manufacturing Processes",
    "Engineering Mechanics",
  ],
  "Civil Engineering": [
    "Structural Analysis",
    "Geotechnical Engineering",
    "Transportation Engineering",
    "Environmental Engineering",
    "Surveying",
  ],
  "Electrical Engineering": [
    "Circuit Theory",
    "Power Systems",
    "Control Systems",
    "Electrical Machines",
    "Energy Systems",
  ],
  "Electronics and Communication Engineering": [
    "Digital Electronics",
    "Analog Communication",
    "Microprocessors",
    "VLSI Design",
    "Signal Processing",
  ],
  "Chemical Engineering": [
    "Chemical Process Calculations",
    "Fluid Flow Operations",
    "Heat Transfer",
    "Chemical Reaction Engineering",
  ],
  "Aerospace Engineering": [
    "Flight Mechanics",
    "Aerodynamics",
    "Aircraft Structures",
    "Propulsion",
  ],
  "Biotechnology Engineering": [
    "Genetics",
    "Cell Biology",
    "Bioinformatics",
    "Microbiology",
    "Bioprocess Engineering",
  ],
};

// ---------------------------------------------
// CATEGORY MAPPING BASED ON BRANCH
// ---------------------------------------------
const branchToCategory = {
  "Computer Science Engineering": "Computer Science",
  "Information Technology": "Computer Science",
  "Electrical Engineering": "Electrical",
  "Electronics and Communication Engineering": "Electrical",
  "Mechanical Engineering": "Mechanical",
  "Civil Engineering": "Civil",
  "Chemical Engineering": "Chemical",
  "Aerospace Engineering": "Aerospace",
  "Biotechnology Engineering": "Biotechnology",
};

// ---------------------------------------------
// General Data Lists
// ---------------------------------------------
const universities = [
  "Delhi University",
  "Mumbai University",
  "Anna University",
  "Pune University",
  "IIT Delhi",
  "NIT Trichy",
  "JNU",
];
const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
const examTypes = ["midterm", "endterm", "supplementary"];
const paperTypes = ["question-paper", "solution", "both"];
const engineeringCourses = ["Bachelor of Technology", "Master of Technology"  , "Bachelor of Science"];

// Utility
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ---------------------------------------------
// Generate Papers (Engineering Only)
// ---------------------------------------------
const papers = Array.from({ length: 40 }, (_, i) => {
  const branch = getRandomItem(Object.keys(engineeringData));
  const subject = getRandomItem(engineeringData[branch]);
  const course = getRandomItem(engineeringCourses);
  const university = getRandomItem(universities);
  const category = branchToCategory[branch] || "Engineering";

  return {
    title: `${subject} (${branch}) - ${course} Paper ${i + 1}`,
    subject,
    course,
    category, // Dynamic category (e.g., Computer Science, Electrical)
    subcategory: branch,
    semester: getRandomItem(semesters),
    university,
    year: 2015 + Math.floor(Math.random() * 10),
    examType: getRandomItem(examTypes),
    paperType: getRandomItem(paperTypes),
    fileUrl: `https://example.com/papers/${branch
      .toLowerCase()
      .replace(/\s/g, "_")}_${course.toLowerCase().replace(/\s/g, "_")}_paper${
      i + 1
    }.pdf`,
    fileKey: `${branch.toLowerCase().replace(/\s/g, "_")}_${course
      .toLowerCase()
      .replace(/\s/g, "_")}_paper${i + 1}.pdf`,
  };
});

// ---------------------------------------------
// Insert into DB
// ---------------------------------------------
(async () => {
  try {
    await PreviousYearPaper.insertMany(papers);
    console.log("✅ Successfully inserted 40 categorized Engineering papers!");
  } catch (error) {
    console.error("❌ Error inserting data:", error);
  } finally {
    mongoose.connection.close();
  }
})();
