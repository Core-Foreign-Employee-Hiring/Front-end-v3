import { Locale } from './i18n.types'
import { resources } from './locales'

const instanceCache = new Map()

export async function useTranslationServer(lng: Locale, ns: string | string[] = 'common') {
  const namespaces = Array.isArray(ns) ? ns : [ns]
  const cacheKey = `${lng}-${namespaces.join(',')}`

  if (instanceCache.has(cacheKey)) {
    const cached = instanceCache.get(cacheKey)
    return { t: cached.t, i18n: { language: lng } }
  }

  // 여러 네임스페이스의 데이터를 병합하여 가져옵니다.
  const t = (key: string, defaultValue?: string): string => {
    // "namespace:key" 형태인지 확인 (예: "home:title")
    let targetNs = namespaces[0]
    let targetKey = key

    if (key.includes(':')) {
      const [n, k] = key.split(':')
      targetNs = n
      targetKey = k
    }

    const translations = resources[lng]?.[targetNs] || {}
    const keys = targetKey.split('.')
    let value: any = translations

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return defaultValue || key
      }
    }

    return typeof value === 'string' ? value : defaultValue || key
  }

  instanceCache.set(cacheKey, { t })
  return { t, i18n: { language: lng } }
}
