"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaperPagination({ meta }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { currentPage = 1, totalPapers = 0, limit = 12 } = meta || {};
  const totalPages = Math.ceil(totalPapers / limit);

  const changePage = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page); // update page in URL
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const baseBtn =
    "grid w-9 h-9 text-white place-content-center rounded-lg border transition-all duration-200 cursor-pointer";
  const hoverBtn =
    "hover:border-teal-500 hover:bg-teal-500/10 hover:text-teal-400";

  if (totalPages <= 1) return null;

  return (
    <ul className="flex justify-center gap-2 mt-8">
      {/* Previous */}
      <li>
        <button
          onClick={() => changePage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={`${baseBtn} ${hoverBtn} disabled:pointer-events-none disabled:opacity-40`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </li>

      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        const isActive = page === currentPage;

        return (
          <li key={page}>
            <button
              onClick={() => changePage(page)}
              className={`${baseBtn} ${
                isActive
                  ? "bg-teal-600 border-teal-600 text-white"
                  : hoverBtn
              }`}
            >
              {page}
            </button>
          </li>
        );
      })}

      {/* Next */}
      <li>
        <button
          onClick={() => changePage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`${baseBtn} ${hoverBtn} disabled:pointer-events-none disabled:opacity-40`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </li>
    </ul>
  );
}
