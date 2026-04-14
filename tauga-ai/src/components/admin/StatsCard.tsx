import { motion } from "framer-motion";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

export function StatsCard({ label, value, icon }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" as const }}
      className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4"
    >
      <div className="w-11 h-11 rounded-xl bg-hotel-gold/10 text-hotel-gold flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        <p className="text-2xl font-display font-bold text-card-foreground mt-1">{value}</p>
      </div>
    </motion.div>
  );
}
