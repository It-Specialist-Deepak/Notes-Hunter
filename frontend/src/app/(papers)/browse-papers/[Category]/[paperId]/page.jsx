"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPreviewPaper } from "../../../../redux/slices/previewpaperSlice";
import { useParams } from "next/navigation";
import {
  FaFileAlt,
  FaDownload,
  FaEye,
  FaHeart,
  FaUniversity,
  FaBookOpen,
  FaCalendarAlt,
  FaLayerGroup,
} from "react-icons/fa";
import BreadcrumbPaperPreview from "@/app/self-component/Papers/Breadcumb-preview-paper";
import RecommendedPapers from "../../../../self-component/Papers/RecommendedPapers";


export default function PreviewPaperPage() {
  const dispatch = useDispatch();
  const { paperId } = useParams();

  const {
    paper,
    loading,
    error,
  } = useSelector((state) => state.previewPapers);

  // 🔁 Fetch if user directly opens URL
  useEffect(() => {
    if (!paper || paper._id !== paperId) {
      dispatch(fetchPreviewPaper(paperId));
    }
  }, [paperId, dispatch]);

  if (loading) {
    return (
     <div className="min-h-screen bg-gradient-to-br from-[#081a2d] via-[#0b3a4a] to-[#061622]  ">

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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  if (!paper) return null;

  return (
 <div className="min-h-screen bg-gradient-to-br from-[#081a2d] via-[#0b3a4a] to-[#061622]  px-4 pb-14 pt-24  text-white">
      <div className="max-w-5xl mx-auto">
        <BreadcrumbPaperPreview category={paper.category} title={paper.title} />
        {/* Post Card */}
        <div className="relative rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-8 shadow-2xl ">

          {/* Category Badge */}
          <span className="absolute top-5 right-5 px-4 py-1 text-xs rounded-full
            bg-gradient-to-r from-emerald-500/20 to-teal-500/20
            text-emerald-300 border border-emerald-400/30 capitalize">
            {paper.category}
          </span>

          {/* Header */}
          <div className="flex gap-5 items-start">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center
              bg-gradient-to-br from-emerald-500/30 to-teal-500/30">
              <FaFileAlt className="text-emerald-300 text-3xl" />
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold leading-snug">
                {paper.title}
              </h1>

              <p className="text-white/60 text-sm mt-1">
                {paper.subject} • {paper.course?.toUpperCase()}
              </p>

              <p className="text-xs text-white/40 mt-1">
                Uploaded on {new Date(paper.createdAt).toDateString()}
              </p>
            </div>
          </div>

          {/* Meta Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm text-white/80">
            <Meta icon={FaLayerGroup} label="Semester" value={paper.semester} />
            <Meta icon={FaCalendarAlt} label="Year" value={paper.year} />
            <Meta icon={FaBookOpen} label="Exam" value={paper.examType} />
            <Meta icon={FaUniversity} label="University" value={paper.university} />
          </div>

          {/* Divider */}
          <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Stats Row */}
          <div className="flex items-center justify-between flex-wrap gap-6">

            {/* Stats */}
            <div className="flex gap-6 text-sm">
              <Stat icon={FaEye} value={paper.views} label="Views" />
              <Stat icon={FaDownload} value={paper.downloads} label="Downloads" />
              <Stat icon={FaHeart} value={paper.likes} label="Likes" />
            </div>

            {/* Actions */}
            <div className="flex gap-3">

              {/* Like Button */}
              <button
                className="flex items-center gap-2 px-5 py-2 rounded-xl
                  border border-white/20 text-white/80
                  hover:bg-white/10 transition"
              >
                <FaHeart className="text-emerald-400" />
                Like
              </button>

              {/* Download */}
              <a
                href={paper.fileUrl}
                target="_blank"
                className="flex items-center gap-2 px-6 py-2 rounded-xl
                  bg-gradient-to-r from-emerald-500 to-teal-500
                  text-white font-semibold shadow-lg hover:opacity-90 transition"
              >
                <FaDownload />
                Download
              </a>
            </div>
          </div>
        </div>
      </div>
      <RecommendedPapers paperId={paperId} category={paper.category} />
    </div>
  );
}

/* Helpers */
function Meta({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
      <Icon className="text-emerald-400" />
      <span className="text-xs">
        <strong className="text-white/80">{label}:</strong> {value}
      </span>
    </div>
  );
}

function Stat({ icon: Icon, value, label }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="text-emerald-400" />
      <span className="font-medium">{value || 0}</span>
      <span className="text-white/50 text-xs">{label}</span>
    </div>
  );
}
