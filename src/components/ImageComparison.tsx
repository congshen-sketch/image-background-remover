'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import LoadingOverlay from './LoadingOverlay'

interface ImageComparisonProps {
  originalImage: string
  resultImage: string | null
  isProcessing: boolean
}

export default function ImageComparison({
  originalImage,
  resultImage,
  isProcessing
}: ImageComparisonProps) {
  const [activeTab, setActiveTab] = useState<'original' | 'result'>('original')

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 原图 */}
      <div className="relative rounded-2xl overflow-hidden bg-dark-800 border border-white/10">
        <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium text-white/80">
          📷 原始图片
        </div>

        <div className="aspect-square flex items-center justify-center p-4">
          <img
            src={originalImage}
            alt="原始图片"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      </div>

      {/* 结果 */}
      <div className="relative rounded-2xl overflow-hidden bg-dark-800 border border-white/10">
        <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium text-white/80">
          ✨ 已移除背景
        </div>

        <div className={cn(
          "aspect-square flex items-center justify-center p-4 bg-transparent-pattern",
          !resultImage && !isProcessing && "bg-dark-800"
        )}
        >
          {resultImage ? (
            <img
              src={resultImage}
              alt="处理结果"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          ) : (
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm">点击"移除背景"开始处理</p>
            </div>
          )}

          {isProcessing && <LoadingOverlay />}
        </div>
      </div>
    </div>
  )
}
