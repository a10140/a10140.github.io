# 个人博客 - HTML/CSS/JS 版本

一个使用纯 HTML、CSS 和 JavaScript 构建的现代化个人博客，无需任何构建工具，可以直接部署到 GitHub Pages。

## ✨ 特性

- 🎨 **美观的紫色主题** - 精心设计的紫色渐变主题，富有艺术感
- 📝 **博客系统** - 支持文章展示和详情页
- 💻 **GitHub 项目展示** - 自动获取并展示你的 GitHub 项目
- ✨ **流畅动画** - 使用 CSS 动画实现丝滑效果
- 📱 **响应式设计** - 完美适配各种设备尺寸
- 🚀 **零配置部署** - 直接上传到 GitHub Pages 即可

## 📁 文件结构

```
.
├── index.html          # 首页
├── blog.html          # 博客列表页
├── blog-post.html     # 博客详情页
├── projects.html      # 项目展示页
├── styles.css         # 主样式文件
├── blog.css           # 博客页面样式
├── script.js          # 主 JavaScript 文件
├── blog.js            # 博客功能 JavaScript
├── blog-post.js       # 博客详情页 JavaScript
└── projects.js        # 项目页面 JavaScript
```

## 🚀 快速开始

### 1. 配置 GitHub 用户名

编辑 `script.js` 文件，将 `GITHUB_USERNAME` 改为你的 GitHub 用户名：

```javascript
const GITHUB_USERNAME = 'a10140';  // 改为你的用户名
```

### 2. 添加博客文章

编辑 `blog.js` 文件，在 `blogPosts` 数组中添加新文章：

```javascript
const blogPosts = [
    {
        slug: 'article-slug',
        title: '文章标题',
        date: '2024-01-15',
        readTime: 5,
        tags: ['标签1', '标签2'],
        excerpt: '文章摘要...',
        content: `# Markdown 内容

你的文章内容...
`
    },
    // 添加更多文章...
];
```

### 3. 本地预览

直接在浏览器中打开 `index.html` 文件即可预览。

或者使用本地服务器（推荐）：

```bash
# Python 3
python -m http.server 8000

# Node.js (需要安装 http-server)
npx http-server -p 8000
```

然后访问：http://localhost:8000

### 4. 部署到 GitHub Pages

#### 方法 1: 直接上传文件

1. 将所有文件上传到你的 GitHub 仓库
2. 在仓库 Settings → Pages 中启用 GitHub Pages
3. 选择 main 分支作为源
4. 访问：`https://你的用户名.github.io/仓库名`

#### 方法 2: 使用 Git

```bash
git init
git add .
git commit -m "部署博客"
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

然后在 GitHub 仓库设置中启用 Pages。

## 🎨 自定义

### 修改主题颜色

编辑 `styles.css` 文件，修改 CSS 变量：

```css
:root {
    --purple-500: #a855f7;  /* 主色调 */
    --purple-600: #9333ea;  /* 深色 */
    /* ... */
}
```

### 修改个人信息

- **导航栏链接**: 编辑各个 HTML 文件中的导航栏部分
- **页脚信息**: 编辑各个 HTML 文件中的页脚部分
- **邮箱**: 搜索 `mailto:your@email.com` 并替换

## 📝 Markdown 支持

博客文章支持简单的 Markdown 语法：

- **标题**: `# H1`, `## H2`, `### H3`
- **粗体**: `**文本**`
- **代码**: `` `行内代码` ``
- **代码块**: ` ```语言\n代码\n``` `
- **列表**: `- 项目` 或 `1. 项目`

## 🔧 功能说明

### GitHub 项目展示

- 自动从 GitHub API 获取项目
- 显示项目名称、描述、语言、Star、Fork 等信息
- 支持搜索功能

### 博客系统

- 文章列表展示
- 标签筛选
- 搜索功能
- 文章详情页

### 响应式设计

- 移动端适配
- 平板适配
- 桌面端优化

## ⚠️ 注意事项

1. **GitHub API 限制**: 未认证的请求每小时限制 60 次
2. **CORS 问题**: 如果遇到跨域问题，可能需要使用代理或 GitHub Token
3. **浏览器兼容**: 建议使用现代浏览器（Chrome、Firefox、Safari、Edge）

## 🐛 常见问题

### 项目不显示

- 检查 GitHub 用户名是否正确
- 检查网络连接
- 查看浏览器控制台错误

### 样式不生效

- 确保 CSS 文件路径正确
- 清除浏览器缓存
- 检查文件编码（应为 UTF-8）

### 动画不流畅

- 检查浏览器性能
- 减少同时显示的动画元素
- 使用硬件加速（CSS transform）

## 📄 许可证

MIT License

## 🙏 致谢

感谢所有开源项目的贡献者！

---

**享受你的博客之旅！** 🎉

