"use client"
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

export default function AboutUs() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div ref={containerRef} className="bg-slate-900 min-h-screen">
      {/* Hero Section */}
      <motion.section 
        style={{ opacity, scale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950"
      >
        {/* Decorative Background Elements */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-20 w-64 h-64 border-2 border-teal-500/20 rounded-full opacity-40"
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 left-20 w-80 h-80 border-2 border-emerald-500/20 rounded-full opacity-40"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-8xl md:text-9xl font-bold mb-6 tracking-tight drop-shadow-2xl"
              style={{
                fontFamily: "'Playfair Display', serif",
                background: "linear-gradient(135deg, #14b8a6, #10b981, #34d399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 40px rgba(20, 184, 166, 0.5))"
              }}
            >
              Notes Hunter
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-2xl md:text-3xl text-slate-300 max-w-3xl mx-auto mb-8"
            style={{ fontFamily: "'Crimson Pro', serif" }}
          >
            Empowering students with knowledge, one note at a time
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="inline-block px-8 py-3 border-2 border-emerald-500 text-emerald-400 font-semibold rounded-full shadow-lg shadow-emerald-500/50">
              Since 2025
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-slate-400 rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Mission Section */}
      <Section>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeInWhenVisible>
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative z-10 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-3xl p-12 shadow-2xl shadow-teal-500/50"
              >
                <h2 className="text-6xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Our Mission
                </h2>
                <div className="w-20 h-1 bg-white mb-6"></div>
              </motion.div>
              <motion.div
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -right-6 w-64 h-64 bg-emerald-500/20 rounded-3xl border border-emerald-500/30 z-0"
              />
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.2}>
            <div>
              <p className="text-xl text-slate-300 mb-6 leading-relaxed" style={{ fontFamily: "'Crimson Pro', serif" }}>
                At Notes Hunter, we believe education should be accessible to everyone. We're on a mission to democratize learning by providing high-quality study materials, notes, and resources to students across all disciplines.
              </p>
              <p className="text-xl text-slate-300 leading-relaxed" style={{ fontFamily: "'Crimson Pro', serif" }}>
                Our platform bridges the gap between struggling students and academic success, making quality education materials available at the click of a button.
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </Section>

      {/* Stats Section */}
      <Section bg="bg-slate-950">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-bold text-slate-100 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Our Impact
          </h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto shadow-lg shadow-emerald-500/50"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <StatCard number="50K+" label="Active Students" delay={0} />
          <StatCard number="10K+" label="Study Resources" delay={0.2} />
          <StatCard number="100+" label="Universities" delay={0.4} />
        </div>
      </Section>

      {/* Values Section */}
      <Section>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-bold text-slate-100 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            What We Stand For
          </h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto shadow-lg shadow-emerald-500/50"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <ValueCard
            icon="🎯"
            title="Quality First"
            description="Every resource is carefully curated and verified to ensure accuracy and relevance."
            delay={0}
          />
          <ValueCard
            icon="🤝"
            title="Community Driven"
            description="Built by students, for students. We foster a collaborative learning environment."
            delay={0.2}
          />
          <ValueCard
            icon="🚀"
            title="Innovation"
            description="Constantly evolving with new technologies to enhance the learning experience."
            delay={0.4}
          />
        </div>
      </Section>

      {/* Story Section */}
      <Section bg="bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto">
          <FadeInWhenVisible>
            <h2 className="text-6xl font-bold mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Story
            </h2>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.2}>
            <div className="space-y-6 text-lg leading-relaxed" style={{ fontFamily: "'Crimson Pro', serif" }}>
              <p className="text-slate-300">
                Notes Hunter was born from a simple frustration: finding quality study materials shouldn't be this hard. Founded by a group of university students who spent countless hours searching for reliable notes and resources, we decided to create the solution we wished existed.
              </p>
              <p className="text-slate-300">
                What started as a small collection of shared notes among friends has grown into a thriving community of knowledge seekers and sharers. Today, thousands of students rely on Notes Hunter to excel in their academic journey.
              </p>
              <p className="text-slate-300">
                We're not just a platform—we're a movement towards accessible, collaborative, and effective learning. Every day, we work to break down barriers to education and help students reach their full potential.
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </Section>

  
    </div>
  );
}

// Reusable Components
function Section({ children, bg = "bg-slate-900" }) {
  return (
    <section className={`${bg} py-24 px-6`}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}

function FadeInWhenVisible({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
}

function StatCard({ number, label, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, rotate: 2 }}
      className="bg-slate-800 rounded-2xl p-10 shadow-xl shadow-teal-500/20 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all border border-slate-700"
    >
      <div className="text-6xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
        {number}
      </div>
      <div className="text-xl text-slate-300 font-medium">{label}</div>
    </motion.div>
  );
}

function ValueCard({ icon, title, description, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10 }}
      className="group"
    >
      <div className="bg-slate-800 rounded-2xl p-8 shadow-lg shadow-teal-500/10 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all h-full border-2 border-slate-700 hover:border-emerald-500/50">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 0.6 }}
          className="text-6xl mb-6"
        >
          {icon}
        </motion.div>
        <h3 className="text-2xl font-bold text-slate-100 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          {title}
        </h3>
        <p className="text-slate-300 leading-relaxed" style={{ fontFamily: "'Crimson Pro', serif" }}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}