"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { BookOpen, ChevronRight } from "lucide-react";

export default function UniversityCoursesPage() {
 const { university } = useParams(); // gets the slug from URL
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

 const capitalizeFirstLetter = (text) =>
    text.charAt(0).toUpperCase() + text.slice(1);

 
useEffect(() => {
  if (!university) return;

  const fetchCourses = async () => {
    try {
      const slug = university.replace(/-/g, " "); // convert back to normal name if needed
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/paper/all-university-course/${slug}`
      );

      if (res.data.success) {
        setCourses(res.data.courses);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error("Failed to fetch courses", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  fetchCourses();
}, [university]);


 const handleCourseClick = (course) => {
  const slug = course
    .toLowerCase()
    .trim()
    .split(" ")
    .filter(Boolean)
    .join(" ");

  router.push(`/papers-collection/${university}/${slug}`);
};


  return (
    <section className="min-h-screen  px-6 py-10 text-white">
   

      {/* Content */}
      <div className="mx-auto max-w-7xl">
        {loading ? (
          <SkeletonGrid />
        ) : courses.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course, idx) => (
              <div
                key={idx}
                onClick={() => handleCourseClick(course)}
                className="group cursor-pointer rounded-2xl bg-white/5 p-6 backdrop-blur-xl border border-white/10 transition hover:-translate-y-1 hover:border-teal-400/40 hover:shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/20 ring-1 ring-teal-400/30">
                    <BookOpen className="h-6 w-6 text-teal-400" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-teal-400 transition" />
                </div>

                <h3 className="text-lg font-semibold text-white">  {capitalizeFirstLetter(course)}</h3>

                <p className="mt-2 text-sm text-slate-400">
                  View branches, semesters & papers
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------- Skeleton ---------------- */
function SkeletonGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-40 rounded-2xl bg-white/5 animate-pulse" />
      ))}
    </div>
  );
}

/* ---------------- Empty State ---------------- */
function EmptyState() {
  return (
    <div className="text-center mt-20">
      <h3 className="text-xl font-semibold text-white">No courses found</h3>
      <p className="mt-2 text-slate-400">
        Courses will appear once they are added.
      </p>
    </div>
  );
}
