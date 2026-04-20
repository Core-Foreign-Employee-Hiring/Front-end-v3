'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'

export default function Banner() {
  const { t } = useTranslation(['home'])
  const router = useRouter()
  return (
    <div
      onClick={() => {
        router.push('/promotion')
      }}
      className="desktop:h-[400px] tablet:h-[280px] relative h-[200px] w-full cursor-pointer overflow-hidden px-[20px]"
    >
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-y-[32px]">
        {/* 주석 처리된 콘텐츠 유지 */}
      </div>

      <Image src={'/riza-banner-img.png'} alt={'배너'} className={'object-cover'} fill priority />
    </div>
  )
}
