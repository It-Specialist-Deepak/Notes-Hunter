"use client";

import React, { useState } from "react";
import { Search, GraduationCap } from "lucide-react";
import University from "@/app/self-component/Papers/University";



export default function UniversitiesPage() {
  const [search, setSearch] = useState("");



  return (
    <section className="min-h-screen bg-gradient-to-br from-[#061c2b] via-[#0b3a4a] to-[#04131e] px-6 py-14 pt-28 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-3xl md:text-4xl font-bold">
              <GraduationCap className="h-10 w-10 text-teal-400" />
              Browse Universities
            </h1>
            <p className="mt-3 max-w-xl text-slate-300">
              Find university-wise exam papers shared by students.<br />
              Prepare better, revise faster, and score higher.
            </p>

          </div>

          {/* Search */}
          <div className="flex w-full max-w-md items-center gap-3 rounded-full bg-white/10 px-6 py-4 backdrop-blur ">
            <Search className="h-5 w-5 text-slate-300" />
            <input
              type="text"
              placeholder="Search university..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-white placeholder:text-slate-400 outline-none"
            />
          </div>
        </div>
        {/* Stats */}
        <div className="mb-14 grid gap-6 sm:grid-cols-3">
          {[{ label: "Universities", value: 120 }, { label: "Notes", value: "25K+" }, { label: "Downloads", value: "1M+" }].map(
            (stat, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/10 p-6 text-center shadow-lg backdrop-blur"
              >
                <p className="text-3xl font-bold text-teal-400">{stat.value}</p>
                <p className="mt-1 text-sm tracking-wide text-slate-300">
                  {stat.label}
                </p>
              </div>
            )
          )}
        </div>
        <University />
      </div>
    </section>
  );
}
