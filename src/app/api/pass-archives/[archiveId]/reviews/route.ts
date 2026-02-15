import { NextRequest, NextResponse } from 'next/server'
import { apiCallServer } from '@/lib/api.server'
import { ReviewType } from '@/types/review'

export async function GET(request: NextRequest, context: { params: Promise<{ archiveId: string }> }) {
  try {
    const { searchParams } = new URL(request.url)
    const { archiveId } = await context.params

    const backendParams = new URLSearchParams()

    const page = searchParams.get('page') || '0'
    const size = searchParams.get('size') || '20'

    backendParams.append('page', page)
    backendParams.append('size', size)

    const endpoint = `/api/v1/pass-archives/${archiveId}/reviews?${backendParams.toString()}`

    console.log('Backend Request Endpoint:', endpoint) // 디버깅용 로그

    const { data, error } = await apiCallServer(endpoint, {
      method: 'GET',
    })

    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Route Handler Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest, context: { params: Promise<{ archiveId: string }> }) {
  try {
    const { archiveId } = await context.params
    const requestData: ReviewType = await request.json()
    if (!requestData) {
      return Response.json({ error: 'requestData is required' }, { status: 500 })
    }

    const endpoint = `/api/v1/pass-archives/${archiveId}/reviews`

    const { data, error } = await apiCallServer(endpoint, {
      method: 'POST',
      body: JSON.stringify(requestData),
    })

    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Route Handler Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
