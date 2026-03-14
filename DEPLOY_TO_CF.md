# Cloudflare Pages 完整部署指南

## 🔧 已配置的文件

1. **wrangler.toml** - Cloudflare Workers/Pages 配置文件
2. **.github/workflows/deploy.yml** - GitHub Actions 自动部署
3. **package.json** - 添加了 wrangler 和部署脚本
4. **next.config.js** - 配置静态导出

---

## 📋 部署步骤

### 第一步：在 Cloudflare Dashboard 中创建项目

1. 登录 https://dash.cloudflare.com
2. 进入 **Workers & Pages**
3. 点击 **Create application** → **Pages**
4. 选择 **Connect to Git**
5. 授权 GitHub 账号（选择你的账号）
6. 选择仓库 `image-background-remover`
7. 点击 **Begin setup**

### 第二步：构建设置

填写以下信息：

| 配置项 | 值 |
|--------|-----|
| **Project name** | image-bg-remover |
| **Production branch** | main |
| **Framework preset** | Next.js (Static) |
| **Build command** | `npm install && npm run build` |
| **Build output directory** | `dist` |

### 第三步：设置环境变量

点击 **Environment variables (advanced)**，添加：

| 变量名 | 值 |
|--------|-----|
| `NODE_VERSION` | 20 |
| `REMOVE_BG_API_KEY` | FDaK17Pikx9DD6e8RfyTD8xU |

### 第四步：保存并部署

点击 **Save and Deploy**

等待构建完成，你会得到一个类似 `https://image-bg-remover-xxx.pages.dev` 的链接。

---

## 🔐 配置 GitHub Secrets

在 GitHub 仓库中添加以下 Secrets：

**路径**: GitHub 仓库 → Settings → Secrets and variables → Actions → New repository secret

| Secret 名称 | 值 |
|-------------|-----|
| `CLOUDFLARE_API_TOKEN` | `O2kBmpyA2-A3nuCsxdjquro6kt6pHdzXz3bLbIxy` |
| `REMOVE_BG_API_KEY` | `FDaK17Pikx9DD6e8RfyTD8xU` |

> Account ID (`8e64fb9711c018b3abf02fbbd1fb8a3`) 已硬编码在配置文件中，无需设置 Secret。

---

## 🌐 自定义域名（可选）

1. 在 Cloudflare Pages 项目页面 → **Custom domains**
2. 点击 **Set up a custom domain**
3. 输入你的域名（如 `removebg.yourdomain.com`）
4. 按照提示添加 DNS 记录

---

## ⚠️ 重要说明

**关于 API 路由**：
- Cloudflare Pages 支持静态网站托管
- Next.js API 路由（`/api/remove-bg`）需要特殊处理
- 方案A：使用 Cloudflare Pages Functions（已配置）
- 方案B：单独部署 Worker API（推荐）

**推荐架构**：
```
用户 → Cloudflare Pages (静态前端)
      ↓
    API 调用 → Cloudflare Worker (后端 API)
      ↓
    Remove.bg API
```

---

## 🚀 快速验证

部署完成后，访问你的 Pages 链接：

```
https://image-bg-remover-xxx.pages.dev
```

测试功能：
1. 上传一张图片
2. 点击"移除背景"
3. 查看是否能成功处理

---

## 🆘 常见问题

**Q: 构建失败怎么办？**
- 检查 Build command 是否正确
- 查看构建日志中的错误信息

**Q: API 调用失败？**
- 检查环境变量 `REMOVE_BG_API_KEY` 是否设置
- 确保 API 路由配置正确

**Q: 静态导出后 API 不工作？**
- 静态导出不支持 Next.js API 路由
- 需要单独部署 Worker 或使用 Pages Functions

---

## 📞 需要帮助？

如果遇到问题：
1. 查看 Cloudflare Pages 构建日志
2. 检查 GitHub Actions 运行日志
3. 确认所有环境变量已正确设置
