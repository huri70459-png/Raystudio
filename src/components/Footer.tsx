import { motion } from 'framer-motion';
import { Github, Twitter, Sparkles, Heart } from 'lucide-react';

const footerLinks = {
  Products: ['AI Memory', 'Smart Notepad', 'Prompt Evaluator', 'LLM Wiki', 'AI Agent Suite'],
  Resources: ['Documentation', 'API Reference', 'Tutorials', 'Blog', 'Changelog'],
  Company: ['About', 'Careers', 'Contact', 'Privacy', 'Terms'],
};

export default function Footer() {
  return (
    <footer id="about" className="relative border-t border-white/[0.06]">
      {/* Newsletter section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl p-8 md:p-12 text-center mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Join the waitlist
          </h3>
          <p className="text-white/40 mb-6 max-w-md mx-auto">
            Be the first to access new tools and features as we build the future of AI workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-5 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/20 focus:outline-none focus:border-nexus-500/50 transition-all"
            />
            <button className="px-6 py-3 rounded-xl bg-nexus-600/80 hover:bg-nexus-500/80 text-white font-medium transition-all duration-300 whitespace-nowrap">
              Get Access
            </button>
          </div>
        </motion.div>

        {/* Footer links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-nexus-400" />
              <span className="text-lg font-bold">
                <span className="text-white">Nexus</span>
                <span className="text-nexus-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-white/30 leading-relaxed mb-4">
              Engineering the AI stack for the next generation of builders and creators.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-lg glass flex items-center justify-center text-white/40 hover:text-white/80 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg glass flex items-center justify-center text-white/40 hover:text-white/80 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-medium text-white/60 mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.06]">
          <p className="text-xs text-white/20">
            © 2024 NexusAI. All rights reserved.
          </p>
          <p className="text-xs text-white/20 flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-400/60" /> for the AI community
          </p>
        </div>
      </div>
    </footer>
  );
}
