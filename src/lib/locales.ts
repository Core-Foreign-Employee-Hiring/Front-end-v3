import commonKo from '@/i18n/locales/ko/common.json'
import contentKo from '@/i18n/locales/ko/content.json'
import jobPostKo from '@/i18n/locales/ko/jobPost.json'
import homeKo from '@/i18n/locales/ko/home.json'
import filterKo from '@/i18n/locales/ko/filter.json'
import specKo from '@/i18n/locales/ko/spec.json'
import interviewKo from '@/i18n/locales/ko/interview.json'
import resumeKo from '@/i18n/locales/ko/resume.json'
import loginKo from '@/i18n/locales/ko/login.json'
import signupKo from '@/i18n/locales/ko/signup.json'
import findAuthKo from '@/i18n/locales/ko/findAuth.json'
import myKo from '@/i18n/locales/ko/my.json'
import modalKo from '@/i18n/locales/ko/modal.json'
import programKo from '@/i18n/locales/ko/program.json'
import messageKo from '@/i18n/locales/ko/message.json'

import commonEn from '@/i18n/locales/en/common.json'
import contentEn from '@/i18n/locales/en/content.json'
import jobPostEn from '@/i18n/locales/en/jobPost.json'
import homeEn from '@/i18n/locales/en/home.json'
import filterEn from '@/i18n/locales/en/filter.json'
import specEn from '@/i18n/locales/en/spec.json'
import interviewEn from '@/i18n/locales/en/interview.json'
import resumeEn from '@/i18n/locales/en/resume.json'
import loginEn from '@/i18n/locales/en/login.json'
import signupEn from '@/i18n/locales/en/signup.json'
import findAuthEn from '@/i18n/locales/en/findAuth.json'
import myEn from '@/i18n/locales/en/my.json'
import modalEn from '@/i18n/locales/en/modal.json'
import programEn from '@/i18n/locales/en/program.json'
import messageEn from '@/i18n/locales/en/message.json'

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
    spec: specKo,
    interview: interviewKo,
    resume: resumeKo,
    login: loginKo,
    signup: signupKo,
    findAuth: findAuthKo,
    my: myKo,
    modal: modalKo,
    program: programKo,
    message: messageKo,
  },
  en: {
    common: commonEn,
    content: contentEn,
    jobPost: jobPostEn,
    home: homeEn,
    filter: filterEn,
    spec: specEn,
    interview: interviewEn,
    resume: resumeEn,
    login: loginEn,
    signup: signupEn,
    findAuth: findAuthEn,
    my: myEn,
    modal: modalEn,
    program: programEn,
    message: messageEn,
  },
}
