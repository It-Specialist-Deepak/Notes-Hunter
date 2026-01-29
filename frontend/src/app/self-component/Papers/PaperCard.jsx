"use client";
import { useState , useEffect } from "react"
import {
  FaFileAlt,
  FaEye,
  FaDownload,
  FaHeart,
  FaBookmark , 
  FaRegBookmark , 
  FaUniversity,
  FaBookOpen,
  FaCalendarAlt,
  FaLayerGroup,
} from "react-icons/fa";
import { useDispatch , useSelector } from "react-redux";
import { fetchPreviewPaper, downloadPaper, toggleSavePaper } from "../../redux/slices/previewpaperSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { fetchSavedItems } from "../../redux/slices/savedItemSlice";


export default function PaperCard({ paper, category }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handlePreview = async () => {
    const result = await dispatch(fetchPreviewPaper(paper._id));

    if (fetchPreviewPaper.fulfilled.match(result)) {
      router.push(`/browse-papers/${category}/${paper._id}`);
    }
  };
  const [isSaved, setIsSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const savedPapers = useSelector((state) => state.savedItems.papers);

  // Update isSaved when savedPapers changes
  useEffect(() => {
    setIsSaved(savedPapers?.some(savedPaper => savedPaper._id === paper._id) || false);
  }, [savedPapers, paper._id]);

  // Initial fetch of saved papers
  useEffect(() => {
    dispatch(fetchSavedItems({ type: 'papers' }));
  }, []);

  const handleSave = async (paperId) => {
    const previousState = isSaved;
    // Optimistically update the UI
    setIsSaved(!previousState);
    setSaveLoading(true);

    try {
      const result = await dispatch(toggleSavePaper({ paperId }));

      if (toggleSavePaper.fulfilled.match(result)) {
        const { saved } = result.payload;
        toast.success(saved ? "Paper saved" : "Paper removed");
        // Re-sync with server
        await dispatch(fetchSavedItems({ type: 'papers' }));
      } else if (toggleSavePaper.rejected.match(result)) {
        // Revert the UI if the API call fails
        setIsSaved(previousState);
        const error = result.payload;
        toast.error(error?.message || "Something went wrong");
        if (error?.shouldRedirect) {
          router.push("/login");
        }
      }
    } catch (error) {
      // Revert the UI if there's an error
      setIsSaved(previousState);
      toast.error("Failed to update save status");
    } finally {
      setSaveLoading(false);
    }
  }


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
      p-4 shadow-xl transition-all duration-300
      hover:-translate-y-1 hover:shadow-2xl">

      {/* Category Badge */}
      <div className="flex items-center justify-between gap-2 relative">
  <span
    className="px-3 py-1 text-xs rounded-full
    bg-gradient-to-r from-emerald-500/20 to-teal-500/20
    text-emerald-300 border border-emerald-400/30
    backdrop-blur-md capitalize"
  >
    {paper.category}
  </span>

  <button
    onClick={() => handleSave(paper._id)}
    disabled={saveLoading}
    title={isSaved ? "Remove from saved" : "Save paper"}
    className={`
      p-2 rounded-full transition-all cursor-pointer duration-300
      hover:scale-110
      disabled:opacity-50 disabled:cursor-not-allowed
      ${isSaved ? "bg-red-500/10" : "bg-white/5"}
    `}
  >
    {isSaved ? (
      <FaBookmark className="text-red-500 text-lg" />
    ) : (
      <FaRegBookmark className="text-gray-400 text-lg hover:text-white" />
    )}
  </button>
</div>

      {/* Header */}
      <div className="relative z-10 flex gap-4 mt-3">
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
