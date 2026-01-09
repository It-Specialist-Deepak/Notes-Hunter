"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecommendedPapers,
  clearRecommendedPapers,
} from "../../redux/slices/recommendedPapers"; // ✅ FIX
import RecommendedPaperSlider from "./RecommendedPaperSlider";

export default function RecommendedPapers({ paperId, category }) {
  const dispatch = useDispatch();

  const {
    recommended,
    subcategory,
    total,
    loadingRecommended,
    errorRecommended,
  } = useSelector((state) => state.recommendedPapers); // ✅ FIX

  useEffect(() => {
    if (!paperId) return;

    dispatch(clearRecommendedPapers());
    dispatch(fetchRecommendedPapers(paperId));
  }, [paperId, dispatch]);

  if (loadingRecommended) {
    <section className="relative p-4  flex items-center justify-center px-4">

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

  }

  if (errorRecommended) {
    return <p className="text-red-500">{errorRecommended}</p>;
  }

  if (!recommended.length) return null;

  return (
    <div className="w-full mx-auto px-4 mt-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 border-l-4 border-teal-500 pl-3">
          Recommended Papers
          <span className="text-white/70 ml-2 text-base font-medium">
            ({subcategory})
          </span>
        </h2>

        <RecommendedPaperSlider
          papers={recommended}
          category={category}
        />
      </div>
    </div>
  );
}
