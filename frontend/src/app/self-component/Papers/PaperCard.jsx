"use client";

import {
  FaFileAlt,
  FaEye,
  FaDownload,
  FaHeart,
  FaUniversity,
  FaBookOpen,
  FaCalendarAlt,
  FaLayerGroup,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { fetchPreviewPaper , downloadPaper } from "../../redux/slices/previewpaperSlice";
import { useRouter } from "next/navigation";

export default function PaperCard({ paper, category }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handlePreview = async () => {
    const result = await dispatch(fetchPreviewPaper(paper._id));

    if (fetchPreviewPaper.fulfilled.match(result)) {
      router.push(`/browse-papers/${category}/${paper._id}`);
    }
  };
    // Update the download handler in your page.jsx
    const handleDownload = async () => {
      console.log("Downloading paper with ID:", paper._id); // Check the ID in console
  
      try {
        const result = await dispatch(downloadPaper(paper._id)); // Directly pass paperId as string
        console.log("Download result:", result); // Debug log
  
        if (downloadPaper.fulfilled.match(result)) {
          const downloadUrl = result.payload?.downloadUrl;
          if (downloadUrl) {
            console.log("Opening download URL:", downloadUrl);
            window.open(downloadUrl, '_blank');
          } else {
            console.error("No download URL in response");
          }
        }
      } catch (error) {
        console.error("Download failed:", error);
      }
    };
  return (
    <div className="group relative overflow-hidden rounded-3xl
      bg-white/10 backdrop-blur-2xl border border-white/20
      p-6 shadow-xl transition-all duration-300
      hover:-translate-y-1 hover:shadow-2xl">

      {/* Category Badge */}
      <span className="absolute top-4 right-4 z-10 px-3 py-1 text-xs rounded-full
        bg-gradient-to-r from-emerald-500/20 to-teal-500/20
        text-emerald-300 border border-emerald-400/30 backdrop-blur-md capitalize">
        {paper.category}
      </span>

      {/* Header */}
      <div className="relative z-10 flex gap-4 mt-5">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center
          bg-gradient-to-br from-emerald-500/30 to-teal-500/30">
          <FaFileAlt className="text-emerald-300 text-2xl" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white line-clamp-2">
            {paper.title}
          </h3>
          <p className="text-sm text-white/60 mt-1">
            {paper.subject} • {paper.course.toUpperCase()}
          </p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="mt-5 grid grid-cols-2 gap-4 text-xs text-white/70">
        <Info icon={FaLayerGroup} label="Semester" value={paper.semester} />
        <Info icon={FaCalendarAlt} label="Year" value={paper.year} />
        <Info icon={FaBookOpen} label="Exam" value={paper.examType} />
        <Info icon={FaUniversity} label="University" value={paper.university} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-5 text-sm text-white/70">
        <Stat icon={FaEye} value={paper.views} />
        <Stat icon={FaDownload} value={paper.downloads} />
        <Stat icon={FaHeart} value={paper.likes} />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handlePreview}
          className="text-teal-400 text-sm font-medium hover:underline"
        >
          Preview
        </button>

        <button
         onClick={handleDownload}
          className="flex items-center gap-2 px-5 py-2 rounded-xl
            bg-gradient-to-r from-emerald-500 to-teal-500
            text-white text-sm font-semibold shadow-lg
            hover:opacity-90 transition"
        >
          <FaDownload />
          Download
        </button>
      </div>
    </div>
  );
}

/* Reusable Info Row */
function Info({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="text-emerald-400" />
      <span>
        <strong className="text-white/80">{label}:</strong> {value}
      </span>
    </div>
  );
}

/* Stat */
function Stat({ icon: Icon, value }) {
  return (
    <div className="flex items-center gap-2 justify-center">
      <Icon className="text-emerald-400" />
      <span>{value || 0}</span>
    </div>
  );
}
