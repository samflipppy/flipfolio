"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import SectionWrapper from "./SectionWrapper";

interface StickyNote {
  id: string;
  content: string;
  color: string;
  rotation: number;
  x: number;
  y: number;
}

const initialNotes: StickyNote[] = [
  {
    id: "1",
    content: "What if fitness apps had fantasy sports scoring? 🏋️",
    color: "sticky-yellow",
    rotation: -3,
    x: 0,
    y: 0,
  },
  {
    id: "2",
    content: "Decentralized telecom is the next frontier. World Mobile is onto something.",
    color: "sticky-blue",
    rotation: 2,
    x: 0,
    y: 0,
  },
  {
    id: "3",
    content: "Build things you'd actually use. That's the whole philosophy.",
    color: "sticky-pink",
    rotation: -1,
    x: 0,
    y: 0,
  },
  {
    id: "4",
    content: "AI-assisted development isn't replacing engineers — it's making us 10x faster at the boring parts.",
    color: "sticky-green",
    rotation: 4,
    x: 0,
    y: 0,
  },
  {
    id: "5",
    content: "The best PM I've ever worked with was the customer support inbox.",
    color: "sticky-purple",
    rotation: -2,
    x: 0,
    y: 0,
  },
  {
    id: "6",
    content: "Side project idea: auto-crop & caption vertical clips for streamers 🎬",
    color: "sticky-yellow",
    rotation: 3,
    x: 0,
    y: 0,
  },
  {
    id: "7",
    content: "Smart vending machines in hospitals. Cashless, reliable, always stocked.",
    color: "sticky-blue",
    rotation: -4,
    x: 0,
    y: 0,
  },
  {
    id: "8",
    content: "Every enterprise product is just a series of migrations held together by hope and documentation.",
    color: "sticky-pink",
    rotation: 1,
    x: 0,
    y: 0,
  },
  {
    id: "9",
    content: "Cleveland Browns content + merch + tailgate buses = The Brown Streak 🟤",
    color: "sticky-green",
    rotation: -3,
    x: 0,
    y: 0,
  },
];

function DraggableNote({ note }: { note: StickyNote }) {
  const constraintRef = useRef<HTMLDivElement | null>(null);
  const { isCreative } = useTheme();

  return (
    <motion.div
      className={`sticky-note ${note.color} ${isCreative ? "hover:scale-105" : ""}`}
      style={{ rotate: `${note.rotation}deg` }}
      drag
      dragMomentum={false}
      dragElastic={0.1}
      whileDrag={{ scale: 1.1, zIndex: 50, rotate: 0, boxShadow: "4px 6px 20px rgba(0,0,0,0.3)" }}
      whileHover={{ scale: 1.03, zIndex: 10 }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-sm font-medium leading-relaxed">{note.content}</p>
      <div className="mt-3 flex items-center gap-1 opacity-50">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="5" cy="5" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="5" r="2"/>
          <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
          <circle cx="5" cy="19" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>
        </svg>
        <span className="text-[10px]">drag me</span>
      </div>
    </motion.div>
  );
}

export default function VisionBoard() {
  const { isCreative } = useTheme();

  return (
    <SectionWrapper id="vision" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ letterSpacing: "var(--letter-spacing-heading)" }}>
            {isCreative ? (
              <span className="gradient-text">Vision Board</span>
            ) : (
              "Ideas & Thoughts"
            )}
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            {isCreative
              ? "My brain on sticky notes. Drag them around. This is how I think."
              : "A collection of ideas, observations, and areas of interest."}
          </p>
        </motion.div>

        {/* Cork board area */}
        <div
          className="relative rounded-2xl border border-border-default overflow-hidden min-h-[500px] md:min-h-[600px] p-6 md:p-10"
          style={{
            background: isCreative
              ? "linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)"
              : "var(--bg-card)",
          }}
        >
          {/* Cork board texture hint */}
          {isCreative && (
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: "radial-gradient(circle, var(--accent-primary) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }} />
          )}

          {/* Notes grid - responsive layout that allows dragging */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {initialNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
              >
                <DraggableNote note={note} />
              </motion.div>
            ))}
          </div>

          {/* Corner pin decorations (creative mode) */}
          {isCreative && (
            <>
              <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-accent-primary/30" />
              <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-accent-secondary/30" />
              <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-accent-tertiary/30" />
              <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-accent-primary/30" />
            </>
          )}
        </div>

        <motion.p
          className="text-center text-sm text-text-muted mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {isCreative ? "✨ Go ahead, rearrange my thoughts." : "Interactive notes — drag to rearrange."}
        </motion.p>
      </div>
    </SectionWrapper>
  );
}
