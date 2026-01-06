"use client";

import React, { useEffect, useState } from "react";
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
  // 🔬 SCIENCE & ENGINEERING
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

  // 💼 COMMERCE
  commerce: FaChartLine,
  economics: FaCoins,
  accounting: FaCalculator,
  finance: FaChartLine,
  management: FaBriefcase,
  business: FaBriefcase,

  // 🎨 ARTS & HUMANITIES
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
   SAFE ICON RESOLVER
---------------------------------- */
const getCategoryIcon = (category) => {
  return categoryIcons[category.toLowerCase()] || FaBookOpen;
};

const PapersCategory = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  

  /* ----------------------------------
     FETCH CATEGORIES FROM API
  ---------------------------------- */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/paper/getcategory`
        );

        if (res.data.success) {
          setCategories(res.data.categories);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-10">
        <PaperSkeleton />
      </section>
    );
  }
  const handleClick = (category) => {
    
    router.push(`/browse-papers/${encodeURIComponent(category)}`);
  };
  return (
    <section className="py-10">
      <div className="px-4">
       <h2 className="text-2xl font-bold mb-8">Select Your Stream</h2>
       </div>
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
        
        {categories.map((category, index) => {
          const Icon = getCategoryIcon(category);

          return (
            <div
             onClick={() => handleClick(category)}
              key={index}
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
              
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-teal-400/10 to-cyan-400/10 blur-xl" />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center gap-4">
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
