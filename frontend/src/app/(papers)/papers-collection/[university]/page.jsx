"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
    FaBookOpen,
    FaFileAlt,
    FaLayerGroup,
    FaDownload
} from "react-icons/fa";

import CourseCard from "../../../self-component/Papers/Course";
import Breadcrumbuniversity from "@/app/self-component/Papers/Breadcum-university-paper";

export default function UniversityCoursesPage() {
    const { university } = useParams();

    const universityName = university
        ? decodeURIComponent(university).replace(/-/g, " ")
        : "";
    const UppercaseUniversityName = universityName.charAt(0).toUpperCase() + universityName.slice(1);
    return (
        <section className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#0e1628] to-[#0b1120] text-white pt-24 pb-6 px-4">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* ================= HERO ================= */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.15),_transparent_60%)]" />


                  <div className="relative z-10 space-y-3 ">
  <div className="flex items-center gap-3 ">
    <div className="p-2  rounded-xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-white/10">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="w-6 h-6 sm:w-8 sm:h-8 text-teal-400"
      >
        <path d="M14 22v-4a2 2 0 1 0-4 0v4" />
        <path d="m18 10 4-2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l10 6 10-6v6" />
        <path d="M18 5v17" />
        <path d="m4 6 8-4 8 4" />
      </svg>
    </div>
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-teal-400 bg-clip-text ">
      {UppercaseUniversityName}
    </h1>
  </div>

  <div className="pl-0 sm:pl-1">
    <p className="text-slate-300 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed">
      <span className="block mt-2 sm:mt-3 text-slate-300/90">
        Browse courses, semesters and download previous year question papers — all in one place.
      </span>
    </p>
  </div>
</div>
                </div>
                {/* breadcumb */}
                <Breadcrumbuniversity university={university} />
                {/* ================= STATS ================= */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                    <StatCard label="Courses" value="100+" icon={FaBookOpen} />
                    <StatCard label="Semesters" value="8+" icon={FaLayerGroup} />
                    <StatCard label="Papers" value="500+" icon={FaFileAlt} />
                    <StatCard label="Downloads" value="50k+" icon={FaDownload} />
                </div>

                {/* ================= COURSE SECTION ================= */}
                <div >
                    <h2 className="text-2xl font-bold text-teal-500 pt-1 text-center md:text-start">
                        🎓 Select Your Course
                    </h2>
                    {/* Course cards */}
                    <CourseCard  />
                </div>

            </div>
        </section>
    );
}

/* ================= STAT CARD ================= */
function StatCard({ icon: Icon, label, value }) {
    return (
        <div className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-teal-400/40 transition-all">
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-teal-500/20 ring-1 ring-teal-400/30 flex items-center justify-center group-hover:scale-110 transition">
                    <Icon className="text-teal-400 text-lg" />
                </div>

                <div>
                    <p className="text-sm text-slate-400">{label}</p>
                    <p className="text-2xl font-bold">{value}</p>
                </div>
            </div>
        </div>
    );
}
