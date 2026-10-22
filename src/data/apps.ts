import { Brain, FileText, Gauge, BookOpen, Bot } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

export interface AppData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
  features: string[];
  status: 'live' | 'beta' | 'coming-soon';
}

export const apps: AppData[] = [
  {
    id: 'memory',
    name: 'AI Memory',
    tagline: 'Persistent Context Engine',
    description: 'Long-term memory system that gives AI agents the ability to remember, recall, and reason across sessions with vector-powered retrieval.',
    icon: Brain,
    color: '#5c7cfa',
    gradient: 'from-blue-500/20 to-indigo-600/20',
    features: ['Vector embeddings', 'Semantic search', 'Session persistence', 'Memory decay'],
    status: 'live',
  },
  {
    id: 'notepad',
    name: 'Smart Notepad',
    tagline: 'AI-Augmented Writing',
    description: 'An intelligent writing environment with real-time AI assistance, auto-formatting, and context-aware suggestions that adapts to your style.',
    icon: FileText,
    color: '#9775fa',
    gradient: 'from-violet-500/20 to-purple-600/20',
    features: ['AI completion', 'Smart formatting', 'Context suggestions', 'Markdown support'],
    status: 'live',
  },
  {
    id: 'prompt-eval',
    name: 'Prompt Evaluator',
    tagline: 'Precision Prompt Engineering',
    description: 'Benchmark, score, and optimize your prompts with automated evaluation metrics, A/B testing, and performance analytics.',
    icon: Gauge,
    color: '#f783ac',
    gradient: 'from-pink-500/20 to-rose-600/20',
    features: ['Quality scoring', 'A/B testing', 'Token analytics', 'Version control'],
    status: 'beta',
  },
  {
    id: 'wiki',
    name: 'LLM Wiki',
    tagline: 'Living Knowledge Base',
    description: 'A self-evolving wiki powered by language models that generates, cross-references, and maintains documentation automatically.',
    icon: BookOpen,
    color: '#20c997',
    gradient: 'from-emerald-500/20 to-teal-600/20',
    features: ['Auto-generation', 'Cross-linking', 'Version history', 'Collaborative editing'],
    status: 'beta',
  },
  {
    id: 'agent',
    name: 'AI Agent Suite',
    tagline: 'Autonomous Task Orchestration',
    description: 'Deploy multi-agent pipelines that plan, execute, and iterate on complex tasks with real-time monitoring and human-in-the-loop controls.',
    icon: Bot,
    color: '#fab005',
    gradient: 'from-amber-500/20 to-orange-600/20',
    features: ['Multi-agent pipelines', 'Tool integration', 'Real-time monitoring', 'HITL controls'],
    status: 'coming-soon',
  },
];
