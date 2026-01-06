"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchPreviewNote, toggleLikeNote } from "../../../redux/slices/previewNotes";

import {
  FaFileAlt,
  FaClock,

  FaHeart,
  FaDownload,
  FaCommentDots
} from "react-icons/fa";
import RecommendedNotes from "@/app/self-component/Notes/RecommendedNotes";
import BreadcumbPreviewPage from "@/app/self-component/Notes/Breadcumb-previewpage";
import CommentBox from "@/app/self-component/Notes/AddCommentNotes";
import GetComments from "@/app/self-component/Notes/GetComments";
export default function NotePreview() {
  const { noteId } = useParams();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setRole(localStorage.getItem("role"));
  }, []);
  const Stat = ({ icon, value }) => (
    <div className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-3">
      <span className="text-teal-400 text-lg">{icon}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
  // ✅ MATCH store key
  const { previewNote, previewNoteId, totalComments, loading, likeLoading } = useSelector(
    (state) => state.previewNotes
  );

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
        <div className="max-w-6xl mx-auto">
          <div className="mb-4" >
            <BreadcumbPreviewPage previewNotes={{ title: previewNote.title }} />
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
                onClick={() => dispatch(toggleLikeNote(previewNote._id))}
                disabled={likeLoading}
                className="flex items-center gap-2 transition"
              >
                <FaHeart
                  className={`
    text-lg cursor-pointer
    transition-all duration-300 ease-out
    ${isLiked
                      ? "text-pink-500 scale-110 drop-shadow-[0_0_6px_rgba(236,72,153,0.7)]"
                      : "text-white hover:scale-110"
                    }
  `}
                />


                <span className="font-medium">{previewNote.likes}</span>
              </button>


              <a
                href={previewNote.fileUrl}
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 text-sm font-semibold hover:scale-105 hover:shadow-lg transition"
              >
                <FaDownload />
                Download Notes
              </a>
            </div>

          </div>
        </div>
        <RecommendedNotes noteId={previewNoteId} />
        <CommentBox noteId={previewNoteId} />
        <GetComments noteId={previewNoteId} userId={userId} role={role} />
      </div>

    </>
  );


}
