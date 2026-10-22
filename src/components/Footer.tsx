import { motion } from 'framer-motion';
import { Github, Twitter, Sparkles, Heart } from 'lucide-react';

const footerLinks = {
  Products: ['AI Memory', 'Smart Notepad', 'Prompt Evaluator', 'LLM Wiki', 'AI Agent Suite'],
  Resources: ['Documentation', 'API Reference', 'Tutorials', 'Blog', 'Changelog'],
  Company: ['About', 'Careers', 'Contact', 'Privacy', 'Terms'],
};

export default function Footer() {
  return (
    <footer id="about" className="relative border-t border-zinc-800/40">
      {/* Newsletter section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl p-8 md:p-12 text-center mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Join the waitlist
          </h3>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto text-sm">
            Be the first to access new tools and features as we build the future of AI workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-5 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-500 transition-all text-sm"
            />
            <button className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium transition-all duration-300 whitespace-nowrap text-sm">
              Get Access
            </button>
          </div>
        </motion.div>

        {/* Footer links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-lg font-bold">
                <span className="text-white">Nexus</span>
                <span className="text-purple-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed mb-4">
              Engineering the AI stack for the next generation of builders and creators.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-lg bg-zinc-900/60 border border-zinc-800/60 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-zinc-900/60 border border-zinc-800/60 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-medium text-zinc-300 mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-800/40">
          <p className="text-xs text-zinc-600">
            © 2024 NexusAI. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600 flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-400/60" /> for the AI community
          </p>
        </div>
      </div>
    </footer>
  );
}
