import { apiCallServer } from '@/lib/api.server'
import { InterviewQuestionType, InterviewSettingOptionType } from '@/types/interview'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const requestData: InterviewSettingOptionType = await request.json()
    const endpoint = `/interview/sets`

    console.log('requestData', requestData)

    if (!requestData || Object.keys(requestData).length === 0) {
      return NextResponse.json({ error: 'requestData is required' }, { status: 400 })
    }

    const result = await apiCallServer<InterviewQuestionType>(
      endpoint,
      {
        method: 'POST',
        body: JSON.stringify(requestData),
      },
      'AI_INTERVIEW_BASE_URL'
    )

    return NextResponse.json(result)
  } catch (error) {
    console.error('Route Handler Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
