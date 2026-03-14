# 部署到 Vercel

## 方式1：使用 Vercel CLI（推荐）

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录（只需一次）
vercel login

# 3. 部署
vercel --prod
```

## 方式2：使用 GitHub 集成（自动部署）

1. 将代码推送到 GitHub
2. 登录 https://vercel.com
3. 点击 "Add New Project"
4. 选择 GitHub 仓库
5. 点击 Deploy

## 方式3：使用 deploy.sh 脚本

```bash
chmod +x deploy.sh
./deploy.sh
```

## 环境变量配置

部署后需要在 Vercel Dashboard 设置环境变量：

- `REMOVE_BG_API_KEY` = 你的 Remove.bg API Key

设置路径：Project Settings → Environment Variables

## 访问链接

部署成功后，你会得到一个类似 `https://image-bg-remover-xxx.vercel.app` 的链接。
