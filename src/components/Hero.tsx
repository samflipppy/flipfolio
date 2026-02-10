"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function Hero() {
  const { isCreative } = useTheme();

  /* ===== CORPORATE MODE: Clean traditional header ===== */
  if (!isCreative) {
    return (
      <section className="pt-28 pb-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-2" style={{ letterSpacing: "-0.01em" }}>
            Samuel Filipiak
          </h1>
          <p className="text-lg text-accent-primary font-medium mb-4">
            Senior Software Engineer
          </p>
          <p className="text-text-secondary max-w-2xl leading-relaxed mb-6">
            Product-focused senior software engineer with 7+ years building cloud-native,
            data-intensive systems. Experienced in C#/.NET, Azure, and end-to-end service ownership.
            Currently building independently through Lake Effect Labs.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-text-muted mb-8">
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Cleveland, OH
            </span>
            <a href="mailto:samfilipiak@gmail.com" className="flex items-center gap-1.5 hover:text-accent-secondary transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
              samfilipiak@gmail.com
            </a>
            <a href="https://linkedin.com/in/samuel-filipiak" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-accent-secondary transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
              LinkedIn
            </a>
            <a href="https://github.com/lake-effect-labs" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-accent-secondary transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
              GitHub
            </a>
          </div>
          <div className="flex gap-4">
            <a
              href="#work"
              className="px-6 py-2.5 bg-accent-primary text-white text-sm font-medium rounded-md hover:brightness-110 transition-all"
            >
              View Portfolio
            </a>
            <a
              href="#contact"
              className="px-6 py-2.5 border border-border-default text-text-primary text-sm font-medium rounded-md hover:bg-bg-card transition-all"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>
    );
  }

  /* ===== CREATIVE MODE: Full animated hero ===== */
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,107,53,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,107,53,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full opacity-20 blur-[100px]"
        style={{ background: "var(--accent-primary)" }}
        animate={{ x: [0, 50, -30, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full opacity-15 blur-[120px]"
        style={{ background: "var(--accent-tertiary)" }}
        animate={{ x: [0, -60, 40, 0], y: [0, 30, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-10 blur-[80px]"
        style={{ background: "var(--accent-secondary)" }}
        animate={{ x: [0, 30, -40, 0], y: [0, -60, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium border border-border-default bg-bg-card/50 text-text-secondary">
            Hey, I&apos;m Sam. Welcome to my world.
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] mb-6"
          style={{ letterSpacing: "var(--letter-spacing-heading)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <span className="block">I build things</span>
          <span className="block gradient-text">that matter.</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          7+ years turning complex systems into reliable products.
          <br className="hidden sm:block" />
          From enterprise telematics to side projects that ship.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.a
            href="#work"
            className="magnetic-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white bg-accent-primary hover:brightness-110 transition-all shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            See What I&apos;ve Built
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </motion.a>
          <motion.a
            href="#contact"
            className="magnetic-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold border border-border-default text-text-primary hover:bg-bg-card transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Let&apos;s Talk
          </motion.a>
        </motion.div>

        <motion.div
          className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {[
            { number: "7+", label: "Years Experience" },
            { number: "5M+", label: "Daily Messages Processed" },
            { number: "5+", label: "Side Projects Shipped" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent-primary">{stat.number}</div>
              <div className="text-xs md:text-sm text-text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-text-muted/30 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-accent-primary"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
