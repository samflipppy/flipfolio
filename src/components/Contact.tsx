"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import SectionWrapper from "./SectionWrapper";

const socialLinks = [
  {
    label: "Email",
    href: "mailto:samfilipiak@gmail.com",
    value: "samfilipiak@gmail.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/samuel-filipiak",
    value: "samuel-filipiak",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/lake-effect-labs",
    value: "lake-effect-labs",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
  },
];

export default function Contact() {
  const { isCreative } = useTheme();

  return (
    <SectionWrapper id="contact" className="py-24 md:py-32 pb-32">
      <div className="max-w-3xl mx-auto text-center">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ letterSpacing: "var(--letter-spacing-heading)" }}>
            {isCreative ? (
              <>
                <span className="gradient-text">Let&apos;s Build</span>
                <br />
                <span className="text-text-primary">Something Together</span>
              </>
            ) : (
              "Get in Touch"
            )}
          </h2>
          <p className="text-text-secondary text-lg max-w-lg mx-auto mb-12 leading-relaxed">
            {isCreative
              ? "Whether you've got a role, a project, or just want to talk shop — I'm always down to connect."
              : "I'm open to new opportunities and collaborations. Feel free to reach out through any of the channels below."}
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.label !== "Email" ? "_blank" : undefined}
              rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
              className="group flex flex-col items-center gap-3 p-6 rounded-xl border border-border-default bg-bg-card hover:bg-bg-card-hover transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={isCreative ? { y: -4, scale: 1.02 } : { y: -2 }}
            >
              <div className="w-12 h-12 rounded-full bg-accent-primary/10 text-accent-primary flex items-center justify-center group-hover:bg-accent-primary group-hover:text-white transition-all">
                {link.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-text-primary">{link.label}</p>
                <p className="text-xs text-text-muted">{link.value}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA button */}
        <motion.a
          href="mailto:samfilipiak@gmail.com"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-lg text-white bg-accent-primary hover:brightness-110 transition-all shadow-lg"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {isCreative ? "Say Hey 👋" : "Send an Email"}
        </motion.a>
      </div>

      {/* Footer */}
      <motion.footer
        className="mt-24 pt-8 border-t border-border-default text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            {isCreative ? (
              <>Built by Sam with Next.js, Tailwind, and too much coffee. ☕</>
            ) : (
              <>© 2025 Samuel Filipiak. All rights reserved.</>
            )}
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                className="text-text-muted hover:text-accent-primary transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </motion.footer>
    </SectionWrapper>
  );
}
