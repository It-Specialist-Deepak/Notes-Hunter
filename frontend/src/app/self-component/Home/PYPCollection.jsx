"use client"

import Link from "next/link";
import { motion } from "framer-motion";
import { FaFileAlt, FaDownload, FaUniversity } from "react-icons/fa";
import { BookOpen, FileCheck, Trophy, ArrowRight, Sparkles, CheckCircle } from "lucide-react";

// Floating particle animation component
const FloatingParticle = ({ delay, duration, position }) => (
  <motion.div
    className="absolute w-2 h-2 bg-white/40 rounded-full"
    style={{ left: position.x, top: position.y }}
    animate={{
      y: [0, -30, 0],
      opacity: [0, 0.8, 0],
      scale: [0, 1.2, 0]
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

// Stats Card Component
const StatsCard = ({ icon: Icon, title, subtitle, delay, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.05, y: -5 }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 shadow-lg">
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
        className="w-14 h-14 mx-auto mb-4 bg-white/10 rounded-xl flex items-center justify-center"
      >
        <Icon className="text-white text-3xl drop-shadow-lg" />
      </motion.div>
      <h4 className="text-white font-bold text-xl mb-1">{title}</h4>
      <p className="text-white/90 text-sm font-medium">{subtitle}</p>
    </div>
  </motion.div>
);

// Feature List Item
const FeatureItem = ({ text, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex items-center gap-3 text-white/95"
  >
    <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center flex-shrink-0">
      <CheckCircle className="w-4 h-4 text-white" />
    </div>
    <span className="text-sm sm:text-base font-medium">{text}</span>
  </motion.div>
);

export default function PYPCollection() {
    return (
        <section className="relative w-full py-24 px-4 sm:px-8 bg-gradient-to-br from-teal-500 via-emerald-600 to-cyan-600 overflow-hidden">
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Large gradient orbs */}
                <motion.div
                    className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl"
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ 
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-white/15 to-transparent rounded-full blur-3xl"
                    animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ 
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />

                {/* Floating particles */}
                {[...Array(12)].map((_, i) => (
                    <FloatingParticle
                        key={i}
                        delay={i * 0.4}
                        duration={5 + Math.random() * 3}
                        position={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%` }}
                    />
                ))}

                {/* Decorative circles */}
                <motion.div
                    className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-white/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute bottom-1/3 left-1/4 w-24 h-24 border-2 border-white/15 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <div className="relative z-10">
                {/* Heading Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/25 backdrop-blur-md border border-white/40 mb-6"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles className="w-5 h-5 text-white" />
                        </motion.div>
                        <span className="text-sm font-bold text-white tracking-wide">
                            Exam Preparation Made Easy
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight"
                    >
                        Previous Year{" "}
                        <span className="block sm:inline bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-300 bg-clip-text text-transparent">
                            Question Papers
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-white/95 text-lg sm:text-xl leading-relaxed font-medium"
                    >
                        Boost your exam preparation with university-wise and subject-wise
                        previous year question papers curated by experts.
                    </motion.p>
                </div>

                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="max-w-6xl mx-auto relative"
                >
                    {/* Glow effect behind card */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-amber-400/30 to-yellow-400/30 rounded-3xl blur-2xl transform scale-105" />
                    
                    <div className="relative bg-white/25 backdrop-blur-2xl border-2 border-white/40 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.4)] p-8 sm:p-12 overflow-hidden">
                        
                        {/* Decorative top-right corner element */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/20 to-transparent rounded-bl-full" />
                        
                        {/* Content */}
                        <div className="relative z-10">
                            {/* Icon with animation */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="flex justify-center mb-8"
                            >
                                <div className="relative">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-amber-400/30 rounded-full blur-xl"
                                    />
                                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-white/40 to-white/20 border-2 border-white/50 flex items-center justify-center backdrop-blur-sm shadow-2xl">
                                        <FaFileAlt className="text-white text-5xl drop-shadow-lg" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Title */}
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center"
                            >
                                Smart Exam Preparation Starts Here
                            </motion.h3>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                className="text-white/95 max-w-3xl mx-auto mb-10 text-base sm:text-lg leading-relaxed text-center font-medium"
                            >
                                Access solved and unsolved previous year papers from top universities.
                                Understand exam patterns, important questions, and marking schemes to
                                improve accuracy and confidence.
                            </motion.p>

                            {/* Features List */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                className="max-w-2xl mx-auto mb-12 grid grid-cols-1 sm:grid-cols-2 gap-4"
                            >
                                <FeatureItem text="University-wise collection" delay={0.9} />
                                <FeatureItem text="Subject-wise organization" delay={1.0} />
                                <FeatureItem text="Solved & unsolved papers" delay={1.1} />
                                <FeatureItem text="Updated regularly" delay={1.2} />
                            </motion.div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                                <StatsCard
                                    icon={FaUniversity}
                                    title="50+ Universities"
                                    subtitle="State & Central"
                                    delay={0.9}
                                    index={0}
                                />
                                <StatsCard
                                    icon={FaFileAlt}
                                    title="10,000+ Papers"
                                    subtitle="All Major Subjects"
                                    delay={1.0}
                                    index={1}
                                />
                                <StatsCard
                                    icon={FaDownload}
                                    title="Free Downloads"
                                    subtitle="PDF Format"
                                    delay={1.1}
                                    index={2}
                                />
                            </div>

                            {/* CTA Button */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 1.2 }}
                                className="text-center"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link 
                                        href="/browse-papers" 
                                        className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 hover:from-yellow-500 hover:via-amber-500 hover:to-yellow-500 text-slate-900 font-bold text-base sm:text-lg transition-all shadow-[0_20px_60px_rgba(251,191,36,0.4)] hover:shadow-[0_25px_70px_rgba(251,191,36,0.6)] border-2 border-yellow-300"
                                    >
                                        <FaDownload className="text-xl" />
                                        View Previous Year Papers
                                        <motion.div
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <ArrowRight className="w-5 h-5" />
                                        </motion.div>
                                    </Link>
                                </motion.div>

                                {/* Additional Info */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 1.4 }}
                                    className="mt-6 text-white/80 text-sm flex items-center justify-center gap-2"
                                >
                                    <Trophy className="w-4 h-4" />
                                    Trusted by 10,000+ students across India
                                </motion.p>
                            </motion.div>
                        </div>

                        {/* Decorative corner elements */}
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/10 to-transparent rounded-tr-full" />
                    </div>
                </motion.div>

                {/* Bottom decorative section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1.5 }}
                    className="max-w-4xl mx-auto mt-16 text-center"
                >
                    <div className="flex flex-wrap justify-center gap-8 items-center">
                        <div className="flex items-center gap-2 text-white/90">
                            <BookOpen className="w-5 h-5" />
                            <span className="text-sm font-medium">Comprehensive Coverage</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/90">
                            <FileCheck className="w-5 h-5" />
                            <span className="text-sm font-medium">Expert Verified</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/90">
                            <Trophy className="w-5 h-5" />
                            <span className="text-sm font-medium">Success Guaranteed</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}