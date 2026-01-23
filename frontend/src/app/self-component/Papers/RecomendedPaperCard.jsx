"use client";
import { useRouter, usePathname } from "next/navigation";
import { FaFileAlt, FaDownload, FaHeart } from "react-icons/fa";
import { downloadPaper } from "../../redux/slices/previewpaperSlice";
import { useDispatch } from "react-redux";
export default function RecommendedPaperCard({ paper, category, university, course }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const handlePreview = (paper) => {
    if (!paper?._id) {
      console.error("No paper ID provided", paper);
      return;
    }

    const normalizedPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    
    if (normalizedPath.startsWith("/browse-papers")) {
      router.push(`/browse-papers/${category}/${paper._id}`);
    } else if (normalizedPath.startsWith("/papers-collection")) {
      if (!university || !course) {
        console.error("Missing university or course parameter");
        return;
      }
      router.push(`/papers-collection/${university}/${course}/${category}/${paper._id}`);
    } else {
      router.push(`/browse-papers/${category}/${paper._id}`);
    }
  };
  const handleDownload = (paperId) => async (e) => {
      e.preventDefault();
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
  if (!paper) {
    console.error("No paper data provided to RecommendedPaperCard");
    return null;
  }

  return (
    <div className="w-full max-w-sm rounded-3xl p-6
      bg-gradient-to-br from-[#1e3a4a] to-[#203f4f]
      border border-white/10 shadow-xl hover:shadow-2xl transition">

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-4 py-1 text-xs rounded-full
          bg-gradient-to-r from-emerald-400 to-teal-500 text-black">
          {paper.subject || 'Subject'}
        </span>
        <span className="px-4 py-1 text-xs rounded-full bg-black/40 text-white">
          {category || 'Category'}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-white text-lg font-semibold mb-3 line-clamp-2">
        {paper.title || 'Untitled Paper'}
      </h3>

      {/* Meta */}
      <div className="flex items-center gap-4 text-white/60 text-sm mb-4">
        <div className="flex items-center gap-1">
          <FaFileAlt /> {paper.examType || 'Exam'}
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
          onClick={() => handlePreview(paper)}
          className="text-teal-400 text-sm font-medium hover:underline"
        >
          Preview
        </button>

        <button
         onClick={handleDownload(paper._id)}
          className="flex items-center gap-2 px-4 py-2 rounded-full
            border border-teal-400 text-teal-300 hover:bg-teal-400
            hover:text-black transition text-sm"
        >
          <FaDownload /> Download
        </button>
      </div>
    </div>
  );
}