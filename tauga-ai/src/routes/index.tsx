import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Cincinnati Hotel — AI-Powered Concierge" },
      { name: "description", content: "Welcome to Cincinnati Hotel. Ask our AI assistant about rooms, pricing, facilities, and more." },
      { property: "og:title", content: "Cincinnati Hotel — AI-Powered Concierge" },
      { property: "og:description", content: "Get instant answers about your stay at Cincinnati Hotel." },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <footer className="py-12 px-6 text-center border-t border-border">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Cincinnati Hotel. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
