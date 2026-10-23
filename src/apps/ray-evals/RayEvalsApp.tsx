import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Brain, Shield, Code, FileText, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { compilePrompt } from './engine';
import { CompilationResult } from './types';

interface RayEvalsAppProps {
  onBack: () => void;
}

export default function RayEvalsApp({ onBack }: RayEvalsAppProps) {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [result, setResult] = useState<CompilationResult | null>(null);

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen(true);
      }
      if (e.key === 'Escape') {
        setIsPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCompile = async () => {
    if (!inputValue.trim()) return;
    
    setIsCompiling(true);
    setResult(null);
    
    try {
      const compilationResult = await compilePrompt(inputValue);
      setResult(compilationResult);
    } catch (error) {
      console.error('Compilation failed:', error);
    } finally {
      setIsCompiling(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <div className="border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              ← Back to Ecosystem
            </button>
            <div className="h-4 w-px bg-zinc-800" />
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              <h1 className="text-lg font-semibold">RAY-Evals Tools</h1>
            </div>
          </div>
          <button
            onClick={() => setIsPaletteOpen(true)}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-all flex items-center gap-2"
          >
            <span>Open Command Palette</span>
            <kbd className="px-2 py-0.5 rounded bg-zinc-800 text-xs font-mono">⌘K</kbd>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Cognitive Compilation Engine
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Transform rough prompts into enterprise-grade, security-audited, multi-agent orchestrated payloads.
            </p>
          </motion.div>
        </div>

        {/* Demo Input */}
        {!result && !isCompiling && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                Try the Cognitive Pipeline
              </h3>
              <p className="text-sm text-zinc-400 mb-6">
                Enter a rough prompt below and watch the Tier-1 compilation engine transform it into an enterprise-grade payload.
              </p>
              
              <div className="space-y-4">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="e.g., Create a secure login endpoint with JWT authentication and rate limiting"
                  className="w-full h-32 px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 resize-none font-mono text-sm"
                />
                
                <div className="flex gap-3">
                  <button
                    onClick={handleCompile}
                    disabled={!inputValue.trim() || isCompiling}
                    className="flex-1 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-medium transition-all flex items-center justify-center gap-2"
                  >
                    {isCompiling ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Compiling...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        Compile & Optimize
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setIsPaletteOpen(true)}
                    className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium transition-all"
                  >
                    Or use ⌘K
                  </button>
                </div>
              </div>

              {/* Quick Examples */}
              <div className="mt-6 pt-6 border-t border-zinc-800">
                <p className="text-xs text-zinc-500 mb-3">Quick examples:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Build a REST API with authentication',
                    'Create a React component with TypeScript',
                    'Write a SQL query to fetch user data',
                    'Deploy a Node.js app with Docker'
                  ].map((example) => (
                    <button
                      key={example}
                      onClick={() => setInputValue(example)}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800/60 hover:bg-zinc-800 text-xs text-zinc-400 hover:text-zinc-200 transition-all"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Compilation Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Pipeline Stages */}
            <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-400" />
                Compilation Pipeline
              </h3>
              <div className="space-y-3">
                {result.stages.map((stage, index) => (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/60"
                  >
                    <div className="flex-shrink-0">
                      {stage.status === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : stage.status === 'running' ? (
                        <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-zinc-700" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-zinc-200">{stage.name}</span>
                        {stage.duration && (
                          <span className="text-xs text-zinc-500 font-mono">{stage.duration}ms</span>
                        )}
                      </div>
                      {stage.output && (
                        <p className="text-xs text-zinc-500 mt-1">{stage.output}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between text-sm">
                <span className="text-zinc-400">Total Latency</span>
                <span className="font-mono text-purple-400">{result.latency}ms</span>
              </div>
            </div>

            {/* Matched Skills */}
            {result.matchedSkills.length > 0 && (
              <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-400" />
                  Injected Skills ({result.matchedSkills.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.matchedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-sm text-blue-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Agent Execution */}
            {result.agents.length > 0 && (
              <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-emerald-400" />
                  Agent Orchestration
                </h3>
                <div className="space-y-3">
                  {result.agents.map((agent) => (
                    <div
                      key={agent.id}
                      className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {agent.type === 'coder' && <Code className="w-4 h-4 text-emerald-400" />}
                          {agent.type === 'security' && <Shield className="w-4 h-4 text-red-400" />}
                          {agent.type === 'docs' && <FileText className="w-4 h-4 text-blue-400" />}
                          {agent.type === 'planner' && <Brain className="w-4 h-4 text-purple-400" />}
                          <span className="font-medium text-zinc-200">{agent.name}</span>
                        </div>
                        <span className="text-xs px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          {agent.status}
                        </span>
                      </div>
                      {agent.output && (
                        <p className="text-sm text-zinc-400">{agent.output}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Final Output */}
            <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Final Optimized Output
              </h3>
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-sm text-zinc-300 whitespace-pre-wrap overflow-x-auto">
                {result.finalOutput}
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(result.finalOutput);
                  }}
                  className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium transition-all"
                >
                  Copy Output
                </button>
                <button
                  onClick={() => {
                    setResult(null);
                    setInputValue('');
                  }}
                  className="flex-1 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-all"
                >
                  Compile Another
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Command Palette Overlay */}
      <AnimatePresence>
        {isPaletteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsPaletteOpen(false)}
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-2xl rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                  <span className="font-semibold">RAY-Evals Command Palette</span>
                </div>
                <button
                  onClick={() => setIsPaletteOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Input */}
              <div className="p-6">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                      handleCompile();
                      setIsPaletteOpen(false);
                    }
                  }}
                  placeholder="Type your rough prompt here..."
                  className="w-full h-32 px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 resize-none font-mono text-sm"
                  autoFocus
                />
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-zinc-500">
                    Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 font-mono">⌘↵</kbd> to compile
                  </span>
                  <button
                    onClick={() => {
                      handleCompile();
                      setIsPaletteOpen(false);
                    }}
                    disabled={!inputValue.trim()}
                    className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white text-sm font-medium transition-all flex items-center gap-2"
                  >
                    Compile
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
