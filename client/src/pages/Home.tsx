/* Design: Neon Cortex — Hero with particle network, typewriter greeting, and profile */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const greetings = ["Hello", "مرحبا", "Bonjour", "Hola", "こんにちは", "Ciao", "Привет", "안녕하세요", "Hallo", "你好"];

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const count = 60;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      // Draw connections
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 136, 0.6)";
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      });

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
}

function TypewriterGreeting() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = greetings[index];
    let timeout: NodeJS.Timeout;

    if (!deleting && text === currentWord) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % greetings.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            deleting ? currentWord.slice(0, text.length - 1) : currentWord.slice(0, text.length + 1)
          );
        },
        deleting ? 50 : 100
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index]);

  return (
    <span className="text-neon-green text-glow-green">
      {text}
      <span className="animate-glow-pulse">|</span>
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/manus-storage/hero-bg_3a29a9c6.png"
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <ParticleCanvas />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-4 max-w-3xl mx-auto"
      >
        {/* Profile Photo */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto rounded-full border-2 border-neon-green/50 p-1 shadow-[0_0_30px_rgba(0,255,136,0.2)]">
            <img
              src="/manus-storage/profile-photo_13c7e606.jpeg"
              alt="Marwan Kamal Hafez"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-4"
        >
          <span className="font-mono-tech text-sm tracking-[0.3em] uppercase text-muted-foreground">
            &lt;
            <TypewriterGreeting />
            /&gt;
          </span>
        </motion.div>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-green/30 bg-neon-green/5 text-neon-green text-sm font-mono-tech">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-glow-pulse" />
            Available for work
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
        >
          <span className="text-foreground">Marwan </span>
          <span className="text-neon-green text-glow-green">Kamal Hafez</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-xl text-muted-foreground mb-8 font-mono-tech"
        >
          AI &amp; Machine Learning Engineer
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          <Button
            asChild
            size="lg"
            className="bg-neon-green text-deep-black font-semibold hover:bg-neon-green/90 transition-all"
          >
            <Link href="/contact">Get in touch</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-neon-green/30 text-neon-green hover:bg-neon-green/10 transition-all font-mono-tech"
          >
            <Link href="/projects">View my work</Link>
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center justify-center gap-5"
        >
          <a
            href="https://github.com/MARO00-prj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-neon-green transition-colors"
          >
            <Github size={22} />
          </a>
          <a
            href="https://linkedin.com/in/marwan-kamal-hafez"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-neon-cyan transition-colors"
          >
            <Linkedin size={22} />
          </a>
          <a
            href="mailto:marawankamal382@gmail.com"
            className="text-muted-foreground hover:text-neon-amber transition-colors"
          >
            <Mail size={22} />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <Link href="/about">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-muted-foreground hover:text-neon-green transition-colors"
          >
            <ChevronDown size={24} />
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}
