import { apiCallServer } from '@/lib/api.server'
import { CreateJobPostType } from '@/types/create-job-post'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const requestData: CreateJobPostType = await request.json()

    if (!requestData) {
      return Response.json({ error: 'requestData is required' }, { status: 500 })
    }

    const endpoint = `/api/v2/recruit`

    // 서버에서 백엔드 API 호출
    const { data, error } = await apiCallServer(endpoint, {
      method: 'POST',
      body: JSON.stringify(requestData),
    })

    if (error) {
      return Response.json({ error }, { status: 400 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const backendParams = new URLSearchParams()

    const page = searchParams.get('page') || '0'
    const size = searchParams.get('size') || '20'
    const keyword = searchParams.get('keyword')
    const contractType = searchParams.get('contractType')

    backendParams.append('page', page)
    backendParams.append('size', size)

    if (keyword) backendParams.append('keyword', keyword)
    if (contractType) backendParams.append('contractType', contractType)

    const visas = searchParams.getAll('visas')
    if (visas.length > 0) {
      visas.forEach((visa) => backendParams.append('visas', visa))
    }

    const workRegions = searchParams.getAll('workRegions')
    if (workRegions.length > 0) {
      workRegions.forEach((region) => backendParams.append('workRegions', region))
    }

    const languages = searchParams.getAll('languages')
    if (languages.length > 0) {
      languages.forEach((language) => backendParams.append('languages', language))
    }

    const jobRoles = searchParams.getAll('jobRoles')
    if (jobRoles.length > 0) {
      jobRoles.forEach((role) => backendParams.append('jobRoles', role))
    }

    const endpoint = `/api/v2/recruit?${backendParams.toString()}`

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
