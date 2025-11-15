// ===== 加载所有项目 =====
let allRepos = [];

async function loadAllProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (!projectsGrid) return;
    
    try {
        allRepos = await fetchGitHubRepos(GITHUB_USERNAME, 100);
        
        if (allRepos.length === 0) {
            projectsGrid.style.display = 'none';
            emptyState.style.display = 'block';
            emptyState.innerHTML = `
                <p style="font-size: 1.125rem; margin-bottom: 0.5rem;">请在 script.js 中设置你的 GitHub 用户名</p>
                <p style="font-size: 0.875rem; color: var(--text-muted);">
                    将 <code style="color: var(--purple-400);">GITHUB_USERNAME</code> 替换为你的实际用户名
                </p>
            `;
            return;
        }
        
        renderProjects(allRepos);
    } catch (error) {
        console.error('Error loading projects:', error);
        projectsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
                <p>加载项目时出错，请稍后重试</p>
            </div>
        `;
    }
}

// ===== 渲染项目 =====
function renderProjects(repos) {
    const projectsGrid = document.getElementById('projectsGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (!projectsGrid) return;
    
    if (repos.length === 0) {
        projectsGrid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    projectsGrid.style.display = 'grid';
    emptyState.style.display = 'none';
    projectsGrid.innerHTML = '';
    
    repos.forEach((repo, index) => {
        const card = createProjectCard(repo);
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            projectsGrid.appendChild(card);
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// ===== 搜索功能 =====
function initSearch() {
    const searchInput = document.getElementById('projectSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (!query) {
            renderProjects(allRepos);
            return;
        }
        
        const filtered = allRepos.filter(repo => {
            const matchName = repo.name.toLowerCase().includes(query);
            const matchDesc = (repo.description || '').toLowerCase().includes(query);
            const matchLang = (repo.language || '').toLowerCase().includes(query);
            return matchName || matchDesc || matchLang;
        });
        
        renderProjects(filtered);
    });
}

// ===== 页面加载 =====
document.addEventListener('DOMContentLoaded', () => {
    loadAllProjects();
    initSearch();
});

// ===== 添加页面样式 =====
const style = document.createElement('style');
style.textContent = `
    .projects-page {
        padding-top: 80px;
        min-height: 100vh;
        padding-bottom: 3rem;
    }
    
    .page-header {
        text-align: center;
        margin-bottom: 3rem;
    }
    
    .page-icon {
        width: 64px;
        height: 64px;
        margin: 0 auto 1.5rem;
        color: var(--purple-400);
    }
    
    .page-icon svg {
        width: 100%;
        height: 100%;
    }
    
    .page-title {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 1rem;
    }
    
    .page-description {
        font-size: 1.125rem;
        color: var(--text-muted);
        max-width: 600px;
        margin: 0 auto;
    }
    
    .search-input:focus {
        outline: none;
        border-color: var(--purple-500);
        box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
    }
    
    .search-input::placeholder {
        color: var(--text-muted);
    }
    
    @media (max-width: 768px) {
        .page-title {
            font-size: 2rem;
        }
    }
`;
document.head.appendChild(style);

