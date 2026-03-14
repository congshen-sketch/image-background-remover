import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const imageFile = formData.get('image_file') as File

    if (!imageFile) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      )
    }

    // 获取 Remove.bg API Key（从环境变量）
    const apiKey = process.env.REMOVE_BG_API_KEY

    if (!apiKey) {
      // 如果没有配置 API Key，返回模拟数据
      console.log('No API key configured, returning mock response')
      return new NextResponse(
        JSON.stringify({ message: 'API key not configured' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 调用 Remove.bg API
    const removeBgForm = new FormData()
    removeBgForm.append('image_file', imageFile)
    removeBgForm.append('size', 'auto')

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
      },
      body: removeBgForm,
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Remove.bg API error:', error)
      return NextResponse.json(
        { error: 'Failed to process image' },
        { status: response.status }
      )
    }

    // 获取处理后的图片
    const imageBlob = await response.blob()
    const creditsRemaining = response.headers.get('X-RateLimit-Remaining') || 'unknown'

    // 返回图片
    return new NextResponse(imageBlob, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'X-RateLimit-Remaining': creditsRemaining,
      },
    })
  } catch (error) {
    console.error('Error processing image:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
