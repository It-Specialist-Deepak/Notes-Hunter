"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import {
    FaLayerGroup,
    FaUniversity,
    FaBookOpen,
    FaCalendarAlt,
    FaSearch

} from "react-icons/fa";
import Breadcrumbcategory from "./Breadcumb-category-paper";

const CollectionPaper = () => {
    const { university, course, category } = useParams();
    //  console.log(university, course, category);
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    // ================= FORMAT FOR UI =================
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
    const categoryName = formatName(category);


    // ================= FETCH PAPERS =================
    useEffect(() => {
        if (!university || !course || !category) return;

        const fetchPapers = async () => {
            try {
                setLoading(true);

                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/paper/by-university-course-category/${universityName}/${courseName}/${categoryName}`
                );

                if (res.data.success) {
                    setPapers(res.data.papers || []);
                } else {
                    setPapers([]);
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load papers");
            } finally {
                setLoading(false);
            }
        };

        fetchPapers();
    }, [university, course, category]);

    return (
        <section className="min-h-screen bg-[#0b1120] text-white">
            <div className="max-w-7xl mx-auto px-5 pt-23 space-y-6">

                {/* ================= HEADER ================= */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500/10 via-white/5 to-transparent border border-white/10 p-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.15),transparent_60%)]" />

                    <div className="relative z-10 space-y-4">
                        <div className="flex items-center gap-3 text-teal-400">
                            <FaUniversity />
                            <span className="text-sm uppercase tracking-wider">
                                Paper Collection
                            </span>
                        </div>

                        <h1 className="text-2xl md:text-4xl font-bold">
                            {formatName(category)}
                        </h1>

                        <p className="text-slate-400 max-w-2xl">
                            {formatName(courseName)} ·{" "}
                            <span className="text-teal-400"> {formatName(universityName)}</span>
                        </p>
                    </div>
        
                </div>
                <Breadcrumbcategory universityName={formatName(universityName)} courseName={formatName(courseName)} categoryName={categoryName} />
                {/* ================= CONTENT ================= */}
                {loading ? (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="h-62 rounded-2xl bg-white/5 animate-pulse border border-white/10"
                            />
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center text-red-400">{error}</div>
                ) : papers.length === 0 ? (
                    <div className="text-center text-slate-400">
                        No papers found.
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {papers.map((paper, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-6
                 hover:border-teal-400/40 hover:shadow-[0_0_40px_rgba(20,184,166,0.25)]
                 transition-all duration-300"
                            >
                                {/* Glow overlay */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
                      bg-gradient-to-br from-teal-400/10 via-transparent to-transparent" />

                                <div className="relative z-10 space-y-5">

                                    {/* ===== TITLE ===== */}
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-semibold text-white leading-snug">
                                            {paper.title}
                                        </h3>
                                        <p className="text-sm text-slate-400">
                                            {paper.subject}
                                        </p>
                                    </div>

                                    {/* ===== BADGES ===== */}
                                    <div className="flex flex-wrap gap-2 text-xs">
                                        <span className="px-2 py-1 rounded-full bg-teal-500/15 text-teal-400 border border-teal-400/20">
                                            {paper.subcategory}
                                        </span>
                                        <span className="px-2 py-1 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-400/20">
                                            {paper.examType}
                                        </span>
                                        <span className="px-2 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-400/20">
                                            {paper.paperType}
                                        </span>
                                    </div>

                                    {/* ===== META INFO ===== */}
                                    <div className="grid grid-cols-2 gap-4 text-xs text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-teal-400" />
                                            <span>{paper.year}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaLayerGroup className="text-teal-400" />
                                            <span>Semester {paper.semester}</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <FaUniversity className="text-teal-400" />
                                            <span>{paper.university}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaBookOpen className="text-teal-400" />
                                            <span>{paper.course}</span>
                                        </div>
                                    </div>


                                    {/* ===== STATS ===== */}
                                    <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/10">
                                        <span>👁 {paper.views} Views</span>
                                        <span>⬇ {paper.downloads} Downloads</span>
                                        <span>❤️ {paper.likes}</span>
                                    </div>

                                    {/* ===== ACTIONS ===== */}
                                    {paper.fileUrl && (
                                        <div className="mt-4 grid grid-cols-2 gap-3">

                                            {/* Preview Button */}
                                            <a
                                                href={paper.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 rounded-xl
                 bg-white/5 text-slate-300 border border-white/10
                 py-2 text-sm font-medium
                 hover:bg-white/10 hover:border-teal-400/40
                 transition"
                                            >
                                                👁 Preview
                                            </a>

                                            {/* Download Button */}
                                            <a
                                                href={paper.fileUrl}
                                                download
                                                className="flex items-center justify-center gap-2 rounded-xl
                 bg-teal-500/15 text-teal-400 border border-teal-400/30
                 py-2 text-sm font-medium
                 hover:bg-teal-500/25 hover:border-teal-400/60
                 transition"
                                            >
                                                ⬇ Download
                                            </a>

                                        </div>
                                    )}

                                </div>
                            </div>
                        ))}
                    </div>

                )}

            </div>
        </section>
    );
};

export default CollectionPaper;
