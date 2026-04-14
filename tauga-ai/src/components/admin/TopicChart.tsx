import { useMemo } from "react";
import { motion } from "framer-motion";

interface TopicChartProps {
  topics: Record<string, number>;
}

export function TopicChart({ topics }: TopicChartProps) {
  const sorted = useMemo(() => {
    return Object.entries(topics)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8);
  }, [topics]);

  const max = sorted.length > 0 ? sorted[0][1] : 1;

  if (sorted.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-display text-lg font-semibold text-card-foreground mb-4">Top Topics</h3>
        <p className="text-sm text-muted-foreground">No topic data available yet.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" as const }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <h3 className="font-display text-lg font-semibold text-card-foreground mb-6">Top Topics</h3>
      <div className="space-y-4">
        {sorted.map(([topic, count], i) => (
          <div key={topic} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-card-foreground font-medium capitalize">{topic}</span>
              <span className="text-muted-foreground tabular-nums">{count}</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(count / max) * 100}%` }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" as const }}
                className="h-full bg-hotel-gold rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
