"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams , useRouter } from "next/navigation";
import { fetchPreviewNote, toggleLikeNote ,  downloadNote } from "../../../../redux/slices/previewNotes";

import {
  FaFileAlt,
  FaClock,
  FaHeart,
  FaDownload,
  FaCommentDots
} from "react-icons/fa";
import RecommendedNotes from "@/app/self-component/Notes/RecommendedNotes";
import CommentBox from "@/app/self-component/Notes/AddCommentNotes";
import GetComments from "@/app/self-component/Notes/GetComments";
import BreadcumbCollectionPreview from "@/app/self-component/Notes/Breadcumb-collection-preview";
export default function NotePreview() {
  const { noteId } = useParams();
  const dispatch = useDispatch();
   const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
   const [showError, setShowError] = useState(false);
    // ✅ MATCH store key
  const { previewNote, previewNoteId, totalComments, loading, likeLoading , error } = useSelector(
    (state) => state.previewNotes
  );
  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setRole(localStorage.getItem("role"));
  }, []);
 


  useEffect(() => {
    const id = noteId || previewNoteId;
    if (id) {
      dispatch(fetchPreviewNote(id));
    }
  }, [noteId, previewNoteId, dispatch]);
  // ✅ Check if user has liked the note
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
 const Stat = ({ icon, value }) => (
    <div className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-3">
      <span className="text-teal-400 text-lg">{icon}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
  // ✅ Loading state
  if (loading) {
    return (<div className="min-h-screen bg-gradient-to-br from-[#081a2d] via-[#0b3a4a] to-[#061622] text-white">

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
    )
  }

  // ✅ Safety guard
  if (!previewNote) return null;

  return (
    <>
      <div className=" w-full bg-gradient-to-br from-[#0b1120] via-[#0e1628] to-[#0b1120] text-white py-24 px-4">
          {/* Error toast */}
      {showError && error && (
        <div className="fixed bottom-6 right-6 z-50">
          <p className="text-red-500 text-sm bg-red-100/20 border border-red-400 px-5 py-3 rounded-xl shadow-lg">
            {error.message || error}
          </p>
        </div>
      )}
        <div className="max-w-6xl mx-auto">
          <div className="mb-4" >
            <BreadcumbCollectionPreview previewNotes={{ title: previewNote.title }} category={previewNote.category} />
          </div>
          <div className="relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.4)] overflow-hidden">

            {/* Glow */}
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
              <Stat icon={<FaDownload />} value={`${previewNote.downloads || 0} Downloads`} />
              <Stat icon={<FaCommentDots />} value={`${totalComments} Comments`} />
            </div>

            <div className="h-px bg-white/10" />

            {/* Actions */}
            <div className="flex items-center justify-between px-6 sm:px-10 py-6">
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
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 text-sm font-semibold hover:scale-105 hover:shadow-lg transition"
            >
              <FaDownload />
              Download Notes
            </button>
            </div>

          </div>
        </div>
        <RecommendedNotes noteId={previewNoteId} category={previewNote.category} />
        <CommentBox noteId={previewNoteId} />
        <GetComments noteId={previewNoteId} userId={userId} role={role} />
      </div>

    </>
  );


}
