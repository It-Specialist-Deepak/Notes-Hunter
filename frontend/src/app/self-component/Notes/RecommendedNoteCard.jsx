// components/RecommendedNoteCard.js
"use client";
import React from "react";
import { FaFileAlt, FaDownload, FaHeart, FaClock  , } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useRouter , usePathname } from "next/navigation";
import { setPreviewNoteId } from "@/app/redux/slices/previewNotes";
export default function RecommendedNoteCard({ note , category }) {
     const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname(); // Current route
  
   const handlePreview = (note) => {
    // 1️⃣ Set preview note in Redux (ID only)
    dispatch(setPreviewNoteId(note._id));

    // 2️⃣ Conditional routing based on current page
    if (pathname.startsWith("/browse-notes")) {
      router.push(`/browse-notes/${note._id}`);
    } else if (pathname.startsWith("/notes-collection")) {
      router.push(`/notes-collection/${category}/${note._id}`);
    } else {
      // default fallback
      router.push(`/browse-notes/${note._id}`);
    }
  };
  return (
  <div
  className="w-full max-w-sm rounded-3xl p-6
             bg-gradient-to-br from-[#1e3a4a] to-[#203f4f]
             border border-white/10 shadow-xl
             hover:shadow-2xl transition"
>
  {/* 🔖 Tags */}
  <div className="flex flex-wrap gap-2 mb-4">
    <span className="px-4 py-1 text-xs font-medium rounded-full
                     bg-gradient-to-r from-emerald-400 to-teal-500 text-black">
      {note.subject}
    </span>
    <span className="px-4 py-1 text-xs font-medium rounded-full
                     bg-black/40 text-white/90">
      {note.category}
    </span>
  </div>

  {/* 📌 Title */}
  <h3 className="text-white text-xl font-semibold mb-2">
    {note.title}
  </h3>

  {/* 📝 Description */}
  <p className="text-white/60 text-sm mb-4 line-clamp-2">
    {note.description}
  </p>

  {/* 📊 Meta Info */}
  <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm mb-5">
    <div className="flex items-center gap-1">
      <FaFileAlt /> {note.pages} pages
    </div>
    <div className="flex items-center gap-1">
      <FaClock /> {note.type}
    </div>
  </div>

  {/* 👁️ Likes / Views */}
  <div className="flex items-center gap-6 text-white/60 text-sm mb-6">
    <div className="flex items-center gap-1">
      <FaDownload /> {note.downloads || 0}
    </div>
    <div className="flex items-center gap-1">
      <FaHeart className="text-pink-400" /> {note.likes || 0}
    </div>
  </div>

  {/* 🚀 Actions */}
  <div className="flex items-center justify-between">
       <button
    onClick={() => handlePreview(note)}
    className="text-teal-500 text-sm font-medium hover:underline"
  >
    Preview
  </button>

    <a
      href={note.fileUrl}
      download
      className="flex items-center gap-2 px-5 py-2 rounded-full
                 border-2 border-teal-400 text-teal-300
                 hover:bg-teal-400 hover:text-black
                 transition font-medium"
    >
      <FaDownload /> Download
    </a>
  </div>
</div>


  );
}
