/* Design: Neon Cortex — cyberpunk terminal aesthetic with fixed left nav */
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ReactNode, useState, useEffect } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const navItems = [
  { path: "/", label: "Home", num: "01" },
  { path: "/about", label: "About", num: "02" },
  { path: "/skills", label: "Skills", num: "03" },
  { path: "/projects", label: "Projects", num: "04" },
  { path: "/education", label: "Education", num: "05" },
  { path: "/contact", label: "Contact", num: "06" },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background bg-grid relative">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-20 flex-col items-center py-8 z-50 border-r border-border/50 bg-deep-black/80 backdrop-blur-md">
        {/* Logo */}
        <Link href="/">
          <img
            src="/manus-storage/logo-mark_9ff97183.png"
            alt="MK"
            className="w-10 h-10 mb-12 opacity-80 hover:opacity-100 transition-opacity"
          />
        </Link>

        {/* Nav Items */}
        <nav className="flex-1 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div
                  className={`group relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-neon-green/10 border border-neon-green/30"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <span
                    className={`font-mono-tech text-xs transition-colors duration-200 ${
                      isActive ? "text-neon-green" : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {item.num}
                  </span>
                  {/* Tooltip */}
                  <div className="absolute left-14 px-2 py-1 bg-card rounded text-xs font-mono-tech text-neon-green opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border">
                    {item.label}
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Social Links */}
        <div className="flex flex-col gap-3 mt-auto">
          <a
            href="https://github.com/MARO00-prj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-neon-green transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com/in/marwan-kamal-hafez"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-neon-cyan transition-colors"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:marawankamal382@gmail.com"
            className="text-muted-foreground hover:text-neon-amber transition-colors"
          >
            <Mail size={18} />
          </a>
        </div>
      </aside>

      {/* Mobile Header */}
      <header
        className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-deep-black/90 backdrop-blur-md border-b border-border/50" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/">
            <span className="font-display font-bold text-lg text-neon-green">MK</span>
          </Link>
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="p-2 text-foreground"
          >
            <div className="space-y-1.5">
              <span
                className={`block w-6 h-0.5 bg-neon-green transition-all duration-300 ${
                  mobileNavOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-neon-green transition-all duration-300 ${
                  mobileNavOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-neon-green transition-all duration-300 ${
                  mobileNavOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-40 bg-deep-black/95 backdrop-blur-md"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.path}
                    onClick={() => setMobileNavOpen(false)}
                  >
                    <span
                      className={`font-display text-2xl transition-colors ${
                        location === item.path ? "text-neon-green" : "text-foreground hover:text-neon-green"
                      }`}
                    >
                      <span className="font-mono-tech text-sm text-muted-foreground mr-3">
                        {item.num}
                      </span>
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:ml-20 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
