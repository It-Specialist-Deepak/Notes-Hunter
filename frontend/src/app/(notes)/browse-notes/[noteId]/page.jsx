"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import {
  fetchPreviewNote,
  toggleLikeNote,
  downloadNote,
} from "../../../redux/slices/previewNotes";

import {
  FaFileAlt,
  FaClock,
  FaHeart,
  FaDownload,
  FaCommentDots,
  FaShareAlt,
  FaWhatsapp,
  FaTelegram,
  FaFacebook,
  FaLinkedin,
  FaCopy,
} from "react-icons/fa";

import RecommendedNotes from "@/app/self-component/Notes/RecommendedNotes";
import BreadcumbPreviewPage from "@/app/self-component/Notes/Breadcumb-previewpage";
import CommentBox from "@/app/self-component/Notes/AddCommentNotes";
import GetComments from "@/app/self-component/Notes/GetComments";

export default function NotePreview() {
  const { noteId } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  // Redux state
  const {
    previewNote,
    previewNoteId,
    totalComments,
    loading,
    likeLoading,
    error,
  } = useSelector((state) => state.previewNotes);

  // Local state
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [showError, setShowError] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  // Read user info from localStorage
  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setRole(localStorage.getItem("role"));
  }, []);

  // Auto-hide errors
  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Fetch preview note
  useEffect(() => {
    const id = noteId || previewNoteId;
    if (id) dispatch(fetchPreviewNote(id));
  }, [noteId, previewNoteId, dispatch]);

  // Check if user liked the note
  const isLiked = previewNote?.likedBy?.some(
    (id) => String(id) === String(userId)
  );

  // Like handler
  const handleLike = async () => {
    const result = await dispatch(toggleLikeNote(noteId));

    if (toggleLikeNote.rejected.match(result)) {
      if (result.payload?.status === 401) {
        // Redirect to login if not logged in
        router.push("/login");
      }
    }
  };

  // Share handlers
  const generateShareLink = () => {
    return `${process.env.NEXT_PUBLIC_FRONTEND_URL}/browse-notes/${noteId}`;
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
    if (!previewNote) return;
    
    const link = generateShareLink();
    const title = previewNote.title;
    const text = `Check out this note: ${title}`;
    
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

  // Download handler
  const handleDownload = async () => {
    const result = await dispatch(downloadNote(noteId));
    if (downloadNote.fulfilled.match(result)) {
      const url = result.payload;
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.click();
    }
    if (downloadNote.rejected.match(result)) {
      console.error("Download failed:", result.payload);
    }
  };

  // Loader state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#081a2d] via-[#0b3a4a] to-[#061622] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <div className="relative w-20 h-20">
            <span className="absolute inset-0 rounded-full border-2 border-teal-400/40 animate-ping"></span>
            <span className="absolute inset-2 rounded-full border-2 border-teal-400 animate-spin"></span>
            <span className="absolute inset-6 rounded-full bg-teal-400/80"></span>
          </div>
          <p className="text-teal-300 text-xs tracking-[0.35em] uppercase animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!previewNote) return null;

  // Stat component
  const Stat = ({ icon, value }) => (
    <div className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-3">
      <span className="text-teal-400 text-lg">{icon}</span>
      <span className="font-medium">{value}</span>
    </div>
  );

  return (
    <div className="w-full bg-gradient-to-br from-[#0b1120] via-[#0e1628] to-[#0b1120] text-white py-24 px-4">
      {/* Error toast */}
      {showError && error && (
        <div className="fixed bottom-6 right-6 z-50">
          <p className="text-red-500 text-sm bg-red-100/20 border border-red-400 px-5 py-3 rounded-xl shadow-lg">
            {error.message || error}
          </p>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <BreadcumbPreviewPage previewNotes={{ title: previewNote.title }} />
        </div>

        <div className="relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.4)] overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl" />

          {/* Header */}
          <div className="relative p-6 sm:p-10">
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight mb-3">
              {previewNote.title}
            </h1>
            <p className="text-white/70 text-sm sm:text-base max-w-2xl leading-relaxed">
              {previewNote.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              <span className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-black font-medium">
                {previewNote.subject}
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-white/10 capitalize">
                {previewNote.category}
              </span>
              {previewNote.subcategory && (
                <span className="px-3 py-1 text-xs rounded-full bg-white/10 capitalize">
                  {previewNote.subcategory}
                </span>
              )}
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-6 sm:px-10 py-6 text-sm text-white/70">
            <Stat icon={<FaFileAlt />} value={`${previewNote.pages} Pages`} />
            <Stat icon={<FaClock />} value={previewNote.type} />
            <Stat
              icon={<FaDownload />}
              value={`${previewNote.downloads || 0} Downloads`}
            />
            <Stat icon={<FaCommentDots />} value={`${totalComments} Comments`} />
          </div>

          <div className="h-px bg-white/10" />

          {/* Actions */}
          <div className="flex items-center justify-between px-6 sm:px-10 py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                disabled={likeLoading}
                className="flex items-center gap-2 transition"
              >
                <FaHeart
                  className={`text-lg cursor-pointer transition-all duration-300 ease-out ${
                    isLiked
                      ? "text-pink-500 scale-110 drop-shadow-[0_0_6px_rgba(236,72,153,0.7)]"
                      : "text-white hover:scale-110"
                  }`}
                />
                <span className="font-medium">{previewNote.likes}</span>
              </button>

              <button
                onClick={() => setShowSharePopup(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition hover:cursor-pointer"
              >
                <FaShareAlt className="text-white hover:scale-110 transition" />
                <span className="font-medium">Share</span>
              </button>
            </div>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 text-sm font-semibold hover:scale-105 hover:shadow-lg transition"
            >
              <FaDownload />
              Download
            </button>
          </div>
        </div>

        {/* Share Popup */}
        {showSharePopup && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-gradient-to-br from-[#0b1120] to-[#0e1628] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <FaShareAlt className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Share This Note</h3>
                    <p className="text-white/60 text-sm">Share this amazing note with others</p>
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
                      className="flex-1 bg-white/10 text-white text-sm px-3 py-2 rounded border border-white/20 focus:outline-none focus:border-teal-400"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="p-2 bg-teal-500 hover:bg-teal-600 rounded-lg transition hover:cursor-pointer"
                    >
                      <FaCopy className="text-white" />
                    </button>
                  </div>
                  {shareLinkCopied && (
                    <p className="text-teal-400 text-xs mt-2">Link copied to clipboard!</p>
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

        <RecommendedNotes noteId={previewNoteId} />
        <CommentBox noteId={previewNoteId} />
        <GetComments noteId={previewNoteId} userId={userId} role={role} />
      </div>
    </div>
  );
}
