"use client";

import { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPreviewPaper , downloadPaper , toggleLikePaper } from "../../../../../../redux/slices/previewpaperSlice";
import { useParams , useRouter } from "next/navigation";
import {
    FaFileAlt,
    FaDownload,
    FaHeart,
    FaShareAlt,
    FaWhatsapp,
    FaTelegram,
    FaFacebook,
    FaLinkedin,
    FaCopy,
    FaUniversity,
    FaBookOpen,
    FaCalendarAlt,
    FaLayerGroup,
} from "react-icons/fa";
import RecommendedPapers from "@/app/self-component/Papers/RecommendedPapers";
import BreadcumbCollectionpreview from "@/app/self-component/Papers/BreadcumbCollectionpreview";
import toast from "react-hot-toast";

export default function PreviewPaperPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isLiked, setIsLiked] = useState(false);
    const { university, course, category , paperId } = useParams();
    const [showSharePopup, setShowSharePopup] = useState(false);
    const [shareLinkCopied, setShareLinkCopied] = useState(false);
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

 
    const {
        paper,
        loading,
        error,
        likeStatus
    } = useSelector((state) => state.previewPapers);

    // Share handlers
    const generateShareLink = () => {
        return `${process.env.NEXT_PUBLIC_FRONTEND_URL}/papers-collection/${university}/${course}/${category}/${paperId}`;
    };

    const handleCopyLink = async () => {
        const link = generateShareLink();
        try {
            await navigator.clipboard.writeText(link);
            setShareLinkCopied(true);
            setTimeout(() => setShareLinkCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    };

    const handleSocialShare = (platform) => {
        if (!paper) return;
        
        const link = generateShareLink();
        const title = paper.title;
        const text = `Check out this paper: ${title}`;
        
        let shareUrl = '';
        
        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + link)}`;
                break;
            case 'telegram':
                shareUrl = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    };

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

    // if (error) {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center text-red-400">
    //             {error}
    //         </div>
    //     );
    // }

    if (!paper) return null;
 // In your component
const handleLike = async () => {
    try {
      const resultAction = await dispatch(toggleLikePaper({ paperId }));

      if (toggleLikePaper.fulfilled.match(resultAction)) {
        // Success - no need to do anything as the state will be updated by the reducer
      
      } else if (toggleLikePaper.rejected.match(resultAction)) {
        const error = resultAction.payload;

        const isLoggedIn = localStorage.getItem('userId') === 'true';
        if (!isLoggedIn) {
          router.push(`/login?redirect=${encodeURIComponent(router.asPath)}`);
          return;
        }
        else {
          toast.error(error.message || "Failed to update like");
        }
      }
    } catch (error) {
      console.error("Error in handleLike:", error);
      toast.error("An unexpected error occurred");
    }
  };

// Update the download handler in your page.jsx
const handleDownload = async () => {
    console.log("Downloading paper with ID:", paperId); // Check the ID in console

    try {
        const result = await dispatch(downloadPaper(paperId)); // Directly pass paperId as string
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
        <div className="min-h-screen bg-gradient-to-br from-[#081a2d] via-[#0b3a4a] to-[#061622]  px-4 pb-14 pt-24  text-white">
            <div className="max-w-5xl mx-auto">
                <BreadcumbCollectionpreview universityName={formatName(universityName)} courseName={formatName(courseName)} categoryName={categoryName} title={paper.title} />

                {/* Post Card */}
                <div className="relative rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-6 shadow-2xl ">

                    {/* Category Badge */}
                    <span className="absolute top-5 right-5 px-4 py-1 text-xs rounded-full
            bg-gradient-to-r from-emerald-500/20 to-teal-500/20
            text-emerald-300 border border-emerald-400/30 capitalize">
                        {paper.category}
                    </span>

                    {/* Header */}
                    <div className="flex gap-5 items-start">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center
              bg-gradient-to-br from-emerald-500/30 to-teal-500/30">
                            <FaFileAlt className="text-emerald-300 text-2xl md:text-3xl" />
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
                    <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    {/* Stats Row */}
                    <div className="flex items-center justify-between flex-wrap gap-6">

                        {/* Stats */}
                        <div className="flex gap-6 text-sm">
                            
                            <Stat icon={FaDownload} value={paper.downloads} label="Downloads" />
                            <Stat icon={FaHeart} value={paper.likes} label="Likes" />
                             {/* Share Button */}
              <button
                onClick={() => setShowSharePopup(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-gray-400 hover:text-white hover:cursor-pointer"
              >
                <FaShareAlt className="hover:scale-110 transition" />
                <span>Share</span>
              </button>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">

                            {/* Like Button */}
                            <button
                onClick={handleLike}
                disabled={likeStatus === 'pending'}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-gray-400 hover:text-white"
              >
                {likeStatus === 'pending' ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  <FaHeart /> // Always show the outline heart
                )}
                <span>{paper?.likes || 0}</span>
              </button>

             

                            {/* Download */}
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 px-6 py-2 rounded-xl
                  bg-gradient-to-r from-emerald-500 to-teal-500
                  text-white font-semibold shadow-lg hover:opacity-90 transition"
                            >
                                <FaDownload />
                                Download
                            </button>
                        </div>
                    </div>
                </div>

                {/* Share Popup */}
                {showSharePopup && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                        <div className="bg-gradient-to-br from-[#081a2d] to-[#0b3a4a] border border-white/20 rounded-2xl p-6 max-w-md w-full shadow-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                                        <FaShareAlt className="text-white text-lg" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold text-lg">Share This Paper</h3>
                                        <p className="text-white/60 text-sm">Share this amazing paper with others</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowSharePopup(false)}
                                    className="text-white/60 hover:text-white transition hover:cursor-pointer"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="mb-6">
                                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                                    <p className="text-white/80 text-sm mb-2">Share link:</p>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={generateShareLink()}
                                            readOnly
                                            className="flex-1 bg-white/10 text-white text-sm px-3 py-2 rounded border border-white/20 focus:outline-none focus:border-emerald-400"
                                        />
                                        <button
                                            onClick={handleCopyLink}
                                            className="p-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition hover:cursor-pointer"
                                        >
                                            <FaCopy className="text-white" />
                                        </button>
                                    </div>
                                    {shareLinkCopied && (
                                        <p className="text-emerald-400 text-xs mt-2">Link copied to clipboard!</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <p className="text-white/80 text-sm mb-3">Share on social media:</p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleSocialShare('whatsapp')}
                                        className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition"
                                    >
                                        <FaWhatsapp className="text-white text-xl" />
                                    </button>
                                    <button
                                        onClick={() => handleSocialShare('telegram')}
                                        className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition"
                                    >
                                        <FaTelegram className="text-white text-xl" />
                                    </button>
                                    <button
                                        onClick={() => handleSocialShare('facebook')}
                                        className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition"
                                    >
                                        <FaFacebook className="text-white text-xl" />
                                    </button>
                                    <button
                                        onClick={() => handleSocialShare('linkedin')}
                                        className="w-12 h-12 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition"
                                    >
                                        <FaLinkedin className="text-white text-xl" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <RecommendedPapers paperId={paperId} category={paper.category} university={university} course={course} />
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
