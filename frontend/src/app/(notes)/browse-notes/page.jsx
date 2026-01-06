"use client";

import React from "react";
import NotesCard from "../../self-component/Notes/NotesCard"
import { Search, FileText, Download, Eye } from "lucide-react";

const stats = [
    { icon: FileText, value: "725", label: "Total Notes" },
    { icon: Download, value: "3,887", label: "Downloads" },
    { icon: Eye, value: "19,627", label: "Views" },
];

const notes = Array.from({ length: 8 });

export default function BrowseNotesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br 
from-[#081a2d] 
via-[#0b3a4a] 
to-[#061622]
 text-white overflow-hidden">

            {/* ================= HERO ================= */}
            <section className="relative pt-36 pb-24 px-4">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                            📁 Browse Notes
                        </h1>

                        <p className="text-white/70 max-w-xl mb-8">
                            Discover and download study materials shared by our community of
                            students and educators.
                        </p>

                        {/* SEARCH */}
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full p-2 max-w-xl">
                            <Search className="ml-4 text-white/60" size={20} />
                            <input
                                type="text"
                                placeholder="Search notes, PDFs, eBooks, study materials..."
                                className="flex-1 bg-transparent outline-none px-2 text-sm"
                            />
                            <button className="bg-gradient-to-r from-teal-500 to-emerald-600 px-6 py-3 rounded-full font-semibold shadow-lg hover:opacity-90 transition">
                                Search
                            </button>
                        </div>
                    </div>

                    {/* RIGHT STATS */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {stats.map((item, i) => (
                            <div
                                key={i}
                                className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 text-center shadow-xl"
                            >
                                <item.icon className="mx-auto mb-4 text-teal-400" size={28} />
                                <h3 className="text-3xl font-bold">{item.value}</h3>
                                <p className="text-white/60 text-sm uppercase tracking-wider">
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= NOTES GRID ================= */}
            <section className="pb-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold mb-8">Latest Notes</h2>
                    <NotesCard />
                </div>
            </section>
        </div>
    );
}
