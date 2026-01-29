"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import {
    FaLayerGroup,
    FaUniversity,
    FaBookOpen,
    FaCalendarAlt,
    FaBookmark,
    FaRegBookmark,
} from "react-icons/fa";
import { useDispatch , useSelector } from "react-redux";
import Breadcrumbcategory from "./Breadcumb-category-paper";
import { fetchPreviewPaper, downloadPaper, toggleSavePaper } from "../../redux/slices/previewpaperSlice";
import { fetchSavedItems } from "../../redux/slices/savedItemSlice";
import toast from "react-hot-toast";
const CollectionPaper = () => {
    const { university, course, category } = useParams();
    const dispatch = useDispatch();
    const router = useRouter();
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

    const handlePreview = (paperId) => async () => {
        try {
            const result = await dispatch(fetchPreviewPaper(paperId));

            if (fetchPreviewPaper.fulfilled.match(result)) {
                router.push(
                    `/papers-collection/${university}/${course}/${category}/${paperId}`
                );
            }
        } catch (error) {
            console.error("Error previewing paper:", error);
        }
    };
    const handleDownload = (paperId) => async (e) => {
        e.preventDefault();
        console.log("Downloading paper:", paperId);

        try {
            const result = await dispatch(downloadPaper(paperId));

            if (downloadPaper.fulfilled.match(result)) {
                // The API should return a direct download URL
                const downloadUrl = result.payload?.downloadUrl || result.payload;
                if (downloadUrl) {
                    // Open the download URL in a new tab
                    window.open(downloadUrl, '_blank');
                }
            }
        } catch (error) {
            console.error("Download failed:", error);
        }
    };
    // Save functionality with optimistic UI updates
    const [saveLoadingMap, setSaveLoadingMap] = useState({});
    const [localSavedStatus, setLocalSavedStatus] = useState({});
    const savedPapers = useSelector((state) => state.savedItems.papers);

    // Initialize local saved status when savedPapers changes
    useEffect(() => {
        const initialStatus = {};
        savedPapers?.forEach(paper => {
            initialStatus[paper._id] = true;
        });
        setLocalSavedStatus(prev => ({
            ...prev,
            ...initialStatus
        }));
    }, [savedPapers]);

    // Initial fetch of saved papers
    useEffect(() => {
        dispatch(fetchSavedItems({ type: 'papers' }));
    }, []);

    const isPaperSaved = (paperId) => {
        // First check local state, then fall back to Redux state
        if (localSavedStatus.hasOwnProperty(paperId)) {
            return localSavedStatus[paperId];
        }
        return savedPapers?.some(savedPaper => savedPaper._id === paperId);
    };

    const handleSave = async (paperId) => {
        const previousState = isPaperSaved(paperId);
        
        // Optimistically update the UI
        setLocalSavedStatus(prev => ({
            ...prev,
            [paperId]: !previousState
        }));
        
        setSaveLoadingMap(prev => ({
            ...prev,
            [paperId]: true
        }));

        try {
            const result = await dispatch(toggleSavePaper({ paperId }));

            if (toggleSavePaper.fulfilled.match(result)) {
                const { saved } = result.payload;
                toast.success(saved ? "Paper saved" : "Paper removed");
                // Re-sync with server
                await dispatch(fetchSavedItems({ type: 'papers' }));
            } else if (toggleSavePaper.rejected.match(result)) {
                // Revert the UI if the API call fails
                setLocalSavedStatus(prev => ({
                    ...prev,
                    [paperId]: previousState
                }));
                const error = result.payload;
                toast.error(error?.message || "Something went wrong");
                if (error?.shouldRedirect) {
                    router.push("/login");
                }
            }
        } catch (error) {
            // Revert the UI if there's an error
            setLocalSavedStatus(prev => ({
                ...prev,
                [paperId]: previousState
            }));
            toast.error("Failed to update save status");
        } finally {
            setSaveLoadingMap(prev => ({
                ...prev,
                [paperId]: false
            }));
        }
    };
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
  {papers.map((paper) => {
    const saved = isPaperSaved(paper._id);

    return (
      <div
        key={paper._id}
        className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-6
        hover:border-teal-400/40 hover:shadow-[0_0_40px_rgba(20,184,166,0.25)]
        transition-all duration-300"
      >
        {/* Glow overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
        bg-gradient-to-br from-teal-400/10 via-transparent to-transparent" />

        <div className="relative z-10 space-y-5">

          {/* ===== TITLE ===== */}
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white leading-snug">
                {paper.title}
              </h3>
              <p className="text-sm text-slate-400">
                {paper.subject}
              </p>
            </div>

            <button
              onClick={() => handleSave(paper._id)}
              disabled={saveLoadingMap[paper._id]}
              title={isPaperSaved(paper._id) ? "Remove from saved" : "Save paper"}
              className={`
                p-2 rounded-full hover:cursor-pointer transition-all duration-300
                hover:scale-110
                disabled:opacity-50 disabled:cursor-not-allowed
                ${isPaperSaved(paper._id) ? "bg-red-500/10" : "bg-white/5"}
              `}
            >
              {isPaperSaved(paper._id) ? (
                <FaBookmark className="text-red-500 text-lg" />
              ) : (
                <FaRegBookmark className="text-gray-400 text-lg hover:text-white" />
              )}
            </button>
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

        {/* ===== META INFO ===== */} <div className="grid grid-cols-2 gap-4 text-xs text-slate-400"> <div className="flex items-center gap-2"> <FaCalendarAlt className="text-teal-400" /> <span>{paper.year}</span> </div> <div className="flex items-center gap-2"> <FaLayerGroup className="text-teal-400" /> <span>Semester {paper.semester}</span> </div> </div> <div className="grid grid-cols-2 gap-4 text-sm text-slate-400"> <div className="flex items-center gap-2"> <FaUniversity className="text-teal-400" /> <span>{paper.university}</span> </div> <div className="flex items-center gap-2"> <FaBookOpen className="text-teal-400" /> <span>{paper.course}</span> </div> </div> {/* ===== STATS ===== */} <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/10"> <span>👁 {paper.views} Views</span> <span>⬇ {paper.downloads} Downloads</span> <span>❤️ {paper.likes}</span> </div>

          {/* ===== ACTIONS ===== */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={handlePreview(paper._id)}
              className="rounded-xl bg-white/5 border border-white/10 py-2
              hover:bg-white/10 hover:border-teal-400/40 transition"
            >
              👁 Preview
            </button>

            <button
              onClick={handleDownload(paper._id)}
              className="rounded-xl bg-teal-500/15 border border-teal-400/30 py-2
              hover:bg-teal-500/25 hover:border-teal-400/60 transition"
            >
              ⬇ Download
            </button>
          </div>

        </div>
      </div>
    );
  })}
</div>


                )}

            </div>
        </section>
    );
};

export default CollectionPaper;
