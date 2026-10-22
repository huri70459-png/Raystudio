import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, RefreshCw, CheckCircle2, Sparkles, Terminal } from 'lucide-react';

interface SandboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAppId?: string;
}

export default function SandboxModal({ isOpen, onClose, initialAppId = 'ai-memory' }: SandboxModalProps) {
  const [activeTab, setActiveTab] = useState(initialAppId);

  // Sandbox state trackers
  const [memoryQuery, setMemoryQuery] = useState('Find context on user auth flow');
  const [memoryLoading, setMemoryLoading] = useState(false);
  const [memoryResults, setMemoryResults] = useState(false);

  const [notepadText, setNotepadText] = useState('# Project Roadmap\n- Deploy memory nexus\n- Optimize vector indexing');
  const [isGhostTextActive, setIsGhostTextActive] = useState(false);

  const [promptText, setPromptText] = useState('Summarize the following codebase into 3 bullet points.');
  const [evaluating, setEvaluating] = useState(false);
  const [evalResult, setEvalResult] = useState<string | null>(null);

  const handleRunMemorySearch = () => {
    setMemoryLoading(true);
    setMemoryResults(false);
    setTimeout(() => {
      setMemoryLoading(false);
      setMemoryResults(true);
    }, 800);
  };

  const handleTriggerGhostText = () => {
    setIsGhostTextActive(true);
    setTimeout(() => {
      setNotepadText((prev) => prev + '\n- Run autonomous agent evaluation loop 🚀');
      setIsGhostTextActive(false);
    }, 600);
  };

  const handleRunEval = () => {
    setEvaluating(true);
    setEvalResult(null);
    setTimeout(() => {
      setEvaluating(false);
      setEvalResult('Latency: 240ms | Tokens: 128 | Quality Score: 98.4%');
    }, 1000);
  };

  const tabs = [
    { id: 'ai-memory', label: 'Memory Nexus' },
    { id: 'notepad-editor', label: 'Smart Notepad' },
    { id: 'prompt-eval', label: 'Prompt Eval' },
    { id: 'llm-wiki', label: 'LLM Wiki' },
    { id: 'ai-agent-suite', label: 'Agent Suite' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/50">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-purple-400" />
                <span className="font-semibold text-zinc-100 text-sm md:text-base">
                  Interactive Ecosystem Sandbox
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto px-6 py-3 border-b border-zinc-800 bg-zinc-950/30 gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                      : 'bg-zinc-800/40 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 overflow-y-auto flex-1 bg-zinc-950/20">
              {/* TAB 1: AI Memory */}
              {activeTab === 'ai-memory' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white">Vector Similarity Search</h3>
                    <p className="text-xs text-zinc-400">Query your long-term persistent context layers in real-time.</p>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={memoryQuery}
                      onChange={(e) => setMemoryQuery(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-purple-500"
                      placeholder="Type semantic query..."
                    />
                    <button
                      onClick={handleRunMemorySearch}
                      disabled={memoryLoading}
                      className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      {memoryLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                      Query
                    </button>
                  </div>
                  {memoryResults && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-3 font-mono text-xs">
                      <div className="text-zinc-500 flex justify-between">
                        <span>MATCHING NODES (3)</span>
                        <span>Latency: 9ms</span>
                      </div>
                      <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-300">
                        <span className="text-purple-400"># Node 8942</span> — "JWT authentication middleware configured with Redis session caching." (Score: 0.94)
                      </div>
                      <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-300">
                        <span className="text-purple-400"># Node 3102</span> — "OAuth2 scopes updated for multi-tenant workspace isolation." (Score: 0.89)
                      </div>
                      <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-300">
                        <span className="text-purple-400"># Node 5521</span> — "Session token refresh flow with automatic expiry handling." (Score: 0.82)
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* TAB 2: Smart Notepad */}
              {activeTab === 'notepad-editor' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">Markdown Scratchpad</h3>
                      <p className="text-xs text-zinc-400">Test autonomous inline ghost-text completion.</p>
                    </div>
                    <button
                      onClick={handleTriggerGhostText}
                      disabled={isGhostTextActive}
                      className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-purple-300 text-xs font-semibold flex items-center gap-2 border border-zinc-700"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {isGhostTextActive ? 'Thinking...' : 'Trigger Ghost Completion'}
                    </button>
                  </div>
                  <textarea
                    value={notepadText}
                    onChange={(e) => setNotepadText(e.target.value)}
                    rows={8}
                    className="w-full p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-100 font-mono text-sm focus:outline-none focus:border-purple-500 resize-none"
                  />
                  <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-500">
                    <span>words: {notepadText.split(/\s+/).length}</span>
                    <span>chars: {notepadText.length}</span>
                    <span className="text-purple-400">AI assist: active</span>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: Prompt Eval */}
              {activeTab === 'prompt-eval' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white">Prompt A/B Benchmarker</h3>
                    <p className="text-xs text-zinc-400">Evaluate token economy and model response latency.</p>
                  </div>
                  <textarea
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    rows={3}
                    className="w-full p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-purple-500 resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">Target: GPT-4o / Claude 3.5 Sonnet</span>
                    <button
                      onClick={handleRunEval}
                      disabled={evaluating}
                      className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      {evaluating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                      Run Benchmark
                    </button>
                  </div>
                  {evalResult && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span>{evalResult}</span>
                    </motion.div>
                  )}
                  {/* Model comparison bars */}
                  <div className="space-y-3 pt-4 border-t border-zinc-800">
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
                  </div>
                </motion.div>
              )}

              {/* TAB 4: LLM Wiki */}
              {activeTab === 'llm-wiki' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white">Self-Updating Documentation Graph</h3>
                    <p className="text-xs text-zinc-400">Background LLM crawlers automatically synthesize knowledge nodes.</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {['Auth', 'API', 'DB', 'UI', 'Test', 'CI', 'Docs', 'Logs', 'Cache'].map((node) => (
                      <div key={node} className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5 text-center text-xs font-mono text-amber-400/80">
                        {node}
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-purple-400 space-y-2">
                    <div>[Crawler Status]: <span className="text-emerald-400">Active</span> (Watching 4 repositories)</div>
                    <div>[Last Sync]: 2 minutes ago</div>
                    <div>[Total Linked Nodes]: 1,420 entries</div>
                    <div>[Orphan Nodes]: 3 (auto-resolving...)</div>
                  </div>
                </motion.div>
              )}

              {/* TAB 5: Agent Suite */}
              {activeTab === 'ai-agent-suite' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white">Multi-Agent Pipeline</h3>
                    <p className="text-xs text-zinc-400">Autonomous worker nodes executing iterative web research.</p>
                  </div>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                      <span className="text-zinc-300">1. Planner Node: Deconstruct goal into sub-tasks</span>
                      <span className="text-emerald-400">COMPLETED</span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                      <span className="text-zinc-300">2. Executor Node: Web search & code execution</span>
                      <span className="text-purple-400 animate-pulse">RUNNING...</span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                      <span className="text-zinc-300">3. Verifier Node: Output validation & formatting</span>
                      <span className="text-zinc-500">PENDING</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 font-mono text-xs space-y-1">
                    <div className="text-zinc-500">Pipeline Metrics</div>
                    <div className="text-zinc-300">Success Rate: <span className="text-emerald-400">94.2%</span></div>
                    <div className="text-zinc-300">Avg Steps: <span className="text-purple-400">3.4</span></div>
                    <div className="text-zinc-300">Avg Latency: <span className="text-amber-400">1.2s</span></div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
