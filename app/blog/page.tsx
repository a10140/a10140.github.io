'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Calendar, Clock, Search } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale/zh-CN';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: number;
  tags: string[];
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    // 从API或文件系统获取文章列表
    // 这里使用示例数据，实际应该从文件系统读取
    const examplePosts: BlogPost[] = [
      {
        slug: 'welcome-to-my-blog',
        title: '欢迎来到我的博客',
        date: '2024-01-15',
        excerpt: '这是我的第一篇博客文章，介绍这个博客的创建初衷和功能特点。',
        readTime: 5,
        tags: ['介绍', '博客'],
      },
      {
        slug: 'nextjs-blog-tutorial',
        title: '使用Next.js构建现代化博客',
        date: '2024-01-20',
        excerpt: '详细讲解如何使用Next.js、TypeScript和Tailwind CSS构建一个功能完整、美观现代的博客系统。',
        readTime: 10,
        tags: ['Next.js', '教程', '前端'],
      },
    ];
    setPosts(examplePosts);
    setFilteredPosts(examplePosts);
  }, []);

  useEffect(() => {
    let filtered = posts;

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag));
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedTag, posts]);

  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)));

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
            <BookOpen className="w-16 h-16 text-purple-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            技术博客
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            记录学习历程，分享技术心得与项目经验
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索文章..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-500"
            />
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  selectedTag === null
                    ? 'bg-purple-600 text-white'
                    : 'glass text-gray-300 hover:bg-purple-500/20'
                }`}
              >
                全部
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    selectedTag === tag
                      ? 'bg-purple-600 text-white'
                      : 'glass text-gray-300 hover:bg-purple-500/20'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <motion.article
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="glass rounded-xl p-6 h-full flex flex-col border border-transparent hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
                  >
                    <h2 className="text-2xl font-bold text-purple-300 mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {format(new Date(post.date), 'yyyy年MM月dd日', {
                            locale: zhCN,
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime} 分钟</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 glass rounded-xl"
          >
            <p className="text-gray-400 text-lg">
              {searchTerm || selectedTag
                ? '未找到匹配的文章'
                : '暂无文章，敬请期待'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

