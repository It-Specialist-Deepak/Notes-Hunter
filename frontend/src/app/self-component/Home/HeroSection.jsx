import React from "react";
import Image from "next/image";
import Link from "next/link";

const Shape1 = () => (
  <svg
    className="absolute -z-[1] hidden sm:block top-0 left-0"
    width="270"
    height="389"
    viewBox="0 0 270 389"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="-55"
      cy="81"
      r="307"
      stroke="#C8C6FC"
      strokeOpacity="0.52"
      strokeWidth="2"
    />
    <circle cx="248" cy="129" r="22" fill="#5243C2" />
    <circle cx="69.5" cy="358.5" r="16.5" fill="#FFC107" />
  </svg>
);

const Shape2 = () => (
  <svg
    className="absolute -z-[1] hidden sm:block top-0 right-0 text-[#14b8a6]  dark:text-[#1E2735]"
    width="682"
    height="876"
    viewBox="0 0 682 876"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="467.5" cy="252.356" rx="467.5" ry="470.963" />
    <circle
      cx="560.013"
      cy="394.545"
      r="339.591"
      transform="rotate(-136.702 560.013 394.545)"
      stroke="white"
      strokeOpacity="0.9"
      strokeWidth="2"
    />
    <circle cx="352.559" cy="126.13" r="24.3279" fill="#5243C2" />
    <circle cx="670.261" cy="76.7956" r="18.2459" fill="#FFC107" />
  </svg>
);

function HeroSection() {
  return (
    <section className="relative z-1 bg-teal-50 dark:bg-[#0b1727] text-zinc-900 dark:text-white  md:pt-24">
      <Shape1 />
      <Shape2 />

      <div className="container mx-auto px-4">
        {/* FLEX CONTAINER */}
        <div className="flex flex-col lg:flex-row items-center min-h-[80vh] gap-y-16 lg:gap-x-12">
          {/* TEXT */}
          <div className="flex flex-col justify-center text-center lg:text-left flex-1">
            <span className="inline-block mb-4 text-sm font-bold tracking-wider uppercase
bg-gradient-to-r from-teal-500 via-emerald-600 to-cyan-600
bg-clip-text text-transparent">
              Study Smarter
            </span>


            <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl leading-tight mb-6">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-teal-400 to-teal-700 bg-clip-text text-transparent">
                Notes Hunter
              </span>
            </h1>

            <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto lg:mx-0 mb-8">
              Find high-quality notes, resources, and study materials designed
              to help you learn faster, understand better, and succeed with
              confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link  href="/browse-notes" className="px-8 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-teal-700 text-white font-semibold transition shadow-lg hover:shadow-[0_15px_40px_rgba(16,185,129,0.4)] cursor-pointer">
                Explore Notes
              </Link>
              <Link href="/browse-papers" className="px-8 py-3 rounded-xl border border-zinc-300 hover:border-teal-500 dark:border-zinc-600 font-semibold hover:bg-gradient-to-r from-teal-400 to-teal-700 hover:text-white shadow-lg 
hover:shadow-[0_15px_40px_rgba(16,185,129,0.4)]
transition cursor-pointer">
                Explore Papers
              </Link>
            </div>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center lg:justify-end flex-1">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md aspect-[5/6]">
              <Image
                src="/herosection.png"
                alt="Coming soon book"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection;
