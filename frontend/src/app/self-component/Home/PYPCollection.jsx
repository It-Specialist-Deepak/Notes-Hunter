

import Link from "next/link";
import { FaFileAlt, FaDownload, FaUniversity } from "react-icons/fa";

export default function PYPCollection() {
    return (
        <section className="relative w-full py-20 px-4 sm:px-8 bg-gradient-to-br from-teal-500 via-emerald-600 to-cyan-600
">

            {/* Heading */}
            <div className="text-center max-w-3xl mx-auto mb-14">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                    Previous Year Question Papers
                </h2>
                <p className="mt-4 text-white/90 text-base sm:text-lg">
                    Boost your exam preparation with university-wise and subject-wise
                    previous year question papers curated by experts.
                </p>
            </div>

            {/* Main Card */}
            <div className="
  max-w-5xl mx-auto
 bg-teal-50/20 backdrop-blur-xl border-b border-teal-100/30
  rounded-3xl
  shadow-[0_25px_80px_rgba(0,0,0,0.35)]
  p-8 sm:p-12
  text-center
  relative
  overflow-hidden
">


                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center">
                        <FaFileAlt className="text-white text-4xl" />
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
                    Smart Exam Preparation Starts Here
                </h3>

                {/* Description */}
                <p className="text-white/90 max-w-2xl mx-auto mb-10 text-sm sm:text-base leading-relaxed">
                    Access solved and unsolved previous year papers from top universities.
                    Understand exam patterns, important questions, and marking schemes to
                    improve accuracy and confidence.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white/25 rounded-xl p-5">
                        <FaUniversity className="text-white text-2xl mx-auto mb-2" />
                        <h4 className="text-white font-bold text-lg">50+ Universities</h4>
                        <p className="text-white/80 text-sm">State & Central</p>
                    </div>

                    <div className="bg-white/25 rounded-xl p-5">
                        <FaFileAlt className="text-white text-2xl mx-auto mb-2" />
                        <h4 className="text-white font-bold text-lg">10,000+ Papers</h4>
                        <p className="text-white/80 text-sm">All Major Subjects</p>
                    </div>

                    <div className="bg-white/25 rounded-xl p-5">
                        <FaDownload className="text-white text-2xl mx-auto mb-2" />
                        <h4 className="text-white font-bold text-lg">Free Downloads</h4>
                        <p className="text-white/80 text-sm">PDF Format</p>
                    </div>
                </div>

                {/* CTA */}
                <Link href="/browse-papers" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-sm sm:text-base transition-all shadow-lg hover:scale-105">
                    <FaDownload />
                    View Previous Year Papers
                </Link>
            </div>
        </section>
    );
}
