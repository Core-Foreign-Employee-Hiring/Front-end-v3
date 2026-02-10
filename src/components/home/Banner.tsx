'use client'

import Image from 'next/image'
import { Button } from '@/components/common'
import { ArrowFowardMain500Icon } from '@/assets/svgComponents'

export default function Banner() {
  return (
    <div className="relative h-[300px] w-full overflow-hidden">
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-y-[32px]">
        <div className="flex flex-col gap-y-2">
          <div className="desktop:flex-row flex flex-col gap-x-1 gap-y-1">
            <h1 className="kr-title-lg desktop:kr-resume-lg text-center text-white">막막했던 한국 취업·창업 준비 </h1>
            <h1 className="kr-title-lg desktop:kr-resume-lg text-center text-white">KORFIT과 함께</h1>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p className="kr-subtitle-md desktop:kr-title-sm desktop:block tablet:block hidden text-white">
              복잡한 채용 절차부터 취업 역량 강화까지
            </p>
            <div className="desktop:flex-row flex flex-col items-center gap-x-1">
              <p className="kr-subtitle-md desktop:kr-title-sm text-white">글로벌 인재를 위한 한국 커리어 준비의</p>
              <p className="kr-subtitle-md desktop:kr-title-sm text-white">모든 과정을 지원합니다</p>
            </div>
          </div>
        </div>
        <Button
          rightIcon={<ArrowFowardMain500Icon width={20} height={20} />}
          onClick={() => {}}
          variant={'secondary'}
          size={'lg'}
          customClassName={'w-[313px]'}
        >
          KORFIT 알아보기
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
