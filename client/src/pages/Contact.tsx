/* Design: Neon Cortex — Contact page with social links and info cards */
import { motion } from "framer-motion";
import { Mail, Github, MessageCircle, Linkedin, Copy, Check } from "lucide-react";
import { useState } from "react";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "marawankamal382@gmail.com",
    href: "mailto:marawankamal382@gmail.com",
    color: "#00ff88",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "MARO00-prj",
    href: "https://github.com/MARO00-prj",
    color: "#00d4ff",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+201021437260",
    href: "https://wa.me/201021437260",
    color: "#ffb347",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Marwan Kamal Hafez",
    href: "https://linkedin.com/in/marwan-kamal-hafez",
    color: "#00ff88",
  },
];

const quickFacts = [
  { label: "Location", value: "Egypt" },
  { label: "Focus", value: "AI / ML Engineering" },
  { label: "Preferred Stack", value: "Python · Scikit-learn" },
  { label: "Languages", value: "Arabic · English" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("marawankamal382@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen py-24 lg:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-4"
        >
          <span className="font-mono-tech text-neon-green text-sm tracking-[0.2em]">06 / CONTACT</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-bold mb-6"
        >
          Get In <span className="text-neon-green">Touch</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground mb-16 text-lg"
        >
          Reach out for collaboration or inquiries
        </motion.p>

        {/* Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12 p-4 rounded-lg border border-neon-green/20 bg-neon-green/5"
        >
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-neon-green animate-glow-pulse" />
            <span className="font-mono-tech text-sm text-neon-green">
              Currently available — Open to internships, freelance AI/ML projects, and full-time junior roles.
            </span>
          </div>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * i + 0.4 }}
              className="group flex items-center gap-4 p-5 rounded-lg border border-border/50 bg-card hover:border-opacity-100 transition-all card-glow"
              style={{ borderColor: `${link.color}15` }}
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${link.color}10` }}
              >
                <link.icon className="w-5 h-5" style={{ color: link.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-mono-tech text-muted-foreground">{link.label}</div>
                <div className="font-medium truncate" style={{ color: link.color }}>
                  {link.value}
                </div>
              </div>
              <span className="text-muted-foreground group-hover:translate-x-1 transition-transform">
                →
              </span>
            </motion.a>
          ))}
        </div>

        {/* Quick Facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <h3 className="font-display text-xl font-semibold mb-6">
            Quick <span className="text-neon-cyan">Facts</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="flex items-center gap-3 p-4 rounded-lg bg-dark-card border border-border/30"
              >
                <span className="font-mono-tech text-xs text-muted-foreground uppercase tracking-wider min-w-[100px]">
                  {fact.label}
                </span>
                <span className="text-foreground font-medium">{fact.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Copy Email */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-neon-green/30 text-neon-green font-mono-tech text-sm hover:bg-neon-green/10 transition-all"
          >
            {copied ? (
              <>
                <Check size={14} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy email address
              </>
            )}
          </button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-20 pt-8 border-t border-border/30"
        >
          <p className="text-sm text-muted-foreground font-mono-tech text-center">
            Marwan Kamal Hafez · AI &amp; Machine Learning Engineer · Egypt · 2025
          </p>
        </motion.div>
      </div>
    </div>
  );
}
