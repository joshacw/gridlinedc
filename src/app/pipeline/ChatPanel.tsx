"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

export default function ChatPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeThreadId, setActiveThreadId] = useState<Id<"chatThreads"> | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showThreads, setShowThreads] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Convex queries & mutations
  const threads = useQuery(api.chat.listThreads);
  const messages = useQuery(
    api.chat.getMessages,
    activeThreadId ? { threadId: activeThreadId } : "skip"
  );
  const createThread = useMutation(api.chat.createThread);
  const addMessage = useMutation(api.chat.addMessage);
  const updateTitle = useMutation(api.chat.updateThreadTitle);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen && !showThreads) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, showThreads]);

  const handleNewThread = async () => {
    const id = await createThread({ title: "New conversation" });
    setActiveThreadId(id);
    setShowThreads(false);
    setError("");
  };

  const handleSelectThread = (id: Id<"chatThreads">) => {
    setActiveThreadId(id);
    setShowThreads(false);
    setError("");
  };

  const handleBack = () => {
    setShowThreads(true);
    setActiveThreadId(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setError("");

    // Create a thread if none active
    let threadId = activeThreadId;
    if (!threadId) {
      threadId = await createThread({ title: userMessage.slice(0, 60) });
      setActiveThreadId(threadId);
      setShowThreads(false);
    }

    // Save user message
    await addMessage({ threadId, role: "user", content: userMessage });

    // Auto-title on first message
    if (messages?.length === 0 || !messages) {
      await updateTitle({ threadId, title: userMessage.slice(0, 60) });
    }

    // Build conversation history for LLM
    const history = [
      ...(messages || []).map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: userMessage },
    ];

    // Call LLM
    setIsLoading(true);
    try {
      const resp = await fetch("/api/pipeline-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.error || `Request failed (${resp.status})`);
      }

      const data = await resp.json();
      await addMessage({ threadId, role: "assistant", content: data.content });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get response");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-[1100] cursor-pointer border-none transition-transform hover:scale-110"
        style={{ background: "#3b82f6" }}
        title="Pipeline Intelligence"
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-6 right-6 w-[420px] h-[600px] rounded-xl border flex flex-col z-[1100] shadow-2xl overflow-hidden"
      style={{ background: "#0f172a", borderColor: "#334155" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b shrink-0"
        style={{ background: "#1e293b", borderColor: "#334155" }}
      >
        <div className="flex items-center gap-2">
          {!showThreads && (
            <button
              onClick={handleBack}
              className="text-slate-400 hover:text-white bg-transparent border-none cursor-pointer text-sm p-0"
            >
              &larr;
            </button>
          )}
          <div>
            <div className="text-sm font-semibold text-white">Pipeline Intelligence</div>
            <div className="text-[11px] text-slate-400">Ask about targets, markets, signals</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!showThreads && (
            <button
              onClick={handleNewThread}
              className="text-[11px] text-blue-400 hover:text-blue-300 bg-transparent border-none cursor-pointer"
            >
              + New
            </button>
          )}
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white bg-transparent border-none cursor-pointer text-lg p-0"
          >
            &times;
          </button>
        </div>
      </div>

      {/* Thread List */}
      {showThreads && (
        <div className="flex-1 overflow-y-auto">
          <div className="p-3">
            <button
              onClick={handleNewThread}
              className="w-full py-3 rounded-lg text-sm font-medium cursor-pointer border transition-colors mb-3"
              style={{ background: "#3b82f6", color: "#fff", borderColor: "#3b82f6" }}
            >
              + New Conversation
            </button>

            {threads && threads.length > 0 ? (
              <div className="space-y-1">
                {threads.map((t) => (
                  <button
                    key={t._id}
                    onClick={() => handleSelectThread(t._id)}
                    className="w-full text-left px-3 py-2.5 rounded-lg cursor-pointer border-none transition-colors hover:bg-slate-800/50"
                    style={{ background: "transparent" }}
                  >
                    <div className="text-sm text-slate-200 truncate">{t.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {t.messageCount} messages &middot;{" "}
                      {new Date(t.updatedAt).toLocaleDateString()}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center text-slate-500 text-sm mt-8">
                No conversations yet.<br />Start one to analyse the pipeline.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      {!showThreads && (
        <>
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {(!messages || messages.length === 0) && !isLoading && (
              <div className="text-center text-slate-500 text-sm mt-8 px-4">
                <div className="text-slate-400 font-medium mb-2">Pipeline Intelligence</div>
                <div className="text-xs leading-relaxed">
                  Ask questions about the {" "}
                  <span className="text-blue-400">604 targets</span> in the pipeline.
                  <br /><br />
                  Try: &ldquo;Top 5 targets in Australia by L2 score&rdquo; or
                  &ldquo;Which targets have verified sub-2MW capacity?&rdquo;
                </div>
              </div>
            )}

            {messages?.map((msg) => (
              <div
                key={msg._id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[85%] rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed"
                  style={{
                    background: msg.role === "user" ? "#3b82f6" : "#1e293b",
                    color: msg.role === "user" ? "#fff" : "#e2e8f0",
                    borderBottomRightRadius: msg.role === "user" ? "4px" : undefined,
                    borderBottomLeftRadius: msg.role === "assistant" ? "4px" : undefined,
                  }}
                >
                  {msg.role === "assistant" ? (
                    <MarkdownContent content={msg.content} />
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div
                  className="rounded-xl px-3.5 py-2.5 text-[13px]"
                  style={{ background: "#1e293b", color: "#94a3b8" }}
                >
                  <span className="inline-flex gap-1">
                    <span className="animate-pulse">●</span>
                    <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>●</span>
                    <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>●</span>
                  </span>
                </div>
              </div>
            )}

            {error && (
              <div className="text-xs text-red-400 bg-red-400/10 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t shrink-0"
            style={{ borderColor: "#334155" }}
          >
            <div className="flex gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about targets..."
                rows={1}
                className="flex-1 resize-none rounded-lg px-3 py-2 text-[13px] border outline-none focus:border-blue-500"
                style={{
                  background: "#1e293b",
                  color: "#e2e8f0",
                  borderColor: "#334155",
                }}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-3 py-2 rounded-lg text-sm font-medium cursor-pointer border-none transition-opacity disabled:opacity-40"
                style={{ background: "#3b82f6", color: "#fff" }}
              >
                ↑
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

// ─── Simple Markdown Renderer ───────────────────────────────────────────────

function MarkdownContent({ content }: { content: string }) {
  // Very lightweight markdown: headers, bold, bullets, code
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];

  lines.forEach((line, i) => {
    if (line.startsWith("### ")) {
      elements.push(
        <div key={i} className="font-semibold text-white text-[13px] mt-2 mb-1">
          {formatInline(line.slice(4))}
        </div>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <div key={i} className="font-bold text-white text-sm mt-2 mb-1">
          {formatInline(line.slice(3))}
        </div>
      );
    } else if (line.startsWith("# ")) {
      elements.push(
        <div key={i} className="font-bold text-white text-[15px] mt-2 mb-1">
          {formatInline(line.slice(2))}
        </div>
      );
    } else if (line.match(/^[-*] /)) {
      elements.push(
        <div key={i} className="pl-3 relative">
          <span className="absolute left-0 text-slate-500">•</span>
          {formatInline(line.slice(2))}
        </div>
      );
    } else if (line.match(/^\d+\. /)) {
      const num = line.match(/^(\d+)\. /)?.[1];
      elements.push(
        <div key={i} className="pl-4 relative">
          <span className="absolute left-0 text-slate-500">{num}.</span>
          {formatInline(line.replace(/^\d+\. /, ""))}
        </div>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-1.5" />);
    } else {
      elements.push(<div key={i}>{formatInline(line)}</div>);
    }
  });

  return <>{elements}</>;
}

function formatInline(text: string): React.ReactNode {
  // Bold: **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </span>
      );
    }
    // Inline code: `text`
    const codeParts = part.split(/(`[^`]+`)/g);
    return codeParts.map((cp, j) => {
      if (cp.startsWith("`") && cp.endsWith("`")) {
        return (
          <code
            key={`${i}-${j}`}
            className="px-1 py-0.5 rounded text-[12px]"
            style={{ background: "#334155", color: "#93c5fd" }}
          >
            {cp.slice(1, -1)}
          </code>
        );
      }
      return cp;
    });
  });
}
