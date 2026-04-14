import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hotel-hero.jpg";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Cincinnati Hotel elegant lobby"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
        >
          <span className="inline-block text-hotel-gold text-sm font-medium tracking-widest uppercase mb-6">
            Welcome to
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Cincinnati Hotel
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-xl mx-auto leading-relaxed">
            Ask our AI assistant anything about our hotel — rooms, pricing, facilities, and more.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/admin"
              className="px-8 py-3.5 bg-hotel-gold text-hotel-gold-foreground font-semibold rounded-xl text-sm transition-all duration-200 hover:brightness-110 hover:shadow-lg hover:shadow-hotel-gold/25"
            >
              Admin
            </Link>
            <Link
              to="/chat"
              className="px-8 py-3.5 bg-primary-foreground/15 text-primary-foreground font-semibold rounded-xl text-sm backdrop-blur-sm border border-primary-foreground/20 transition-all duration-200 hover:bg-primary-foreground/25"
            >
              Regular User
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
