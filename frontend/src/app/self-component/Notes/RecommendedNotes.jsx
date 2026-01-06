// components/RecommendedNotes.js
"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendedNotes } from "../../redux/slices/recommendedNotes";
import RecommendedNotesSlider from "./RecommendedNotesSlider";

export default function RecommendedNotes({ noteId , category }) {
  const dispatch = useDispatch();
  const { notes, loading, error, total, subcategory } = useSelector(
    (state) => state.recommended
  );

  useEffect(() => {
    if (noteId) {
      dispatch(fetchRecommendedNotes(noteId));
    }
  }, [noteId, dispatch]);

  if (loading) return <p className="text-white">Loading recommendations...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!total) return null;

  return (
    <div className="w-full mx-auto px-4 mt-8">
     <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 border-l-4 border-teal-500 pl-3">
        Recommended Notes
        <span className="text-white/70 ml-2 text-base font-medium">
          ({subcategory})
        </span>
      </h2>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 "> */}

        <RecommendedNotesSlider notes={notes} category={category} />

      {/* </div> */}
      </div>
    </div>
  );
}
