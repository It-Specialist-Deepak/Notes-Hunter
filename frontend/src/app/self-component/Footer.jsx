"use client"

import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { 
  BookOpen, 
  Mail, 
  MapPin, 
  Phone, 
  ArrowRight,
  Heart,
  Sparkles
} from "lucide-react";
import Link from "next/link";

// Floating particle animation
const FloatingParticle = ({ delay, duration, position }) => (
  <motion.div
    className="absolute w-1.5 h-1.5 bg-teal-400/40 rounded-full"
    style={{ left: position.x, top: position.y }}
    animate={{
      y: [0, -20, 0],
      opacity: [0, 0.6, 0],
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

// Social icon component with animation
const SocialIcon = ({ Icon, href, hoverColor, delay }) => (
  <motion.li
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, delay }}
  >
    <motion.a
      href={href}
      whileHover={{ scale: 1.15, y: -3 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm text-white border border-white/20 ${hoverColor} transition-all duration-300 shadow-lg hover:shadow-xl`}
    >
      <Icon size={18} />
    </motion.a>
  </motion.li>
);

// Footer link component with animation
const FooterLink = ({ href, children, delay }) => (
  <motion.li
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, delay }}
  >
    <Link
      href={href}
      className="group flex justify-center md:justify-start items-center gap-2 text-gray-400 hover:text-teal-400 transition-colors duration-300"
      whileHover={{ x: 5 }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-teal-400/0 group-hover:bg-teal-400 transition-colors duration-300" />
      {children}
    </Link>
  </motion.li>
);

// Section heading component
const SectionHeading = ({ children, delay }) => (
  <motion.h5
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="mb-4 text-lg font-bold text-white"
  >
    {children}
  </motion.h5>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient orbs */}
        <motion.div
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-teal-500/10 to-transparent rounded-full blur-3xl"
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
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-emerald-500/10 to-transparent rounded-full blur-3xl"
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
        {[...Array(10)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.5}
            duration={5 + Math.random() * 3}
            position={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%` }}
          />
        ))}

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-20">
        
       

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Column 1 - Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 text-center md:text-left"
          >
            <motion.div
              className="flex items-center justify-center md:justify-start gap-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                Notes Hunter
              </h2>
            </motion.div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering students and educators to share knowledge through our digital platform. 
              Join our community and discover valuable study materials from around the world.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <motion.div 
                className="flex items-center justify-center md:justify-start gap-3 text-gray-400"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-4 h-4 text-teal-400" />
                <span className="text-sm">contact@noteshunter.com</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center md:justify-start gap-3 text-gray-400"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-4 h-4 text-teal-400" />
                <span className="text-sm">+91 8449011426</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center md:justify-start gap-3 text-gray-400"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-4 h-4 text-teal-400" />
                <span className="text-sm">India</span>
              </motion.div>
            </div>

            <SectionHeading delay={0.2}>Follow Us</SectionHeading>
            <ul className="flex justify-center md:justify-start gap-3">
              <SocialIcon Icon={FaFacebookF} href="#" hoverColor="hover:bg-blue-600" delay={0.3} />
              <SocialIcon Icon={FaTwitter} href="#" hoverColor="hover:bg-blue-400" delay={0.35} />
              <SocialIcon Icon={FaLinkedinIn} href="#" hoverColor="hover:bg-blue-700" delay={0.4} />
              <SocialIcon Icon={FaInstagram} href="#" hoverColor="hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500" delay={0.45} />
            </ul>
          </motion.div>

          {/* Column 2 - Notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 text-center md:text-left"
          >
            <SectionHeading delay={0.2}>Notes</SectionHeading>
            <ul className="space-y-3">
              <FooterLink href="/browse-notes" delay={0.25}>Browse Collection</FooterLink>
              <FooterLink href="/notes-collection" delay={0.3}>Categories</FooterLink>
             
            </ul>
          </motion.div>

          {/* Column 3 - Papers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 text-center md:text-left"
          >
            <SectionHeading delay={0.3}>Previous Year Papers</SectionHeading>
            <ul className="space-y-3">
              <FooterLink href="/browse-papers" delay={0.35}>Browse Papers</FooterLink>
              <FooterLink href="/papers-collection" delay={0.4}>Collection</FooterLink>
              
            </ul>
          </motion.div>

          {/* Column 4 - Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 text-center md:text-left"
          >
            <SectionHeading delay={0.4}><Link href="/docs">Courses</Link></SectionHeading>
            <SectionHeading delay={0.4}><Link href="/docs">About Us</Link></SectionHeading>
            <SectionHeading delay={0.4}><Link href="/docs">Blogs</Link></SectionHeading>
            {/* <ul className="space-y-3">
              <FooterLink href="#!" delay={0.45}>About Us</FooterLink>
              <FooterLink href="#!" delay={0.5}>Courses</FooterLink>
              <FooterLink href="#!" delay={0.55}>Blog</FooterLink>
              <FooterLink href="#!" delay={0.6}>Contact</FooterLink>
            </ul> */}
          </motion.div>

          {/* Column 5 - Support */}
          
        </div>

        {/* Divider with gradient */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent mb-8"
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left"
        >
          <p className="text-gray-400 text-sm flex items-center gap-2 justify-center">
            &copy; {currentYear} Notes Hunter. Made with 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </motion.span>
            in India. All rights reserved.
          </p>
          
          <ul className="flex gap-6 justify-center md:justify-end">
            {["Privacy", "Security", "Terms"].map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              >
                <motion.a
                  href="#!"
                  className="text-gray-400 hover:text-teal-400 transition-colors duration-300 text-sm font-medium"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Bottom decorative gradient line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.7 }}
        className="h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500"
      />
    </footer>
  );
}