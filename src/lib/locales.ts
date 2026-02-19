import commonKo from '@/i18n/locales/ko/common.json'
import contentKo from '@/i18n/locales/ko/content.json'
import jobPostKo from '@/i18n/locales/ko/jobPost.json'
import homeKo from '@/i18n/locales/ko/home.json'
import filterKo from '@/i18n/locales/ko/filter.json'

import commonEn from '@/i18n/locales/en/common.json'
import contentEn from '@/i18n/locales/en/content.json'
import jobPostEn from '@/i18n/locales/en/jobPost.json'
import homeEn from '@/i18n/locales/en/home.json'
import filterEn from '@/i18n/locales/en/filter.json'
import { Locale } from './i18n.types'

type Resources = {
  [key in Locale]: {
    [key: string]: Record<string, any>
  }
}

export const resources: Resources = {
  ko: {
    common: commonKo,
    content: contentKo,
    jobPost: jobPostKo,
    home: homeKo,
    filter: filterKo,
  },
  en: {
    common: commonEn,
    content: contentEn,
    jobPost: jobPostEn,
    home: homeEn,
    filter: filterEn,
  },
}
