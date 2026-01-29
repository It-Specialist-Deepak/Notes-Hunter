"use client";

import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  FaFileAlt,
  FaBookOpen,
  FaGraduationCap,
  FaClipboardCheck,
  FaCloudDownloadAlt,
  FaUsers,
} from "react-icons/fa";
import { Sparkles, ArrowRight, Zap } from "lucide-react";

const features = [
  {
    icon: FaFileAlt,
    title: "Previous Year Papers",
    description:
      "Access a well-organized collection of previous year question papers to understand exam patterns and practice effectively.",
    color: "from-blue-500 to-cyan-500",
    bgGlow: "bg-blue-500/20",
  },
  {
    icon: FaBookOpen,
    title: "Study Notes",
    description:
      "High-quality notes prepared by toppers and educators, simplified for quick revision and deep understanding.",
    color: "from-purple-500 to-pink-500",
    bgGlow: "bg-purple-500/20",
  },
  {
    icon: FaGraduationCap,
    title: "Courses & Tutorials",
    description:
      "Structured courses and video tutorials designed to strengthen concepts from basics to advanced levels.",
    color: "from-emerald-500 to-teal-500",
    bgGlow: "bg-emerald-500/20",
  },
  {
    icon: FaClipboardCheck,
    title: "Exam-Oriented Content",
    description:
      "Content curated strictly according to university and competitive exam syllabi for maximum relevance.",
    color: "from-amber-500 to-orange-500",
    bgGlow: "bg-amber-500/20",
  },
  {
    icon: FaCloudDownloadAlt,
    title: "Easy Downloads",
    description:
      "Download papers, notes, and resources instantly in PDF format for offline study anytime, anywhere.",
    color: "from-rose-500 to-red-500",
    bgGlow: "bg-rose-500/20",
  },
  {
    icon: FaUsers,
    title: "Student Community",
    description:
      "Learn together with a growing community of students—share notes, tips, and exam experiences.",
    color: "from-indigo-500 to-purple-500",
    bgGlow: "bg-indigo-500/20",
  },
];

// Container animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Item animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Floating particles component
const FloatingParticle = ({ delay, duration }) => (
  <motion.div
    className="absolute w-1 h-1 bg-teal-400/60 rounded-full"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    animate={{
      y: [0, -30, 0],
      opacity: [0, 0.8, 0],
      scale: [0, 1.5, 0],
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const FeatureItem = ({ feature, index }) => {
  const Icon = feature.icon;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative h-full"
    >
      {/* Glow effect on hover */}
      <motion.div
        className={`absolute inset-0 ${feature.bgGlow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main card */}
      <div className="relative h-full rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 group-hover:border-teal-500/50 p-6 shadow-xl transition-all duration-300 overflow-hidden">
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-500/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon container with animation */}
          <motion.div
            className="mb-5 relative inline-block"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            {/* Icon background glow */}
            <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-opacity`} />
            
            {/* Icon */}
            <div className={`relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}>
              <Icon className="text-white text-2xl" />
            </div>

            {/* Animated badge */}
            <motion.div
              className="absolute -top-1 -right-1 w-5 h-5 bg-teal-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Zap className="w-3 h-3 text-white" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <h4 className="mb-3 text-xl font-bold text-white group-hover:text-teal-400 transition-colors duration-300">
            {feature.title}
          </h4>

          {/* Description */}
          <p className="text-gray-400 leading-relaxed text-sm mb-4 group-hover:text-gray-300 transition-colors duration-300">
            {feature.description}
          </p>

          
        </div>

        {/* Corner number indicator */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-700/50 backdrop-blur-sm flex items-center justify-center border border-slate-600/50">
          <span className="text-teal-400 font-bold text-xs">{index + 1}</span>
        </div>
      </div>
    </motion.div>
  );
};

FeatureItem.propTypes = {
  feature: PropTypes.shape({
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    bgGlow: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

const Feature = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#081a2d] via-[#0b3a4a] to-[#061622] py-20 md:py-32 text-white overflow-hidden">
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-br from-teal-500/20 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-gradient-to-tl from-purple-500/15 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.3}
            duration={4 + Math.random() * 3}
          />
        ))}

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading Section */}
        <div className="mb-16 text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-500/20 backdrop-blur-md border border-teal-500/30 mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-teal-400" />
            </motion.div>
            <span className="text-sm font-bold text-teal-300 tracking-wide">
              Powerful Features
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 text-4xl md:text-6xl font-extrabold"
          >
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Excel
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 leading-relaxed"
          >
            Comprehensive tools and resources designed to enhance your learning experience
            and accelerate your academic success journey.
          </motion.p>
        </div>

        {/* Feature Grid with staggered animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <FeatureItem key={index} feature={feature} index={index} />
          ))}
        </motion.div>

       
      </div>
    </section>
  );
};

export default Feature;