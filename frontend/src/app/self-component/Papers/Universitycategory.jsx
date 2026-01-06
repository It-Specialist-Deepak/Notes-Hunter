"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { FaFolderOpen, FaUniversity } from "react-icons/fa";
import Breadcrumbcourse from "./Breadcumb-course-paper";

const Universitycategory = () => {
  const { university, course } = useParams();
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Decode + Clean + Title Case (for UI only)
  const formatName = (value = "") => {
    const decoded = decodeURIComponent(value);

    return decoded
      .replace(/[-_]/g, " ")
      .split(" ")
      .filter(Boolean)
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  };

  const universityName = formatName(university);
  const courseName = formatName(course);

  // ================= FETCH CATEGORIES =================
  useEffect(() => {
    if (!university || !course) return;

    const fetchCategories = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/paper/all-course-category/${university}/${course}`
        );

        if (res.data.success) {
          setCategories(res.data.categories || []);
        } else {
          setCategories([]);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [university, course]);

  // ================= HANDLE CATEGORY CLICK =================
  const handleClick = (category) => {
    router.push(
      `/papers-collection/${university}/${course}/${category}`
    );
  };

  return (
    <section className="min-h-screen bg-[#0b1120] text-white">
      <div className="max-w-7xl mx-auto px-6 py-24 space-y-7">

        {/* ================= HEADER ================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500/10 via-white/5 to-transparent border border-white/10 p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.15),transparent_60%)]" />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 text-teal-400">
              <FaUniversity />
              <span className="text-sm uppercase tracking-wider">
                University Dashboard
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold">
              {courseName}
            </h1>

            <p className="text-slate-400 max-w-2xl">
              Browse all available paper categories for{" "}
              <span className="text-teal-400 font-medium">
                {universityName}
              </span>
            </p>
          </div>
        </div>

        {/* ================= BREADCRUMB ================= */}
        <Breadcrumbcourse
          universityName={universityName}
          courseName={courseName}
        />

        {/* ================= CONTENT ================= */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-28 rounded-2xl bg-white/5 animate-pulse border border-white/10"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : categories.length === 0 ? (
          <div className="text-center text-slate-400">
            No categories found.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {categories.map((cat, index) => (
              <div
                key={index}
                onClick={() => handleClick(cat)}
                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6
                           hover:border-teal-400/40 hover:shadow-[0_0_35px_rgba(20,184,166,0.25)]
                           transition-all duration-300 cursor-pointer"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-teal-400/10 to-transparent" />

                <div className="relative z-10 flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-teal-500/20 ring-1 ring-teal-400/30 flex items-center justify-center">
                    <FaFolderOpen className="text-teal-400 text-lg" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      {formatName(cat)}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">
                      View previous year papers
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Universitycategory;
