import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatBubble } from "@/components/chat/ChatBubble";
import { ChatInput } from "@/components/chat/ChatInput";
import { ContactForm } from "@/components/chat/ContactForm";
import { sendMessage, submitContact } from "@/services/api";

interface Message {
  sender: "user" | "bot";
  text: string;
}

function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3">
      <div className="w-8 h-8 rounded-full bg-hotel-gold/10 text-hotel-gold flex items-center justify-center shrink-0 mr-2.5 mt-1 text-xs font-bold">
        CH
      </div>
      <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}

export default function ChatPage() {
  const navigate = useNavigate();

  const [sessionId] = useState(() => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return String(Date.now());
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! Welcome to Cincinnati Hotel. How can I help you today?",
    },
  ]);

  const [waiting, setWaiting] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const unansweredQuestion = useMemo(() => {
    if (!messages.length) return "";
    const lastUser = [...messages].reverse().find((m) => m.sender === "user");
    return lastUser?.text || "";
  }, [messages]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, waiting]);

  async function handleSend(message: string) {
    setWaiting(true);
    setShowContact(false);
    setMessages((prev) => [...prev, { sender: "user", text: message }]);

    try {
      const data = await sendMessage(sessionId, message) as any;
      console.log("sendMessage response:", data);

      if (data.output?.offer_contact_form) {
        setShowContact(true);
        return;
      }

      const botText = data.output?.message;
      setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry — something went wrong. Please try again shortly." },
      ]);
    } finally {
      setWaiting(false);
    }
  }

  async function handleContactSubmit(name: string, phone: string, email: string) {
    await submitContact(name, phone, email, messages, unansweredQuestion);

    setShowContact(false);
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "Thanks! We received your details and will get back to you shortly." },
    ]);
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="shrink-0 bg-background/80 backdrop-blur-xl border-b border-border z-10">
        <div className="mx-auto max-w-3xl flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Back"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <div>
              <h1 className="font-display text-base font-semibold text-foreground leading-tight">
                Cincinnati Hotel
              </h1>
              <p className="text-xs text-muted-foreground">AI Concierge</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-chart-2 rounded-full" />
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto" ref={listRef}>
        <div className="mx-auto max-w-3xl px-4 py-6">
          {messages.map((m, idx) => (
            <ChatBubble key={idx} sender={m.sender} text={m.text} />
          ))}

          {waiting && <TypingIndicator />}

          {showContact && (
            <ContactForm
              onSubmit={(name, phone, email) =>
                handleContactSubmit(name, phone, email)
              }
            />
          )}
        </div>
      </div>

      <div className="shrink-0 border-t border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl px-4 py-3">
          <ChatInput onSend={handleSend} disabled={waiting} />
        </div>
      </div>
    </div>
  );
}
