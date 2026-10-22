import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ECOSYSTEM_APPS } from '../data/apps';
import { Layers, ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stationData = [
  {
    id: 'memory',
    title: 'AI Memory Nexus',
    desc: 'Infinite vector storage with sub-12ms retrieval. Your AI models gain persistent neural context that spans sessions, projects, and conversations.',
    visual: 'memory',
  },
  {
    id: 'editor',
    title: 'Smart Notepad Editor',
    desc: 'Markdown powered by autonomous inline ghost-text. A lightning-fast scratchpad with block refactoring and instant local-first persistence.',
    visual: 'editor',
  },
  {
    id: 'eval',
    title: 'Prompt & Eval Studio',
    desc: 'Systematic A/B testing and token cost matrices. Benchmark prompts across 14+ LLMs with real-time quality scoring.',
    visual: 'eval',
  },
  {
    id: 'wiki',
    title: 'LLM Knowledge Wiki',
    desc: 'Self-updating node-linked documentation graphs. Background LLM crawlers synthesize and maintain your knowledge base autonomously.',
    visual: 'wiki',
  },
  {
    id: 'agent',
    title: 'Autonomous Agent Suite',
    desc: 'Collaborative multi-node worker pipelines. Deploy AI agents that plan, execute, verify, and iterate on complex tasks.',
    visual: 'agent',
  },
];

function StationVisual({ type }: { type: string }) {
  switch (type) {
    case 'memory':
      return (
        <div className="relative w-full h-48 md:h-64 rounded-2xl bg-zinc-950/60 border border-zinc-800/60 p-6 overflow-hidden">
          {/* Memory graph visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-purple-500/20 animate-pulse-glow"
                style={{
                  width: `${20 + Math.random() * 40}px`,
                  height: `${20 + Math.random() * 40}px`,
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
              <line x1="20%" y1="30%" x2="60%" y2="50%" stroke="#8b5cf6" strokeWidth="1" />
              <line x1="60%" y1="50%" x2="80%" y2="20%" stroke="#8b5cf6" strokeWidth="1" />
              <line x1="40%" y1="70%" x2="60%" y2="50%" stroke="#8b5cf6" strokeWidth="1" />
            </svg>
          </div>
          <div className="relative z-10 font-mono text-[10px] text-purple-400/60 space-y-1">
            <div>[VECTOR DB] 1,247 nodes indexed</div>
            <div>[RETRIEVAL] avg latency: 8.2ms</div>
            <div>[CONTEXT] 3 sessions linked</div>
          </div>
        </div>
      );
    case 'editor':
      return (
        <div className="relative w-full h-48 md:h-64 rounded-2xl bg-zinc-950/60 border border-zinc-800/60 p-6 overflow-hidden">
          <div className="font-mono text-xs space-y-2 text-zinc-400">
            <div className="text-blue-400"># Project Roadmap</div>
            <div className="text-zinc-300">- Deploy memory nexus <span className="text-emerald-400">✓</span></div>
            <div className="text-zinc-300">- Optimize vector indexing <span className="text-emerald-400">✓</span></div>
            <div className="text-zinc-500 animate-pulse">- Run autonomous agent evaluation loop <span className="text-purple-400">✨</span></div>
          </div>
          <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-purple-600/20 border border-purple-500/30 text-[10px] text-purple-300 font-mono">
            ghost-text active
          </div>
        </div>
      );
    case 'eval':
      return (
        <div className="relative w-full h-48 md:h-64 rounded-2xl bg-zinc-950/60 border border-zinc-800/60 p-6 overflow-hidden">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-500 font-mono">GPT-4o</span>
              <div className="flex-1 mx-3 h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400" />
              </div>
              <span className="text-emerald-400 font-mono">92%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-500 font-mono">Claude 3.5</span>
              <div className="flex-1 mx-3 h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full w-[89%] rounded-full bg-gradient-to-r from-blue-500 to-blue-400" />
              </div>
              <span className="text-blue-400 font-mono">89%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-500 font-mono">Gemini Pro</span>
              <div className="flex-1 mx-3 h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-amber-500 to-amber-400" />
              </div>
              <span className="text-amber-400 font-mono">85%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-500 font-mono">Llama 3</span>
              <div className="flex-1 mx-3 h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-rose-500 to-rose-400" />
              </div>
              <span className="text-rose-400 font-mono">78%</span>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 font-mono text-[10px] text-zinc-500">
            tokens: 128 | cost: $0.003 | quality: 0.94
          </div>
        </div>
      );
    case 'wiki':
      return (
        <div className="relative w-full h-48 md:h-64 rounded-2xl bg-zinc-950/60 border border-zinc-800/60 p-6 overflow-hidden">
          <div className="grid grid-cols-3 gap-2 h-full">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-amber-500/20 bg-amber-500/5 flex items-center justify-center text-[9px] font-mono text-amber-400/60"
              >
                {['Auth', 'API', 'DB', 'UI', 'Test', 'CI', 'Docs', 'Logs', 'Cache'][i]}
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-amber-600/20 border border-amber-500/30 text-[10px] text-amber-300 font-mono">
            1,420 nodes linked
          </div>
        </div>
      );
    case 'agent':
      return (
        <div className="relative w-full h-48 md:h-64 rounded-2xl bg-zinc-950/60 border border-zinc-800/60 p-6 overflow-hidden">
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/60 border border-zinc-800">
              <span className="text-zinc-300">1. Planner Node</span>
              <span className="text-emerald-400 text-[10px]">COMPLETED</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/60 border border-zinc-800">
              <span className="text-zinc-300">2. Executor Node</span>
              <span className="text-purple-400 text-[10px] animate-pulse">RUNNING...</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/60 border border-zinc-800">
              <span className="text-zinc-300">3. Verifier Node</span>
              <span className="text-zinc-500 text-[10px]">PENDING</span>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 font-mono text-[10px] text-rose-400/60">
            success rate: 94.2% | avg steps: 3.4
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default function CinematicScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      
      gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (cards.length - 1),
          end: () => '+=' + (containerRef.current?.offsetWidth || 0),
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="relative">
      {/* Section header before the pinned scroll */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <Layers className="w-5 h-5 text-purple-400" />
          <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold">
            Deep Dive Experience
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-500"
        >
          Built for the AI-native workflow.
        </motion.h2>
      </div>

      {/* Horizontal pinned scroll container */}
      <div ref={containerRef} className="relative h-screen overflow-hidden bg-zinc-950 flex items-center">
        <div className="flex h-full items-center" style={{ width: `${stationData.length * 100}vw` }}>
          {stationData.map((station, index) => (
            <div
              key={station.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="w-screen h-screen flex items-center justify-center px-6 md:px-24 shrink-0 relative"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-zinc-950/80 pointer-events-none" />

              <div className="max-w-4xl w-full p-8 md:p-16 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-2xl relative z-10 shadow-2xl">
                <span className="text-xs font-mono uppercase tracking-widest text-purple-400">
                  0{index + 1} // Ecosystem Module
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-3 mb-6 tracking-tight">
                  {station.title}
                </h2>
                <p className="text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed mb-8">
                  {station.desc}
                </p>

                {/* Visual demo */}
                <StationVisual type={station.visual} />

                <div className="mt-8 flex items-center gap-4">
                  <a
                    href="#sandbox"
                    className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-600/20 flex items-center gap-2"
                  >
                    Launch Interactive Preview
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
