// ===== 博客文章数据 =====
const blogPosts = [
    {
        slug: 'welcome-to-my-blog',
        title: '欢迎来到我的博客',
        date: '2024-01-15',
        readTime: 5,
        tags: ['介绍', '博客'],
        excerpt: '这是我的第一篇博客文章，介绍这个博客的创建初衷和功能特点。',
        content: `# 欢迎来到我的博客

这是我的第一篇博客文章，很高兴你能来到这里！

## 关于这个博客

这个博客是我使用 **HTML**、**CSS** 和 **JavaScript** 构建的。它包含了以下特性：

- 🎨 美观的紫色主题设计
- 📝 支持 Markdown 格式的文章
- 💻 代码高亮显示
- 🚀 GitHub 项目展示
- ✨ 流畅的动画效果

## 技术栈

\`\`\`javascript
const techStack = {
  frontend: 'HTML + CSS + JavaScript',
  styling: '纯 CSS（无框架）',
  animations: 'CSS Animations',
  api: 'GitHub API'
};
\`\`\`

## 未来计划

我计划在这里分享：

1. 技术学习心得
2. 项目开发经验
3. 代码片段和技巧
4. 技术趋势分析

期待与你一起成长！ 🎉`
    },
    {
        slug: 'html-css-js-blog',
        title: '使用纯 HTML/CSS/JS 构建现代化博客',
        date: '2024-01-20',
        readTime: 10,
        tags: ['教程', '前端', 'HTML'],
        excerpt: '详细讲解如何使用纯 HTML、CSS 和 JavaScript 构建一个功能完整、美观现代的博客系统。',
        content: `# 使用纯 HTML/CSS/JS 构建现代化博客

本教程将详细介绍如何使用纯前端技术构建一个功能完整、美观现代的博客系统。

## 项目初始化

首先，我们需要创建项目结构：

\`\`\`
blog/
├── index.html      # 首页
├── blog.html       # 博客列表页
├── projects.html   # 项目页
├── styles.css      # 样式文件
└── script.js       # JavaScript 文件
\`\`\`

## 核心功能实现

### 1. 响应式设计

使用 CSS Grid 和 Flexbox 实现响应式布局：

\`\`\`css
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}
\`\`\`

### 2. GitHub API 集成

使用 Fetch API 获取 GitHub 项目：

\`\`\`javascript
async function fetchGitHubRepos(username) {
    const response = await fetch(
        \`https://api.github.com/users/\${username}/repos\`
    );
    return await response.json();
}
\`\`\`

### 3. 动画效果

使用 CSS 动画和过渡实现流畅效果：

\`\`\`css
@keyframes float {
    0%, 100% {
        transform: translate(0, 0);
    }
    50% {
        transform: translate(30px, -30px);
    }
}
\`\`\`

## 总结

通过纯前端技术，我们可以快速构建一个现代化的博客系统，无需复杂的构建工具。`
    }
];

// ===== 渲染博客文章 =====
function renderBlogPosts(posts) {
    const blogGrid = document.getElementById('blogGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (!blogGrid) return;
    
    if (posts.length === 0) {
        blogGrid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    blogGrid.style.display = 'grid';
    emptyState.style.display = 'none';
    blogGrid.innerHTML = '';
    
    posts.forEach((post, index) => {
        const card = createBlogCard(post);
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            blogGrid.appendChild(card);
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ===== 创建博客卡片 =====
function createBlogCard(post) {
    const card = document.createElement('article');
    card.className = 'blog-card';
    card.onclick = () => {
        // 存储文章数据到 localStorage
        localStorage.setItem('currentPost', JSON.stringify(post));
        window.location.href = `blog-post.html?slug=${post.slug}`;
    };
    
    card.innerHTML = `
        <h2 class="blog-card-title">${escapeHtml(post.title)}</h2>
        <p class="blog-card-excerpt">${escapeHtml(post.excerpt)}</p>
        <div class="blog-card-meta">
            <div class="blog-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>${post.date}</span>
            </div>
            <div class="blog-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>${post.readTime} 分钟</span>
            </div>
        </div>
        <div class="blog-card-tags">
            ${post.tags.map(tag => `
                <span class="blog-tag">${escapeHtml(tag)}</span>
            `).join('')}
        </div>
    `;
    
    return card;
}

// ===== 获取所有标签 =====
function getAllTags() {
    const tags = new Set();
    blogPosts.forEach(post => {
        post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
}

// ===== 初始化标签筛选 =====
function initTagFilters() {
    const tagFilters = document.getElementById('tagFilters');
    if (!tagFilters) return;
    
    const tags = getAllTags();
    tags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'tag-btn';
        btn.textContent = tag;
        btn.dataset.tag = tag;
        btn.onclick = () => filterByTag(tag);
        tagFilters.appendChild(btn);
    });
}

// ===== 按标签筛选 =====
let currentTag = 'all';

function filterByTag(tag) {
    currentTag = tag;
    
    // 更新按钮状态
    document.querySelectorAll('.tag-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tag === tag);
    });
    
    // 筛选文章
    const filtered = tag === 'all' 
        ? blogPosts 
        : blogPosts.filter(post => post.tags.includes(tag));
    
    renderBlogPosts(filtered);
}

// ===== 搜索功能 =====
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (!query) {
            // 如果没有搜索词，使用当前标签筛选
            const filtered = currentTag === 'all' 
                ? blogPosts 
                : blogPosts.filter(post => post.tags.includes(currentTag));
            renderBlogPosts(filtered);
            return;
        }
        
        // 搜索文章
        const filtered = blogPosts.filter(post => {
            const matchTitle = post.title.toLowerCase().includes(query);
            const matchExcerpt = post.excerpt.toLowerCase().includes(query);
            const matchTags = post.tags.some(tag => tag.toLowerCase().includes(query));
            return matchTitle || matchExcerpt || matchTags;
        });
        
        renderBlogPosts(filtered);
    });
}

// ===== 转义 HTML =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== 页面加载 =====
document.addEventListener('DOMContentLoaded', () => {
    // 初始化标签筛选
    initTagFilters();
    
    // 初始化搜索
    initSearch();
    
    // 渲染所有文章
    renderBlogPosts(blogPosts);
    
    // 默认选中"全部"
    document.querySelector('.tag-btn[data-tag="all"]')?.click();
});

