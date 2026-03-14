# RemoveBG Pro - Next.js 版本

基于 Next.js + TailwindCSS + TypeScript 构建的 AI 智能抠图工具。

## 🚀 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: TailwindCSS
- **UI 组件**: Lucide React (图标)
- **部署**: 静态导出 (Static Export)

## 📁 项目结构

```
image-bg-remover-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/remove-bg/      # API 路由
│   │   │   └── route.ts        # 背景移除 API
│   │   ├── globals.css         # 全局样式
│   │   ├── layout.tsx          # 根布局
│   │   └── page.tsx            # 首页
│   ├── components/             # 组件
│   │   ├── Navbar.tsx          # 导航栏
│   │   ├── UploadArea.tsx      # 上传区域
│   │   ├── ImageComparison.tsx # 图片对比
│   │   └── LoadingOverlay.tsx  # 加载动画
│   └── lib/
│       └── utils.ts            # 工具函数
├── package.json
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

## 🛠️ 开发环境设置

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

创建 `.env.local` 文件：

```env
REMOVE_BG_API_KEY=your_api_key_here
```

获取 API Key: https://www.remove.bg/api

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 📦 构建部署

### 静态导出

```bash
npm run build
```

构建后的文件在 `dist/` 目录中，可以部署到任何静态托管服务：
- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages

## ✨ 功能特性

- ✅ 拖拽/点击上传图片
- ✅ 实时预览原图
- ✅ AI 背景移除（集成 Remove.bg API）
- ✅ 前后对比展示
- ✅ 一键下载结果
- ✅ 响应式设计（支持移动端）
- ✅ 加载动画和状态提示

## 🔧 MVP 功能清单

- [x] 图片上传（拖拽 + 点击）
- [x] 文件类型和大小验证
- [x] 图片预览
- [x] API 接口集成
- [x] 结果对比展示
- [x] 下载功能
- [ ] 批量处理
- [ ] 背景替换
- [ ] 历史记录

## 📝 注意事项

1. **API Key**: 需要配置 Remove.bg API Key 才能正常使用 AI 功能
2. **免费额度**: Remove.bg 免费版每月 50 次调用
3. **图片大小**: 限制 12MB 以内

## 🚀 部署到 Vercel

```bash
npm i -g vercel
vercel
```

## 📄 许可证

MIT
