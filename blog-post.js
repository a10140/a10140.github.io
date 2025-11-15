// ===== 简单的 Markdown 转 HTML =====
function markdownToHtml(markdown) {
    let html = markdown;
    
    // 标题
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // 粗体
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // 代码块
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre><code>${escapeHtml(code.trim())}</code></pre>`;
    });
    
    // 行内代码
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // 列表
    html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    
    // 段落
    html = html.split('\n\n').map(para => {
        if (!para.trim()) return '';
        if (para.startsWith('<')) return para;
        return `<p>${para.trim()}</p>`;
    }).join('\n');
    
    // 包装列表
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    return html;
}

// ===== 转义 HTML =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== 加载文章 =====
function loadBlogPost() {
    const blogPost = document.getElementById('blogPost');
    if (!blogPost) return;
    
    // 从 URL 获取 slug
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    
    // 从 localStorage 获取文章数据
    const postData = localStorage.getItem('currentPost');
    
    if (!postData) {
        blogPost.innerHTML = `
            <div style="text-align: center; padding: 3rem;">
                <h1 style="color: var(--purple-400); margin-bottom: 1rem;">文章未找到</h1>
                <a href="blog.html" style="color: var(--purple-400); text-decoration: underline;">返回博客列表</a>
            </div>
        `;
        return;
    }
    
    const post = JSON.parse(postData);
    
    // 更新页面标题
    document.title = `${post.title} | 个人博客`;
    
    // 渲染文章
    blogPost.innerHTML = `
        <div class="blog-post-header">
            <h1 class="blog-post-title gradient-text">${escapeHtml(post.title)}</h1>
            <div class="blog-post-meta">
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
                    <span>${post.readTime} 分钟阅读</span>
                </div>
            </div>
            <div class="blog-post-tags">
                ${post.tags.map(tag => `
                    <span class="blog-tag">${escapeHtml(tag)}</span>
                `).join('')}
            </div>
        </div>
        <div class="blog-post-content">
            ${markdownToHtml(post.content)}
        </div>
    `;
    
    // 添加淡入动画
    blogPost.style.opacity = '0';
    setTimeout(() => {
        blogPost.style.transition = 'opacity 0.5s ease';
        blogPost.style.opacity = '1';
    }, 100);
}

// ===== 页面加载 =====
document.addEventListener('DOMContentLoaded', () => {
    loadBlogPost();
});

