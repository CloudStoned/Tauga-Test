import { useState } from "react";
import { motion } from "framer-motion";

interface ContactFormProps {
  onSubmit: (name: string, phone: string, email: string) => Promise<void>;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit(name.trim(), phone.trim(), email.trim());
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition-shadow";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-5 mb-3"
    >
      <h4 className="font-display text-sm font-semibold text-card-foreground mb-1">
        We'd like to help further
      </h4>
      <p className="text-xs text-muted-foreground mb-4">
        Leave your details and we'll get back to you shortly.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Your name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={100}
          className={inputClass}
        />
        <input
          type="tel"
          placeholder="Phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          maxLength={20}
          className={inputClass}
        />
        <input
          type="email"
          placeholder="Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          maxLength={255}
          className={inputClass}
        />
        <button
          type="submit"
          disabled={submitting || !name.trim() || !email.trim()}
          className="w-full py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-xl transition-all duration-200 hover:bg-primary/90 disabled:opacity-50"
        >
          {submitting ? "Sending…" : "Send Contact Info"}
        </button>
      </form>
    </motion.div>
  );
}
