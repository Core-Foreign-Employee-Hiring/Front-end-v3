import { NextRequest, NextResponse } from 'next/server'
import { apiCallServer } from '@/lib/api.server'
import { SpecCareerType } from '@/types/spec'

export async function PUT(request: NextRequest, context: { params: Promise<{ careerId: string }> }) {
  try {
    const { careerId } = await context.params

    const requestData: SpecCareerType = await request.json()

    if (!requestData) {
      return Response.json({ error: 'requestData is required' }, { status: 500 })
    }

    const endpoint = `/api/v2/member/specification/career/${careerId}`

    const { data, error } = await apiCallServer(endpoint, {
      method: 'PUT',
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
