"use client";
import { useRouter } from "next/navigation";
import { FaFileAlt, FaDownload, FaHeart } from "react-icons/fa";

export default function RecommendedPaperCard({ paper, category }) {
  const router = useRouter();

  const handlePreview = () => {
    router.push(`/browse-papers/${category}/${paper._id}`);
  };

  return (
    <div className="w-full max-w-sm rounded-3xl p-6
      bg-gradient-to-br from-[#1e3a4a] to-[#203f4f]
      border border-white/10 shadow-xl hover:shadow-2xl transition">

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-4 py-1 text-xs rounded-full
          bg-gradient-to-r from-emerald-400 to-teal-500 text-black">
          {paper.subject}
        </span>
        <span className="px-4 py-1 text-xs rounded-full bg-black/40 text-white">
          {paper.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-white text-lg font-semibold mb-3 line-clamp-2">
        {paper.title}
      </h3>

      {/* Meta */}
      <div className="flex items-center gap-4 text-white/60 text-sm mb-4">
        <div className="flex items-center gap-1">
          <FaFileAlt /> {paper.examType}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 text-white/60 text-sm mb-6">
        <div className="flex items-center gap-1">
          <FaDownload /> {paper.downloads || 0}
        </div>
        <div className="flex items-center gap-1">
          <FaHeart className="text-pink-400" /> {paper.likes || 0}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePreview}
          className="text-teal-400 text-sm font-medium hover:underline"
        >
          Preview
        </button>

        <a
          href={paper.fileUrl}
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 rounded-full
            border border-teal-400 text-teal-300 hover:bg-teal-400
            hover:text-black transition text-sm"
        >
          <FaDownload /> Download
        </a>
      </div>
    </div>
  );
}
