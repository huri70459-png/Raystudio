import { BrainCircuit, FileText, SlidersHorizontal, Network, Bot } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

export interface EcosystemApp {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  Icon: LucideIcon;
  colSpan: string;
  rowSpan?: string;
  badge?: string;
  metric?: {
    label: string;
    value: string;
  };
  accentColor: string;
  accentGlow: string;
  href: string;
  status: 'live' | 'beta' | 'coming-soon';
}

export const ECOSYSTEM_APPS: EcosystemApp[] = [
  {
    id: 'ai-memory',
    title: 'AI Memory Nexus',
    tagline: 'Infinite Vector Storage & Retrieval',
    description: 'A persistent neural memory layer that gives your AI models long-term context, semantic search, and dynamic knowledge recall.',
    category: 'Infrastructure',
    Icon: BrainCircuit,
    colSpan: 'md:col-span-2 lg:col-span-2',
    rowSpan: 'md:row-span-2',
    badge: 'Core Engine',
    metric: { label: 'Vector Index Speed', value: '< 12ms' },
    accentColor: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    accentGlow: '#8b5cf6',
    href: '#sandbox',
    status: 'live',
  },
  {
    id: 'notepad-editor',
    title: 'Smart Notepad Editor',
    tagline: 'Markdown meets Autonomous AI',
    description: 'A lightning-fast scratchpad with inline ghost-text completion, block refactoring, and instant local-first persistence.',
    category: 'Productivity',
    Icon: FileText,
    colSpan: 'md:col-span-1 lg:col-span-1',
    badge: 'Popular',
    metric: { label: 'Typing Latency', value: '0ms' },
    accentColor: 'from-blue-500/20 via-cyan-500/10 to-transparent',
    accentGlow: '#3b82f6',
    href: '#sandbox',
    status: 'live',
  },
  {
    id: 'prompt-eval',
    title: 'Prompt & Eval Studio',
    tagline: 'A/B Testing for LLM Prompts',
    description: 'Systematically benchmark prompts across multiple models, track token usage, cost efficiency, and output quality matrices.',
    category: 'Developer Tool',
    Icon: SlidersHorizontal,
    colSpan: 'md:col-span-1 lg:col-span-1',
    metric: { label: 'Model Benchmarks', value: '14+ LLMs' },
    accentColor: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    accentGlow: '#10b981',
    href: '#sandbox',
    status: 'beta',
  },
  {
    id: 'llm-wiki',
    title: 'LLM Knowledge Wiki',
    tagline: 'Self-Updating Graph Documentation',
    description: 'An interactive, node-linked documentation ecosystem automatically synthesized and maintained by background LLM crawlers.',
    category: 'Knowledge Base',
    Icon: Network,
    colSpan: 'md:col-span-2 lg:col-span-1',
    badge: 'Autonomous',
    metric: { label: 'Node Connectivity', value: '99.8%' },
    accentColor: 'from-amber-500/20 via-orange-500/10 to-transparent',
    accentGlow: '#f59e0b',
    href: '#sandbox',
    status: 'beta',
  },
  {
    id: 'ai-agent-suite',
    title: 'Autonomous Agent Suite',
    tagline: 'Multi-Agent Workflow Orchestration',
    description: 'Deploy collaborative AI worker nodes that plan, execute code, verify outputs, and execute complex multi-step web workflows.',
    category: 'Automation',
    Icon: Bot,
    colSpan: 'md:col-span-3 lg:col-span-2',
    badge: 'Advanced',
    metric: { label: 'Execution Success', value: '94.2%' },
    accentColor: 'from-rose-500/20 via-pink-500/10 to-transparent',
    accentGlow: '#f43f5e',
    href: '#sandbox',
    status: 'coming-soon',
  },
];
