"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Download } from "lucide-react";
import {
  FaClock,
  FaEye,
  FaDownload,
  FaHeart,
  FaFileAlt,
} from "react-icons/fa";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { setPreviewNoteId } from "../../redux/slices/previewNotes";
import { useRouter } from "next/navigation";



const HomeCardSkeleton = dynamic(
  () => import("../../skeleton/Homecard-skeleton"),
  { ssr: false }
);
import Pagination from "./HomeNotesPagination";

function NotesSection() {

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [notes, setNotes] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

 const handlePreview = (note) => {
  console.log("Previewing note:", note._id);
  dispatch(setPreviewNoteId(note._id)); // ✅ ID only (SAFE)
  router.push(`/browse-notes/${note._id}`); // ✅ URL source of truth
};

  useEffect(() => {
    let isMounted = true;

    const fetchNotes = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/notes/get-allnotes?page=${page}&limit=12`
        );

        if (!isMounted) return;

        setNotes(res.data.notes || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchNotes();

    return () => {
      isMounted = false;
    };
  }, [page]);

  return (
    <>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {loading ? (
          <HomeCardSkeleton count={8} />
        ) : (
          notes.map((note) => (
            <div
              key={note._id}
              className="group bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition shadow-xl"
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="  bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs px-3 py-1 rounded-full">
                  {note.subject}
                </span>
                <span className="bg-gradient-to-br 
from-[#081a2d] 
via-[#0b3a4a] 
to-[#061622] text-gray-200 text-xs px-3 py-1 rounded-full capitalize">
                  {note.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                {note.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {note.description}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 text-gray-400 text-xs mb-4">
                <div className="flex items-center gap-1">
                  <FaFileAlt /> {note.pages} pages
                </div>
                <div className="flex items-center gap-1 capitalize">
                  <FaClock /> {note.type}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-gray-400 text-xs mb-5">
                <div className="flex items-center gap-1">
                  <FaEye /> —
                </div>
                <div className="flex items-center gap-1">
                  <FaDownload /> {note.downloads}
                </div>
                <div className="flex items-center gap-1">
                  <FaHeart /> {note.likes}
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-3">
               <button
    onClick={() => handlePreview(note)}
    className="text-teal-500 text-sm font-medium hover:underline"
  >
    Preview
  </button>
                <a
                  href={note.fileUrl}
                  download={note.fileName}
                  className="ml-auto inline-flex items-center gap-2
                               px-4 py-2 rounded-xl border-2 border-teal-500
                               text-teal-600 text-sm font-semibold
                             hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white
                               transition-all duration-300"
                >
                  <Download size={16} />
                  Download
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="mt-12">
          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      )}
    </>


  );
}

export default NotesSection;
