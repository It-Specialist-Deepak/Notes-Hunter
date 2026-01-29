"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { Download } from "lucide-react";
import { FaClock, FaDownload, FaHeart, FaFileAlt, FaRegBookmark, FaBookmark} from "react-icons/fa";

import Pagination from "./HomeNotesPagination";
import HomeCardSkeleton from "@/app/skeleton/Homecard-skeleton";
import Notesbreadcumb from "./Notesbreadcumb";
import { useDispatch, useSelector } from "react-redux";
import {
  setPreviewNoteId,
  downloadNote,
  toggleSaveNote,
} from "../../redux/slices/previewNotes";
import { fetchSavedItems } from "../../redux/slices/savedItemSlice";
import toast from "react-hot-toast";
import useDebounce from "@/app/hooks/useDebounce"; // 👈 import
function NotesCategoryCard({ searchTerm }) {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const category = decodeURIComponent(params.Category || "");
  const page = Number(searchParams.get("page")) || 1;

  const [notes, setNotes] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  // ✅ DEBOUNCED SEARCH
  const debouncedSearch = useDebounce(searchTerm, 800);
  const handlePreview = (note) => {
    dispatch(setPreviewNoteId(note._id));
    router.push(`/notes-collection/${category}/${note._id}`);
  };
  const {
    savedNoteIds = [],
    saveLoading,
    loading: downloadLoading,
  } = useSelector((state) => state.previewNotes);
  /* ----------------------------------
     FETCH NOTES (CATEGORY + SEARCH)
  ---------------------------------- */
  useEffect(() => {
    if (!category) return;

    let isMounted = true;

    const fetchNotes = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/notes/getnotes-byCategory/${encodeURIComponent(category)}`,
          {
            params: {
              page,
              limit: 12,
              search: debouncedSearch?.trim() || "",
            },
          }
        );


        if (!isMounted) return;

        if (res.data?.success) {
          setNotes(res.data.data || []);
          setTotalPages(res.data.totalPages || 1);
        } else {
          setNotes([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        if (isMounted) {
          setNotes([]);
          setTotalPages(1);
        }
      } finally {
        isMounted && setLoading(false);
      }
    };

    fetchNotes();

    return () => {
      isMounted = false;
    };
  }, [category, page, debouncedSearch]);

  /* ----------------------------------
     RESET PAGE WHEN SEARCH CHANGES
  ---------------------------------- */
  useEffect(() => {
    router.replace("?page=1");
  }, [debouncedSearch, router]);


  // Save functionality with optimistic UI updates
  const [saveLoadingMap, setSaveLoadingMap] = useState({});
  const [localSavedStatus, setLocalSavedStatus] = useState({});
  const savedNotes = useSelector((state) => state.savedItems.notes);

  // Initialize local saved status when savedNotes changes
  useEffect(() => {
    const initialStatus = {};
    savedNotes?.forEach(note => {
      initialStatus[note._id] = true;
    });
    setLocalSavedStatus(prev => ({
      ...prev,
      ...initialStatus
    }));
  }, [savedNotes]);

  // Initial fetch of saved notes
  useEffect(() => {
    dispatch(fetchSavedItems({ type: 'notes' }));
  }, []);

  const isNoteSaved = (noteId) => {
    // First check local state, then fall back to Redux state
    if (localSavedStatus.hasOwnProperty(noteId)) {
      return localSavedStatus[noteId];
    }
    return savedNotes?.some(savedNote => savedNote._id === noteId);
  };

  const handleSave = async (noteId) => {
    const previousState = isNoteSaved(noteId);
    
    // Optimistically update the UI
    setLocalSavedStatus(prev => ({
      ...prev,
      [noteId]: !previousState
    }));
    
    setSaveLoadingMap(prev => ({
      ...prev,
      [noteId]: true
    }));

    try {
      const result = await dispatch(toggleSaveNote({ noteId }));

      if (toggleSaveNote.fulfilled.match(result)) {
        const { saved } = result.payload;
        toast.success(saved ? "Note saved" : "Note removed");
        // Re-sync with server
        await dispatch(fetchSavedItems({ type: 'notes' }));
      } else if (toggleSaveNote.rejected.match(result)) {
        // Revert the UI if the API call fails
        setLocalSavedStatus(prev => ({
          ...prev,
          [noteId]: previousState
        }));
        const error = result.payload;
        toast.error(error?.message || "Something went wrong");
        if (error?.shouldRedirect) {
          router.push("/login");
        }
      }
    } catch (error) {
      // Revert the UI if there's an error
      setLocalSavedStatus(prev => ({
        ...prev,
        [noteId]: previousState
      }));
      toast.error("Failed to update save status");
    } finally {
      setSaveLoadingMap(prev => ({
        ...prev,
        [noteId]: false
      }));
    }
  };

  const handleDownload = async (noteId) => {
    const result = await dispatch(downloadNote(noteId));

    if (downloadNote.fulfilled.match(result)) {
      const link = document.createElement("a");
      link.href = result.payload;
      link.target = "_blank";
      link.click();
    }
  };

  return (
    <>
      <Notesbreadcumb category={category} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {loading ? (
          <HomeCardSkeleton count={8} />
        ) : notes.length > 0 ? (
          notes.map((note) => {
            const isSaved = isNoteSaved(note._id);
            return (
              <div
                key={note._id}
                className="group bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition shadow-xl"
              >
                {/* Badges */}
                <div className="flex justify-between ">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs px-3 py-1 rounded-full">
                      {note.subject}
                    </span>
                    <span className="bg-gradient-to-br from-[#081a2d] via-[#0b3a4a] to-[#061622] text-gray-200 text-xs px-3 py-1 rounded-full capitalize">
                      {note.category}
                    </span>
                  </div>

                  <button
                    onClick={() => handleSave(note._id)}
                    disabled={saveLoadingMap[note._id]}
                    title={isSaved ? "Remove from saved" : "Save note"}
                    className={`
                p-2 rounded-full
                transition-all duration-300
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
                  <button
                    onClick={() => handleDownload(note._id)}
                    disabled={downloadLoading}
                    className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-teal-500 text-teal-600 text-sm font-semibold hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white transition-all duration-300 disabled:opacity-50"
                  >
                    <Download size={16} />
                    {downloadLoading ? "Downloading..." : "Download"}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-400 col-span-full text-center">
            No notes found.
          </p>
        )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="mt-12">
          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      )}
    </>
  );
}

export default NotesCategoryCard;
