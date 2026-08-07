/* Design: Neon Cortex — Education timeline with animated entries */
import { motion } from "framer-motion";
import { GraduationCap, Cpu, BookOpen, ExternalLink } from "lucide-react";

const educationItems = [
  {
    icon: GraduationCap,
    title: "Arab Academy for Science, Technology & Maritime Transport",
    subtitle: "Currently Studying",
    period: "2024 — Present",
    description:
      "Pursuing a degree in Computer Science / Engineering with focus on AI and Machine Learning applications.",
    color: "#00ff88",
  },
  {
    icon: Cpu,
    title: "NTI / Huawei Egyptian Talent Academy",
    subtitle: "Artificial Intelligence (AI)",
    period: "2025",
    description:
      "Intensive AI training program covering machine learning fundamentals, deep learning architectures, and practical AI applications. Hands-on projects with real-world datasets.",
    color: "#00d4ff",
    hasLink: true,
    link: "#",
  },
  {
    icon: BookOpen,
    title: "NTI — Machine Learning Specialization",
    subtitle: "Certification",
    period: "2023",
    description:
      "Comprehensive specialization in machine learning covering supervised learning, unsupervised learning, model evaluation, and feature engineering.",
    color: "#ffb347",
  },
];

export default function Education() {
  return (
    <div className="min-h-screen py-24 lg:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-4"
        >
          <span className="font-mono-tech text-neon-green text-sm tracking-[0.2em]">05 / EDUCATION</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-bold mb-6"
        >
          Education
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground mb-16 text-lg"
        >
          My academic background and certifications
        </motion.p>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-neon-green/50 via-neon-cyan/50 to-neon-amber/50" />

          <div className="space-y-12">
            {educationItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 * i + 0.3, duration: 0.5 }}
                className="relative flex gap-6"
              >
                {/* Timeline dot */}
                <div
                  className="relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0"
                  style={{
                    borderColor: item.color,
                    backgroundColor: `${item.color}10`,
                  }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>

                {/* Content */}
                <div className="bg-card border border-border/50 rounded-lg p-6 flex-1 card-glow">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <span
                        className="font-mono-tech text-xs tracking-[0.15em] uppercase"
                        style={{ color: item.color }}
                      >
                        {item.subtitle}
                      </span>
                      <h3 className="font-display text-xl font-semibold mt-1">{item.title}</h3>
                    </div>
                    <span className="font-mono-tech text-sm text-muted-foreground whitespace-nowrap">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-3">
                    {item.description}
                  </p>
                  {item.hasLink && (
                    <a
                      href={item.link}
                      className="inline-flex items-center gap-1 mt-3 text-xs font-mono-tech text-neon-cyan hover:underline"
                    >
                      <ExternalLink size={12} />
                      View Certificate
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-20"
        >
          <h3 className="font-display text-xl font-semibold mb-6">
            Skills <span className="text-neon-green">Certifications</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Machine Learning", issuer: "NTI", year: "2023" },
              { name: "Artificial Intelligence", issuer: "NTI / Huawei", year: "2025" },
            ].map((cert) => (
              <div
                key={cert.name}
                className="bg-dark-card border border-border/30 rounded-lg p-4 flex items-center gap-4 card-glow"
              >
                <div className="w-12 h-12 rounded-lg bg-neon-green/10 flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-neon-green" />
                </div>
                <div>
                  <h4 className="font-display font-semibold">{cert.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {cert.issuer} · {cert.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
