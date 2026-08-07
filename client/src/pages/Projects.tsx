/* Design: Neon Cortex — Projects with image cards and professional layout */
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

const projects = [
  {
    num: "01",
    title: "Room Management System",
    subtitle: "AASTMT",
    description:
      "A comprehensive room booking system built for the Arab Academy. Features real-time availability checking, user management, and an intuitive booking interface.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    features: [
      "Room booking system with real-time availability",
      "User authentication and management",
      "Admin dashboard with analytics",
      "Responsive design for all devices",
    ],
    website: "https://api-confection.vercel.app/",
    github: "https://github.com/zahraaabozaid/Hackathon-WebSec.git",
    image: "/manus-storage/Screenshot2026-07-21220511_eb2c30af.png",
    color: "#00ff88",
  },
  {
    num: "02",
    title: "Airport Check-In Management System",
    subtitle: "MAROPORT",
    description:
      "An end-to-end airport check-in management platform handling passenger check-in, flight management, and baggage tracking with real-time updates.",
    tech: ["React", "Express", "PostgreSQL", "REST API"],
    features: [
      "Passenger check-in flow with boarding passes",
      "Real-time flight management and scheduling",
      "Baggage tracking and weight management",
      "Multi-airport support with role-based access",
    ],
    website: "https://marwanport-g2sc.vercel.app/",
    github: "https://github.com/hallamohamad1-design/marwanport.git",
    image: "/manus-storage/project-airport_fce2b5fd.png",
    color: "#00d4ff",
  },
  {
    num: "03",
    title: "Issues-Reporting Platform",
    subtitle: "CivicPulse",
    description:
      "A civic technology platform enabling citizens to report community issues, vote on priorities, and track resolution progress in real-time.",
    tech: ["React", "Node.js", "Firebase", "Real-time DB"],
    features: [
      "Geolocation-based issue reporting",
      "Community voting and prioritization",
      "Real-time updates and notifications",
      "Admin dashboard with analytics",
    ],
    website: "https://civic-final-main.vercel.app/",
    github: "https://github.com/hallamohamad1-design/civic-final.git",
    image: "/manus-storage/project-civicpulse_f1eaa84f.png",
    color: "#ffb347",
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen py-24 lg:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-4"
        >
          <span className="font-mono-tech text-neon-green text-sm tracking-[0.2em]">04 / PROJECTS</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-bold mb-6"
        >
          Featured <span className="text-neon-green">Work</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground mb-16 text-lg"
        >
          A selection of projects I have worked on
        </motion.p>

        {/* Project Cards */}
        <div className="space-y-16">
          {projects.map((project, i) => (
            <motion.div
              key={project.num}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * i + 0.3, duration: 0.6 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="relative group">
                <div
                  className="absolute inset-0 rounded-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle, ${project.color}40, transparent 70%)` }}
                />
                <div className={`relative overflow-hidden rounded-xl border border-border/30 ${project.num === "01" ? "bg-white" : "bg-background"}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-64 lg:h-72 transition-transform duration-500 group-hover:scale-105 ${project.num === "01" ? "object-contain" : "object-cover"}`}
                  />
                  {project.num !== "01" && (
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  )}
                  <div className="absolute bottom-4 left-4 font-mono-tech text-5xl font-bold opacity-20" style={{ color: project.color }}>
                    {project.num}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center">
                <span
                  className="font-mono-tech text-xs tracking-[0.2em] uppercase mb-2"
                  style={{ color: project.color }}
                >
                  {project.subtitle}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded text-xs font-mono-tech border"
                      style={{
                        borderColor: `${project.color}30`,
                        color: project.color,
                        backgroundColor: `${project.color}08`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: project.color }} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Links */}
                <div className="flex gap-3">
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all hover:bg-white/5"
                    style={{ borderColor: `${project.color}40`, color: project.color }}
                  >
                    <ExternalLink size={14} />
                    Website
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
                  >
                    <Github size={14} />
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
