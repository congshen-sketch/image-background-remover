'use client'

import { useCallback, useState } from 'react'
import { Upload, Image as ImageIcon } from 'lucide-react'
import { cn, formatFileSize } from '@/lib/utils'

interface UploadAreaProps {
  onUpload: (imageUrl: string, file: File) => void
}

export default function UploadArea({ onUpload }: UploadAreaProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFile(files[0])
    }
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }, [])

  const handleFile = (file: File) => {
    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      alert('请上传图片文件（JPG、PNG、WEBP）')
      return
    }

    // 验证文件大小（最大 12MB）
    if (file.size > 12 * 1024 * 1024) {
      alert('文件大小不能超过 12MB')
      return
    }

    // 创建图片预览
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string
      onUpload(imageUrl, file)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "relative rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-300",
        "bg-white/[0.03] border-white/20 hover:border-primary-500/50 hover:bg-primary-500/[0.05]",
        isDragOver && "border-secondary-500 bg-secondary-500/[0.1] scale-[1.02]"
      )}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />

      <div className="pointer-events-none">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-600/20 flex items-center justify-center">
          <Upload className="w-10 h-10 text-primary-400" />
        </div>

        <p className="text-xl font-medium text-white mb-2">
          点击或拖拽上传图片
        </p>

        <p className="text-sm text-gray-500">
          支持 JPG、PNG、WEBP 格式，最大 12MB
        </p>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-600">
          <ImageIcon className="w-4 h-4" />
          <span>支持批量上传（即将推出）</span>
        </div>
      </div>
    </div>
  )
}
