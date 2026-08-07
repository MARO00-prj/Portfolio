/* Design: Dark Tech Professional — Animated dark theme with lighting effects */
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Github, Linkedin, Mail, ChevronDown, ExternalLink, Send,
  Code, Brain, BarChart3, Cpu, Globe, Wrench,
  GraduationCap, BookOpen, Copy, Check, MapPin, Briefcase, Languages,
  Menu, X, ArrowUp, Award, Target, TrendingUp, Users, MessageSquare,
  Lightbulb, Star, Zap, XIcon, FileText, MessageCircle
} from "lucide-react";

// ─── Animated Counter (1 second) ───
function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Typewriter greeting in 7 languages ───
function TypewriterGreeting() {
  const greetings = [
    { text: "Hello", lang: "English" },
    { text: "مرحبا", lang: "العربية" },
    { text: "Bonjour", lang: "Français" },
    { text: "Hola", lang: "Español" },
    { text: "Hallo", lang: "Deutsch" },
    { text: "Ciao", lang: "Italiano" },
    { text: "こんにちは", lang: "日本語" },
  ];
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = greetings[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed === current.text) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % greetings.length);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayed(isDeleting
            ? current.text.slice(0, displayed.length - 1)
            : current.text.slice(0, displayed.length + 1));
        },
        isDeleting ? 50 : 100
      );
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, index]);

  return (
    <div className="flex items-center justify-center gap-3 mb-2">
      <span className="font-mono text-lg text-slate-500">
        {displayed}
      </span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
        className="text-blue-400 font-mono text-lg"
      >
        |
      </motion.span>
    </div>
  );
}

// ─── Fade In ───
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── Tech MK Logo ───
function TechLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      {/* Circuit-like hexagon border */}
      <path d="M18 2L31 9.5V24.5L18 32L5 24.5V9.5L18 2Z" stroke="url(#logoGrad)" strokeWidth="1.5" fill="none" />
      {/* Inner circuit lines */}
      <path d="M10 14H14L18 9L22 14H26" stroke="url(#logoGrad)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 22H18L22 22" stroke="url(#logoGrad)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <line x1="18" y1="9" x2="18" y2="22" stroke="url(#logoGrad)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="14" y1="14" x2="14" y2="22" stroke="url(#logoGrad)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="22" y1="14" x2="22" y2="22" stroke="url(#logoGrad)" strokeWidth="1.2" strokeLinecap="round" />
      {/* Node dots */}
      <circle cx="18" cy="9" r="1.5" fill="#3b82f6" />
      <circle cx="14" cy="14" r="1.2" fill="#06b6d4" />
      <circle cx="22" cy="14" r="1.2" fill="#06b6d4" />
      <circle cx="18" cy="22" r="1.5" fill="#3b82f6" />
      <circle cx="14" cy="22" r="1.2" fill="#06b6d4" />
      <circle cx="22" cy="22" r="1.2" fill="#06b6d4" />
    </svg>
  );
}

// ─── Tech Skill Card ───
function TechSkillCard({ icon: Icon, title, skills }: { icon: any; title: string; skills: { name: string; level: number }[] }) {
  return (
    <div className="bg-[#111827] border border-[#1e2a3a] rounded-xl p-5 card-hover">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        <h3 className="font-display font-semibold text-white">{title}</h3>
      </div>
      <div className="space-y-2.5">
        {skills.map((skill) => (
          <div key={skill.name} className="flex items-center justify-between">
            <span className="text-sm text-slate-300">{skill.name}</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-[#1e2a3a] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <span className="text-xs font-mono text-slate-500 w-8 text-right">{skill.level}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Soft Skill Card ───
function SoftSkillCard({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <div className="bg-[#111827] border border-[#1e2a3a] rounded-xl p-5 card-hover group">
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-cyan-500/20 transition-all">
        <Icon className="w-5 h-5 text-blue-400" />
      </div>
      <h4 className="font-display font-semibold text-white mb-2">{title}</h4>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

// ─── Certificate Card (Clickable) ───
function CertificateCard({ name, issuer, year, imageUrl, isPdf, coverImage, pdfUrl }: { name: string; issuer: string; year: string; imageUrl: string; isPdf?: boolean; coverImage?: string; pdfUrl?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="cursor-pointer bg-[#111827] border border-[#1e2a3a] rounded-xl overflow-hidden card-hover group"
      >
        <div className="h-40 relative overflow-hidden">
          {coverImage ? (
            <img src={coverImage} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="h-full bg-gradient-to-br from-blue-500/10 to-cyan-500/5 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/manus-storage/dark-bg_574aeaa2.png')] bg-cover bg-center opacity-30" />
              <Award className="w-12 h-12 text-blue-400/60 relative z-10" />
            </div>
          )}
        </div>
        <div className="p-4">
          <h4 className="font-display font-semibold text-white mb-1">{name}</h4>
          <p className="text-sm text-slate-400">{issuer}</p>
          <span className="inline-block mt-2 px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-xs font-mono">{year}</span>
        </div>
      </motion.div>

      {/* Lightbox */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#111827] border border-[#1e2a3a] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">{name}</h3>
                  <p className="text-slate-400 mt-1">{issuer} · {year}</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <XIcon size={20} className="text-slate-400" />
                </button>
              </div>
              <div className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-xl border border-[#1e2a3a] flex items-center justify-center mb-6 overflow-hidden">
                <img src={coverImage || imageUrl} alt={name} className="max-w-full object-contain rounded-lg" />
              </div>
              <div className="flex gap-3 mt-4">
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors"
                >
                  <ExternalLink size={14} />
                  View Full Size
                </a>
                {pdfUrl && (
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-500 transition-colors"
                  >
                    <FileText size={14} />
                    View PDF
                  </a>
                )}
                <a
                  href={imageUrl}
                  download={`${name.replace(/\s+/g, '_')}_${year}.png`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1e2a3a] text-sm text-slate-300 hover:bg-white/5 transition-colors"
                >
                  <FileText size={14} />
                  Download
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

// ─── Contact Form ───
function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=marawankamal382@gmail.com&su=${subject}&body=${body}`, '_blank');
    setSending(false);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#111827] border border-[#1e2a3a] rounded-xl p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-[#0a0e1a] border border-[#1e2a3a] text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all outline-none"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-[#0a0e1a] border border-[#1e2a3a] text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all outline-none"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Message</label>
          <textarea
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-[#0a0e1a] border border-[#1e2a3a] text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all outline-none resize-none"
            placeholder="Tell me about your project or opportunity..."
          />
        </div>
        <button
          type="submit"
          disabled={sending}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {sending ? (
            "Opening Gmail..."
          ) : sent ? (
            <><Check size={18} /> Gmail Opened!</>
          ) : (
            <><Send size={18} /> Send Message</>
          )}
        </button>
      </div>
    </form>
  );
}

// ─── Data ───
const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

const projects = [
  {
    num: "01",
    title: "Room Management System",
    subtitle: "AASTMT Portal",
    description: "A comprehensive room booking system built for the Arab Academy for Science, Technology & Maritime Transport. Features real-time availability checking, user management, and an intuitive booking interface.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    features: [
      "Room booking with real-time availability checking",
      "User authentication and role-based management",
      "Admin dashboard with analytics and reporting",
      "Responsive design for desktop and mobile",
    ],
    website: "https://api-confection.vercel.app/",
    github: "https://github.com/zahraaabozaid/Hackathon-WebSec.git",
    image: "/manus-storage/Screenshot2026-07-21220511_eb2c30af.png",
    isLight: true,
  },
  {
    num: "02",
    title: "Issues-Reporting Platform",
    subtitle: "CivicPulse",
    description: "A civic technology platform enabling citizens to report local infrastructure issues, vote on priorities, and track resolution progress in real-time.",
    tech: ["React", "Node.js", "Firebase", "Real-time DB"],
    features: [
      "Geolocation-based issue reporting with map integration",
      "Community voting and priority-based issue tracking",
      "Real-time notifications and status updates",
      "Admin dashboard with analytics and reporting",
    ],
    website: "https://civic-final-main.vercel.app/",
    github: "https://github.com/hallamohamad1-design/civic-final.git",
    image: "/manus-storage/Screenshot2026-07-21220548_834baa44.png",
    isLight: false,
  },
];

const techSkillCategories = [
  {
    icon: Code,
    title: "Python",
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
    skills: [
      { name: "Jupyter", level: 90 },
      { name: "Git", level: 82 },
      { name: "Docker", level: 65 },
      { name: "AWS", level: 60 },
    ],
  },
];

const softSkills = [
  { icon: Users, title: "Team Leadership", desc: "Experience leading project teams and coordinating cross-functional development efforts." },
  { icon: MessageSquare, title: "Communication", desc: "Strong ability to translate technical concepts for non-technical stakeholders and clients." },
  { icon: Lightbulb, title: "Problem Solving", desc: "Analytical thinking and creative approaches to complex technical challenges." },
  { icon: Star, title: "Adaptability", desc: "Quick learner who adapts to new technologies and evolving project requirements." },
  { icon: Target, title: "Attention to Detail", desc: "Meticulous approach to code quality, data accuracy, and user experience design." },
  { icon: TrendingUp, title: "Continuous Learning", desc: "Actively pursuing new skills in AI/ML, cloud computing, and modern frameworks." },
];

const educationItems = [
  {
    icon: GraduationCap,
    title: "Arab Academy for Science, Technology & Maritime Transport",
    subtitle: "Bachelor's Degree",
    period: "2024 — Present",
    description: "Pursuing a degree in Computer Science / Engineering with focus on AI and Machine Learning applications.",
  },
  {
    icon: Cpu,
    title: "NTI / Huawei Egyptian Talent Academy",
    subtitle: "Artificial Intelligence (AI)",
    period: "2025",
    description: "Intensive AI training program covering machine learning fundamentals, deep learning architectures, and practical AI applications with real-world datasets.",
  },
  {
    icon: BookOpen,
    title: "NTI — Machine Learning Specialization",
    subtitle: "Certification",
    period: "2025",
    description: "Comprehensive specialization in machine learning covering supervised learning, unsupervised learning, model evaluation, and feature engineering.",
  },
];

const certificates = [
  { name: "Machine Learning", issuer: "NTI", year: "2025", imageUrl: "/manus-storage/ai-certificate_7b1323c4.png", isPdf: false, coverImage: "/manus-storage/ai-certificate_7b1323c4.png", pdfUrl: "/manus-storage/MarwanKamalHafez_fdaa5a1d.pdf" },
  { name: "Artificial Intelligence", issuer: "NTI / Huawei", year: "2025", imageUrl: "/manus-storage/HuaweiCertificate_cf544e8b.webp", isPdf: false, coverImage: "/manus-storage/HuaweiCertificate_cf544e8b.webp" },
];

const techStack = ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "NumPy", "Pandas", "React", "Node.js", "Express", "MongoDB", "PostgreSQL", "Git", "Jupyter", "Docker", "AWS", "Firebase"];

// ─── Main Component ───
export default function SinglePagePortfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);

      const sections = navItems.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, offset: Infinity };
        return { id: item.id, offset: Math.abs(el.getBoundingClientRect().top - 100) };
      });
      const closest = sections.reduce((min, curr) => (curr.offset < min.offset ? curr : min), sections[0]);
      setActiveSection(closest.id);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileNavOpen(false);
  };

  return (
    <div className="bg-[#0a0e1a] text-slate-200">
      {/* ─── Fixed Top Nav ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#0a0e1a]/90 backdrop-blur-lg border-b border-[#1e2a3a]" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2.5">
            <TechLogo />
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? "text-blue-400 bg-blue-500/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors">
            {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* ─── Mobile Nav Overlay ─── */}
      {mobileNavOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="lg:hidden fixed inset-0 z-40 bg-[#0a0e1a]/98 backdrop-blur-md flex flex-col items-center justify-center gap-8"
        >
          {navItems.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => scrollTo(item.id)}
              className={`font-display text-2xl font-medium transition-colors ${
                activeSection === item.id ? "text-blue-400" : "text-slate-400"
              }`}
            >
              {item.label}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* ─── Scroll to Top ─── */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 hover:bg-blue-500 transition-all"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO — Profile photo clearly visible, info below
      ═══════════════════════════════════════════════════════════ */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
        {/* Dark gradient base */}
        <div className="absolute inset-0 hero-gradient" />

        {/* Subtle animated background pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px]" />
          {/* Animated particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Content — Photo first, then info below */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
          {/* Typewriter greeting */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-4"
          >
            <TypewriterGreeting />
          </motion.div>

          {/* Profile Photo — Clear, visible, professional */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="relative mb-6"
          >
            {/* Glow ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 opacity-30 blur-md" />
            <div className="relative">
              <img
                src="/manus-storage/profile-photo_13c7e606.jpeg"
                alt="Marwan Kamal Hafez"
                className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-2 border-blue-500/30 shadow-2xl shadow-blue-500/10"
              />
              {/* Available badge */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-medium backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Available
                </span>
              </div>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent"
          >
            Marwan Kamal Hafez
          </motion.h1>

          {/* Title */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg text-blue-300 mb-2 font-display font-medium"
          >
            AI &amp; Machine Learning Engineer
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-sm text-slate-400 mb-8 max-w-md"
          >
            Building intelligent solutions with data-driven AI systems and modern web technologies
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-6"
          >
            <button
              onClick={() => scrollTo("contact")}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-500 hover:to-blue-400 transition-all text-sm"
            >
              Get in touch
            </button>
            <button
              onClick={() => scrollTo("projects")}
              className="px-5 py-2.5 rounded-lg border border-[#1e2a3a] text-slate-300 font-medium hover:bg-white/5 hover:border-blue-500/30 transition-all text-sm"
            >
              View my work
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex items-center justify-center gap-4"
          >
            <a href="https://github.com/MARO00-prj" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg border border-[#1e2a3a] flex items-center justify-center text-slate-500 hover:text-blue-400 hover:border-blue-500/30 transition-all bg-[#111827]">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/marwan-hafez-55-1710m/?skipRedirect=true" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg border border-[#1e2a3a] flex items-center justify-center text-slate-500 hover:text-blue-400 hover:border-blue-500/30 transition-all bg-[#111827]">
              <Linkedin size={18} />
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=marawankamal382@gmail.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg border border-[#1e2a3a] flex items-center justify-center text-slate-500 hover:text-blue-400 hover:border-blue-500/30 transition-all bg-[#111827]">
              <Mail size={18} />
            </a>
            <a href="https://wa.me/201021437260" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg border border-[#1e2a3a] flex items-center justify-center text-slate-500 hover:text-green-400 hover:border-green-500/30 transition-all bg-[#111827]">
              <MessageCircle size={18} />
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="text-slate-600 cursor-pointer" onClick={() => scrollTo("about")}>
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: ABOUT
      ═══════════════════════════════════════════════════════════ */}
      <section id="about" className="py-24 lg:py-32 px-6 section-alt">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-sm font-mono tracking-[0.2em] uppercase text-blue-400/60 mb-3">About</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-8">Who I Am</h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-slate-300 leading-relaxed mb-4 text-lg">
              I am an AI &amp; Machine Learning engineer with a strong foundation in Python and data science. I specialize in building intelligent systems and analyzing complex datasets to drive meaningful insights.
            </p>
            <p className="text-slate-400 leading-relaxed mb-12">
              With experience in scikit-learn, TensorFlow, and various ML frameworks, I transform ideas into practical, production-ready solutions. My focus areas include natural language processing, computer vision, and predictive analytics.
            </p>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
              {[
                { icon: Code, value: 5, suffix: "+", label: "Projects" },
                { icon: Brain, value: 3, suffix: "+", label: "Years Exp." },
                { icon: Target, value: 100, suffix: "%", label: "Dedication" },
                { icon: Cpu, value: 3, suffix: "+", label: "ML Frameworks" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#111827] rounded-xl p-5 text-center border border-[#1e2a3a] card-hover"
                >
                  <stat.icon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                  <div className="font-display text-2xl md:text-3xl font-bold text-white mb-1">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Areas */}
          <FadeIn delay={0.3}>
            <h3 className="font-display text-xl font-semibold text-white mb-6">Areas of Focus</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { icon: Code, title: "Natural Language Processing", desc: "Text classification, sentiment analysis, NLP pipelines" },
                { icon: Brain, title: "Computer Vision", desc: "Image recognition, object detection, visual AI systems" },
                { icon: TrendingUp, title: "Predictive Analytics", desc: "Time series forecasting, regression models, data-driven decisions" },
              ].map((area) => (
                <div key={area.title} className="bg-[#111827] rounded-xl p-6 border border-[#1e2a3a] card-hover">
                  <area.icon className="w-5 h-5 text-blue-400 mb-3" />
                  <h4 className="font-display font-semibold text-white mb-2">{area.title}</h4>
                  <p className="text-sm text-slate-400">{area.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: TECH SKILLS
      ═══════════════════════════════════════════════════════════ */}
      <section id="skills" className="py-24 lg:py-32 px-6 bg-[#0a0e1a]">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-sm font-mono tracking-[0.2em] uppercase text-blue-400/60 mb-3">Technical Skills</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Tech Expertise</h2>
            <p className="text-slate-400 mb-12 text-lg">Technologies and tools I work with</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {techSkillCategories.map((cat, i) => (
              <FadeIn key={cat.title} delay={i * 0.08}>
                <TechSkillCard icon={cat.icon} title={cat.title} skills={cat.skills} />
              </FadeIn>
            ))}
          </div>

          {/* Tech Stack Tags */}
          <FadeIn delay={0.3}>
            <h3 className="font-display text-lg font-semibold text-white mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span key={tech} className="px-3.5 py-1.5 rounded-lg text-sm border border-[#1e2a3a] bg-[#111827] text-slate-300 font-medium hover:border-blue-500/30 hover:text-blue-400 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: SOFT SKILLS
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 px-6 section-alt">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-sm font-mono tracking-[0.2em] uppercase text-blue-400/60 mb-3">Soft Skills</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Beyond Code</h2>
            <p className="text-slate-400 mb-12 text-lg">Skills that make me effective beyond technical work</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {softSkills.map((skill, i) => (
              <FadeIn key={skill.title} delay={i * 0.08}>
                <SoftSkillCard icon={skill.icon} title={skill.title} desc={skill.desc} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: PROJECTS
      ═══════════════════════════════════════════════════════════ */}
      <section id="projects" className="py-24 lg:py-32 px-6 bg-[#0a0e1a]">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-sm font-mono tracking-[0.2em] uppercase text-blue-400/60 mb-3">Projects</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Featured Work</h2>
            <p className="text-slate-400 mb-16 text-lg">A selection of projects I have built</p>
          </FadeIn>

          <div className="space-y-20">
            {projects.map((project, i) => (
              <FadeIn key={project.num} delay={i * 0.15}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${i % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                  {/* Image */}
                  <div className={`relative group ${i % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <div className={`relative overflow-hidden rounded-xl border border-[#1e2a3a] ${project.isLight ? "bg-white" : "bg-[#111827]"}`}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`w-full h-64 lg:h-72 transition-transform duration-500 group-hover:scale-[1.02] ${project.isLight ? "object-contain p-2" : "object-cover"}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`flex flex-col justify-center ${i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                    <span className="font-mono text-xs tracking-[0.2em] uppercase text-slate-500 mb-2">
                      {project.subtitle}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">{project.title}</h3>
                    <p className="text-slate-400 mb-5 leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded text-xs font-mono border border-[#1e2a3a] bg-[#111827] text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <ul className="space-y-2 mb-6">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-400">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-blue-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex gap-3">
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
                      >
                        <ExternalLink size={14} />
                        Visit Website
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1e2a3a] text-sm font-medium text-slate-300 hover:bg-white/5 hover:border-blue-500/30 transition-all"
                      >
                        <Github size={14} />
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6: EDUCATION
      ═══════════════════════════════════════════════════════════ */}
      <section id="education" className="py-24 lg:py-32 px-6 section-alt">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="text-sm font-mono tracking-[0.2em] uppercase text-blue-400/60 mb-3">Education</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Education</h2>
            <p className="text-slate-400 mb-16 text-lg">Academic background and certifications</p>
          </FadeIn>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-[#1e2a3a]" />
            <div className="space-y-12">
              {educationItems.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.15}>
                  <div className="relative flex gap-6">
                    <div className="relative z-10 w-10 h-10 rounded-full bg-[#0a0e1a] border-2 border-[#1e2a3a] flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="bg-[#111827] border border-[#1e2a3a] rounded-lg p-6 flex-1 card-hover">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <span className="font-mono text-xs tracking-[0.15em] uppercase text-slate-500">
                            {item.subtitle}
                          </span>
                          <h3 className="font-display text-lg font-semibold text-white mt-1">{item.title}</h3>
                        </div>
                        <span className="font-mono text-sm text-slate-400 whitespace-nowrap">{item.period}</span>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed mt-3">{item.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7: CERTIFICATES
      ═══════════════════════════════════════════════════════════ */}
      <section id="certificates" className="py-24 lg:py-32 px-6 bg-[#0a0e1a]">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-sm font-mono tracking-[0.2em] uppercase text-blue-400/60 mb-3">Certificates</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Certifications</h2>
            <p className="text-slate-400 mb-12 text-lg">Click on any certificate to view details</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert, i) => (
              <FadeIn key={cert.name} delay={i * 0.1}>
                <CertificateCard name={cert.name} issuer={cert.issuer} year={cert.year} imageUrl={cert.imageUrl} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 8: CONTACT
      ═══════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-24 lg:py-32 px-6 section-alt">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="text-sm font-mono tracking-[0.2em] uppercase text-blue-400/60 mb-3">Contact</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Send Me a Message</h2>
            <p className="text-slate-400 mb-12 text-lg">Fill the form below and I will get back to you</p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3">
              <FadeIn delay={0.1}>
                <ContactForm />
              </FadeIn>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-4">
              <FadeIn delay={0.2}>
                <div className="bg-[#111827] border border-[#1e2a3a] rounded-xl p-6">
                  <h3 className="font-display text-lg font-semibold text-white mb-4">Or reach me directly</h3>
                  <div className="space-y-4">
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=marawankamal382@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition-colors">
                      <Mail size={18} className="text-blue-400" />
                      <span className="text-sm">marawankamal382@gmail.com</span>
                    </a>
                    <a href="https://github.com/MARO00-prj" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition-colors">
                      <Github size={18} className="text-blue-400" />
                      <span className="text-sm">MARO00-prj</span>
                    </a>
                    <a href="https://www.linkedin.com/in/marwan-hafez-55-1710m/?skipRedirect=true" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition-colors">
                      <Linkedin size={18} className="text-blue-400" />
                      <span className="text-sm">Marwan Hafez</span>
                    </a>
                    <a href="https://wa.me/201021437260" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-green-400 transition-colors">
                      <MessageCircle size={18} className="text-green-400" />
                      <span className="text-sm">+20 102 143 7260</span>
                    </a>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="bg-[#111827] border border-[#1e2a3a] rounded-xl p-6">
                  <h3 className="font-display text-lg font-semibold text-white mb-3">Quick Facts</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-slate-500" />
                      <span className="text-sm text-slate-400">Location:</span>
                      <span className="text-sm text-white">Egypt</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Brain size={16} className="text-slate-500" />
                      <span className="text-sm text-slate-400">Focus:</span>
                      <span className="text-sm text-white">AI / ML Engineering</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Languages size={16} className="text-slate-500" />
                      <span className="text-sm text-slate-400">Languages:</span>
                      <span className="text-sm text-white">Arabic · English</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Footer */}
          <FadeIn delay={0.6}>
            <div className="mt-20 pt-8 border-t border-[#1e2a3a]">
              <p className="text-sm text-slate-500 text-center font-mono">
                Marwan Kamal Hafez · AI &amp; Machine Learning Engineer · Egypt · 2025
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
