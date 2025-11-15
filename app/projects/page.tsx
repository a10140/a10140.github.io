'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { Github, Search } from 'lucide-react';

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

export default function ProjectsPage() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // 替换为你的GitHub用户名
    const username = 'a10140';
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data);
          setFilteredRepos(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = repos.filter(
        (repo) =>
          repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (repo.description &&
            repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredRepos(filtered);
    } else {
      setFilteredRepos(repos);
    }
  }, [searchTerm, repos]);

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <Github className="w-16 h-16 text-purple-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            GitHub 项目
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            探索我的开源项目，了解我的技术栈和开发经验
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索项目..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-500"
            />
          </div>
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
        ) : filteredRepos.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredRepos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <ProjectCard repo={repo} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 glass rounded-xl"
          >
            {searchTerm ? (
              <>
                <p className="text-gray-400 text-lg mb-2">未找到匹配的项目</p>
                <p className="text-gray-500 text-sm">尝试使用其他关键词搜索</p>
              </>
            ) : (
              <>
                <p className="text-gray-400 mb-4">
                  请在 <code className="text-purple-400">app/projects/page.tsx</code> 中设置你的GitHub用户名
                </p>
                <p className="text-sm text-gray-500">
                  将 <code className="text-purple-400">YOUR_GITHUB_USERNAME</code> 替换为你的实际用户名
                </p>
              </>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

