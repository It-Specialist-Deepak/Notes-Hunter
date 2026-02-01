"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaUniversity,
  FaBook,
  FaSearch,
  FaArrowRight,
  FaGraduationCap,
  FaChevronDown,
} from "react-icons/fa";
import Link from "next/link";

export default function BrowseQuestionBank() {
  const router = useRouter();
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // List of universities (you can fetch this from an API or have it static)
  const universitiesList = [
    "mumbai university",
    "pune university",
    "delhi university",
    "bangalore university",
    "anna university",
    "jntu",
    "gtu",
    "ktu",
    "rtu",
    "uptu",
  ];

  useEffect(() => {
    setUniversities(universitiesList);
  }, []);

  // Fetch courses when university is selected
  useEffect(() => {
    if (selectedUniversity) {
      fetchCourses(selectedUniversity);
    }
  }, [selectedUniversity]);

  const fetchCourses = async (university) => {
    setCoursesLoading(true);
    try {
      const response = await fetch(`/api/questionbank/courses/${university}`);
      const data = await response.json();
      
      if (data.success) {
        setCourses(data.courses || []);
      } else {
        console.error("Failed to fetch courses:", data.message);
        setCourses([]);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    } finally {
      setCoursesLoading(false);
    }
  };

  const filteredUniversities = universities.filter((uni) =>
    uni.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCourses = courses.filter((course) =>
    course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUniversitySelect = (university) => {
    setSelectedUniversity(university);
    setShowDropdown(false);
    setSearchTerm("");
  };

  const handleCourseClick = (course) => {
    // Navigate to question bank page with university and course
    router.push(
      `/question-bank/${selectedUniversity.toLowerCase()}/${course
        .toLowerCase()
        .replace(/\s+/g, "-")}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#081a2d] via-[#0b3a4a] to-[#061622] text-white py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Question Bank
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Browse question papers by university and course to find exactly what you need
          </p>
        </motion.div>

        {/* University Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center">
                <FaUniversity className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Select University</h2>
                <p className="text-white/60">Choose your university to browse courses</p>
              </div>
            </div>

            {/* Custom Dropdown */}
            <div className="relative">
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full p-4 bg-white/10 border border-white/20 rounded-xl cursor-pointer hover:bg-white/15 transition-all duration-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <FaUniversity className="text-teal-400" />
                  <span className={selectedUniversity ? "text-white" : "text-white/50"}>
                    {selectedUniversity
                      ? selectedUniversity.charAt(0).toUpperCase() + selectedUniversity.slice(1)
                      : "Select University"}
                  </span>
                </div>
                <FaChevronDown
                  className={`text-white/60 transition-transform duration-200 ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                />
              </div>

              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-white/20 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                  <div className="p-3">
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                      <input
                        type="text"
                        placeholder="Search universities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal-400"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  {filteredUniversities.map((university, index) => (
                    <div
                      key={index}
                      onClick={() => handleUniversitySelect(university)}
                      className="px-4 py-3 hover:bg-white/10 cursor-pointer transition-colors duration-200 flex items-center gap-3"
                    >
                      <FaUniversity className="text-teal-400 text-sm" />
                      <span>
                        {university.charAt(0).toUpperCase() + university.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Courses Display */}
        {selectedUniversity && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                  <FaBook className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">
                    Available Courses
                  </h2>
                  <p className="text-white/60">
                    {courses.length} courses found for{" "}
                    {selectedUniversity.charAt(0).toUpperCase() + selectedUniversity.slice(1)}
                  </p>
                </div>
              </div>

              {coursesLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-400 border-t-transparent"></div>
                </div>
              ) : filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCourses.map((course, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onClick={() => handleCourseClick(course)}
                      className="bg-white/10 border border-white/20 rounded-xl p-6 hover:bg-white/15 hover:border-teal-400/50 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <FaGraduationCap className="text-teal-400" />
                        </div>
                        <FaArrowRight className="text-white/40 group-hover:text-teal-400 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-teal-300 transition-colors">
                        {course}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {selectedUniversity.charAt(0).toUpperCase() + selectedUniversity.slice(1)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaBook className="text-white/40 text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No Courses Found</h3>
                  <p className="text-white/60">
                    {searchTerm
                      ? "No courses match your search criteria"
                      : "No courses available for this university yet"}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUniversity className="text-teal-400 text-xl" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{universities.length}</h3>
            <p className="text-white/60">Universities</p>
          </div>
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBook className="text-emerald-400 text-xl" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {selectedUniversity ? courses.length : "0"}
            </h3>
            <p className="text-white/60">Available Courses</p>
          </div>
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaGraduationCap className="text-blue-400 text-xl" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">1000+</h3>
            <p className="text-white/60">Question Papers</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}