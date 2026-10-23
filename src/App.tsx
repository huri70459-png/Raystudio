import { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Code2, Zap } from 'lucide-react';
import Navbar from './components/Navbar';
import BentoGrid from './components/BentoGrid';
import CinematicScroll from './components/CinematicScroll';
import SandboxSection from './components/SandboxSection';
import SandboxModal from './components/SandboxModal';
import Footer from './components/Footer';
import CursorRingField from './components/CursorRingField';
import PulsatingBorder from './components/PulsatingBorder';
import { ErrorBoundary } from './components/ErrorBoundary';
import Loading from './components/Loading';
import { initPersistence } from './services/persistenceService';
import { validateConfig } from './config/api';

// Lazy load heavy apps for code splitting
const NotepadApp = lazy(() => import('./apps/notepad/NotepadApp'));
const RayEvalsApp = lazy(() => import('./apps/ray-evals/RayEvalsApp'));

function HeroSection({ onLaunchApp }: { onLaunchApp: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08)_0%,transparent_70%)]" />
      
      {/* Cursor Ring Field - Interactive particle effect */}
      <CursorRingField
        background="transparent"
        colors={{
          items: ["#8b5cf6", "#6366f1", "#3b82f6", "#06b6d4"],
        }}
        style={{ position: "absolute", inset: 0 }}
      />

      {/* Radial overlay for text readability over particles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(9,9,11,0.3)_0%,rgba(9,9,11,0.7)_60%,rgba(9,9,11,0.95)_100%)] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center pointer-events-none">
        {/* Announcement Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-md pointer-events-auto shadow-2xl mb-8"
        >
          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          <span className="text-xs md:text-sm font-medium text-zinc-300">
            Next-Gen AI Application Ecosystem
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
        >
          Engineering the <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">
            AI-Augmented Stack
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          A unified portfolio of autonomous agents, infinite memory graphs, prompt evaluators, and smart editors built for developers.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
        >
          <div className="relative w-full sm:w-auto">
            <PulsatingBorder
              colors={["#8b5cf6", "#6366f1", "#3b82f6"]}
              thickness={1.5}
              radius={50}
              softness={50}
              intensity={20}
              bloom={25}
              spread={16}
              speed={1}
              style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
            />
            <button
              onClick={onLaunchApp}
              className="relative w-full sm:w-auto px-8 py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 group z-10"
            >
              <Zap className="w-4 h-4" />
              Launch Smart Notepad
            </button>
          </div>
          <a
            href="#ecosystem"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-semibold text-sm backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            <Code2 className="w-4 h-4" />
            Explore Ecosystem
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
            { value: '<12ms', label: 'Latency' },
            { value: '10K+', label: 'Developers' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
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
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Scroll</span>
          <ArrowDown className="w-4 h-4 text-zinc-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}

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
    <section className="relative py-20 border-t border-zinc-800/40">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Built With</p>
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
              className="px-4 py-2.5 rounded-xl bg-zinc-900/40 border border-zinc-800/60 text-sm text-zinc-400 hover:text-zinc-200 transition-colors cursor-default backdrop-blur-sm"
            >
              <span className="font-medium">{tech.name}</span>
              <span className="text-zinc-600 ml-2 text-xs">{tech.category}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [currentApp, setCurrentApp] = useState<'landing' | 'notepad' | 'ray-evals'>('landing');
  const [configError, setConfigError] = useState<string | null>(null);

  // Initialize services and validate config
  useEffect(() => {
    // Initialize persistence service
    initPersistence({
      enableCloudSync: false, // Enable when backend is ready
    });

    // Validate configuration
    const validation = validateConfig();
    if (!validation.valid) {
      setConfigError(validation.errors[0]);
      console.warn('Configuration warnings:', validation.errors);
    }

    // Check URL hash for direct app navigation
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#notepad') {
        setCurrentApp('notepad');
      } else if (window.location.hash === '#ray-evals') {
        setCurrentApp('ray-evals');
      }
    }
  }, []);

  // Error handler for error boundary
  const handleError = (error: Error, errorInfo: any) => {
    console.error('App error:', error, errorInfo);
    // In production, send to error tracking service
  };

  // If we're in an app, render it with lazy loading and error boundary
  if (currentApp === 'notepad') {
    return (
      <ErrorBoundary onError={handleError}>
        <Suspense fallback={<Loading fullScreen text="Loading Smart Notepad..." />}>
          <NotepadApp onBack={() => {
            setCurrentApp('landing');
            window.location.hash = '';
          }} />
        </Suspense>
      </ErrorBoundary>
    );
  }

  if (currentApp === 'ray-evals') {
    return (
      <ErrorBoundary onError={handleError}>
        <Suspense fallback={<Loading fullScreen text="Loading RAY-Evals..." />}>
          <RayEvalsApp onBack={() => {
            setCurrentApp('landing');
            window.location.hash = '';
          }} />
        </Suspense>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary onError={handleError}>
      <div className="relative min-h-screen bg-zinc-950 text-zinc-100">
        {/* Config warning banner */}
        {configError && (
          <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500/10 border-b border-amber-500/30 px-4 py-2 text-center text-xs text-amber-300">
            ⚠️ {configError}. Some features may use mock data.
          </div>
        )}
        
        <Navbar />
        <HeroSection onLaunchApp={() => setCurrentApp('notepad')} />
        <BentoGrid onOpenApp={(appId) => {
          if (appId === 'notepad-editor') {
            setCurrentApp('notepad');
          } else if (appId === 'prompt-eval') {
            setCurrentApp('ray-evals');
          }
        }} />
        <TechStackSection />
        <CinematicScroll />
        <SandboxSection onOpenSandbox={() => setIsSandboxOpen(true)} />
        <Footer />
        
        {/* Sandbox Modal */}
        <SandboxModal
          isOpen={isSandboxOpen}
          onClose={() => setIsSandboxOpen(false)}
        />
      </div>
    </ErrorBoundary>
  );
}
