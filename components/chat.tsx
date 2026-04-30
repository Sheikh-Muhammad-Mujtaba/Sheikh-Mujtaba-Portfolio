"use client";

import { useState, useRef, useEffect, useCallback, useMemo, type JSX, type ReactNode, type WheelEvent, type TouchEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, Sparkles, Trash2, ChevronDown, Mic, MicOff } from "lucide-react";
import Image from "next/image";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "Hi! I'm Sheikh Mujtaba's AI assistant. I can tell you about his projects, AI expertise, security engineering skills, and professional experience. What would you like to know?",
  timestamp: Date.now(),
};

const CONTEXT_WINDOW_SIZE = 10; // Recent messages for API context
const FALLBACK_ERROR_MESSAGE =
  "Sorry, I couldn't process that request right now. Please try again in a moment or contact Sheikh Mujtaba directly at smujtabaja@gmail.com.";
const CHAT_STORAGE_KEY = "smj_chat_messages_v1";
const ASKED_STORAGE_KEY = "smj_chat_asked_questions_v1";

const suggestedPrompts = [
  "What AI projects have you built?",
  "What are your AI and security skills?",
  "What services do you offer?",
  "Tell me about your experience with Agentic AI",
  "How does your RAG pipeline work?",
];

const MAX_SUGGESTIONS = 3;

function isValidMessage(value: unknown): value is Message {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<Message>;
  return (
    typeof candidate.id === "string" &&
    (candidate.role === "user" || candidate.role === "assistant") &&
    typeof candidate.content === "string" &&
    typeof candidate.timestamp === "number"
  );
}

function extractTextFromUnknown(payload: unknown): string {
  if (typeof payload === "string") return payload;
  if (typeof payload === "number" || typeof payload === "boolean") return String(payload);
  if (!payload || typeof payload !== "object") return "";

  if (Array.isArray(payload)) {
    return payload.map(extractTextFromUnknown).filter(Boolean).join("");
  }

  const obj = payload as Record<string, unknown>;
  const directKeys = ["reply", "text", "content", "message", "output_text", "response"];
  for (const key of directKeys) {
    const raw = obj[key];
    if (typeof raw === "string" && raw.trim()) return raw;
    if (raw && typeof raw === "object") {
      const nested = extractTextFromUnknown(raw);
      if (nested.trim()) return nested;
    }
  }

  const nestedKeys = ["delta", "choices", "candidates", "output", "responses", "parts", "data"];
  for (const key of nestedKeys) {
    const nested = extractTextFromUnknown(obj[key]);
    if (nested.trim()) return nested;
  }

  return "";
}

function parseStreamFragment(line: string): string {
  const trimmed = line.trim();
  if (!trimmed || /^event:/i.test(trimmed)) return "";

  let payload = trimmed;
  if (/^data:\s*/i.test(payload)) payload = payload.replace(/^data:\s*/i, "");
  if (payload.startsWith("0:")) payload = payload.slice(2);
  if (!payload || payload === "[DONE]" || payload === '"[DONE]"') return "";

  try {
    const parsed = JSON.parse(payload);
    return extractTextFromUnknown(parsed);
  } catch {
    return payload;
  }
}

function renderInlineMarkdown(text: string): ReactNode[] {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts
    .filter(Boolean)
    .map((part, idx) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={`code-${idx}`}
            className="px-1.5 py-0.5 rounded bg-slate-800/80 text-cyan-300 text-[0.95em] font-mono"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={`strong-${idx}`} className="font-semibold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={`text-${idx}`}>{part}</span>;
    });
}

function formatMessage(content: string): JSX.Element {
  if (!content.trim()) {
    return <></>;
  }

  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const elements: JSX.Element[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    // Fenced code blocks
    if (trimmed.startsWith("```")) {
      const codeLines: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i += 1;
      }
      if (i < lines.length) i += 1; // Skip closing fence
      elements.push(
        <pre
          key={`pre-${i}`}
          className="mb-2 p-3 rounded-xl bg-slate-900 text-slate-100 overflow-x-auto text-[11px] sm:text-xs font-mono border border-slate-700"
        >
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
      continue;
    }

    // Heading
    const headingMatch = trimmed.match(/^#{1,3}\s+(.+)$/);
    if (headingMatch) {
      elements.push(
        <h4 key={`h-${i}`} className="font-semibold text-slate-100 mb-1.5 mt-1 text-sm sm:text-base">
          {renderInlineMarkdown(headingMatch[1])}
        </h4>
      );
      i += 1;
      continue;
    }

    // Bullet list block
    if (/^[-*•]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*•]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*•]\s+/, ""));
        i += 1;
      }
      elements.push(
        <ul key={`ul-${i}`} className="mb-2 space-y-1.5">
          {items.map((item, idx) => (
            <li key={`li-${idx}`} className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span>{renderInlineMarkdown(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list block
    if (/^\d+\.\s+/.test(trimmed)) {
      const items: { n: string; text: string }[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        const current = lines[i].trim();
        const match = current.match(/^(\d+)\.\s+(.+)$/);
        if (match) {
          items.push({ n: match[1], text: match[2] });
        }
        i += 1;
      }
      elements.push(
        <ol key={`ol-${i}`} className="mb-2 space-y-1.5">
          {items.map((item, idx) => (
            <li key={`nli-${idx}`} className="flex items-start gap-2">
              <span className="text-cyan-400 font-medium min-w-[1.2rem]">{item.n}.</span>
              <span>{renderInlineMarkdown(item.text)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Paragraph
    elements.push(
      <p key={`p-${i}`} className="mb-1.5">
        {renderInlineMarkdown(trimmed)}
      </p>
    );
    i += 1;
  }

  return <>{elements}</>;
}

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [askedQuestions, setAskedQuestions] = useState<Set<string>>(new Set());
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [showBubble, setShowBubble] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null); // Type overridden to any to resolve Vercel build TS error
  const activeRequestRef = useRef<AbortController | null>(null);
  const hasHydratedFromStorageRef = useRef(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleScroll = useCallback(() => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollButton(!isNearBottom);
  }, []);

  const preventScrollPropagation = useCallback((event: WheelEvent<HTMLDivElement>) => {
    event.stopPropagation();
  }, []);

  const preventTouchPropagation = useCallback((event: TouchEvent<HTMLDivElement>) => {
    event.stopPropagation();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Restore chat history from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const storedMessagesRaw = window.localStorage.getItem(CHAT_STORAGE_KEY);
      const storedAskedRaw = window.localStorage.getItem(ASKED_STORAGE_KEY);

      if (storedMessagesRaw) {
        const parsed = JSON.parse(storedMessagesRaw) as unknown;
        if (Array.isArray(parsed)) {
          const restored = parsed.filter(isValidMessage);
          setMessages(restored.length > 0 ? restored : [{ ...WELCOME_MESSAGE, timestamp: Date.now() }]);
        }
      }

      if (storedAskedRaw) {
        const parsedAsked = JSON.parse(storedAskedRaw) as unknown;
        if (Array.isArray(parsedAsked)) {
          const normalized = parsedAsked
            .filter((entry): entry is string => typeof entry === "string")
            .map((entry) => entry.toLowerCase().trim())
            .filter(Boolean);
          setAskedQuestions(new Set(normalized));
        }
      }
    } catch {
      setMessages([{ ...WELCOME_MESSAGE, timestamp: Date.now() }]);
      setAskedQuestions(new Set());
    } finally {
      hasHydratedFromStorageRef.current = true;
    }
  }, []);

  // Persist chat history to localStorage
  useEffect(() => {
    if (typeof window === "undefined" || !hasHydratedFromStorageRef.current) return;
    try {
      window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
      window.localStorage.setItem(ASKED_STORAGE_KEY, JSON.stringify(Array.from(askedQuestions)));
    } catch {
      // Ignore storage errors (private mode/quota exceeded)
    }
  }, [messages, askedQuestions]);

  useEffect(() => {
    return () => {
      activeRequestRef.current?.abort();
    };
  }, []);

  // Show bubble after 3 seconds delay
  useEffect(() => {
    if (isOpen) {
      setShowBubble(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // Check for speech recognition support
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognitionAPI) {
        setIsSpeechSupported(true);
        const recognition = new SpeechRecognitionAPI();
        recognitionRef.current = recognition;
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onstart = () => {
          setIsRecording(true);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognition.onresult = (event: any) => {
          let finalTranscript = "";
          let interimTranscript = "";

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }

          if (finalTranscript) {
            setInput((prev) => prev + finalTranscript);
          } else if (interimTranscript) {
            setInput((prev) => {
              // Remove previous interim text and add new
              const base = prev.replace(/\s*$/, "");
              return base + (base ? " " : "") + interimTranscript;
            });
          }
        };

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsRecording(false);

          if (event.error === "not-allowed") {
            setSpeechError("Microphone access denied. Please allow microphone permission in your browser.");
          } else if (event.error === "no-speech") {
            setSpeechError("No speech detected. Please try speaking louder or closer to the microphone.");
          } else {
            setSpeechError(`Speech error: ${event.error}`);
          }

          // Clear error after 3 seconds
          setTimeout(() => setSpeechError(null), 3000);
        };
      }
    }

    return () => {
      const currentRecognition = recognitionRef.current;
      if (currentRecognition) {
        currentRecognition.stop();
      }
    };
  }, []);

  const requestMicrophonePermission = async (): Promise<boolean> => {
    try {
      // Try to get microphone access explicitly
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop the stream immediately - we just needed permission
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (err) {
      console.error("Microphone permission denied:", err);
      if (err instanceof DOMException) {
        if (err.name === "NotAllowedError") {
          setSpeechError("Microphone blocked. Click the lock icon in your browser address bar and allow microphone access.");
        } else if (err.name === "NotFoundError") {
          setSpeechError("No microphone found. Please connect a microphone and try again.");
        } else {
          setSpeechError(`Microphone error: ${err.message}`);
        }
      } else {
        setSpeechError("Could not access microphone. Make sure you're using HTTPS or localhost.");
      }
      setTimeout(() => setSpeechError(null), 5000);
      return false;
    }
  };

  const toggleRecording = async () => {
    if (!recognitionRef.current) return;

    // Clear any previous errors
    setSpeechError(null);

    if (isRecording) {
      recognitionRef.current.stop();
      return;
    }

    // Request microphone permission first
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      return;
    }

    // Clear input when starting new recording
    setInput("");
    try {
      recognitionRef.current.start();
      setSpeechError(null);
    } catch (err) {
      console.error("Failed to start speech recognition:", err);
      setSpeechError("Failed to start recording. Please try again.");
      setTimeout(() => setSpeechError(null), 3000);
    }
  };

  const clearChat = () => {
    setMessages([{ ...WELCOME_MESSAGE, timestamp: Date.now() }]);
    setAskedQuestions(new Set());
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(CHAT_STORAGE_KEY);
      window.localStorage.removeItem(ASKED_STORAGE_KEY);
    }
  };

  // Get recent messages for context window (limited to CONTEXT_WINDOW_SIZE)
  const getContextMessages = useCallback(() => {
    const recentMessages = messages.slice(-CONTEXT_WINDOW_SIZE);
    return recentMessages.map((m) => ({
      role: m.role,
      content: m.content,
    }));
  }, [messages]);

  const submitMessage = useCallback(async (rawInput: string) => {
    const normalizedInput = rawInput.trim();
    if (!normalizedInput || isLoading) return;

    activeRequestRef.current?.abort();
    const controller = new AbortController();
    activeRequestRef.current = controller;

    const timestamp = Date.now();
    const userMessage: Message = {
      id: `user-${timestamp}`,
      role: "user",
      content: normalizedInput,
      timestamp,
    };
    const assistantMessage: Message = {
      id: `assistant-${timestamp}`,
      role: "assistant",
      content: "",
      timestamp: timestamp + 1,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setAskedQuestions((prev) => new Set(prev).add(normalizedInput.toLowerCase()));
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          messages: [...getContextMessages(), { role: "user", content: normalizedInput }],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const contentType = response.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        const data = await response.json().catch(() => null);
        const reply = extractTextFromUnknown(data) || FALLBACK_ERROR_MESSAGE;
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantMessage.id ? { ...m, content: reply } : m))
        );
      } else if (contentType.includes("text/plain") || !response.body) {
        const reply = await response.text();
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantMessage.id ? { ...m, content: reply || FALLBACK_ERROR_MESSAGE } : m))
        );
      } else {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let assistantContent = "";
        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split(/\r?\n/);
          buffer = parts.pop() || ""; // keep the last partial line in buffer

          for (const rawLine of parts) {
            const line = rawLine.trim();
            if (!line) continue;

            const fragment = parseStreamFragment(line);
            if (!fragment) continue;
            assistantContent += fragment;
            setMessages((prev) =>
              prev.map((m) => (m.id === assistantMessage.id ? { ...m, content: assistantContent } : m))
            );
          }
        }

        // Flush any remaining buffer
        if (buffer.trim()) {
          const fragment = parseStreamFragment(buffer.trim());
          if (fragment) {
            assistantContent += fragment;
            setMessages((prev) =>
              prev.map((m) => (m.id === assistantMessage.id ? { ...m, content: assistantContent } : m))
            );
          }
        }

        // Ensure user always gets a readable response
        if (!assistantContent.trim()) {
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantMessage.id ? { ...m, content: FALLBACK_ERROR_MESSAGE } : m))
          );
        }
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantMessage.id ? { ...m, content: FALLBACK_ERROR_MESSAGE } : m))
      );
    } finally {
      setIsLoading(false);
      if (activeRequestRef.current === controller) {
        activeRequestRef.current = null;
      }
    }
  }, [getContextMessages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void submitMessage(input);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    void submitMessage(question);
  };

  // Get available suggestions that haven't been asked
  const availableSuggestions = useMemo(() => {
    return suggestedPrompts.filter(
      (prompt) => !askedQuestions.has(prompt.toLowerCase())
    ).slice(0, MAX_SUGGESTIONS);
  }, [askedQuestions]);

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
            <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-end gap-2 [body:has(.overlayContainer:not(.complete))_&]:opacity-0 [body:has(.overlayContainer:not(.complete))_&]:pointer-events-none transition-opacity duration-300">
            {/* Popup Bubble */}
            <AnimatePresence>
              {showBubble && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="mb-2 relative"
                >
                  <div
                    onClick={() => setIsOpen(true)}
                    className="bg-slate-900 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl rounded-br-sm shadow-xl cursor-pointer hover:bg-slate-800 transition-colors max-w-[70vw] sm:max-w-none"
                  >
                    <span className="text-xs sm:text-sm font-medium block truncate">💬 Ask me anything!</span>
                  </div>
                  {/* Small triangle pointing to button */}
                  <div className="absolute -right-1.5 bottom-3 w-3 h-3 bg-slate-900 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              onClick={() => setIsOpen(true)}
              className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 glass rounded-full shadow-2xl border border-slate-200 hover:shadow-xl transition-shadow overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <Image
                src="/Logo.png"
                alt="Chat"
                className="w-10 h-10 object-fill rounded-full"
                width={50}
                height={50}
              />
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />

            {/* Chat Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 md:bottom-6 md:left-auto md:right-6 w-[calc(100vw-1rem)] sm:w-[min(26rem,calc(100vw-2rem))] z-[60] h-auto max-h-[92dvh] bg-[#faf9f6] rounded-lg md:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-3 bg-slate-900 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2">
                      Mujtaba Assistant
                      <span className="text-[10px] sm:text-xs px-1.5 py-0.5 bg-cyan-500/20 text-cyan-400 rounded">AI</span>
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={clearChat}
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                    aria-label="Clear chat history"
                    title="Clear chat history"
                  >
                    <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-400" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                    aria-label="Close chat"
                    title="Close chat"
                  >
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div
                ref={messagesContainerRef}
                onScroll={handleScroll}
                onWheelCapture={preventScrollPropagation}
                onTouchMoveCapture={preventTouchPropagation}
                className="overflow-y-auto overscroll-contain [touch-action:pan-y] px-3 sm:px-4 py-3 sm:py-4 space-y-2.5 sm:space-y-3 bg-[#faf9f6] max-h-[50dvh] sm:max-h-[52dvh] md:max-h-[56dvh]"
              >
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${
                      message.role === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[90%] sm:max-w-[85%] rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-[13px] leading-relaxed ${
                        message.role === "user"
                          ? "bg-slate-900 text-white rounded-br-md"
                          : "bg-white text-slate-800 rounded-bl-md shadow-sm border border-slate-200"
                      }`}
                    >
                      {formatMessage(message.content)}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-start"
                  >
                    <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-slate-200">
                      <div className="flex gap-1.5">
                        <motion.span
                          className="w-2 h-2 bg-slate-400 rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.span
                          className="w-2 h-2 bg-slate-400 rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.span
                          className="w-2 h-2 bg-slate-400 rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Scroll to bottom button */}
              <AnimatePresence>
                {showScrollButton && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onClick={scrollToBottom}
                    className="absolute bottom-28 left-1/2 -translate-x-1/2 p-2 bg-slate-900 text-white rounded-full shadow-lg hover:bg-slate-800 transition-colors z-10"
                      aria-label="Scroll to latest message"
                      title="Scroll to latest message"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Suggested Prompts */}
              {availableSuggestions.length > 0 && !isLoading && (
                <div className="px-3 sm:px-4 py-2.5 bg-[#faf9f6] border-t border-slate-200 shrink-0">
                  <div className="flex items-center gap-2 mb-2 text-slate-500">
                    <Sparkles className="w-4 h-4 text-cyan-500" />
                    <span className="text-[11px] sm:text-xs font-medium">Try these prompts</span>
                  </div>
                  <div className="space-y-2">
                    {availableSuggestions.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handleSuggestedQuestion(prompt)}
                        className="w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-[13px] rounded-xl border border-slate-200 transition-colors shadow-sm"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-2 sm:p-2.5 bg-white border-t border-slate-200">
                {/* Speech Error Message */}
                <AnimatePresence>
                  {speechError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-[11px] sm:text-xs text-red-600"
                    >
                      {speechError}
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="flex items-center gap-1.5 sm:gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      setSpeechError(null); // Clear error on input
                    }}
                    placeholder={isRecording ? "Listening..." : "Type your question..."}
                    className="flex-1 px-3 sm:px-4 py-2 bg-slate-100 border-0 rounded-xl text-xs sm:text-[13px] text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all min-w-0"
                    disabled={isLoading}
                  />
                  {isSpeechSupported && (
                    <button
                      type="button"
                      onClick={toggleRecording}
                      className={`p-2 sm:p-2.5 transition-colors relative ${
                        isRecording
                          ? "text-red-500"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                      disabled={isLoading}
                      aria-label={isRecording ? "Stop voice input" : "Start voice input"}
                      title={isRecording ? "Stop recording" : "Start voice input"}
                    >
                      {isRecording ? (
                        <>
                        <MicOff className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                          {/* Recording indicator ring */}
                          <span className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-30" />
                        </>
                      ) : (
                        <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="p-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Send message"
                    title="Send message"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </form>

                {/* Footer */}
                <div className="flex items-center justify-center gap-1.5 mt-1.5 text-[10px] sm:text-[11px] text-slate-500">
                  <span>Build with</span>
                  <span className="text-red-500">❤</span>
                  <span>by</span>
                  <span className="font-medium text-slate-700">Sheikh Mujtaba</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
