'use client';

import { Github, Mail, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-purple-500/20 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold gradient-text mb-4">关于我</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              一个热爱编程的开发者，喜欢分享技术经验和项目作品。
              在这里记录学习历程，展示GitHub项目。
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold gradient-text mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  首页
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  博客
                </a>
              </li>
              <li>
                <a
                  href="/projects"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  项目
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold gradient-text mb-4">联系方式</h3>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/a10140"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-lg glass hover:bg-purple-500/20 transition-all"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:your@email.com"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-lg glass hover:bg-purple-500/20 transition-all"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 pt-8 border-t border-purple-500/20 text-center"
        >
          <p className="text-gray-400 text-sm flex items-center justify-center space-x-1">
            <span>© {currentYear} 我的博客. Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
            >
              <Heart className="w-4 h-4 text-purple-500 inline" />
            </motion.span>
            <span>and Next.js</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

