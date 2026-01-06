"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { FileText, Search, Download, Eye } from "lucide-react";
import PaperCard from "../../../self-component/Papers/PaperCard";
import Breadcumb from "../../../self-component/Papers/Breadcumb";
import PaperPagination from "@/app/self-component/Papers/PapersPagination";

const CategoryPapers = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const category = decodeURIComponent(params.Category);

  const [papers, setPapers] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
  // Use only one page & limit declaration
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 12;

  useEffect(() => {
    if (!category) return;

    const fetchPapers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/paper/getpapers-bycategory/${encodeURIComponent(
            category
          )}?limit=${limit}&page=${page}` // <-- Correct: use ${} for variables
        );

        if (res.data.success) {
          setPapers(res.data.papers);
          setMeta({
            category: res.data.category || category,
            currentPage: res.data.currentPage || 1,
            totalPages: res.data.totalPages || 1,
            totalPapers: res.data.totalPapers || res.data.papers.length,
            count: res.data.count || res.data.papers.length,
          });
        } else {
          setPapers([]);
          setMeta(null);
        }
      } catch (err) {
        console.error("API ERROR:", err);
        setPapers([]);
        setMeta(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, [category, page]); // refetch when category or page changes

  const stats = [
    { icon: FileText, value: "100", label: "Total Papers" },
    { icon: Download, value: "3,887", label: "Downloads" },
    { icon: Eye, value: "19,627", label: "Views" },
  ];
 
  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#081a2d] via-[#0b3a4a] to-[#061622] text-white">

  <section className="relative min-h-screen flex items-center justify-center px-4">

    {/* LOADER OVERLAY */}
    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
  <div className="flex flex-col items-center gap-5">

    {/* Pulse Ring Loader */}
    <div className="relative w-20 h-20">
      <span className="absolute inset-0 rounded-full border-2 border-teal-400/40 animate-ping"></span>
      <span className="absolute inset-2 rounded-full border-2 border-teal-400 animate-spin"></span>
      <span className="absolute inset-6 rounded-full bg-teal-400/80"></span>
    </div>

    {/* Text */}
    <p className="text-teal-300 text-xs tracking-[0.35em] uppercase animate-pulse">
      Loading...
    </p>

  </div>
</div>


  </section>
</div>

    );
  }

  /* ---------------- EMPTY ---------------- */
  if (!papers.length) {
    return (
      <section className="h-[60vh] flex flex-col items-center justify-center text-center">
        <FileText className="w-12 h-12 text-teal-400 mb-4" />
        <h2 className="text-xl font-semibold text-white">No papers found</h2>
        <p className="text-white/60 mt-1">
          No papers available for <span className="font-medium">{category}</span>
        </p>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#081a2d] via-[#0b3a4a] to-[#061622] text-white">
      {/* ---------------- HERO ---------------- */}
      <section className="relative pt-36 pb-12 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              📁 Browse Exam Papers
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
                placeholder="Search Courses Based on your Stream"
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

      {/* ---------------- CATEGORY HEADER ---------------- */}
      <section className="max-w-7xl mx-auto px-6 mb-10 flex items-center gap-4">
        <Breadcumb category={category} />
      </section>

      {/* ---------------- PAPERS GRID ---------------- */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {papers.map((paper) => (
            <PaperCard key={paper._id} paper={paper} meta={meta} />
          ))}
        </div>
        {/* ---------------- PAGINATION ---------------- */}
        {meta && <PaperPagination meta={meta} />}
      </section>


    </div>
  );
};

export default CategoryPapers;
