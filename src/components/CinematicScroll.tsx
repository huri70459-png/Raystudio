import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { apps } from '../data/apps';
import { Code2, Layers, Sparkles } from 'lucide-react';

function ScrollStation({ app, index }: { app: typeof apps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  const Icon = app.icon;

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center relative py-20">
      <motion.div
        style={{ opacity, y, scale }}
        className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        {/* Visual */}
        <div className="relative order-2 md:order-1">
          <div className="relative aspect-square max-w-md mx-auto">
            {/* Background glow */}
            <div
              className="absolute inset-0 rounded-3xl blur-3xl opacity-20"
              style={{ backgroundColor: app.color }}
            />
            
            {/* Main card */}
            <div className="relative glass rounded-3xl p-8 h-full flex flex-col items-center justify-center">
              {/* Animated rings */}
              <div className="absolute inset-8 rounded-full border border-white/[0.05] animate-pulse-glow" />
              <div className="absolute inset-16 rounded-full border border-white/[0.03] animate-pulse-glow" style={{ animationDelay: '1s' }} />
              
              {/* Icon */}
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 relative"
                style={{ backgroundColor: `${app.color}15` }}
              >
                <Icon className="w-10 h-10" style={{ color: app.color }} />
                <div
                  className="absolute inset-0 rounded-2xl blur-xl opacity-30"
                  style={{ backgroundColor: app.color }}
                />
              </div>

              {/* Simulated UI */}
              <div className="w-full space-y-3">
                <div className="flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-2 rounded-full"
                      style={{
                        width: `${60 + Math.random() * 40}%`,
                        backgroundColor: `${app.color}${20 + i * 10}`,
                      }}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className="h-2 rounded-full"
                      style={{
                        width: `${40 + Math.random() * 30}%`,
                        backgroundColor: `rgba(255,255,255,${0.05 + i * 0.02})`,
                      }}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg"
                      style={{
                        backgroundColor: `${app.color}${10 + (i % 3) * 5}`,
                        opacity: 0.5 + (i % 3) * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="order-1 md:order-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-mono text-white/30">0{index + 1}</span>
            <div className="w-8 h-px bg-white/20" />
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: app.color }}>
              {app.tagline}
            </span>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {app.name}
          </h3>
          
          <p className="text-lg text-white/50 leading-relaxed mb-8">
            {app.description}
          </p>

          <div className="grid grid-cols-2 gap-3">
            {app.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: app.color }}
                />
                <span className="text-sm text-white/60">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function CinematicScroll() {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = -rect.top / (rect.height - window.innerHeight);
      const section = Math.min(Math.floor(progress * apps.length), apps.length - 1);
      setActiveSection(Math.max(0, section));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="experience" ref={containerRef} className="relative">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <Layers className="w-5 h-5 text-nexus-400" />
          <span className="text-sm font-medium text-nexus-400 uppercase tracking-wider">Deep Dive</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-white mb-4"
        >
          Built for the{' '}
          <span className="gradient-text-warm">AI-native workflow.</span>
        </motion.h2>
      </div>

      {/* Progress indicator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-3">
        {apps.map((app, index) => (
          <div
            key={app.id}
            className="relative group"
          >
            <div
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                activeSection === index ? 'scale-150' : 'scale-100 opacity-40'
              }`}
              style={{ backgroundColor: activeSection === index ? app.color : 'rgba(255,255,255,0.3)' }}
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              <span className="text-xs text-white/60 bg-black/80 px-2 py-1 rounded">{app.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll stations */}
      {apps.map((app, index) => (
        <ScrollStation key={app.id} app={app} index={index} />
      ))}
    </section>
  );
}
