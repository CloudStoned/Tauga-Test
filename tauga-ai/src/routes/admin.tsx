import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PdfUploader } from "@/components/admin/PdfUploader";
import { TopicChart } from "@/components/admin/TopicChart";
import { StatsCard } from "@/components/admin/StatsCard";
import { AdminLoader } from "@/components/admin/AdminLoader";
import { getStats, uploadPdf } from "@/services/api";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [totalSessions, setTotalSessions] = useState(0);
  const [topics, setTopics] = useState<Record<string, number>>({});
  const [activeFilename, setActiveFilename] = useState("");

  async function fetchStats() {
    setLoading(true);
    try {
      const data = await getStats() as any;
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
            <section className="relative overflow-hidden rounded-[2rem] border border-border bg-card px-6 py-8 shadow-sm sm:px-8 sm:py-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(196,154,78,0.16),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(44,53,78,0.08),transparent_32%)]" />
              <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)] lg:items-end">
                <div className="max-w-2xl space-y-4">
                  <span className="inline-flex items-center rounded-full border border-border bg-background/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground backdrop-blur-sm">
                    Hotel AI Operations
                  </span>
                  <div className="space-y-3">
                    <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                      Manage the knowledge your concierge relies on.
                    </h2>
                    <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                      Upload the latest hotel document, monitor guest conversation volume, and keep your assistant aligned with the most current property information.
                    </p>
                  </div>
                </div>

                <StatsCard
                  label="Total Chat Sessions"
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
              </div>
            </section>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
              <div className="xl:col-span-7 space-y-4">
                <div className="rounded-2xl border border-border bg-card/70 px-5 py-4 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Current knowledge file</p>
                  <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="font-display text-2xl font-semibold text-card-foreground">
                        {activeFilename || "No active file"}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Uploading a new PDF refreshes the knowledge source used by the assistant.
                      </p>
                    </div>
                  </div>
                </div>
                <PdfUploader
                  onUpload={async (file) => {
                    const data = await uploadPdf(file) as any;
                    await fetchStats();
                    return data?.message ?? "PDF uploaded successfully.";
                  }}
                />
              </div>

              <div className="xl:col-span-5">
                <TopicChart topics={topics} />
              </div>
            </section>

            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-card-foreground">Keep insights and source files up to date.</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Refresh the dashboard after content changes to load the latest file and topic activity.
                </p>
              </div>
              <button
                onClick={() => fetchStats()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-hotel-gold brightness-120 px-5 py-2.5 text-sm font-semibold text-hotel-gold-foreground transition-all duration-200 hover:brightness-130 hover:shadow-lg hover:shadow-hotel-gold/25"
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
