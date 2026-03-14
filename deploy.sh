#!/bin/bash

# Vercel 部署脚本
# 需要先安装 Vercel CLI: npm i -g vercel

echo "🚀 开始部署到 Vercel..."

# 进入项目目录
cd "$(dirname "$0")"

# 检查是否安装了 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI 未安装"
    echo "请运行: npm i -g vercel"
    exit 1
fi

# 检查是否登录
if ! vercel whoami &> /dev/null; then
    echo "🔑 请先登录 Vercel"
    vercel login
fi

# 部署
echo "📦 正在部署..."
vercel --prod

echo "✅ 部署完成！"
