import { motion } from 'framer-motion';
import { Terminal, Cpu } from 'lucide-react';
import PulsatingBorder from './PulsatingBorder';

interface SandboxSectionProps {
  onOpenSandbox: () => void;
}

export default function SandboxSection({ onOpenSandbox }: SandboxSectionProps) {
  return (
    <section id="sandbox" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Terminal className="w-5 h-5 text-purple-400" />
            <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold">Interactive Sandbox</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-500 mb-4">
            Try it right now.
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base">
            Experience the power of our AI stack. Click below to open the interactive sandbox and test each tool in real-time.
          </p>
        </motion.div>

        {/* Sandbox Trigger Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-3xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-6 py-4 border-b border-zinc-800">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
              <span className="ml-3 text-xs text-zinc-500 font-mono">nexus-ai-sandbox</span>
              <div className="ml-auto flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-purple-400/50" />
                <span className="text-[10px] text-zinc-500 font-mono">v2.4.1</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 mb-6">
                <Terminal className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                Launch Interactive Sandbox
              </h3>
              <p className="text-zinc-400 text-sm mb-8 max-w-md mx-auto">
                Test all 5 AI tools in a unified interactive environment. Query memory, trigger ghost-text, benchmark prompts, and more.
              </p>
              <div className="relative inline-block">
                <PulsatingBorder
                  colors={["#8b5cf6", "#ec4899", "#3b82f6"]}
                  thickness={2}
                  radius={50}
                  softness={60}
                  intensity={28}
                  bloom={35}
                  spread={18}
                  speed={1.5}
                  style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
                />
                <button
                  onClick={onOpenSandbox}
                  className="relative px-8 py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-600/25 flex items-center gap-2 z-10"
                >
                  <Terminal className="w-4 h-4" />
                  Open Sandbox
                </button>
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                {['Vector Search', 'Ghost-text', 'Prompt Eval', 'Wiki Graph', 'Agent Pipeline'].map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1.5 rounded-full bg-zinc-800/60 border border-zinc-700/50 text-xs text-zinc-400"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
