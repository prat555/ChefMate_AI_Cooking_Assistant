"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, ChefHat, Copy, Trash2, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (copiedIndex === null) return;
    const t = window.setTimeout(() => setCopiedIndex(null), 1200);
    return () => window.clearTimeout(t);
  }, [copiedIndex]);

  const quickPrompts = [
    "What can I cook with chicken and rice?",
    "Give me a 15-minute vegetarian dinner idea.",
    "How do I fix over-salted curry?",
    "Suggest a substitute for eggs in baking.",
  ];

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          conversation_history: messages,
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please make sure the backend is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    if (loading) return;
    setMessages([]);
    setInput("");
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex flex-col h-[65vh] min-h-[520px] max-h-[720px]">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-900">Chat</div>
        <button
          type="button"
          onClick={clearChat}
          disabled={loading || messages.length === 0}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200/70 bg-white/70 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 className="h-4 w-4" />
          Clear
        </button>
      </div>

      {/* Messages */}
      <div className="cm-scrollbar flex-1 overflow-y-auto rounded-2xl border border-slate-200/70 bg-white/60 backdrop-blur-md p-5 sm:p-6 shadow-sm">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full space-y-6 max-w-2xl mx-auto">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/15 to-orange-500/5 ring-1 ring-orange-500/15">
                <ChefHat className="h-7 w-7 text-orange-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Start a cooking conversation</h2>
                <p className="text-sm text-slate-600">
                  Ask for step-by-step help, timings, substitutions, or quick recipe ideas.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              <div className="cm-card-inner p-4">
                <p className="text-sm font-semibold text-slate-900">Recipe ideas</p>
                <p className="text-xs text-slate-600 mt-1">From ingredients you already have</p>
              </div>
              <div className="cm-card-inner p-4">
                <p className="text-sm font-semibold text-slate-900">Smarter substitutions</p>
                <p className="text-xs text-slate-600 mt-1">Ratios, flavor notes, and warnings</p>
              </div>
            </div>

            <div className="w-full space-y-2">
              <div className="text-xs font-medium text-slate-600">Try one of these:</div>
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setInput(p)}
                    className="cm-pill hover:bg-white"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[92%] sm:max-w-[80%] rounded-2xl px-4 py-3 ring-1 ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-orange-600 to-orange-700 text-white ring-orange-600/20"
                    : "bg-white/80 text-slate-900 ring-slate-200/70"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <div className="text-[11px] font-semibold text-orange-700 flex items-center gap-1">
                      <ChefHat className="h-3.5 w-3.5" /> ChefMate
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(message.content, index)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/70 bg-white/70 px-2 py-1 text-[11px] font-medium text-slate-700 hover:bg-white"
                      aria-label="Copy response"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="h-3.5 w-3.5" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                )}
                <div className="prose prose-sm max-w-none prose-headings:text-inherit prose-p:text-inherit prose-li:text-inherit prose-strong:text-inherit prose-ul:my-2 prose-ol:my-2 prose-li:my-0">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
        </div>
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/80 ring-1 ring-slate-200/70 rounded-2xl px-4 py-3">
              <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="mt-3 rounded-2xl border border-slate-200/70 bg-white/70 backdrop-blur-md p-3 sm:p-4 shadow-sm">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void sendMessage(e as unknown as React.FormEvent);
              }
            }}
            placeholder="Ask anything… (Enter to send, Shift+Enter for new line)"
            className="flex-1 resize-none px-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-transparent transition-all text-sm text-slate-900 placeholder:text-slate-400 min-h-[48px] max-h-32"
            disabled={loading}
            rows={2}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-gradient-to-br from-orange-600 to-orange-700 text-white px-5 py-3 rounded-xl hover:from-orange-700 hover:to-orange-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-sm"
          >
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline text-sm">Send</span>
          </button>
        </div>
      </form>
    </div>
  );
}
