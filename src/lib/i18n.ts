import { Locale } from './i18n.types'
import { resources } from './locales'

const instanceCache = new Map()
// @/lib/i18n.ts 수정
export async function getTranslationServer(lng: Locale, ns: string | string[] = 'common') {
  const namespaces = Array.isArray(ns) ? ns : [ns]

  const t = (key: string, options?: any): string => {
    let targetNs = namespaces[0]
    let targetKey = key

    // 1. 네임스페이스 분리 (예: "common:home.title")
    if (key.includes(':')) {
      const parts = key.split(':')
      targetNs = parts[0]
      targetKey = parts[1]
    }

    // 2. 해당 언어와 네임스페이스의 번역 객체 가져오기
    const translations = resources[lng]?.[targetNs] || {}

    // 3. 점(.)으로 구분된 객체 깊이 탐색 (예: "home.title")
    const keys = targetKey.split('.')
    let value: any = translations

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        console.warn(`Translation key not found: ${targetNs}:${targetKey}`)
        return key // 못 찾으면 키 그대로 반환
      }
    }

    // 4. 변수 치환 처리 (예: {{count}} 처리)
    if (typeof value === 'string' && options) {
      Object.keys(options).forEach((optKey) => {
        value = value.replace(new RegExp(`{{${optKey}}}`, 'g'), String(options[optKey]))
      })
    }

    return typeof value === 'string' ? value : key
  }

  return { t }
}
