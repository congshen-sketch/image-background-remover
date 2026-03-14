'use client'

export default function LoadingOverlay() {
  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
      <div className="relative">
        {/* 外圈 */}
        <div className="w-16 h-16 rounded-full border-4 border-primary-500/30 border-t-primary-500 animate-spin"></div>
        
        {/* 内圈 - 反向旋转 */}
        <div className="absolute inset-2 w-12 h-12 rounded-full border-4 border-secondary-500/30 border-b-secondary-500 animate-spin"
          style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-white font-medium">AI 正在处理中</p>
        <p className="text-sm text-gray-400 mt-1">预计需要 3-5 秒...</p>
      </div>
    </div>
  )
}
