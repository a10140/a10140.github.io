'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Code2, BookOpen } from 'lucide-react';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import { useEffect, useState } from 'react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export default function Home() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 这里可以替换为你的GitHub用户名
    const username = 'a10140';
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-40 right-10 w-72 h-72 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <motion.div
              className="inline-block"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-16 h-16 text-purple-400 mx-auto" />
            </motion.div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="gradient-text">欢迎来到我的博客</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            这里记录着我的技术成长历程，分享项目经验与学习心得。
            <br />
            探索代码的无限可能，创造美好的数字世界。
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/blog">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg font-semibold text-white flex items-center space-x-2 glow-purple transition-all"
              >
                <BookOpen className="w-5 h-5" />
                <span>阅读博客</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link href="/projects">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass border border-purple-500/50 rounded-lg font-semibold text-purple-300 flex items-center space-x-2 hover:bg-purple-500/10 transition-all"
              >
                <Code2 className="w-5 h-5" />
                <span>查看项目</span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* 滚动提示 */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowRight className="w-6 h-6 text-purple-400 rotate-90" />
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              精选项目
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              以下是我在GitHub上的一些精选项目，展示我的技术栈和开发能力
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="glass rounded-xl p-6 animate-pulse"
                >
                  <div className="h-4 bg-purple-500/20 rounded w-3/4 mb-4" />
                  <div className="h-3 bg-purple-500/20 rounded w-full mb-2" />
                  <div className="h-3 bg-purple-500/20 rounded w-5/6" />
                </div>
              ))}
            </div>
          ) : repos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProjectCard repo={repo} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 glass rounded-xl"
            >
              <p className="text-gray-400 mb-4">
                请在 <code className="text-purple-400">app/page.tsx</code> 中设置你的GitHub用户名
              </p>
              <p className="text-sm text-gray-500">
                将 <code className="text-purple-400">YOUR_GITHUB_USERNAME</code> 替换为你的实际用户名
              </p>
            </motion.div>
          )}

          {repos.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link href="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 glass border border-purple-500/50 rounded-lg text-purple-300 hover:bg-purple-500/10 transition-all"
                >
                  查看所有项目
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

