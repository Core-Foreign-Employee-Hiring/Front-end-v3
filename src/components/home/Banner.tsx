'use client'

import Image from 'next/image'
import { Button } from '@/components/common'
import { ArrowFowardMain500Icon } from '@/assets/svgComponents'
import { useTranslation } from 'react-i18next'

export default function Banner() {
  const { t } = useTranslation(['home'])
  return (
    <div className="relative h-[300px] w-full overflow-hidden px-[20px]">
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-y-[32px]">
        <div className="flex flex-col gap-y-2">
          <h1 className="kr-title-lg desktop:kr-resume-lg text-center text-white">{t('banner.h1')} </h1>

          <div className="flex flex-col items-center justify-center">
            <p className="kr-subtitle-md desktop:kr-title-sm text-center text-white">{t('banner.description')}</p>
          </div>
        </div>
        <Button
          rightIcon={<ArrowFowardMain500Icon width={20} height={20} />}
          onClick={() => {}}
          variant={'secondary'}
          size={'lg'}
          customClassName={'w-[313px]'}
        >
          {t('banner.button')}
        </Button>
      </div>

      {/* 3. 배경 이미지 (z-index를 따로 주지 않으면 기본적으로 z-0입니다) */}
      <Image
        src={'/banner-img.svg'}
        alt={'배너'}
        className={'object-cover'}
        fill
        priority // 배너 이미지는 우선순위 로딩을 권장합니다.
      />
    </div>
  )
}
