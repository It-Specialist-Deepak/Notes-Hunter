"use client";

import React from "react";

const HomeCardSkeleton = ({ count = 8 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-800 rounded-2xl p-4 shadow-lg animate-pulse min-h-[240px] flex flex-col"
        >
          {/* Badges */}
          <div className="flex gap-2 mb-2">
            <div className="h-4 w-16 rounded-full bg-teal-600" />
            <div className="h-4 w-14 rounded-full bg-teal-700" />
          </div>

          {/* Title */}
          <div className="h-4 bg-teal-600 rounded mb-3 w-4/5" />

          {/* Description */}
          <div className="space-y-1.5 mb-5">
            <div className="h-3 bg-teal-700 rounded w-full" />
            <div className="h-3 bg-teal-700 rounded w-5/6" />
          </div>

          {/* Meta */}
          <div className="flex gap-3 mb-5">
            <div className="h-3 w-16 bg-teal-700 rounded" />
            <div className="h-3 w-12 bg-teal-700 rounded" />
          </div>

          {/* Actions */}
          <div className="mt-auto flex items-center gap-3">
            <div className="h-2 w-14 bg-teal-600 rounded" />
            <div className="ml-auto h-8 w-24 bg-teal-600 rounded-xl" />
          </div>
        </div>
      ))}
    </>
  );
};

export default HomeCardSkeleton;
