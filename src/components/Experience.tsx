"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import SectionWrapper from "./SectionWrapper";

const experiences = [
  {
    company: "Independent",
    role: "Independent Software Engineer",
    period: "November 2025 – Present",
    current: true,
    description: "Building products independently through Lake Effect Labs — a micro software agency I co-founded to ship fast.",
    highlights: [
      "Co-founded Lake Effect Labs with a team of 4 to build and iterate on side projects",
      "Built a backend media-processing pipeline using speech-to-text, NLP, and LLM classification",
      "Shipping Matte, Lock In, OnTheClockMock, and exploring decentralized telecom with World Mobile",
      "Using AI-assisted development workflows to accelerate design and delivery",
    ],
    skills: ["Next.js", "React Native", "Supabase", "Python", "LLMs", "Expo"],
  },
  {
    company: "Trimble Inc.",
    role: "Senior Software Engineer",
    period: "May 2019 – November 2025",
    current: false,
    description: "Owned and operated mission-critical telematics platforms in a 24/7 production environment. Evolved from engineer to sole product owner.",
    highlights: [
      "Owned FleetConnex end-to-end as sole developer, PM, and customer support — processing 5M+ messages daily",
      "Led the Isaac tablet integration for FleetHub, working directly with vendor engineering and customers",
      "Contributed to FleetHub architecture using Azure Functions, Service Bus, and Datadog",
      "Managed customer migrations from legacy to next-gen platforms with minimal disruption",
      "Primary escalation point for production incidents — diagnosing issues and coordinating fixes",
      "Drove incident → RCA → backlog loop; facilitated trade-off calls to ship smallest viable fix first",
    ],
    skills: ["C#", ".NET Core", "Azure", "Angular", "TypeScript", "SQL", "Datadog"],
  },
  {
    company: "MRI Software",
    role: "Software Development Intern",
    period: "May 2018 – September 2018",
    current: false,
    description: "First real engineering role. Built internal tools and learned production code practices from senior engineers.",
    highlights: [
      "Developed an internal tool using Angular and SQL-backed APIs to automate data management",
      "Improved productivity and reduced manual overhead for internal teams",
      "Learned software architecture, testing, and documentation best practices",
    ],
    skills: ["Angular", "SQL", "APIs", "TypeScript"],
  },
];

export default function Experience() {
  const { isCreative } = useTheme();

  return (
    <SectionWrapper id="experience" className="py-24 md:py-32">
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
              <span className="gradient-text">Where I've Worked</span>
            ) : (
              "Professional Experience"
            )}
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            {isCreative
              ? "From intern to sole product owner. Each role taught me something different about building things that last."
              : "A detailed overview of my professional experience and key contributions."}
          </p>
        </motion.div>

        {/* Experience cards */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company + exp.role}
              className="relative rounded-2xl border border-border-default bg-bg-card p-6 md:p-8 overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={isCreative ? { y: -2 } : {}}
            >
              {/* Current indicator */}
              {exp.current && (
                <div className="absolute top-0 right-0">
                  <div className="bg-accent-primary text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                    Current
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-text-primary">{exp.role}</h3>
                  <p className="text-accent-primary font-semibold">{exp.company}</p>
                </div>
                <span className="text-sm font-mono text-text-muted whitespace-nowrap">{exp.period}</span>
              </div>

              {/* Description */}
              <p className="text-text-secondary leading-relaxed mb-6">{exp.description}</p>

              {/* Highlights */}
              <div className="space-y-3 mb-6">
                {exp.highlights.map((highlight, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-primary shrink-0" />
                    <span className="text-sm text-text-secondary leading-relaxed">{highlight}</span>
                  </motion.div>
                ))}
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-border-default">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs font-mono font-medium rounded-md bg-bg-secondary border border-border-default text-text-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          className="mt-12 rounded-2xl border border-border-default bg-bg-card p-6 md:p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-text-primary mb-2">
            {isCreative ? "🎓 Education" : "Education"}
          </h3>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-accent-primary font-semibold">John Carroll University</p>
              <p className="text-sm text-text-secondary">B.S. Computer Science | B.A. Sociology | Associate&apos;s in Data Science</p>
            </div>
            <span className="text-sm font-mono text-text-muted mt-2 md:mt-0">2015 – 2019</span>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
