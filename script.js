// ===== 全局配置 =====
const GITHUB_USERNAME = 'a10140';

// ===== 导航栏滚动效果 =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== 移动端菜单切换 =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// 点击外部关闭菜单
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// ===== 获取 GitHub 项目 =====
async function fetchGitHubRepos(username, limit = 6) {
    try {
        const response = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}`
        );
        
        if (!response.ok) {
            throw new Error('Failed to fetch repos');
        }
        
        const repos = await response.json();
        return Array.isArray(repos) ? repos : [];
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        return [];
    }
}

// ===== 语言颜色映射 =====
const languageColors = {
    'JavaScript': '#f7df1e',
    'TypeScript': '#3178c6',
    'Python': '#3776ab',
    'Java': '#ed8b00',
    'C++': '#00599c',
    'Go': '#00add8',
    'Rust': '#000000',
    'HTML': '#e34c26',
    'CSS': '#1572b6',
    'Vue': '#4fc08d',
    'React': '#61dafb',
    'Shell': '#89e051',
    'PHP': '#777bb4',
    'Ruby': '#cc342d',
    'Swift': '#fa7343',
    'Kotlin': '#7f52ff',
    'Dart': '#00b4ab',
    'C#': '#239120',
    'C': '#a8b9cc',
    'R': '#276dc3',
};

function getLanguageColor(language) {
    return languageColors[language] || '#9333ea';
}

// ===== 格式化日期 =====
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// ===== 创建项目卡片 =====
function createProjectCard(repo) {
    const card = document.createElement('a');
    card.href = repo.html_url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = 'project-card';
    
    const languageColor = repo.language ? getLanguageColor(repo.language) : '#9333ea';
    
    card.innerHTML = `
        <div class="project-header">
            <h3 class="project-title">${escapeHtml(repo.name)}</h3>
            <svg viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px; color: var(--text-muted);">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
        </div>
        <p class="project-description">${escapeHtml(repo.description || '暂无描述')}</p>
        <div class="project-meta">
            <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
                ${repo.language ? `
                    <div class="language-badge">
                        <div class="language-dot" style="background-color: ${languageColor};"></div>
                        <span>${escapeHtml(repo.language)}</span>
                    </div>
                ` : ''}
                <div class="project-meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span>${repo.stargazers_count || 0}</span>
                </div>
                <div class="project-meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 9a6 6 0 0 1 12 0c0 4-6 10-6 10S6 13 6 9"></path>
                        <path d="M8 9a4 4 0 0 1 8 0"></path>
                    </svg>
                    <span>${repo.forks_count || 0}</span>
                </div>
                <div class="project-meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>${formatDate(repo.updated_at)}</span>
                </div>
            </div>
        </div>
    `;
    
    // 添加动画
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
    
    return card;
}

// ===== 转义 HTML =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== 加载首页项目 =====
async function loadHomeProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (!projectsGrid) return;
    
    const repos = await fetchGitHubRepos(GITHUB_USERNAME, 6);
    
    if (repos.length === 0) {
        projectsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
                <p>请在 script.js 中设置你的 GitHub 用户名</p>
                <p style="font-size: 0.875rem; margin-top: 0.5rem;">
                    将 <code style="color: var(--purple-400);">GITHUB_USERNAME</code> 替换为你的实际用户名
                </p>
            </div>
        `;
        return;
    }
    
    projectsGrid.innerHTML = '';
    
    repos.forEach((repo, index) => {
        const card = createProjectCard(repo);
        setTimeout(() => {
            projectsGrid.appendChild(card);
        }, index * 100);
    });
}

// ===== 页面加载完成后执行 =====
document.addEventListener('DOMContentLoaded', () => {
    // 加载首页项目
    if (document.getElementById('projectsGrid')) {
        loadHomeProjects();
    }
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 添加页面淡入动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== 导出函数供其他页面使用 =====
if (typeof window !== 'undefined') {
    window.fetchGitHubRepos = fetchGitHubRepos;
    window.createProjectCard = createProjectCard;
    window.GITHUB_USERNAME = GITHUB_USERNAME;
}

