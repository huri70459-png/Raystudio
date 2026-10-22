import { motion } from 'framer-motion';
import { useState } from 'react';
import { Terminal, Send, Sparkles, Cpu, ArrowRight } from 'lucide-react';

const samplePrompts = [
  'Explain quantum computing in simple terms',
  'Write a haiku about artificial intelligence',
  'Summarize the key ideas in this research paper',
  'Generate a Python function to sort a linked list',
];

export default function SandboxSection() {
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    setIsProcessing(true);
    setShowResult(false);
    setTimeout(() => {
      setIsProcessing(false);
      setShowResult(true);
    }, 2000);
  };

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
            <Terminal className="w-5 h-5 text-nexus-400" />
            <span className="text-sm font-medium text-nexus-400 uppercase tracking-wider">Interactive Sandbox</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Try it <span className="gradient-text">right now.</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            Experience the power of our AI stack. Type a prompt and watch the ecosystem respond.
          </p>
        </motion.div>

        {/* Sandbox Interface */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-strong rounded-3xl overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-6 py-4 border-b border-white/[0.06]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
              <span className="ml-3 text-xs text-white/30 font-mono">nexus-ai-sandbox</span>
              <div className="ml-auto flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-nexus-400/50" />
                <span className="text-[10px] text-white/30 font-mono">v2.4.1</span>
              </div>
            </div>

            {/* Content area */}
            <div className="p-6 md:p-8">
              {/* Quick prompts */}
              <div className="flex flex-wrap gap-2 mb-6">
                {samplePrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => setInputValue(prompt)}
                    className="px-3 py-1.5 text-xs rounded-full bg-white/[0.04] text-white/50 border border-white/[0.06] hover:bg-white/[0.08] hover:text-white/70 transition-all duration-200"
                  >
                    {prompt.length > 30 ? prompt.slice(0, 30) + '...' : prompt}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="relative mb-6">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="Ask anything..."
                  className="w-full px-5 py-4 pr-14 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/20 focus:outline-none focus:border-nexus-500/50 focus:ring-1 focus:ring-nexus-500/20 transition-all duration-300"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!inputValue.trim() || isProcessing}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-nexus-600/80 hover:bg-nexus-500/80 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Processing state */}
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3 py-4"
                >
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-nexus-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-nexus-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-nexus-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-sm text-white/40">Processing through AI Memory → Smart Notepad → Prompt Eval...</span>
                </motion.div>
              )}

              {/* Result */}
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-nexus-400" />
                    <span className="text-xs font-medium text-nexus-400">NexusAI Response</span>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    This is a demo response showcasing the integrated AI pipeline. In production, your prompt would flow through our Memory system for context, be processed by the Smart Notepad for structured output, and evaluated by our Prompt Evaluator for quality assurance.
                  </p>
                  <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/[0.06]">
                    <span className="text-[10px] text-white/30 font-mono">tokens: 142</span>
                    <span className="text-[10px] text-white/30 font-mono">latency: 234ms</span>
                    <span className="text-[10px] text-emerald-400/60 font-mono">quality: 0.94</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* CTA below sandbox */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <a
              href="#"
              className="group flex items-center gap-2 px-6 py-3 rounded-full bg-nexus-600/80 hover:bg-nexus-500/80 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-nexus-500/20"
            >
              Get Full Access
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-6 py-3 rounded-full glass text-white/60 hover:text-white/80 font-medium transition-all duration-300"
            >
              View Documentation
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
