import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PdfUploader } from "@/components/admin/PdfUploader";
import { StatsCard } from "@/components/admin/StatsCard";
import { TopicChart } from "@/components/admin/TopicChart";
import { AdminLoader } from "@/components/admin/AdminLoader";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Cincinnati Hotel" },
      { name: "description", content: "Manage your hotel AI assistant, upload PDFs, and view analytics." },
    ],
  }),
});

function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [totalSessions, setTotalSessions] = useState(0);
  const [topics, setTopics] = useState<Record<string, number>>({});
  const [activeFilename, setActiveFilename] = useState("");

  async function fetchStats() {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/stats`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );
      const data = await res.json();
      setTotalSessions(data?.totalSessions ?? 0);
      setTopics(data?.topics ?? {});
      setActiveFilename(data?.activeFilename ?? "");
    } catch {
      // silently fail — stats will show 0
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-display text-xl font-semibold text-foreground">Admin Dashboard</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Cincinnati Hotel</p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground rounded-lg transition-colors hover:text-foreground hover:bg-accent"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Exit
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        {loading ? (
          <AdminLoader />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatsCard
                label="Total Sessions"
                value={totalSessions}
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                }
              />
              <StatsCard
                label="Topics Tracked"
                value={Object.keys(topics).length}
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                }
              />
              <StatsCard
                label="Active File"
                value={activeFilename || "None"}
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                }
              />
            </div>

            {/* Upload + Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PdfUploader
                onUpload={async (file) => {
                  const formData = new FormData();
                  formData.append("pdf", file);
                  const res = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/api/upload-pdf`,
                    { method: "POST", body: formData }
                  );
                  const data = await res.json();
                  if (res.ok) {
                    fetchStats();
                    return data?.message ?? "PDF uploaded successfully.";
                  }
                  throw new Error(data?.message ?? "Upload failed");
                }}
              />
              <TopicChart topics={topics} />
            </div>

            {/* Refresh */}
            <div className="flex justify-end">
              <button
                onClick={() => fetchStats()}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-xl transition-all duration-200 hover:bg-primary/90 hover:shadow-md"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                Refresh Stats
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
