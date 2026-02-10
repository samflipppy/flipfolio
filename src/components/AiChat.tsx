"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What's Sam's experience with Azure?",
  "Why should we hire Sam?",
  "What side projects has Sam built?",
  "Tell me about FleetConnex",
  "What's Sam's approach to product ownership?",
];

// Stubbed responses — replace with actual API call when ready
const STUBBED_RESPONSES: Record<string, string> = {
  default:
    "I'm Sam's AI assistant! I can tell you about his experience, projects, skills, and why he'd be a great fit for your team. This is currently a demo — once connected to an API, I'll have deep knowledge about everything Sam has built and accomplished.",
  azure:
    "Sam has extensive Azure experience from his 6+ years at Trimble. He's worked with Azure Functions, Logic Apps, Service Bus, Table/Blob Storage, VMs, and App Insights. He managed the entire Azure infrastructure for FleetConnex, including cost optimization and major platform updates. He processes 5M+ messages daily through Azure-based services.",
  hire:
    "Sam brings a rare combination: deep technical skill (7+ years of production backend systems), product ownership experience (sole owner of mission-critical platforms), and a builder's mentality (multiple shipped side projects). He doesn't just write code — he owns outcomes. From incident response to customer support to architecture decisions, he's done it all.",
  projects:
    "Sam's side projects include: Matte (a minimal painter OS), OnTheClockMock (NFL mock draft simulator), Lock In (fantasy football-style fitness app built with Expo/Supabase), and Clipppy (AI-powered video clipping tool). He also co-founded Lake Effect Labs, a micro software agency, and runs The Brown Streak for Cleveland Browns content.",
  fleetconnex:
    "FleetConnex was Trimble's mission-critical telematics integration platform. Sam became its sole developer, PM, and customer support contact. He processed 5M+ daily messages, managed the full Azure infrastructure, led customer migrations, and maintained 99.9%+ uptime. He owned every stage of the product lifecycle from architecture to deployment to user support.",
  product:
    "Sam's approach to product ownership comes from necessity — he became the sole owner of FleetConnex and had to wear every hat. He gathers requirements directly from customers, defines architecture, codes and tests solutions, manages deployments, handles support, and runs incident → RCA → backlog loops. He believes the best product decisions come from being close to the customer.",
};

function getStubResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("azure") || lower.includes("cloud")) return STUBBED_RESPONSES.azure;
  if (lower.includes("hire") || lower.includes("why") || lower.includes("fit")) return STUBBED_RESPONSES.hire;
  if (lower.includes("project") || lower.includes("side") || lower.includes("built")) return STUBBED_RESPONSES.projects;
  if (lower.includes("fleet") || lower.includes("connex") || lower.includes("trimble")) return STUBBED_RESPONSES.fleetconnex;
  if (lower.includes("product") || lower.includes("own") || lower.includes("pm")) return STUBBED_RESPONSES.product;
  return STUBBED_RESPONSES.default;
}

export default function AiChat() {
  const { isCreative } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey! I'm Sam's AI assistant. Ask me anything about his experience, projects, or why he'd be a great fit for your team. 🤖",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 800));

    const response = getStubResponse(text);
    setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    setIsTyping(false);
  };

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
            <motion.svg
              key="close"
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 max-h-[70vh] rounded-2xl border border-border-default overflow-hidden flex flex-col"
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
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center">
                  <span className="text-sm">🤖</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text-primary">Ask About Sam</h3>
                  <p className="text-xs text-text-muted">AI-powered • Ask me anything</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px]">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-chat-user text-white rounded-br-sm"
                        : "bg-chat-bot text-text-primary rounded-bl-sm border border-border-default"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-chat-bot rounded-2xl rounded-bl-sm px-4 py-3 border border-border-default">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-text-muted"
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
                  {SUGGESTED_QUESTIONS.slice(0, 3).map((q) => (
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
                />
                <motion.button
                  type="submit"
                  className="w-10 h-10 rounded-xl bg-accent-primary text-white flex items-center justify-center shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!input.trim()}
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
