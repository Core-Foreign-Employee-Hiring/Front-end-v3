import { SpecLanguageSkillType } from '@/types/spec'
import { ApiCallResult } from '@/types/common'

/**
 * 어학 생성
 */
export const postSpecLanguageSkills = async (
  languageSkills: SpecLanguageSkillType[] | null
): Promise<ApiCallResult<ApiCallResult<void>>> => {
  try {
    const response = await fetch('/api/member/specification/language', {
      method: 'POST',
      body: JSON.stringify({ languageSkills: languageSkills }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('API 응답 에러:', error)
      return { success: false, error: error.error || `HTTP ${response.status}` }
    }

    const data = await response.json()
    console.log('어학 생성', data)
    return { success: true, data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * 어학 수정
 */
export const putSpecLanguageSkills = async (
  languageSkillId: string,
  languageSkill: SpecLanguageSkillType
): Promise<ApiCallResult<ApiCallResult<void>>> => {
  try {
    const response = await fetch(`/api/member/specification/language/${languageSkillId}`, {
      method: 'PUT',
      body: JSON.stringify(languageSkill),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('API 응답 에러:', error)
      return { success: false, error: error.error || `HTTP ${response.status}` }
    }

    const data = await response.json()
    console.log('어학 수정', data)
    return { success: true, data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * 어학 삭제
 */
export const deleteSpecLanguageSkills = async (
  languageSkillId: string
): Promise<ApiCallResult<ApiCallResult<void>>> => {
  try {
    const response = await fetch('/api/member/specification/language', {
      method: 'DELETE',
      body: JSON.stringify({ ids: [languageSkillId] }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('API 응답 에러:', error)
      return { success: false, error: error.error || `HTTP ${response.status}` }
    }

    const data = await response.json()
    console.log('어학 삭제', data)
    return { success: true, data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
