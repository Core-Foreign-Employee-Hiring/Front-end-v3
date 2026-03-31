import { apiCallServer } from '@/lib/api.server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData() // JSON 대신 formData로 읽기

    const endpoint = `/api/v1/pass-archives`

    // 서버에서 백엔드 API 호출 (multipart 전송)
    const { data, error } = await apiCallServer(endpoint, {
      method: 'POST',
      body: formData, // 백엔드 서버로 formData 그대로 전달
    })

    if (error) {
      return Response.json({ error }, { status: 400 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}
