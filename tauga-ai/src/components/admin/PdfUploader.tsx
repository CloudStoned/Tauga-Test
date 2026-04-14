import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PdfUploaderProps {
  onUpload: (file: File) => Promise<string>;
}

export function PdfUploader({ onUpload }: PdfUploaderProps) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file.name.endsWith(".pdf")) {
      setMessage({ text: "Please upload a PDF file.", type: "error" });
      return;
    }
    setUploading(true);
    setMessage(null);
    try {
      const result = await onUpload(file);
      setMessage({ text: result, type: "success" });
    } catch {
      setMessage({ text: "Upload failed. Please try again.", type: "error" });
    } finally {
      setUploading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" as const }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <h3 className="font-display text-lg font-semibold text-card-foreground mb-4">Upload PDF</h3>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
        onClick={() => inputRef.current?.click()}
        className={`
          relative cursor-pointer border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 
          ${dragging ? "border-hotel-gold bg-hotel-gold/5" : "border-hotel-gold hover:border-hotel-gold hover:bg-accent/50"}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="12" y2="12" />
            <line x1="15" y1="15" x2="12" y2="12" />
          </svg>
        </div>

        {uploading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-muted-foreground">Uploading…</span>
          </div>
        ) : (
          <>
            <p className="text-sm font-medium text-card-foreground">
              Drop a PDF here or click to browse
            </p>
            <p className="text-xs text-muted-foreground mt-1">PDF files only</p>
          </>
        )}
      </div>

      <AnimatePresence>
        {message && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-3 text-sm font-medium ${message.type === "success" ? "text-green-600" : "text-destructive"}`}
          >
            {message.text}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
