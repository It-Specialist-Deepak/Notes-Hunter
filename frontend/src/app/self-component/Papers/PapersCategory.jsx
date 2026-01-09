"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  FaPlane,
  FaMicroscope,
  FaFlask,
  FaBuilding,
  FaLaptopCode,
  FaBolt,
  FaCogs,
  FaBookOpen,
  FaChartLine,
  FaBalanceScale,
  FaUniversity,
  FaPalette,
  FaLanguage,
  FaGlobe,
  FaCoins,
  FaCalculator,
  FaBrain,
  FaBriefcase,
} from "react-icons/fa";
import PaperSkeleton from "@/app/skeleton/PaperCategory-skeleton";

/* ----------------------------------
   CATEGORY → ICON MAP
---------------------------------- */
const categoryIcons = {
  aerospace: FaPlane,
  biotechnology: FaMicroscope,
  chemical: FaFlask,
  civil: FaBuilding,
  "computer science": FaLaptopCode,
  electrical: FaBolt,
  mechanical: FaCogs,
  mathematics: FaCalculator,
  physics: FaMicroscope,
  chemistry: FaFlask,
  biology: FaBrain,
  commerce: FaChartLine,
  economics: FaCoins,
  accounting: FaCalculator,
  finance: FaChartLine,
  management: FaBriefcase,
  business: FaBriefcase,
  arts: FaUniversity,
  law: FaBalanceScale,
  history: FaUniversity,
  geography: FaGlobe,
  psychology: FaBrain,
  sociology: FaGlobe,
  literature: FaLanguage,
  philosophy: FaBalanceScale,
  "fine arts": FaPalette,
};

/* ----------------------------------
   SAFE ICON
---------------------------------- */
const getCategoryIcon = (category) =>
  categoryIcons[category?.toLowerCase()] || FaBookOpen;

const PapersCategory = ({ searchTerm = "" }) => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ----------------------------------
     FETCH CATEGORIES
  ---------------------------------- */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/paper/getcategory`
        );

        if (res.data?.success && Array.isArray(res.data.categories)) {
          setCategories(res.data.categories); // ✅ array of strings
        } else {
          setCategories([]);
        }
      } catch (err) {
        console.error("Category fetch failed", err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  /* ----------------------------------
     SEARCH FILTER
  ---------------------------------- */
  const filteredStream = useMemo(() => {
    return categories.filter((category) =>
      category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  /* ----------------------------------
     LOADING
  ---------------------------------- */
  if (loading) {
    return (
      <section className="py-10">
        <PaperSkeleton />
      </section>
    );
  }

  /* ----------------------------------
     EMPTY
  ---------------------------------- */
  if (filteredStream.length === 0) {
    return (
      <p className="text-white/60 text-sm mt-4 text-center">
        No results found
      </p>
    );
  }

  /* ----------------------------------
     NAVIGATION
  ---------------------------------- */
  const handleClick = (category) => {
    router.push(`/browse-papers/${encodeURIComponent(category)}`);
  };

  return (
    <section className="py-10">
      <div className="px-4">
        <h2 className="text-2xl font-bold mb-8">Select Your Stream</h2>
      </div>

      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
        {filteredStream.map((category) => {
          const Icon = getCategoryIcon(category);

          return (
            <div
              key={category}
              onClick={() => handleClick(category)}
              className="
                relative group rounded-2xl p-6
                bg-white/10 backdrop-blur-2xl
                border border-white/20
                shadow-lg shadow-black/30
                transition-all duration-300
                hover:scale-105
                hover:border-teal-400/50
                hover:shadow-teal-500/30
                cursor-pointer
              "
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-teal-400/10 to-cyan-400/10 blur-xl" />

              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-teal-500/20 text-teal-300">
                  <Icon size={22} />
                </div>

                <h3 className="text-lg font-semibold capitalize text-white">
                  {category}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PapersCategory;
