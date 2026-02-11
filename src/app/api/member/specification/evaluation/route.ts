import { apiCallServer } from '@/lib/api.server'

export async function POST(request: Request) {
  try {
    const endpoint = `/api/v2/member/specification/evaluation`

    // 서버에서 백엔드 API 호출
    const { data, error } = await apiCallServer(endpoint, {
      method: 'POST',
    })

    console.log('스펙 결과 분석 res', data)

    if (error) {
      return Response.json({ error }, { status: 400 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}
