"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
    FaBookOpen,
    FaFileAlt,
    FaLayerGroup,
    FaDownload,
    FaSearch,
} from "react-icons/fa";

import CourseCard from "../../../self-component/Papers/Course";
import Breadcrumbuniversity from "@/app/self-component/Papers/Breadcum-university-paper";

export default function UniversityCoursesPage() {
    const { university } = useParams();
    const [search, setSearch] = useState("");

    const universityName = university
        ? decodeURIComponent(university).replace(/-/g, " ")
        : "";

    return (
        <section className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#0e1628] to-[#0b1120] text-white pt-24 pb-6 px-4">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* ================= HERO ================= */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.15),_transparent_60%)]" />


                    <div className="relative z-10 space-y-4">
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight capitalize">
                            {universityName}
                        </h1>

                        <p className="text-slate-300 max-w-2xl text-sm md:text-base">
                            Browse courses, semesters and download previous year question
                            papers — all in one place.
                        </p>


                        {/* ================= SEARCH ================= */}
                        <div className="mt-6 max-w-xl">
                            <div className="flex items-center gap-3 rounded-2xl bg-black/30 border border-white/10 px-4 py-3 focus-within:border-teal-400">
                                <FaSearch className="text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search courses (B.Tech, B.Sc, MBA...)"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full bg-transparent outline-none text-sm placeholder:text-slate-400"
                                />
                            </div>
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
                    <CourseCard search={search} />
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
