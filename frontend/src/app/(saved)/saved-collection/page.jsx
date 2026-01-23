"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiBook, FiFile, FiBookmark, FiTrash2, FiDownload } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toggleSaveNote } from "../../redux/slices/previewNotes"; 
import { fetchSavedItems } from "../../redux/slices/savedItemSlice";
import toast from "react-hot-toast";

const SavedCollection = () => {
  const [activeTab, setActiveTab] = useState("notes");
  const dispatch = useDispatch();
  const router = useRouter();
  
  const { notes, papers, loading, error } = useSelector((state) => state.savedItems);

  useEffect(() => {
    dispatch(fetchSavedItems());
  }, [dispatch]);

const handleRemoveItem = async (type, id) => {
  try {
    if (type === 'notes') {
      // Optimistically update the UI
      const previousState = { notes, papers };
      
      // Remove the note from the local state
      dispatch({
        type: 'savedItems/fetchAll/fulfilled',
        payload: {
          notes: notes.filter(note => note._id !== id),
          papers
        }
      });

      // Make the API call
      const resultAction = await dispatch(toggleSaveNote({ noteId: id }));
      
      if (toggleSaveNote.rejected.match(resultAction)) {
        // If API call fails, revert the UI
        dispatch({
          type: 'savedItems/fetchAll/fulfilled',
          payload: previousState
        });
        throw new Error(resultAction.payload || 'Failed to remove note');
      }
      
      toast.success('Note removed from saved items');
    } else {
      // For papers, use the appropriate API (you'll need to implement this)
      // This is a placeholder - replace with your actual paper removal logic
      const resultAction = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/paper/unsave-paper/${id}`,
        {},
        { withCredentials: true }
      );

      if (resultAction.data.success) {
        // Update the UI for papers
        dispatch({
          type: 'savedItems/fetchAll/fulfilled',
          payload: {
            notes,
            papers: papers.filter(paper => paper._id !== id)
          }
        });
        toast.success('Paper removed from saved items');
      } else {
        throw new Error('Failed to remove paper');
      }
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  const handleDownload = (url, e) => {
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank');
    } else {
      toast.error('No download URL available');
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-500">
        <div className="text-center">
          <p>Error loading saved items</p>
          <button
            onClick={() => dispatch(fetchSavedItems())}
            className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto pt-24">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-xl bg-teal-500/20 text-teal-400">
            <FiBookmark className="text-2xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Saved Collection</h1>
            <p className="text-gray-400">Access all your saved notes and papers in one place</p>
          </div>
        </div>

        {/* Toggle Tabs */}
        <div className="flex mb-8 bg-gray-800/50 rounded-xl p-1 max-w-md">
          <button
            onClick={() => setActiveTab("notes")}
            className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
              activeTab === "notes"
                ? "bg-teal-600/30 text-teal-400"
                : "text-gray-400 hover:bg-gray-700/50"
            }`}
          >
            <FiBook />
            <span>Saved Notes ({notes?.length || 0})</span>
          </button>
          <button
            onClick={() => setActiveTab("papers")}
            className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
              activeTab === "papers"
                ? "bg-amber-600/30 text-amber-400"
                : "text-gray-400 hover:bg-gray-700/50"
            }`}
          >
            <FiFile />
            <span>Saved Papers ({papers?.length || 0})</span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6"
          >
            {activeTab === "notes" ? (
              notes?.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {notes.map((note) => (
                    <motion.div
                      key={note._id}
                      whileHover={{ y: -5 }}
                      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-teal-500/30 transition-all cursor-pointer"
                      onClick={() => router.push(`/browse-notes/${note._id}`)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-white">{note.title}</h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveItem('notes', note._id);
                          }}
                          className="text-gray-500 hover:text-red-400 p-1 -mr-2"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                      <p className="text-gray-400 mb-4 line-clamp-2">{note.content}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        {note.category && (
                          <span className="bg-teal-900/30 text-teal-400 px-3 py-1 rounded-full text-xs">
                            {note.category}
                          </span>
                        )}
                        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-gray-800/30 rounded-2xl border-2 border-dashed border-gray-700">
                  <div className="mx-auto w-16 h-16 bg-teal-900/20 rounded-full flex items-center justify-center text-teal-400 mb-4">
                    <FiBookmark className="text-2xl" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No saved notes yet</h3>
                  <p className="text-gray-400 max-w-md mx-auto">
                    Save interesting notes while browsing to see them here.
                  </p>
                </div>
              )
            ) : papers?.length > 0 ? (
              <div className="space-y-4">
                {papers.map((paper) => (
                  <motion.div
                    key={paper._id}
                    whileHover={{ x: 5 }}
                    className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-amber-500/30 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-amber-400 transition-colors">
                          {paper.title}
                        </h3>
                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-400">
                          {paper.university && (
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                              {paper.university}
                            </span>
                          )}
                          {paper.course && (
                            <>
                              <span>•</span>
                              <span>{paper.course}</span>
                            </>
                          )}
                          {paper.author && (
                            <>
                              <span>•</span>
                              <span>{paper.author}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => handleDownload(paper.fileUrl, e)}
                          className="px-4 py-2 bg-amber-600/20 text-amber-400 rounded-lg hover:bg-amber-600/30 transition-colors flex items-center gap-2"
                        >
                          <FiDownload size={16} />
                          <span>Download</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveItem('papers', paper._id);
                          }}
                          className="p-2 text-gray-500 hover:text-red-400 rounded-lg hover:bg-gray-700/50 transition-colors"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-800/30 rounded-2xl border-2 border-dashed border-gray-700">
                <div className="mx-auto w-16 h-16 bg-amber-900/20 rounded-full flex items-center justify-center text-amber-400 mb-4">
                  <FiFile className="text-2xl" />
                </div>
                <h3 className="text-xl font-medium mb-2">No saved papers yet</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  Save interesting papers while browsing to see them here.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SavedCollection;