"use client";

import React, { useState } from "react";
import { Search, FileText, Download, Eye } from "lucide-react";
import NotesCategory from "@/app/self-component/Notes/NotesCategory";
// import PapersCategory from "@/app/self-component/Papers/PapersCategory";

const stats = [
    { icon: FileText, value: "725", label: "Total Papers" },
    { icon: Download, value: "3,887", label: "Downloads" },
    { icon: Eye, value: "19,627", label: "Views" },
];

const notes = Array.from({ length: 8 });

export default function NotesCollection() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="min-h-screen bg-gradient-to-br 
from-[#081a2d] 
via-[#0b3a4a] 
to-[#061622]
 text-white overflow-hidden">

            {/* ================= HERO ================= */}
            <section className="relative pt-30 pb-8 px-4">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center">

                    {/* LEFT */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                            📁 Notes Collection
                        </h1>

                        <p className="text-white/70 max-w-xl mb-6">
                            Discover and download study materials shared by our community of
                            students and educators.
                        </p>

                        {/* SEARCH */}
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full p-4 max-w-xl">
                        <Search className="ml-4 text-white/60" size={20} />
                           <input
  type="text"
  placeholder="Search your Stream"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="flex-1 bg-transparent outline-none px-2 text-sm text-white placeholder-white/50"
/>

                           
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
            <section className="pb-16 px-4">
                <div className="max-w-7xl mx-auto">
          <div className="mb-8">
                    <h2 className="text-2xl font-bold  text-center md:text-start lg:ml-18">Select Your Stream</h2>
                    </div>
                    <NotesCategory  searchTerm={searchTerm}/>
                </div>
            </section>

        </div>
    );
}
