'use client'

import { Label } from '@/components/common'
import CTACard from '@/components/home/CTACard'
import { WhiteClopboardIcon, WhiteEditDocumentIcon, WhiteVoiceChatOutlineIcon } from '@/assets/svgComponents'
import { useTranslation } from 'react-i18next'

interface AICareerVerifyCTAProps {
  lang: string
}

export default function AICareerVerifyCTA({ lang }: AICareerVerifyCTAProps) {
  const { t } = useTranslation(['home'])
  const ctaCardList = [
    {
      icon: <WhiteClopboardIcon width={21} height={26} />,
      title: t('aiCareerVerifyCTA.specCard.title'),
      description: t('aiCareerVerifyCTA.specCard.content'),
      path: `/${lang}/carrer?tab=spec&step=1`,
    },
    {
      icon: <WhiteEditDocumentIcon width={23} height={25} />,
      title: t('aiCareerVerifyCTA.resumeCard.title'),
      description: t('aiCareerVerifyCTA.resumeCard.content'),
      path: `/${lang}/carrer?tab=resume`,
    },
    {
      icon: <WhiteVoiceChatOutlineIcon width={30} height={30} />,
      title: t('aiCareerVerifyCTA.aiInterviewCard.title'),
      description: t('aiCareerVerifyCTA.aiInterviewCard.content'),
      path: `/${lang}/interview?tab=home`,
    },
  ]
  return (
    <div className="bg-gray1 tablet:px-[32px] desktop:py-[40px] desktop:px-[40px] flex w-full flex-col gap-y-[12px] px-[20px] py-[32px] py-[60px]">
      <div className="flex flex-col gap-y-2">
        <Label type={'titleLg'} label={t('aiCareerVerifyCTA.title')} />
        <p className="kr-body-md">{t('aiCareerVerifyCTA.description')}</p>
      </div>

      <div className="desktop:flex-row tablet:flex-row desktop:gap-x-6 tablet:gap-x-[16px] flex w-full flex-col gap-y-4">
        {ctaCardList.map((cta) => (
          <CTACard path={cta.path} key={cta.title} title={cta.title} description={cta.description} Icon={cta.icon} />
        ))}
      </div>
    </div>
  )
}
