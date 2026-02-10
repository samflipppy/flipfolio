"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

interface Message {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

const SUGGESTED_QUESTIONS = [
  "What's Sam's experience with Azure?",
  "Why should we hire Sam?",
  "What side projects has Sam built?",
  "Tell me about Clipppy",
  "How does this chat work?",
];

const SYSTEM_PROMPT = `You are Sam Filipiak's AI portfolio assistant. You have deep knowledge about his background:

CONTEXT:
- Senior Software Engineer, 7+ years, Cleveland OH
- Trimble Inc (2019-2025): Owned FleetConnex (5M+ daily messages), contributed to FleetHub
- Side projects: Matte (job management for painters), OnTheClockMock (NFL mock draft + AI YouTube Shorts), Clipppy (AI clip automation for Twitch streamers), Lock In (fitness app)
- YouTube channels: @nfl.prospect.content (AI-generated NFL prospect Shorts using Whisper), @average_coder (Clipppy dev content)
- Co-founded Lake Effect Labs (micro software agency)
- Skills: C#/.NET, Azure, TypeScript, React/Next.js, Python, LLMs, Whisper, NLP
- Education: JCU — BS CompSci, BA Sociology, Associates Data Science
- Crypto background since 2017, smart contract experience

INSTRUCTIONS:
- Be conversational, helpful, and genuine
- Highlight relevant experience based on the question
- Be specific with numbers and details
- If asked about fit, match Sam's skills to the implied role`;

const STUBBED_RESPONSES: Record<string, string> = {
  default: "Great question! Sam is a product-focused senior software engineer with 7+ years of experience. He's built enterprise platforms processing millions of daily messages, shipped multiple side projects, and brings a rare combination of deep technical skill and product ownership. What specifically would you like to know?",
  azure: "Sam has deep Azure expertise from 6+ years at Trimble. He's architected and maintained systems using Azure Functions, Logic Apps, Service Bus, Table/Blob Storage, VMs, App Insights, and Cosmos DB. He managed the entire Azure infrastructure for FleetConnex solo — including cost optimization that saved significant budget, major platform upgrades, and monitoring dashboards. The platform processed 5M+ messages daily with 99.9%+ uptime.",
  hire: "Here's the honest case for Sam: He's not just an engineer — he's a product owner who happens to code. At Trimble, he became the sole developer, PM, customer support, and incident responder for a mission-critical platform. That means he can gather requirements, architect solutions, ship code, handle production incidents, and talk to customers — all in the same day. He's also shipped 5+ side projects because he genuinely loves building. That builder's mentality is hard to hire for.",
  projects: "Sam's actively shipping: Matte (matte.biz) — job management software for painting businesses with a Kanban workflow, scheduling, and customer tracking. OnTheClockMock (ontheclock.xyz) — an NFL mock draft simulator plus an AI content pipeline that generates YouTube Shorts of draft prospects using Whisper for voiceovers (@nfl.prospect.content). Clipppy — an AI-powered tool that monitors Twitch streams, auto-detects viral moments, clips/edits them, and posts to social platforms (@average_coder on YouTube). Lock In — a React Native fitness app with fantasy-football-style H2H matchups. All through Lake Effect Labs, the micro agency he co-founded.",
  fleetconnex: "FleetConnex was Sam's proving ground. It started as a cloud-based telematics integration platform at Trimble. Over time, Sam became its sole owner — writing code, managing the Azure infrastructure, doing sprint planning, handling customer escalations, and running migrations. At peak, it processed 5M+ messages per day in a 24/7 production environment for enterprise trucking companies. When something broke at 2am, Sam was the one on call. That end-to-end ownership is what defines him.",
  product: "Sam's product instincts come from necessity. When you're the sole owner of a mission-critical platform, you learn fast. He developed a repeatable loop: incident triggers RCA, RCA feeds the backlog, backlog gets prioritized via RICE, smallest viable fix ships first, then hardening follows. He facilitates trade-off calls with engineering and QA, writes specs, and runs customer feedback loops.",
  architecture: "This chat demonstrates how Sam thinks about AI integration. The architecture: a React component with streaming text simulation, conversation state, and suggested questions on the frontend. The system prompt injects Sam's full background as context. In production, this connects to a Next.js API route using the Anthropic SDK, streaming responses via Server-Sent Events. This showcases prompt engineering, AI UX design, understanding of RAG patterns, and the ability to ship AI as a product feature.",
  ai: "Sam uses AI as a force multiplier across multiple projects. Clipppy is an AI pipeline that monitors Twitch streams in real time, uses speech-to-text and NLP to detect viral moments, then auto-clips, edits, and posts them. For OnTheClockMock, he built an AI content pipeline that generates YouTube Shorts of NFL draft prospects with Whisper-powered voiceovers — check out @nfl.prospect.content. He uses agentic dev tools (Claude Code, Cursor) daily. This chat feature itself demonstrates prompt engineering, context injection, and AI-powered UX design. He's not just an AI user — he's shipping AI as product features.",
};

function getStubResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("how") && (lower.includes("work") || lower.includes("built") || lower.includes("architecture"))) return STUBBED_RESPONSES.architecture;
  if (lower.includes("ai") || lower.includes("llm") || lower.includes("machine learning") || lower.includes("gpt") || lower.includes("claude")) return STUBBED_RESPONSES.ai;
  if (lower.includes("azure") || lower.includes("cloud") || lower.includes("infrastructure")) return STUBBED_RESPONSES.azure;
  if (lower.includes("hire") || lower.includes("why") || lower.includes("fit") || lower.includes("should")) return STUBBED_RESPONSES.hire;
  if (lower.includes("clip") || lower.includes("twitch") || lower.includes("stream") || lower.includes("youtube")) return STUBBED_RESPONSES.ai;
  if (lower.includes("project") || lower.includes("side") || lower.includes("matte") || lower.includes("lock in") || lower.includes("ontheclock")) return STUBBED_RESPONSES.projects;
  if (lower.includes("fleet") || lower.includes("connex") || lower.includes("trimble") || lower.includes("hub")) return STUBBED_RESPONSES.fleetconnex;
  if (lower.includes("product") || lower.includes("own") || lower.includes("pm") || lower.includes("manage")) return STUBBED_RESPONSES.product;
  return STUBBED_RESPONSES.default;
}

function StreamingText({ text, onComplete }: { text: string; onComplete: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const chars = text.split("");
    const interval = setInterval(() => {
      if (i < chars.length) {
        setDisplayed((prev) => prev + chars[i]);
        i++;
      } else {
        clearInterval(interval);
        setDone(true);
        onComplete();
      }
    }, 12);
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <span>
      {displayed}
      {!done && <span className="inline-block w-1.5 h-4 bg-accent-primary ml-0.5 animate-pulse" />}
    </span>
  );
}

export default function AiChat() {
  const { isCreative } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [showArchitecture, setShowArchitecture] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey! I'm Sam's AI portfolio assistant. Ask me anything about his experience, projects, or why he'd be a great fit for your team.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isStreamingActive, setIsStreamingActive] = useState(false);
  const [tokenCount, setTokenCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isStreamingActive) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setTokenCount((prev) => prev + Math.ceil(text.trim().split(" ").length * 1.3));

    await new Promise((resolve) => setTimeout(resolve, 400 + Math.random() * 400));

    const response = getStubResponse(text);
    setIsTyping(false);
    setIsStreamingActive(true);
    setMessages((prev) => [...prev, { role: "assistant", content: response, isStreaming: true }]);
    setTokenCount((prev) => prev + Math.ceil(response.split(" ").length * 1.3));
  };

  const handleStreamComplete = useCallback(() => {
    setIsStreamingActive(false);
    setMessages((prev) =>
      prev.map((m, i) => (i === prev.length - 1 ? { ...m, isStreaming: false } : m))
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent-primary text-white shadow-lg flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isCreative && !isOpen ? {
          boxShadow: [
            "0 4px 14px rgba(255,107,53,0.3)",
            "0 4px 28px rgba(255,107,53,0.5)",
            "0 4px 14px rgba(255,107,53,0.3)",
          ],
        } : {}}
        transition={isCreative && !isOpen ? { duration: 2, repeat: Infinity } : {}}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg key="close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </motion.svg>
          ) : (
            <motion.svg key="chat" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[420px] max-h-[75vh] rounded-2xl border border-border-default overflow-hidden flex flex-col"
            style={{
              background: "var(--chat-bg)",
              boxShadow: isCreative
                ? "0 8px 40px rgba(0,0,0,0.4), 0 0 60px rgba(255,107,53,0.1)"
                : "0 8px 30px rgba(0,0,0,0.15)",
            }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Header */}
            <div className="p-4 border-b border-border-default bg-bg-card/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center text-xs font-bold text-accent-primary">
                    AI
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text-primary">Ask About Sam</h3>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <p className="text-xs text-text-muted">Powered by Claude</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowArchitecture(!showArchitecture)}
                  className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                    showArchitecture
                      ? "bg-accent-primary/10 border-accent-primary/30 text-accent-primary"
                      : "border-border-default text-text-muted hover:text-text-primary"
                  }`}
                >
                  {showArchitecture ? "Hide" : "How this works"}
                </button>
              </div>

              {/* Architecture panel */}
              <AnimatePresence>
                {showArchitecture && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 pt-3 border-t border-border-default">
                      <p className="text-xs font-bold text-text-primary mb-2">Architecture</p>
                      <div className="space-y-2 text-xs text-text-secondary">
                        <div className="flex items-start gap-2">
                          <span className="text-accent-primary font-mono shrink-0">01</span>
                          <span><strong>Context Injection</strong> — Sam&apos;s full background is embedded as a system prompt</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-accent-primary font-mono shrink-0">02</span>
                          <span><strong>Streaming</strong> — Responses render token-by-token (simulated SSE)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-accent-primary font-mono shrink-0">03</span>
                          <span><strong>Production</strong> — Next.js API route + Anthropic SDK for real responses</span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <p className="text-xs font-bold text-text-primary mb-1">System Prompt Preview</p>
                        <div className="bg-bg-secondary rounded-md p-2.5 max-h-24 overflow-y-auto border border-border-default">
                          <pre className="text-[10px] font-mono text-text-muted whitespace-pre-wrap leading-relaxed">
                            {SYSTEM_PROMPT.slice(0, 300)}...
                          </pre>
                        </div>
                      </div>

                      <div className="mt-2 flex items-center gap-3 text-[10px] font-mono text-text-muted">
                        <span>~{tokenCount} tokens used</span>
                        <span>Model: claude-sonnet</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[280px]">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-chat-user text-white rounded-br-sm"
                        : "bg-chat-bot text-text-primary rounded-bl-sm border border-border-default"
                    }`}
                  >
                    {msg.isStreaming ? (
                      <StreamingText text={msg.content} onComplete={handleStreamComplete} />
                    ) : (
                      msg.content
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="bg-chat-bot rounded-2xl rounded-bl-sm px-4 py-3 border border-border-default">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div key={i} className="w-2 h-2 rounded-full bg-text-muted"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-text-muted mb-2">Try asking:</p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-xs px-3 py-1.5 rounded-full border border-border-default text-text-secondary hover:bg-bg-card-hover hover:text-text-primary transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-border-default">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Sam..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-border-default bg-bg-secondary text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
                  disabled={isStreamingActive}
                />
                <motion.button
                  type="submit"
                  className="w-10 h-10 rounded-xl bg-accent-primary text-white flex items-center justify-center shrink-0 disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!input.trim() || isStreamingActive}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
