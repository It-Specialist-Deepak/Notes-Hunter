"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import PaperCard from "../../../self-component/Papers/PaperCard";
import Breadcumb from "../../../self-component/Papers/Breadcumb";
import PaperPagination from "@/app/self-component/Papers/PapersPagination";
import { Search } from "lucide-react";
import { FileText, Eye ,  Download } from "lucide-react";
import useDebounce from "../../../hooks/useDebounce"; // 👈 import
const CategoryPapers = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const category = decodeURIComponent(params.Category || "");
  const page = Number(searchParams.get("page")) || 1;
  const limit = 12;

  const [papers, setPapers] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
    // ✅ DEBOUNCED SEARCH
  const debouncedSearch = useDebounce(searchTerm, 800);

  /* ---------------- FETCH PAPERS (LIKE NOTES) ---------------- */
  useEffect(() => {
    if (!category) return;

    let isMounted = true;

    const fetchPapers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/paper/getpapers-bycategory/${encodeURIComponent(
            category
          )}`,
          {
            params: {
              page,
              limit,
             search: debouncedSearch.trim(),
            },
          }
        );

        if (!isMounted) return;

        if (res.data?.success) {
          setPapers(res.data.data || []);
          setMeta({
            category,
            currentPage: res.data.page,
            totalPages: res.data.totalPages,
            totalPapers: res.data.totalPapers,
            count: res.data.count,
          });
        } else {
          setPapers([]);
          setMeta(null);
        }
      } catch (error) {
        console.error("Fetch papers error:", error);
        if (isMounted) {
          setPapers([]);
          setMeta(null);
        }
      } finally {
        isMounted && setLoading(false);
      }
    };

    fetchPapers();

    return () => {
      isMounted = false;
    };
  }, [category, page, debouncedSearch]);

  /* ---------------- RESET PAGE ON SEARCH (LIKE NOTES) ---------------- */
  useEffect(() => {
    if (page !== 1) {
      router.replace("?page=1");
    }
  }, [debouncedSearch]);
  
  /* ---------------- UI ---------------- */
   const stats = [
    { icon: FileText, value: "100", label: "Total Papers" },
    { icon: Download, value: "3,887", label: "Downloads" },
    { icon: Eye, value: "19,627", label: "Views" },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#081a2d] via-[#0b3a4a] to-[#061622] text-white">
      {/* HERO */}
     <section className="relative pt-30 px-4">
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
             <div className="flex items-center gap-3 bg-white/10 rounded-full p-4 max-w-xl">
          <Search className="text-white/60" size={18} />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search papers, subjects, universities"
            className="flex-1 bg-transparent outline-none text-sm text-white"
          />
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

      {/* BREADCUMB */}
      <section className="max-w-7xl mx-auto px-6 my-8">
        <Breadcumb category={category} />
      </section>

      {/* PAPERS GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {loading ? (
           <div className="min-h-screen ">

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
        ) : papers.length ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {papers.map((paper) => (
              <PaperCard key={paper._id} paper={paper} paperId={paper._id} category={category} />
            ))}
          </div>
        ) : (
          <p className="text-center text-white/60">
            No papers found for {category}
          </p>
        )}

        {/* PAGINATION */}
        {meta && meta.totalPages > 1 && (
          <PaperPagination meta={meta} />
        )}
      </section>
    </div>
  );
};

export default CategoryPapers;
