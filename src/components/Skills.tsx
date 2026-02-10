"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import SectionWrapper from "./SectionWrapper";

interface SkillCategory {
  name: string;
  icon: string;
  skills: { name: string; level: number }[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Languages & Backend",
    icon: "{ }",
    skills: [
      { name: "C# / .NET Core", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Python", level: 75 },
      { name: "SQL", level: 90 },
      { name: "Solidity", level: 45 },
    ],
  },
  {
    name: "Cloud & Infrastructure",
    icon: ">>>",
    skills: [
      { name: "Azure Functions", level: 95 },
      { name: "Azure Service Bus", level: 90 },
      { name: "Azure Logic Apps", level: 90 },
      { name: "Cosmos DB / SQL", level: 85 },
      { name: "Datadog / App Insights", level: 85 },
    ],
  },
  {
    name: "Frontend & Mobile",
    icon: "</>",
    skills: [
      { name: "React / Next.js", level: 80 },
      { name: "Angular", level: 75 },
      { name: "React Native / Expo", level: 70 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Framer Motion", level: 65 },
    ],
  },
  {
    name: "Product & Process",
    icon: "PM",
    skills: [
      { name: "End-to-End Ownership", level: 95 },
      { name: "Incident Response / RCA", level: 90 },
      { name: "Customer Discovery", level: 85 },
      { name: "Sprint Planning / Agile", level: 85 },
      { name: "Stakeholder Communication", level: 90 },
    ],
  },
  {
    name: "AI & Emerging Tech",
    icon: "AI",
    skills: [
      { name: "LLM Integration / Prompting", level: 80 },
      { name: "AI-Assisted Development", level: 85 },
      { name: "NLP / Classification", level: 65 },
      { name: "Smart Contracts (EVM)", level: 50 },
      { name: "Decentralized Systems", level: 60 },
    ],
  },
  {
    name: "DevOps & Tooling",
    icon: "OPS",
    skills: [
      { name: "Azure DevOps / CI/CD", level: 85 },
      { name: "Git / GitHub", level: 90 },
      { name: "REST API Design", level: 95 },
      { name: "Event-Driven Architecture", level: 90 },
      { name: "Supabase / Firebase", level: 70 },
    ],
  },
];

/* ===== CREATIVE: Animated skill bars ===== */
function CreativeSkillCard({ category, index }: { category: SkillCategory; index: number }) {
  return (
    <motion.div
      className="p-6 rounded-2xl border border-border-default bg-bg-card glow-hover"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -3 }}
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="w-10 h-10 rounded-lg bg-accent-primary/10 text-accent-primary flex items-center justify-center text-xs font-mono font-bold">
          {category.icon}
        </span>
        <h3 className="text-lg font-bold text-text-primary">{category.name}</h3>
      </div>
      <div className="space-y-3">
        {category.skills.map((skill, i) => (
          <div key={skill.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-text-secondary">{skill.name}</span>
              <span className="text-xs font-mono text-text-muted">{skill.level}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-bg-secondary overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))`,
                }}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ===== CORPORATE: Clean list layout ===== */
function CorporateSkillCategory({ category }: { category: SkillCategory }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-text-primary mb-2">{category.name}</h3>
      <div className="flex flex-wrap gap-1.5">
        {category.skills.map((skill) => (
          <span
            key={skill.name}
            className="px-2.5 py-1 text-xs rounded-md bg-bg-secondary border border-border-default text-text-secondary"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { isCreative } = useTheme();

  if (!isCreative) {
    return (
      <SectionWrapper id="skills" className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((cat) => (
              <CorporateSkillCategory key={cat.name} category={cat} />
            ))}
          </div>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="skills" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ letterSpacing: "var(--letter-spacing-heading)" }}>
            <span className="gradient-text">The Toolbox</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            7+ years of tools, frameworks, and hard-won expertise. These are the things I reach for.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, index) => (
            <CreativeSkillCard key={cat.name} category={cat} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
