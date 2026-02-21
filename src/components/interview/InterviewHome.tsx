'use client'

import { Label } from '@/components/common'
import InterviewGuide from '@/components/interview/InterviewGuide'
import Manual from '@/components/interview/home/Manual'
import Comparison from '@/components/interview/home/Comparison'
import { useTranslation } from 'react-i18next'

export default function InterviewHome() {
  const { t } = useTranslation(['interview'])
  return (
    <main className="flex flex-col gap-y-[40px]">
      <div className="desktop:gap-y-[40px] tablet:gap-y-[20px] flex flex-col gap-y-[20px]">
        <div className="flex flex-col gap-y-2">
          <Label label={t('home.hero.label')} type={'subtitleLg'} />
          <p className="kr-body-md">{t('home.hero.description')}</p>
        </div>

        <section className="desktop:flex-row tablet:flex-row tablet:gap-x-[20px] desktop:gap-x-[24px] flex flex-col gap-y-[40px]">
          <InterviewGuide
            bgColor={'bg-gray1'}
            title={t('home.guide.process.title')}
            content1={t('home.guide.process.items.0')}
            content2={t('home.guide.process.items.1')}
            content3={t('home.guide.process.items.2')}
            content4={t('home.guide.process.items.3')}
          />

          <InterviewGuide
            bgColor={'bg-gray1'}
            title={t('home.guide.examples.title')}
            content1={t('home.guide.examples.items.0')}
            content2={t('home.guide.examples.items.1')}
            content3={t('home.guide.examples.items.2')}
            content4={t('home.guide.examples.items.3')}
          />
        </section>
      </div>

      <Manual />

      <Comparison />
    </main>
  )
}
