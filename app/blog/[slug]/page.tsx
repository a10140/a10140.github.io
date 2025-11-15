'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale/zh-CN';
import 'highlight.js/styles/github-dark.css';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: number;
  tags: string[];
  content: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 这里应该从文件系统或API获取文章内容
    // 示例数据
    const examplePosts: Record<string, BlogPost> = {
      'welcome-to-my-blog': {
        slug: 'welcome-to-my-blog',
        title: '欢迎来到我的博客',
        date: '2024-01-15',
        readTime: 5,
        tags: ['介绍', '博客'],
        content: `# 欢迎来到我的博客

这是我的第一篇博客文章，很高兴你能来到这里！

## 关于这个博客

这个博客是我使用 **Next.js**、**TypeScript** 和 **Tailwind CSS** 构建的。它包含了以下特性：

- 🎨 美观的紫色主题设计
- 📝 支持 Markdown 格式的文章
- 💻 代码高亮显示
- 🚀 GitHub 项目展示
- ✨ 流畅的动画效果

## 技术栈

\`\`\`typescript
const techStack = {
  framework: 'Next.js 14',
  language: 'TypeScript',
  styling: 'Tailwind CSS',
  animations: 'Framer Motion',
  markdown: 'React Markdown'
};
\`\`\`

## 未来计划

我计划在这里分享：

1. 技术学习心得
2. 项目开发经验
3. 代码片段和技巧
4. 技术趋势分析

期待与你一起成长！ 🎉`,
      },
      'nextjs-blog-tutorial': {
        slug: 'nextjs-blog-tutorial',
        title: '使用Next.js构建现代化博客',
        date: '2024-01-20',
        readTime: 10,
        tags: ['Next.js', '教程', '前端'],
        content: `# 使用Next.js构建现代化博客

本教程将详细介绍如何使用 Next.js 构建一个功能完整、美观现代的博客系统。

## 项目初始化

首先，我们需要创建一个新的 Next.js 项目：

\`\`\`bash
npx create-next-app@latest my-blog --typescript --tailwind --app
\`\`\`

## 安装依赖

\`\`\`bash
npm install framer-motion react-markdown remark-gfm rehype-highlight
\`\`\`

## 核心功能实现

### 1. 文章系统

使用 Markdown 文件存储文章内容，通过 \`gray-matter\` 解析 frontmatter。

### 2. 代码高亮

使用 \`rehype-highlight\` 实现代码语法高亮。

### 3. 动画效果

使用 Framer Motion 添加流畅的页面动画。

## 总结

通过 Next.js 的强大功能，我们可以快速构建一个现代化的博客系统。`,
      },
    };

    const foundPost = examplePosts[slug];
    if (foundPost) {
      setPost(foundPost);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-20 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold gradient-text mb-4">文章未找到</h1>
          <Link
            href="/blog"
            className="text-purple-400 hover:text-purple-300 underline"
          >
            返回博客列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回博客</span>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8 md:p-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8 pb-8 border-b border-purple-500/20">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>
                {format(new Date(post.date), 'yyyy年MM月dd日', {
                  locale: zhCN,
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} 分钟阅读</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="markdown-content prose prose-invert max-w-none"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
            >
              {post.content}
            </ReactMarkdown>
          </motion.div>
        </motion.article>
      </div>
    </div>
  );
}

