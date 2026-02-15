import { apiCallServer } from '@/lib/api.server'
import { SpecAwardType } from '@/types/spec'

export async function POST(request: Request) {
  try {
    const endpoint = `/api/v2/member/specification/award`

    const requestData: { awards: SpecAwardType[] } = await request.json()

    if (!requestData) {
      return Response.json({ error: 'requestData is required' }, { status: 500 })
    }

    // 서버에서 백엔드 API 호출
    const { data, error } = await apiCallServer(endpoint, {
      method: 'POST',
      body: JSON.stringify(requestData),
    })

    console.log('수상 데이터 생성', data)

    if (error) {
      return Response.json({ error }, { status: 400 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const endpoint = `/api/v2/member/specification/award`
    const requestData: { ids: number[] } = await request.json()
    if (!requestData) {
      return Response.json({ error: 'requestData is required' }, { status: 500 })
    }

    // 서버에서 백엔드 API 호출
    const { data, error } = await apiCallServer(endpoint, {
      method: 'DELETE',
      body: JSON.stringify(requestData),
    })

    console.log('수상 데이터 삭제', data)

    if (error) {
      return Response.json({ error }, { status: 400 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}
