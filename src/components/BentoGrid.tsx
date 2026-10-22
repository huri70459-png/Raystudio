import { motion } from 'framer-motion';
import { apps } from '../data/apps';
import { ArrowUpRight, Zap } from 'lucide-react';

const statusColors = {
  live: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  beta: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'coming-soon': 'bg-white/10 text-white/60 border-white/20',
};

const statusLabels = {
  live: 'Live',
  beta: 'Beta',
  'coming-soon': 'Coming Soon',
};

function AppCard({ app, index }: { app: typeof apps[0]; index: number }) {
  const Icon = app.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
        index === 0 ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${app.gradient} opacity-50 group-hover:opacity-80 transition-opacity duration-500`} />
      
      {/* Glass overlay */}
      <div className="absolute inset-0 glass group-hover:bg-white/[0.04] transition-all duration-500" />
      
      {/* Content */}
      <div className={`relative p-6 ${index === 0 ? 'md:p-8' : ''} flex flex-col h-full min-h-[240px] ${index === 0 ? 'md:min-h-[400px]' : ''}`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${app.color}15` }}
            >
              <Icon className="w-6 h-6" style={{ color: app.color }} />
            </div>
            <div
              className="absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
              style={{ backgroundColor: app.color }}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 text-[10px] font-medium rounded-full border ${statusColors[app.status]}`}>
              {statusLabels[app.status]}
            </span>
            <div className="w-8 h-8 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
              <ArrowUpRight className="w-4 h-4 text-white/80" />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="flex-1">
          <h3 className={`font-semibold text-white mb-1 ${index === 0 ? 'text-2xl md:text-3xl' : 'text-lg'}`}>
            {app.name}
          </h3>
          <p className="text-sm text-white/50 mb-3 font-medium">{app.tagline}</p>
          <p className={`text-sm text-white/40 leading-relaxed ${index === 0 ? 'md:text-base max-w-md' : 'line-clamp-2'}`}>
            {app.description}
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mt-4">
          {app.features.slice(0, index === 0 ? 4 : 3).map((feature) => (
            <span
              key={feature}
              className="px-2.5 py-1 text-[11px] rounded-md bg-white/[0.04] text-white/50 border border-white/[0.06]"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Decorative corner glow */}
        <div
          className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"
          style={{ backgroundColor: app.color }}
        />
      </div>
    </motion.div>
  );
}

export default function BentoGrid() {
  return (
    <section id="ecosystem" className="relative py-24 md:py-32">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <Zap className="w-5 h-5 text-nexus-400" />
          <span className="text-sm font-medium text-nexus-400 uppercase tracking-wider">The Ecosystem</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-white mb-4"
        >
          Five tools.{' '}
          <span className="gradient-text">One unified AI stack.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-white/40 max-w-2xl"
        >
          Each tool is designed to work independently or compose together into powerful AI workflows.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {apps.map((app, index) => (
            <AppCard key={app.id} app={app} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
