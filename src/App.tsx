import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Code2, Zap } from 'lucide-react';
import Navbar from './components/Navbar';
import BentoGrid from './components/BentoGrid';
import CinematicScroll from './components/CinematicScroll';
import SandboxSection from './components/SandboxSection';
import Footer from './components/Footer';

// Lazy load the 3D canvas for performance
const HeroCanvas = lazy(() => import('./components/HeroCanvas'));

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-nexus-950/20 to-black" />
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(92,124,250,0.08)_0%,transparent_70%)]" />
      
      {/* 3D Canvas */}
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-nexus-400" />
          <span className="text-xs font-medium text-white/60">Introducing the NexusAI Ecosystem</span>
          <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-nexus-500/20 text-nexus-400 border border-nexus-500/30">
            v2.0
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="text-white">Engineering the</span>
          <br />
          <span className="gradient-text">AI Stack</span>
          <span className="text-white"> for the</span>
          <br />
          <span className="text-white">Next Generation</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Five powerful AI tools — memory, writing, evaluation, knowledge, and automation — 
          unified under one roof. Build smarter, faster, together.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#ecosystem"
            className="group relative px-8 py-4 rounded-full bg-nexus-600/80 hover:bg-nexus-500/80 text-white font-medium transition-all duration-300 hover:shadow-xl hover:shadow-nexus-500/20 flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Explore Ecosystem
          </a>
          <a
            href="#sandbox"
            className="group px-8 py-4 rounded-full glass hover:bg-white/[0.06] text-white/80 hover:text-white font-medium transition-all duration-300 flex items-center gap-2"
          >
            <Code2 className="w-4 h-4" />
            Try Live Demos
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex items-center justify-center gap-8 md:gap-12 mt-16"
        >
          {[
            { value: '5', label: 'AI Tools' },
            { value: '99.9%', label: 'Uptime' },
            { value: '<100ms', label: 'Latency' },
            { value: '10K+', label: 'Developers' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/30 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-white/20 uppercase tracking-wider">Scroll</span>
          <ArrowDown className="w-4 h-4 text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Metrics/tech stack section
function TechStackSection() {
  const technologies = [
    { name: 'React', category: 'Frontend' },
    { name: 'Three.js', category: '3D Graphics' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'Framer Motion', category: 'Animation' },
    { name: 'GSAP', category: 'Scroll' },
    { name: 'Node.js', category: 'Runtime' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Redis', category: 'Cache' },
    { name: 'Docker', category: 'Infra' },
  ];

  return (
    <section className="relative py-20 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm text-white/30 uppercase tracking-wider mb-2">Built With</p>
          <h3 className="text-2xl font-bold text-white">Modern Stack. Maximum Performance.</h3>
        </motion.div>
        
        <div className="flex flex-wrap items-center justify-center gap-3">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-4 py-2.5 rounded-xl glass text-sm text-white/50 hover:text-white/80 transition-colors cursor-default"
            >
              <span className="font-medium">{tech.name}</span>
              <span className="text-white/20 ml-2 text-xs">{tech.category}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-black noise-overlay">
      <Navbar />
      <HeroSection />
      <BentoGrid />
      <TechStackSection />
      <CinematicScroll />
      <SandboxSection />
      <Footer />
    </div>
  );
}
