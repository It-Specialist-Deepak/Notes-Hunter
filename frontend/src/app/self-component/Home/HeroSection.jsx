"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  FileText, 
  Download, 
  Users, 
  Star, 
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award,
  GraduationCap,
  Brain,
  Target,
  Zap,
  Lightbulb,
  Rocket
} from "lucide-react";

// Animated Background Shapes
const AnimatedShape1 = () => (
  <motion.div
    className="absolute -z-[1] hidden sm:block top-10 left-10"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 0.6, scale: 1 }}
    transition={{ duration: 2, delay: 0.5 }}
  >
    <motion.div
      className="w-80 h-80 bg-gradient-to-br from-teal-400/30 to-emerald-600/30 rounded-full blur-3xl"
      animate={{ 
        scale: [1, 1.3, 1],
        rotate: [0, 180, 360]
      }}
      transition={{ 
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  </motion.div>
);

const AnimatedShape2 = () => (
  <motion.div
    className="absolute -z-[1] hidden sm:block top-20 right-20"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 0.5, scale: 1 }}
    transition={{ duration: 2, delay: 0.7 }}
  >
    <motion.div
      className="w-[500px] h-[500px] bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"
      animate={{ 
        scale: [1, 0.8, 1],
        rotate: [360, 180, 0]
      }}
      transition={{ 
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  </motion.div>
);

const AnimatedShape3 = () => (
  <motion.div
    className="absolute -z-[1] hidden sm:block bottom-20 left-1/4"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 0.4, scale: 1 }}
    transition={{ duration: 2, delay: 0.9 }}
  >
    <motion.div
      className="w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"
      animate={{ 
        scale: [1, 1.4, 1],
        opacity: [0.4, 0.7, 0.4]
      }}
      transition={{ 
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  </motion.div>
);

const FloatingCard = ({ icon: Icon, title, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ scale: 1.05, y: -5 }}
    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex items-center gap-4 hover:bg-white/15 hover:border-teal-400/40 transition-all duration-300 shadow-xl hover:shadow-2xl"
  >
    <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
      <Icon className="w-7 h-7 text-white" />
    </div>
    <div>
      <p className="text-sm text-gray-300 font-medium">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </motion.div>
);

// Enhanced Resource Node Component
const ResourceNode = ({ icon: Icon, label, color, delay, position, size = "default" }) => {
  const sizeClasses = size === "large" ? "w-20 h-20" : "w-16 h-16";
  const iconSizeClasses = size === "large" ? "w-10 h-10" : "w-7 h-7";
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      className={`absolute ${position}`}
    >
      <motion.div
        animate={{ 
          y: [-12, 12, -12],
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay
        }}
        className="relative group cursor-pointer"
        whileHover={{ scale: 1.1 }}
      >
        {/* Enhanced Glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${color} rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
        
        {/* Main card */}
        <div className={`relative bg-gradient-to-br ${color} backdrop-blur-xl border-2 border-white/40 rounded-2xl p-5 shadow-2xl group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300`}>
          <div className="flex flex-col items-center gap-2">
            <div className={`${sizeClasses} bg-white/30 rounded-xl flex items-center justify-center backdrop-blur-sm`}>
              <Icon className={`${iconSizeClasses} text-white drop-shadow-lg`} />
            </div>
            <span className="text-sm font-bold text-white whitespace-nowrap drop-shadow-md">{label}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Floating Particle Component
const FloatingParticle = ({ delay, duration, startPos }) => (
  <motion.div
    className="absolute w-2 h-2 bg-teal-400/60 rounded-full"
    style={{ left: startPos.x, top: startPos.y }}
    animate={{
      y: [0, -100, 0],
      x: [0, Math.random() * 50 - 25, 0],
      opacity: [0, 1, 0],
      scale: [0, 1, 0]
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

function HeroSection() {
  return (
    <section className="relative z-1 min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 text-white overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 via-emerald-600/15 to-cyan-600/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-500/30 via-transparent to-transparent" />
      <AnimatedShape1 />
      <AnimatedShape2 />
      <AnimatedShape3 />
      
      {/* Enhanced Grid Pattern with Animation */}
      <motion.div 
        className="absolute inset-0 bg-grid-teal-500/[0.15] bg-[size:40px_40px]"
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Additional Background Layers */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-teal-900/10 to-slate-950/60" />

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <FloatingParticle 
          key={i}
          delay={i * 0.5}
          duration={6 + Math.random() * 3}
          startPos={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%` }}
        />
      ))}

      <div className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center min-h-[90vh] gap-y-12 lg:gap-x-12">
          {/* TEXT CONTENT - Adjusted width */}
          <div className="flex flex-col justify-center text-center lg:text-left lg:w-[45%] space-y-8 mt-2">
            {/* Enhanced Badge with Animation */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-teal-500/40 via-emerald-500/40 to-teal-500/40 border-2 border-teal-400/50 backdrop-blur-xl shadow-lg shadow-teal-500/30 mx-auto lg:mx-0 w-fit"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-teal-300" />
              </motion.div>
              <span className="text-sm font-bold text-teal-100 tracking-wide">
                Study Smarter, Not Harder
              </span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Rocket className="w-5 h-5 text-emerald-300" />
              </motion.div>
            </motion.div>

            {/* Enhanced Main Heading with Better Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
            >
              <span className="block mb-2 text-white">Welcome to</span>
              <span className="block bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-2xl">
                Notes Hunter
              </span>
            </motion.h1>

            {/* Enhanced Description with Better Contrast */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              Discover <span className="text-teal-300 font-bold">premium study materials</span>, 
              comprehensive notes, and exam papers designed to <span className="text-emerald-300 font-bold">accelerate your learning</span> journey 
              and boost academic excellence.
            </motion.p>

            {/* Enhanced CTA Buttons with Better Shadows */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/browse-notes" 
                  className="group px-12 py-6 rounded-2xl bg-gradient-to-r from-teal-400 via-emerald-500 to-teal-600 text-white font-bold text-lg shadow-[0_20px_60px_rgba(16,185,129,0.4)] hover:shadow-[0_30px_80px_rgba(16,185,129,0.6)] transition-all duration-300 flex items-center justify-center gap-3 border-2 border-teal-400/50"
                >
                  <BookOpen className="w-6 h-6" />
                  Explore Notes
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/browse-papers" 
                  className="group px-12 py-6 rounded-2xl border-2 border-teal-400/70 bg-gradient-to-r from-teal-500/20 via-emerald-500/20 to-teal-500/20 backdrop-blur-xl font-bold text-lg hover:bg-gradient-to-r hover:from-teal-500/40 hover:via-emerald-500/40 hover:to-teal-500/40 hover:border-teal-300 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl"
                >
                  <FileText className="w-6 h-6" />
                  Explore Papers
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Enhanced Stats Cards with Better Layout */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-8"
            >
              <FloatingCard 
                icon={Users} 
                title="Active Users" 
                value="10K+" 
                delay={0.9}
              />
              <FloatingCard 
                icon={Download} 
                title="Downloads" 
                value="50K+" 
                delay={1.0}
              />
              <FloatingCard 
                icon={Star} 
                title="Rating" 
                value="4.9/5" 
                delay={1.1}
              />
            </motion.div>
          </div>

          {/* ENHANCED RIGHT SIDE - Larger Study Resources Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex justify-center lg:justify-end lg:w-[55%] relative"
          >
            <div className="relative w-full max-w-3xl h-[600px] flex items-center justify-center">
              {/* Central Hub - Larger Circle */}
              <motion.div
                className="relative z-10"
                animate={{ 
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {/* Main Central Circle - Larger */}
                <div className="relative">
                  {/* Enhanced Outer glow rings */}
                  <motion.div
                    className="absolute inset-0 -m-12"
                    animate={{ 
                      scale: [1, 1.15, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="w-full h-full rounded-full border-2 border-teal-400/40" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute inset-0 -m-20"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  >
                    <div className="w-full h-full rounded-full border-2 border-emerald-400/30" />
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 -m-28"
                    animate={{ 
                      scale: [1, 1.25, 1],
                      opacity: [0.15, 0.4, 0.15]
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  >
                    <div className="w-full h-full rounded-full border border-cyan-400/20" />
                  </motion.div>

                  {/* Central main circle - Larger and Enhanced */}
                  <motion.div 
                    className="relative w-52 h-52 bg-gradient-to-br from-teal-500/40 via-emerald-500/40 to-cyan-500/40 rounded-full flex items-center justify-center backdrop-blur-2xl border-4 border-teal-400/50 shadow-2xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-400/30 to-emerald-500/30 rounded-full blur-2xl" />
                    <div className="relative text-center">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <BookOpen className="w-20 h-20 text-teal-300 mx-auto mb-3 drop-shadow-lg" />
                      </motion.div>
                      <p className="text-base font-bold text-white drop-shadow-lg">Study Hub</p>
                      <p className="text-xs text-teal-200 mt-1">Central Resources</p>
                    </div>
                  </motion.div>

                  {/* Orbiting Resource Nodes - Positioned Further Out */}
                  <ResourceNode 
                    icon={FileText}
                    label="Study Notes"
                    color="from-blue-500/50 to-cyan-500/50"
                    delay={0.8}
                    position="top-0 left-1/2 -translate-x-1/2 -translate-y-40"
                    size="large"
                  />
                  
                  <ResourceNode 
                    icon={GraduationCap}
                    label="Exam Papers"
                    color="from-purple-500/50 to-pink-500/50"
                    delay={1.0}
                    position="top-1/2 right-0 translate-x-40 -translate-y-1/2"
                    size="large"
                  />
                  
                  <ResourceNode 
                    icon={Brain}
                    label="Smart Learning"
                    color="from-emerald-500/50 to-teal-500/50"
                    delay={1.2}
                    position="bottom-0 left-1/2 -translate-x-1/2 translate-y-40"
                    size="large"
                  />
                  
                  <ResourceNode 
                    icon={Target}
                    label="Study Goals"
                    color="from-amber-500/50 to-orange-500/50"
                    delay={1.4}
                    position="top-1/2 left-0 -translate-x-40 -translate-y-1/2"
                    size="large"
                  />

                  {/* Additional Smaller Resource Nodes */}
                  <ResourceNode 
                    icon={Lightbulb}
                    label="Tips"
                    color="from-yellow-500/50 to-amber-500/50"
                    delay={1.6}
                    position="top-12 right-12 translate-x-20 -translate-y-20"
                  />
                  
                  <ResourceNode 
                    icon={Rocket}
                    label="Fast Track"
                    color="from-indigo-500/50 to-purple-500/50"
                    delay={1.8}
                    position="bottom-12 left-12 -translate-x-20 translate-y-20"
                  />

                  {/* Enhanced Connecting Lines - SVG */}
                  <svg className="absolute inset-0 -m-48 w-[calc(100%+384px)] h-[calc(100%+384px)] pointer-events-none">
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(16, 185, 129, 0.5)" />
                        <stop offset="50%" stopColor="rgba(6, 182, 212, 0.5)" />
                        <stop offset="100%" stopColor="rgba(16, 185, 129, 0.5)" />
                      </linearGradient>
                      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(139, 92, 246, 0.4)" />
                        <stop offset="100%" stopColor="rgba(16, 185, 129, 0.4)" />
                      </linearGradient>
                    </defs>
                    
                    {/* Primary orbit circle */}
                    <motion.circle
                      cx="50%"
                      cy="50%"
                      r="190"
                      fill="none"
                      stroke="url(#gradient1)"
                      strokeWidth="3"
                      strokeDasharray="12,8"
                      animate={{ 
                        rotate: [0, 360],
                        strokeDashoffset: [0, -20]
                      }}
                      transition={{ 
                        rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                        strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear" }
                      }}
                      style={{ transformOrigin: 'center' }}
                    />
                    
                    {/* Secondary orbit circle */}
                    <motion.circle
                      cx="50%"
                      cy="50%"
                      r="140"
                      fill="none"
                      stroke="url(#gradient2)"
                      strokeWidth="2"
                      strokeDasharray="8,12"
                      animate={{ 
                        rotate: [360, 0],
                        strokeDashoffset: [0, 20]
                      }}
                      transition={{ 
                        rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                        strokeDashoffset: { duration: 4, repeat: Infinity, ease: "linear" }
                      }}
                      style={{ transformOrigin: 'center' }}
                    />
                  </svg>
                </div>
              </motion.div>

              {/* Enhanced Floating Geometric Shapes - Larger */}
              <motion.div
                className="absolute top-10 right-10"
                animate={{ 
                  y: [-25, 25, -25],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-teal-400/30 to-emerald-500/30 backdrop-blur-md border-2 border-teal-400/40 flex items-center justify-center shadow-2xl" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}>
                  <Zap className="w-10 h-10 text-teal-300 drop-shadow-lg" />
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-10 left-10"
                animate={{ 
                  y: [25, -25, 25],
                  rotate: [360, 180, 0]
                }}
                transition={{ 
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400/30 to-pink-500/30 backdrop-blur-md border-2 border-purple-400/40 shadow-2xl" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}>
                  <div className="w-full h-full flex items-center justify-center pt-6">
                    <Award className="w-10 h-10 text-purple-300 drop-shadow-lg" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/4 right-5"
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 90, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-xl backdrop-blur-md border-2 border-cyan-400/40 flex items-center justify-center shadow-2xl">
                  <Star className="w-8 h-8 text-cyan-300 drop-shadow-lg" />
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-1/4 left-5"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, -90, 0]
                }}
                transition={{ 
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-rose-400/30 to-red-500/30 rounded-full backdrop-blur-md border-2 border-rose-400/40 flex items-center justify-center shadow-2xl">
                  <TrendingUp className="w-7 h-7 text-rose-300 drop-shadow-lg" />
                </div>
              </motion.div>

              {/* Enhanced Background Gradient Orbs - Larger */}
              <motion.div
                className="absolute top-20 left-20 w-48 h-48 bg-gradient-to-br from-teal-400/15 to-emerald-500/15 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{ 
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div
                className="absolute bottom-20 right-20 w-56 h-56 bg-gradient-to-tr from-purple-400/15 to-pink-500/15 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ 
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />

              <motion.div
                className="absolute top-1/2 right-1/4 w-40 h-40 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.6, 1],
                  opacity: [0.2, 0.6, 0.2]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection;