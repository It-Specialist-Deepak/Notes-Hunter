"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import PaperSkeleton from "@/app/skeleton/PaperCategory-skeleton";

const University = ({ search = "" }) => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const capitalizeFirstLetter = (text) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/paper/all-universities`
        );

        if (res.data.success) {
          const formatted = res.data.universities.map((name, index) => ({
            id: index,
            name,
          }));
          setUniversities(formatted);
        }
      } catch (error) {
        console.error("Failed to fetch universities", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

 const handleClick = (university) => {
  router.push(`/papers-collection/${encodeURIComponent(university)}`);
};


  const filtered = universities.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <PaperSkeleton />;
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((uni) => (
          <div
            key={uni.id}
            onClick={() => handleClick(uni.name)}
            className="group cursor-pointer relative overflow-hidden rounded-2xl bg-white/10 p-5 text-center backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-gradient-to-br from-teal-500/10 to-transparent" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-teal-500/20 ring-1 ring-teal-400/30">
                <GraduationCap className="h-7 w-7 text-teal-400" />
              </div>

              <h3 className="text-md font-semibold text-white">
                {capitalizeFirstLetter(uni.name)}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-slate-400">
          No universities found.
        </p>
      )}
    </>
  );
};

export default University;
