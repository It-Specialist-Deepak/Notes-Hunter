"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useParams } from "next/navigation";
import { Download } from "lucide-react";
import {
  FaClock,
  FaEye,
  FaDownload,
  FaHeart,
  FaFileAlt,
} from "react-icons/fa";

import Pagination from "./HomeNotesPagination";
import HomeCardSkeleton from "@/app/skeleton/Homecard-skeleton";
import Notesbreadcumb from "./Notesbreadcumb";
import { useDispatch } from "react-redux";
import { setPreviewNoteId } from "../../redux/slices/previewNotes";
import { useRouter } from "next/navigation";
function NotesCategoryCard() {
  const searchParams = useSearchParams();
   const params = useParams();
   const category = decodeURIComponent(params.Category);
  const page = Number(searchParams.get("page")) || 1;

  const [notes, setNotes] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

   const dispatch = useDispatch();
  const router = useRouter();

 const handlePreview = (note) => {
  dispatch(setPreviewNoteId(note._id)); // ✅ ID only (SAFE)
  router.push(`/notes-collection/${category}/${note._id}`); // ✅ URL source of truth
};

  /* ----------------------------------
     FETCH NOTES BY CATEGORY
  ---------------------------------- */
  useEffect(() => {
    if (!category) return;

    const fetchNotes = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/notes/getnotes-byCategory/${encodeURIComponent(
            category
          )}`,
          {
            params: {
              page,
              limit: 12,
            },
          }
        );

        if (res.data.success) {
          setNotes(res.data.data || []);
          setTotalPages(res.data.totalPages || 1);
        } else {
          setNotes([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Failed to fetch notes", error);
        setNotes([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [category, page]);

  return (
    <>
      {/* Grid */}
           <Notesbreadcumb category={category} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    
        {loading ? (
          <HomeCardSkeleton count={8} />
        ) : notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note._id}
              className="group bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition shadow-xl"
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs px-3 py-1 rounded-full">
                  {note.subject}
                </span>
                <span className="bg-gradient-to-br from-[#081a2d] via-[#0b3a4a] to-[#061622] text-gray-200 text-xs px-3 py-1 rounded-full capitalize">
                  {note.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                {note.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-1">
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
        ) : (
          <p className="text-gray-400 col-span-full text-center">
            No notes found for this category.
          </p>
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

export default NotesCategoryCard;
