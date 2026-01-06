"use client";

import React, { useState } from "react";
import NotesCard from "../../self-component/Notes/NotesCard"
import { Search, FileText, Download, Eye } from "lucide-react";

const stats = [
    { icon: FileText, value: "100+", label: "Total Notes" },
    { icon: Download, value: "3,887", label: "Downloads" },
    { icon: Eye, value: "10,627", label: "Views" },
];

const notes = Array.from({ length: 8 });

export default function BrowseNotesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <div className="min-h-screen bg-gradient-to-br 
from-[#081a2d] 
via-[#0b3a4a] 
to-[#061622]
 text-white overflow-hidden">

            {/* ================= HERO ================= */}
            <section className="relative pt-30 pb-8 px-4">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 items-center">

                    {/* LEFT */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                            📁 Browse Notes
                        </h1>

                        <p className="text-white/70 max-w-xl mb-6">
                            Discover and download study materials shared by our community of
                            students and educators.
                        </p>


                       
                        {/* SEARCH */} <div className="flex items-center gap-3 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full p-4 max-w-xl"> 
                        <Search className="ml-4 text-white/60" size={20} />
                         <input type="text"   value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         placeholder="Search notes, PDFs" className="flex-1 bg-transparent outline-none px-2 text-sm text-white" />
                         </div>
                    </div>

                    {/* RIGHT STATS */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            <section className="pb-12 px-4">
                <div className="max-w-7xl  mx-auto">
                    <div className="mb-8">
                    <h2 className="text-2xl font-bold  text-center md:text-start">Latest Notes</h2>
                    </div>
                    <NotesCard searchQuery={searchQuery} />
                </div>
            </section>
        </div>
    );
}
