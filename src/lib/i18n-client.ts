import i18n from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        // 경로에 namespace를 변수로 사용하여 자동으로 해당 json 파일을 가져옵니다.
        import(`@/i18n/locales/${language}/${namespace}.json`)
    )
  )
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ko',
    supportedLngs: ['ko', 'en'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    // ns에 사용할 모든 네임스페이스를 나열하거나 기본값을 설정합니다.
    ns: [
      'common',
      'home',
      'jobPost',
      'filter',
      'content',
      'spec',
      'interview',
      'resume',
      'login',
      'signup',
      'findAuth',
      'my',
      'modal',
      'program',
      'message',
    ],
    defaultNS: 'common',
    react: {
      useSuspense: false,
    },
  })

export default i18n
