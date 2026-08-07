/* Design: Neon Cortex — Skills with animated bars and category cards */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Brain, BarChart3, Cpu, Globe, Wrench } from "lucide-react";

const skillCategories = [
  {
    icon: Code,
    title: "Python",
    color: "neon-green",
    skills: [
      { name: "NumPy", level: 90 },
      { name: "Pandas", level: 88 },
      { name: "Scikit-learn", level: 85 },
      { name: "Matplotlib", level: 80 },
    ],
  },
  {
    icon: Brain,
    title: "Machine Learning",
    color: "neon-cyan",
    skills: [
      { name: "Supervised Learning", level: 88 },
      { name: "Unsupervised Learning", level: 82 },
      { name: "Deep Learning", level: 78 },
      { name: "NLP", level: 75 },
    ],
  },
  {
    icon: BarChart3,
    title: "Data Analysis",
    color: "neon-amber",
    skills: [
      { name: "Visualization", level: 85 },
      { name: "Statistics", level: 80 },
      { name: "EDA", level: 88 },
      { name: "SQL", level: 72 },
    ],
  },
  {
    icon: Cpu,
    title: "Deep Learning",
    color: "neon-green",
    skills: [
      { name: "TensorFlow", level: 78 },
      { name: "PyTorch", level: 70 },
      { name: "Neural Networks", level: 80 },
      { name: "CNN/RNN", level: 75 },
    ],
  },
  {
    icon: Globe,
    title: "Web Development",
    color: "neon-cyan",
    skills: [
      { name: "React", level: 80 },
      { name: "Node.js", level: 75 },
      { name: "Express", level: 72 },
      { name: "JavaScript", level: 78 },
    ],
  },
  {
    icon: Wrench,
    title: "Tools & Platforms",
    color: "neon-amber",
    skills: [
      { name: "Jupyter", level: 90 },
      { name: "Git", level: 82 },
      { name: "Docker", level: 65 },
      { name: "AWS", level: 60 },
    ],
  },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const colorMap: Record<string, string> = {
    "neon-green": "#00ff88",
    "neon-cyan": "#00d4ff",
    "neon-amber": "#ffb347",
  };

  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-foreground font-medium">{name}</span>
        <span className="text-xs font-mono-tech text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: colorMap[color] }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <div className="min-h-screen py-24 lg:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-4"
        >
          <span className="font-mono-tech text-neon-green text-sm tracking-[0.2em]">03 / SKILLS</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-bold mb-6"
        >
          Technical <span className="text-neon-green">Skills</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground mb-12 text-lg"
        >
          Technologies and tools I work with
        </motion.p>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
              className="bg-card border border-border/50 rounded-lg p-6 card-glow"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-neon-green/10">
                  <category.icon className="w-5 h-5 text-neon-green" />
                </div>
                <h3 className="font-display font-semibold text-lg">{category.title}</h3>
              </div>
              <div>
                {category.skills.map((skill, j) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={category.color}
                    delay={j * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="font-display text-xl font-semibold mb-6">
            Tech <span className="text-neon-cyan">Stack</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {["Python", "TensorFlow", "PyTorch", "Scikit-learn", "NumPy", "Pandas", "React", "Node.js", "Express", "MongoDB", "PostgreSQL", "Git", "Jupyter", "Docker", "AWS", "Firebase"].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full border border-border text-sm font-mono-tech text-muted-foreground hover:border-neon-green/50 hover:text-neon-green transition-colors"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
