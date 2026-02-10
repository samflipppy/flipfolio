"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import SectionWrapper from "./SectionWrapper";

const timeline = [
  {
    year: "2015",
    title: "John Carroll University",
    description: "Started pursuing a triple degree — B.S. Computer Science, B.A. Sociology, and an Associate's in Data Science. Where the foundation was built.",
    tag: "Education",
  },
  {
    year: "2017",
    title: "Fell Down the Crypto Rabbit Hole",
    description: "Mined Stellar on a gaming laptop, started accumulating BTC/ETH. Learned wallet hygiene, self-custody, and how decentralized systems actually work under the hood.",
    tag: "Crypto",
  },
  {
    year: "2018",
    title: "MRI Software — First Real Code",
    description: "Internship building internal tools with Angular and SQL. Learned what production code actually looks like from senior engineers.",
    tag: "Internship",
  },
  {
    year: "2019",
    title: "Joined Trimble",
    description: "Started as a software engineer building cloud-based integration platforms. Quickly became the go-to person for FleetConnex — processing 5M+ messages daily.",
    tag: "Career",
  },
  {
    year: "2021",
    title: "DeFi Deep Dive & NFT Builds",
    description: "Active in yield strategies, LP/staking/farming. Built an Ethereum smart contract for an influencer PFP project end-to-end. Learned smart contract development the hard way.",
    tag: "Crypto",
  },
  {
    year: "2022",
    title: "Sole Owner of FleetConnex",
    description: "Became the sole developer, PM, and customer support for a mission-critical platform. Owned everything from Azure infrastructure to customer calls.",
    tag: "Career",
  },
  {
    year: "2024",
    title: "FleetHub & New Ventures",
    description: "Led vendor integrations for Trimble's next-gen platform. Started Lake Effect Labs with friends — a micro software agency to build and ship fast.",
    tag: "Career",
  },
  {
    year: "2025",
    title: "Independent Builder",
    description: "Went independent. Building Matte, Lock In, OnTheClockMock, and more. Exploring World Mobile nodes and decentralized telecom. Shipping on my own terms.",
    tag: "Now",
  },
];

const tagColors: Record<string, string> = {
  Education: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Crypto: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Internship: "bg-green-500/10 text-green-400 border-green-500/20",
  Career: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Now: "bg-red-500/10 text-red-400 border-red-500/20",
};

const corporateTagColors: Record<string, string> = {
  Education: "bg-blue-50 text-blue-700 border-blue-200",
  Crypto: "bg-purple-50 text-purple-700 border-purple-200",
  Internship: "bg-green-50 text-green-700 border-green-200",
  Career: "bg-orange-50 text-orange-700 border-orange-200",
  Now: "bg-red-50 text-red-700 border-red-200",
};

export default function Journey() {
  const { isCreative } = useTheme();

  return (
    <SectionWrapper id="journey" className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ letterSpacing: "var(--letter-spacing-heading)" }}>
            {isCreative ? (
              <span className="gradient-text">The Journey</span>
            ) : (
              "Professional Timeline"
            )}
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            {isCreative
              ? "From mining crypto on a laptop to owning enterprise platforms. Here's how I got here."
              : "A chronological overview of my education and career progression."}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border-default md:-translate-x-px" />

          {timeline.map((item, index) => (
            <motion.div
              key={item.year + item.title}
              className={`relative flex flex-col md:flex-row items-start mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Dot on line */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-accent-primary -translate-x-1.5 mt-6 z-10 ring-4 ring-bg-primary" />

              {/* Year label */}
              <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"} pl-10 md:pl-0`}>
                <span className="text-sm font-mono font-bold text-accent-primary">{item.year}</span>
              </div>

              {/* Content card */}
              <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12 md:text-right"} pl-10 md:pl-0`}>
                <motion.div
                  className="p-5 rounded-xl bg-bg-card border border-border-default hover:border-border-hover transition-all group"
                  whileHover={isCreative ? { scale: 1.02, y: -2 } : {}}
                >
                  <div className={`flex items-center gap-2 mb-2 ${index % 2 !== 0 ? "md:justify-end" : ""}`}>
                    <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full border ${
                      isCreative ? tagColors[item.tag] : corporateTagColors[item.tag]
                    }`}>
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-1">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
