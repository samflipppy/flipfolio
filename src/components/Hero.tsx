"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function Hero() {
  const { isCreative } = useTheme();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 overflow-hidden">
      {/* Background grid pattern */}
      {isCreative && (
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
      )}

      {/* Floating orbs (creative mode) */}
      {isCreative && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full opacity-20 blur-[100px]"
            style={{ background: "var(--accent-primary)" }}
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -40, 20, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full opacity-15 blur-[120px]"
            style={{ background: "var(--accent-tertiary)" }}
            animate={{
              x: [0, -60, 40, 0],
              y: [0, 30, -50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-10 blur-[80px]"
            style={{ background: "var(--accent-secondary)" }}
            animate={{
              x: [0, 30, -40, 0],
              y: [0, -60, 30, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Greeting tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium border border-border-default bg-bg-card/50 text-text-secondary">
            {isCreative ? "Hey, I'm Sam. Welcome to my world." : "Senior Software Engineer | Cleveland, OH"}
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] mb-6"
          style={{ letterSpacing: "var(--letter-spacing-heading)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {isCreative ? (
            <>
              <span className="block">I build things</span>
              <span className="block gradient-text">that matter.</span>
            </>
          ) : (
            <>
              <span className="block">Samuel</span>
              <span className="block text-accent-primary">Filipiak</span>
            </>
          )}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {isCreative ? (
            <>
              7+ years turning complex systems into reliable products.
              <br className="hidden sm:block" />
              From enterprise telematics to side projects that ship.
            </>
          ) : (
            <>
              Product-focused senior software engineer with 7+ years building cloud-native,
              data-intensive systems. Experienced in C#/.NET, Azure, and end-to-end service ownership.
            </>
          )}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.a
            href="#work"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white bg-accent-primary hover:brightness-110 transition-all shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {isCreative ? "See What I've Built" : "View Portfolio"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </motion.a>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold border border-border-default text-text-primary hover:bg-bg-card transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {isCreative ? "Let's Talk" : "Contact Me"}
          </motion.a>
        </motion.div>

        {/* Stats bar */}
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

      {/* Scroll indicator */}
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
