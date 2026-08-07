/* Design: Neon Cortex — About page with stats and staggered reveal */
import { motion } from "framer-motion";
import { Code2, Brain, BarChart3, Network } from "lucide-react";

const stats = [
  { value: "5+", label: "Projects Completed", icon: Code2 },
  { value: "3+", label: "Years Experience", icon: Brain },
  { value: "100%", label: "Dedication", icon: BarChart3 },
  { value: "3+", label: "ML Frameworks", icon: Network },
];

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  return (
    <div className="min-h-screen py-24 lg:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4"
        >
          <span className="font-mono-tech text-neon-green text-sm tracking-[0.2em]">02 / ABOUT</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="font-display text-4xl md:text-5xl font-bold mb-6"
        >
          About <span className="text-neon-green">Me</span>
        </motion.h1>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 mb-16"
        >
          <p className="text-xl text-neon-cyan font-mono-tech font-medium">
            Passionate about solving complex problems with AI and ML
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg max-w-2xl">
            I am an AI &amp; Machine Learning engineer with a strong foundation in Python and data science.
            I specialize in building intelligent systems and analyzing complex datasets to drive meaningful
            insights. With experience in scikit-learn, TensorFlow, and various ML frameworks, I transform
            ideas into practical solutions.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="card-glow bg-card border border-border/50 rounded-lg p-6 text-center"
            >
              <stat.icon className="w-6 h-6 mx-auto mb-3 text-neon-green" />
              <div className="font-display text-3xl font-bold text-neon-green mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-mono-tech">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <h3 className="font-display text-xl font-semibold mb-6">
            Areas of <span className="text-neon-green">Interest</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Natural Language Processing", desc: "Text classification, sentiment analysis, NLP pipelines" },
              { title: "Computer Vision", desc: "Image recognition, object detection, visual AI systems" },
              { title: "Predictive Analytics", desc: "Time series forecasting, regression models, data-driven decisions" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-dark-card border border-border/30 rounded-lg p-5 card-glow"
              >
                <h4 className="font-display font-semibold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
