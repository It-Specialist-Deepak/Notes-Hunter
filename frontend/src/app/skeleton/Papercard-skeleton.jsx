const PaperCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="relative rounded-3xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl animate-pulse"
        >
          {/* Top badge */}
          <div className="absolute top-4 right-4 h-6 w-32 rounded-full bg-white/20" />

          {/* Icon + Title */}
          <div className="flex items-start gap-4 mb-4">
            <div className="h-12 w-12 rounded-xl bg-white/20" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-3/4 rounded bg-white/20" />
              <div className="h-3 w-1/2 rounded bg-white/20" />
            </div>
          </div>

          {/* Meta info */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="h-3 w-full rounded bg-white/20" />
            <div className="h-3 w-full rounded bg-white/20" />
            <div className="h-3 w-full rounded bg-white/20" />
            <div className="h-3 w-full rounded bg-white/20" />
          </div>

          {/* Stats */}
          <div className="flex justify-between mb-5">
            <div className="h-4 w-10 rounded bg-white/20" />
            <div className="h-4 w-10 rounded bg-white/20" />
            <div className="h-4 w-10 rounded bg-white/20" />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <div className="h-4 w-20 rounded bg-white/20" />
            <div className="h-10 w-32 rounded-full bg-white/20" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaperCardSkeleton;
