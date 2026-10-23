import { motion } from 'framer-motion';
import { ECOSYSTEM_APPS, type EcosystemApp } from '../data/apps';
import { ArrowUpRight, Zap } from 'lucide-react';
import PulsatingBorder from './PulsatingBorder';

const statusColors: Record<string, string> = {
  live: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  beta: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'coming-soon': 'bg-white/10 text-white/60 border-white/20',
};

interface BentoGridProps {
  onOpenApp?: (appId: string) => void;
}

function AppCard({ app, index, onOpenApp }: { app: EcosystemApp; index: number; onOpenApp?: (appId: string) => void }) {
  const { Icon } = app;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.01, y: -4 }}
      className={`group relative rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl transition-colors hover:border-zinc-700 ${app.colSpan} ${app.rowSpan || ''}`}
    >
      {/* Pulsating Border - Only visible on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0">
        <PulsatingBorder
          colors={[app.accentGlow, app.accentGlow, app.accentGlow]}
          thickness={1.5}
          radius={50}
          softness={70}
          intensity={25}
          bloom={30}
          spread={12}
          speed={1.2}
        />
      </div>
      
      {/* Dynamic Gradient Glow on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${app.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

      {/* Top row: Icon & Badge */}
      <div className="relative z-10 flex items-center justify-between w-full mb-6">
        <div
          className="p-3 rounded-2xl bg-zinc-800/60 border border-zinc-700/50 text-zinc-200 group-hover:border-opacity-50 transition-colors"
          style={{ borderColor: `${app.accentGlow}30` }}
        >
          <Icon className="w-6 h-6" style={{ color: app.accentGlow }} />
        </div>

        <div className="flex items-center gap-2">
          {app.badge && (
            <span className="text-xs px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-300 font-medium">
              {app.badge}
            </span>
          )}
          <span className={`text-xs px-2.5 py-1 rounded-full border ${statusColors[app.status]}`}>
            {app.status === 'coming-soon' ? 'Soon' : app.status === 'live' ? 'Live' : 'Beta'}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              onOpenApp?.(app.id);
            }}
            className="p-2 rounded-full bg-zinc-800/40 border border-zinc-700/40 text-zinc-400 hover:text-white hover:bg-zinc-700/60 transition-all opacity-0 group-hover:opacity-100"
            aria-label={`Open ${app.title}`}
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Middle: Title, Tagline & Description */}
      <div className="relative z-10 space-y-2 my-auto">
        <span className="text-xs font-mono tracking-wide uppercase" style={{ color: `${app.accentGlow}cc` }}>
          {app.category}
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-zinc-100 tracking-tight group-hover:text-white">
          {app.title}
        </h3>
        <p className="text-sm font-medium text-zinc-300">
          {app.tagline}
        </p>
        <p className="text-xs md:text-sm text-zinc-400 leading-relaxed pt-1">
          {app.description}
        </p>
      </div>

      {/* Bottom row: Metric Tag */}
      {app.metric && (
        <div className="relative z-10 pt-6 mt-6 border-t border-zinc-800/60 flex items-center justify-between text-xs">
          <span className="text-zinc-500">{app.metric.label}</span>
          <span className="font-mono font-semibold text-zinc-200 bg-zinc-800/60 px-2.5 py-1 rounded-md border border-zinc-700/40">
            {app.metric.value}
          </span>
        </div>
      )}
    </motion.div>
  );
}

export default function BentoGrid({ onOpenApp }: BentoGridProps) {
  return (
    <section id="ecosystem" className="relative w-full py-24 px-4 md:px-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3"
          >
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold">
              Unified Ecosystem
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-500"
          >
            Engineered for the AI Era
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base"
          >
            Explore the interconnected suite of AI-native applications built to supercharge memory, workflow automation, and prompt architecture.
          </motion.p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 auto-rows-[minmax(220px,_auto)]">
          {ECOSYSTEM_APPS.map((app, index) => (
            <AppCard key={app.id} app={app} index={index} onOpenApp={onOpenApp} />
          ))}
        </div>
      </div>
    </section>
  );
}
