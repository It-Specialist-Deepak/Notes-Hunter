"use client";

import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import RecommendedNoteCard from "./RecommendedNoteCard";

export default function RecommendedNotesSlider({ notes , category }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const scrollAmount = 360; // card width + gap
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mt-12">
      {/* 🔘 Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10
                   bg-black/50 backdrop-blur-md text-white p-3 rounded-full
                   hover:bg-black/70 transition hidden md:flex"
      >
        <FaChevronLeft />
      </button>

      {/* 🧭 Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth
                   scrollbar-hide px-2"
      >
        {notes.map((note) => (
          <div key={note._id} className="min-w-[340px]">
            <RecommendedNoteCard note={note} category={category} />
          </div>
        ))}
      </div>

      {/* 🔘 Right Arrow */}
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
