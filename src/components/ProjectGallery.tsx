"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import SectionWrapper from "./SectionWrapper";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string;
  icon: string;
  liveUrl?: string;
  caseStudy: {
    problem: string;
    approach: string;
    outcome: string;
    stack: string[];
  };
}

const projects: Project[] = [
  {
    id: "matte",
    title: "Matte",
    subtitle: "A Small Painter OS",
    description: "A creative tool designed for painters — simple, focused, and built to stay out of the way.",
    tags: ["Design Tool", "Creative", "Side Project"],
    color: "#A855F7",
    icon: "🎨",
    liveUrl: "https://matte.biz/",
    caseStudy: {
      problem: "Digital painting tools are bloated with features most painters never use. The creative process needs a focused environment, not a feature war.",
      approach: "Built a minimal, opinionated painting OS that prioritizes the canvas. Focused on speed, intuitive gestures, and a distraction-free workspace.",
      outcome: "Working product with a small but passionate user base. Proved that less really is more in creative tooling.",
      stack: ["React", "Canvas API", "TypeScript"],
    },
  },
  {
    id: "ontheclockmock",
    title: "OnTheClockMock",
    subtitle: "NFL Mock Draft Tool",
    description: "A real-time mock draft simulator that lets you play GM. Make picks, trade up, and see how your draft plays out.",
    tags: ["Sports", "Interactive", "Side Project"],
    color: "#0EA5E9",
    icon: "🏈",
    liveUrl: "https://ontheclock.xyz/",
    caseStudy: {
      problem: "Existing mock draft tools are static lists. Real drafts are dynamic — trades happen, boards shift, and you need to react in real time.",
      approach: "Built an interactive draft simulator with real-time pick logic, trade mechanics, and team need analysis. Focused on making it feel like draft night.",
      outcome: "Engaging tool that captures the drama of draft day. Users can run multiple scenarios and share results.",
      stack: ["Next.js", "TypeScript", "Real-time Logic"],
    },
  },
  {
    id: "lockin",
    title: "Lock In",
    subtitle: "Fantasy Football Meets Fitness",
    description: "Head-to-head fitness matchups that make workouts sticky through competition and accountability.",
    tags: ["Mobile", "Fitness", "Expo"],
    color: "#10B981",
    icon: "💪",
    caseStudy: {
      problem: "Fitness apps rely on willpower. Fantasy football thrives on competition. What if working out felt like a weekly matchup you couldn't afford to lose?",
      approach: "Built a React Native app with weekly H2H scoring, league admin, and social accountability. Started with manual entry, building toward device integrations.",
      outcome: "Working prototype with league functionality. Validating that competition drives consistency better than streaks or badges.",
      stack: ["React Native", "Expo", "Supabase", "Edge Functions"],
    },
  },
  {
    id: "fleetconnex",
    title: "FleetConnex",
    subtitle: "Enterprise Telematics Platform",
    description: "Mission-critical integration platform processing 5M+ messages daily for enterprise trucking and logistics.",
    tags: ["Enterprise", "Cloud", "Trimble"],
    color: "#FF6B35",
    icon: "🚛",
    caseStudy: {
      problem: "Enterprise fleets need reliable, real-time data flowing between vehicles, drivers, and back-office systems. Downtime costs real money.",
      approach: "Owned the entire platform as sole engineer — architecture, development, deployment, customer support, and incident response. Built robust Azure-based services for mission-critical reliability.",
      outcome: "Processed 5M+ daily messages in a 24/7 production environment. Managed customer migrations, cut Azure costs, and maintained 99.9%+ uptime as the sole owner.",
      stack: ["C#", ".NET Core", "Azure Functions", "Logic Apps", "Angular", "SQL"],
    },
  },
  {
    id: "fleethub",
    title: "FleetHub",
    subtitle: "Next-Gen Fleet Platform",
    description: "Trimble's next-generation fleet management platform — scalable, observable, and built for the future.",
    tags: ["Enterprise", "Cloud", "Trimble"],
    color: "#F97316",
    icon: "⚡",
    caseStudy: {
      problem: "FleetConnex was battle-tested but aging. The industry needed a modern, scalable platform with better observability and vendor integration capabilities.",
      approach: "Contributed to architecture and design. Led the Isaac tablet integration end-to-end — defining schemas, coordinating with Isaac's team, and onboarding production users.",
      outcome: "Successfully launched with improved scalability and observability using Azure Functions, Service Bus, and Datadog. Smooth vendor integrations and customer onboarding.",
      stack: ["C#", ".NET", "Azure", "Service Bus", "Datadog", "TypeScript"],
    },
  },
];

/* ===== CREATIVE MODE CARD ===== */
function CreativeProjectCard({ project, index }: { project: Project; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        className="relative rounded-2xl border border-border-default bg-bg-card overflow-hidden cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={
          { y: -4, scale: 1.01, boxShadow: `0 8px 40px rgba(0,0,0,0.4), 0 0 40px ${project.color}20` }
        }
        style={{
          boxShadow: `0 4px 24px rgba(0,0,0,0.3)`,
        }}
      >
        {/* Project header/preview */}
        <div className="relative p-6 md:p-8">
          {/* Color accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1 opacity-80"
            style={{ background: project.color }}
          />

          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-3xl mb-2 block">{project.icon}</span>
              <h3 className="text-xl md:text-2xl font-bold text-text-primary">{project.title}</h3>
              <p className="text-sm text-text-muted font-medium">{project.subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-all hover:brightness-110"
                  style={{ background: project.color }}
                >
                  Visit Live
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              )}
              <motion.div
                className="w-8 h-8 rounded-full border border-border-default flex items-center justify-center text-text-muted"
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </motion.div>
            </div>
          </div>

          <p className="text-text-secondary text-sm leading-relaxed mb-4">{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium rounded-full border border-border-default text-text-muted bg-bg-secondary/50"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Placeholder image area */}
          <div
            className="mt-6 rounded-xl h-44 md:h-56 flex items-center justify-center border border-border-default"
            style={{
              background: `linear-gradient(135deg, ${project.color}10, ${project.color}05)`,
            }}
          >
            <div className="text-center">
              <span className="text-5xl block mb-2">{project.icon}</span>
              <span className="text-xs text-text-muted">Screenshot coming soon</span>
            </div>
          </div>
        </div>

        {/* Expandable case study */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-border-default pt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-4">
                  // Case Study
                </h4>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-bold mb-1" style={{ color: project.color }}>The Problem</h5>
                    <p className="text-sm text-text-secondary leading-relaxed">{project.caseStudy.problem}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold mb-1" style={{ color: project.color }}>The Approach</h5>
                    <p className="text-sm text-text-secondary leading-relaxed">{project.caseStudy.approach}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold mb-1" style={{ color: project.color }}>The Outcome</h5>
                    <p className="text-sm text-text-secondary leading-relaxed">{project.caseStudy.outcome}</p>
                  </div>
                </div>

                {/* Tech stack */}
                <div className="mt-6 pt-4 border-t border-border-default">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">Tech Stack</h5>
                  <div className="flex flex-wrap gap-2">
                    {project.caseStudy.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-mono font-medium rounded-md border text-text-primary"
                        style={{
                          borderColor: `${project.color}30`,
                          background: `${project.color}08`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ===== CORPORATE MODE LIST ===== */
function CorporateProjectRow({ project }: { project: Project }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-border-default last:border-b-0">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full py-5 px-1 flex items-center justify-between text-left hover:bg-bg-card-hover/50 transition-colors"
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-base font-semibold text-text-primary">{project.title}</h3>
              <span className="text-sm text-text-muted">— {project.subtitle}</span>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-xs font-medium text-accent-secondary hover:underline"
                >
                  View Live
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {project.caseStudy.stack.map((tech) => (
                <span key={tech} className="text-xs text-text-muted">{tech}</span>
              ))}
            </div>
          </div>
        </div>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`text-text-muted shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {isExpanded && (
        <div className="px-1 pb-5 space-y-3">
          <p className="text-sm text-text-secondary">{project.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold text-text-primary mb-1">Problem</p>
              <p className="text-text-secondary text-xs leading-relaxed">{project.caseStudy.problem}</p>
            </div>
            <div>
              <p className="font-semibold text-text-primary mb-1">Approach</p>
              <p className="text-text-secondary text-xs leading-relaxed">{project.caseStudy.approach}</p>
            </div>
            <div>
              <p className="font-semibold text-text-primary mb-1">Outcome</p>
              <p className="text-text-secondary text-xs leading-relaxed">{project.caseStudy.outcome}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectGallery() {
  const { isCreative } = useTheme();

  if (!isCreative) {
    return (
      <SectionWrapper id="work" className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-text-primary mb-1">Portfolio</h2>
          <p className="text-sm text-text-muted mb-8">Select a project to expand details.</p>
          <div className="border-t border-border-default rounded-lg bg-bg-card">
            {projects.map((project) => (
              <CorporateProjectRow key={project.id} project={project} />
            ))}
          </div>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="work" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ letterSpacing: "var(--letter-spacing-heading)" }}>
            <span className="gradient-text">Selected Work</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            From enterprise platforms to weekend builds. Click any project to see the story.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <CreativeProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
