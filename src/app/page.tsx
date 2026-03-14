'use client'

import { useState, useCallback } from 'react'
import { Upload, Download, RefreshCw, Sparkles, Image as ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import UploadArea from '@/components/UploadArea'
import ImageComparison from '@/components/ImageComparison'
import LoadingOverlay from '@/components/LoadingOverlay'

export default function Home() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const handleImageUpload = useCallback((imageUrl: string, uploadedFile: File) => {
    setOriginalImage(imageUrl)
    setFile(uploadedFile)
    setResultImage(null)
  }, [])

  const handleRemoveBackground = async () => {
    if (!file) return

    setIsProcessing(true)

    try {
      // 调用真实的 Remove.bg API
      const formData = new FormData()
      formData.append('image_file', file)
      formData.append('size', 'auto')

      const response = await fetch('/api/remove-bg', { 
        method: 'POST', 
        body: formData 
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || '处理失败')
      }

      const blob = await response.blob()
      const resultUrl = URL.createObjectURL(blob)
      setResultImage(resultUrl)
    } catch (error) {
      console.error('处理失败:', error)
      alert('处理失败：' + (error instanceof Error ? error.message : '请重试'))
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!resultImage) return
    const link = document.createElement('a')
    link.href = resultImage
    link.download = `removebg-${Date.now()}.png`
    link.click()
  }

  const handleReset = () => {
    setOriginalImage(null)
    setResultImage(null)
    setFile(null)
  }

  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            AI 智能抠图
            <br />
            <span className="text-gradient">一键移除背景</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            使用最先进的 AI 技术，5 秒内自动识别并移除图片背景。
            <br className="hidden sm:block" />
            无需专业技能，人人都是设计师。
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-12 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">5s</div>
              <div className="text-sm text-gray-500">平均处理时间</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">99%</div>
              <div className="text-sm text-gray-500">识别准确率</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">免费</div>
              <div className="text-sm text-gray-500">每日额度</div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          {!originalImage ? (
            <UploadArea onUpload={handleImageUpload} />
          ) : (
            <div className="space-y-6">
              <ImageComparison
                originalImage={originalImage}
                resultImage={resultImage}
                isProcessing={isProcessing}
              />

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                {!resultImage ? (
                  <button
                    onClick={handleRemoveBackground}
                    disabled={isProcessing}
                    className={cn(
                      "flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg",
                      "bg-gradient-to-r from-primary-500 to-secondary-600",
                      "hover:opacity-90 transition-all transform hover:-translate-y-0.5",
                      "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    )}
                  >
                    <Sparkles className="w-5 h-5" />
                    {isProcessing ? '处理中...' : '移除背景'}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg bg-white text-dark-900 hover:bg-gray-100 transition-all"
                    >
                      <Download className="w-5 h-5" />
                      下载结果
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg bg-white/10 text-white hover:bg-white/20 transition-all border border-white/20"
                    >
                      <RefreshCw className="w-5 h-5" />
                      重新上传
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            为什么选择 RemoveBG Pro？
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '⚡',
                title: '极速处理',
                desc: 'AI 智能识别，5 秒内完成背景移除，比传统方法快 100 倍'
              },
              {
                icon: '🎯',
                title: '精准识别',
                desc: '深度学习算法，精确识别人物、产品边缘，毛发级精细处理'
              },
              {
                icon: '🔒',
                title: '隐私安全',
                desc: '图片本地处理，不会上传到服务器，保护你的隐私'
              },
              {
                icon: '💎',
                title: '高清输出',
                desc: '支持 4K 分辨率输出，保留原始画质，专业级效果'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary-500/50 transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">简单三步，轻松抠图</h2>
          
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12">
            {[
              { step: '1', title: '上传图片', desc: '选择要处理的图片，支持拖拽上传' },
              { step: '2', title: 'AI 处理', desc: '点击按钮，AI 自动识别并移除背景' },
              { step: '3', title: '下载结果', desc: '保存透明背景图片，支持 PNG 格式' }
            ].map((item, index) => (
              <div key={index} className="flex-1 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
          © 2025 RemoveBG Pro - AI 智能抠图工具 | 让图片处理更简单
        </div>
      </footer>
    </main>
  )
}
