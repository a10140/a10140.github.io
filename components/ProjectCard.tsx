'use client';

import { motion } from 'framer-motion';
import { Github, Star, GitFork, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale/zh-CN';

interface ProjectCardProps {
  repo: {
    name: string;
    description: string;
    html_url: string;
    language: string;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
  };
}

export default function ProjectCard({ repo }: ProjectCardProps) {
  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: '#f7df1e',
      TypeScript: '#3178c6',
      Python: '#3776ab',
      Java: '#ed8b00',
      'C++': '#00599c',
      Go: '#00add8',
      Rust: '#000000',
      HTML: '#e34c26',
      CSS: '#1572b6',
      Vue: '#4fc08d',
      React: '#61dafb',
    };
    return colors[language] || '#9333ea';
  };

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -8, scale: 1.02 }}
      className="block glass rounded-xl p-6 hover:border-purple-500/50 border border-transparent transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-purple-300 group-hover:text-purple-200 transition-colors">
          {repo.name}
        </h3>
        <Github className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
      </div>

      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {repo.description || '暂无描述'}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-4">
          {repo.language && (
            <div className="flex items-center space-x-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getLanguageColor(repo.language) }}
              />
              <span>{repo.language}</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3" />
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center space-x-1">
            <GitFork className="w-3 h-3" />
            <span>{repo.forks_count}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="w-3 h-3" />
          <span>
            {format(new Date(repo.updated_at), 'yyyy-MM-dd', { locale: zhCN })}
          </span>
        </div>
      </div>
    </motion.a>
  );
}

