# Cloudflare Pages 部署指南

## 方案选择

Next.js 在 Cloudflare Pages 上有两种部署方式：

### 方案A：静态导出（推荐，最简单）
- 纯前端，无需服务器
- 使用 Cloudflare Worker 单独部署 API
- **优点**：免费、简单、速度快

### 方案B：完整 SSR（高级）
- 使用 Cloudflare Pages Functions
- 支持 Next.js API 路由
- **缺点**：配置复杂，有一定限制

---

## 推荐方案：静态导出 + Cloudflare Worker

### 第一步：准备静态版本

修改 `next.config.js`：

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

### 第二步：创建 Worker API

文件：`worker.js`

```javascript
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // 处理 CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }
    
    if (url.pathname === '/api/remove-bg' && request.method === 'POST') {
      try {
        const formData = await request.formData();
        const imageFile = formData.get('image_file');
        
        if (!imageFile) {
          return new Response(JSON.stringify({ error: 'No image' }), { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        // 调用 Remove.bg
        const removeBgForm = new FormData();
        removeBgForm.append('image_file', imageFile);
        removeBgForm.append('size', 'auto');
        
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
          method: 'POST',
          headers: { 'X-Api-Key': env.REMOVE_BG_API_KEY },
          body: removeBgForm,
        });
        
        if (!response.ok) {
          return new Response(JSON.stringify({ error: 'Remove.bg failed' }), { 
            status: response.status 
          });
        }
        
        const imageBlob = await response.blob();
        return new Response(imageBlob, {
          headers: { 
            'Content-Type': 'image/png',
            'Access-Control-Allow-Origin': '*',
          },
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { 
          status: 500 
        });
      }
    }
    
    return new Response('Not Found', { status: 404 });
  },
};
```

### 第三步：部署前端到 Cloudflare Pages

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 点击 **Pages** → **Create a project**
3. 选择 **Connect to Git**
4. 授权 GitHub 账号，选择 `image-background-remover` 仓库
5. 构建设置：
   - **Build command**: `npm install && npm run build`
   - **Build output directory**: `dist`
6. 点击 **Save and Deploy**

### 第四步：部署 Worker API

1. 在 Cloudflare Dashboard → **Workers & Pages**
2. 创建新的 Worker，命名为 `removebg-api`
3. 粘贴上面的 `worker.js` 代码
4. 设置环境变量：`REMOVE_BG_API_KEY = 你的API Key`
5. 保存并部署

### 第五步：修改前端调用地址

在 `src/app/page.tsx` 中修改 API 地址：

```typescript
const response = await fetch('https://removebg-api.yourname.workers.dev/api/remove-bg', {
  method: 'POST',
  body: formData
});
```

重新构建部署前端。

---

## 替代方案：Vercel（更简单）

如果你希望一键部署，Vercel 是更好的选择：

```bash
npm i -g vercel
vercel --prod
```

自动支持 Next.js 的 SSR 和 API 路由。

---

## 域名配置

Cloudflare Pages 会自动分配 `.pages.dev` 域名，也可以绑定自定义域名：

1. 在 Pages 项目 → **Custom domains**
2. 添加你的域名
3. 按提示配置 DNS

---

## 环境变量

在 Cloudflare Pages 项目 → **Settings** → **Environment variables** 中设置：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `REMOVE_BG_API_KEY` | FDaK17Pikx9DD6e8RfyTD8xU | Remove.bg API Key |

---

## 常见问题

**Q: 为什么不用 Cloudflare Pages Functions 直接部署 Next.js？**
A: Pages Functions 对 Next.js 的支持有限，很多 Node.js API 不支持，容易遇到兼容性问题。

**Q: Worker 的免费额度是多少？**
A: 每天 10 万次请求，足够个人使用。

**Q: 可以纯静态部署吗？**
A: 可以，但抠图功能需要后端 API 支持，要么用 Worker，要么用第三方服务。
