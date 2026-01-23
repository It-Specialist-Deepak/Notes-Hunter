"use client";

import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import RecommendedPaperCard from "./RecomendedPaperCard";

export default function RecommendedPaperSlider({ papers, category , university , course }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const scrollAmount = 360; // card width + gap
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };


  if (!papers || papers.length === 0) return null;

  return (
    <div className="relative mt-10">
      {/* Left */}
      <button
        onClick={() => scroll("left")}
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10
                   bg-black/50 backdrop-blur-md text-white p-3 rounded-full
                   hover:bg-black/70 transition hidden md:flex"
      >
        <FaChevronLeft />
      </button>

      {/* Slider */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-2"
      >
        {papers.map((p) => (
          <div key={p._id} className="min-w-[340px]">
            <RecommendedPaperCard
              paper={p}
              category={category}
              university={university}
              course={course}
            />
          </div>
        ))}
      </div>

      {/* Right */}
      <button
        onClick={() => scroll("right")}
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10
                   bg-black/50 backdrop-blur-md text-white p-3 rounded-full
                   hover:bg-black/70 transition hidden md:flex"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
