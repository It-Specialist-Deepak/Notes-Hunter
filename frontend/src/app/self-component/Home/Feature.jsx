"use client";

import React from "react";
import PropTypes from "prop-types";
import {
  FaFileAlt,
  FaBookOpen,
  FaGraduationCap,
  FaClipboardCheck,
  FaCloudDownloadAlt,
  FaUsers,
} from "react-icons/fa";

const features = [
  {
    icon: FaFileAlt,
    title: "Previous Year Papers",
    description:
      "Access a well-organized collection of previous year question papers to understand exam patterns and practice effectively.",
  },
  {
    icon: FaBookOpen,
    title: "Study Notes",
    description:
      "High-quality notes prepared by toppers and educators, simplified for quick revision and deep understanding.",
  },
  {
    icon: FaGraduationCap,
    title: "Courses & Tutorials",
    description:
      "Structured courses and video tutorials designed to strengthen concepts from basics to advanced levels.",
  },
  {
    icon: FaClipboardCheck,
    title: "Exam-Oriented Content",
    description:
      "Content curated strictly according to university and competitive exam syllabi for maximum relevance.",
  },
  {
    icon: FaCloudDownloadAlt,
    title: "Easy Downloads",
    description:
      "Download papers, notes, and resources instantly in PDF format for offline study anytime, anywhere.",
  },
  {
    icon: FaUsers,
    title: "Student Community",
    description:
      "Learn together with a growing community of students—share notes, tips, and exam experiences.",
  },
];


const FeatureItem = ({ feature }) => {
  const Icon = feature.icon;

  return (
    <div className="flex h-full rounded-xl bg-gray-800 p-6 shadow transition hover:-translate-y-1 hover:shadow-lg dark:bg-[#1E2735] dark:shadow-none">
      <div className="flex h-12 w-12 min-w-[48px] items-center justify-center rounded-full bg-teal-500 text-white">
        <Icon size={22} />
      </div>

      <div className="ml-4">
        <h4 className="mb-3 text-xl font-bold text-white">{feature.title}</h4>
        <p className="text-gray-200 dark:text-gray-300">
          {feature.description}
        </p>
      </div>
    </div>
  );
};

FeatureItem.propTypes = {
  feature: PropTypes.shape({
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

const Feature = () => {
  return (
    <section className="bg-gradient-to-br 
from-[#081a2d] 
via-[#0b3a4a] 
to-[#061622] py-14 text-zinc-900 dark:bg-[#0b1727] dark:text-white md:py-24">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-5xl text-teal-600">
            Our Features
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400 dark:text-gray-300">
            May air to male replenish above to unto were kind. Seed. Air for.
            Days. Isn't itself created green darkness fill.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureItem key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
