import React from "react";

const PaperSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl px-4 mx-auto">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="relative    bg-white/10 backdrop-blur-2xl
                border border-white/20
                shadow-lg shadow-black/30
                transition-all duration-300
                hover:scale-105
                hover:border-teal-400/50
                hover:shadow-teal-500/30 p-5 rounded-2xl overflow-hidden"
        >
          {/* Glow background */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-200 to-teal-300 blur-xl opacity-50"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-full bg-teal-300 animate-pulse"></div>
            <div className="w-24 h-6 bg-teal-300 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaperSkeleton;
