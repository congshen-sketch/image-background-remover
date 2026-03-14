'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            <span className="text-xl font-bold text-gradient">RemoveBG Pro</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">
              功能
            </Link>
            <Link href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">
              使用方法
            </Link>
            <Link href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">
              定价
            </Link>
          </div>

          <Link
            href="#upload"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-600 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            免费试用
          </Link>
        </div>
      </div>
    </nav>
  )
}
