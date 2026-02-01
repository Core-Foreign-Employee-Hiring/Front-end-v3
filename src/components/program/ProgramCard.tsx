import Image from 'next/image'
import { Label } from '@/components/common'
import { CalendarIcon, PersonIcon } from '@/assets/svgComponents'

export default function ProgramCard() {
  return (
    <div className="flex flex-col gap-y-3">
      <div className="relative h-[164px] w-full">
        <Image alt={'콘텐츠 사진'} src={'/profile.jpg'} fill className="rounded-[16px] object-cover" />
      </div>

      <section className="flex flex-col gap-y-1">
        <Label type={'subtitleMd'} label={'GIT 해커톤'} />
        <p className="kr-body-md text-gray5">Korfit과 충북 pro 메이커센터에서 주최하는 1박 2일 글로벌 IT 해커톤</p>

        <div className="flex items-center gap-x-1">
          <CalendarIcon width={20} height={20} />
          <p className="kr-body-sm text-gray5">2025. 09. 13 - 2025. 09. 14</p>
        </div>

        <div className="flex items-center gap-x-1">
          <PersonIcon width={20} height={20} />
          <p className="kr-body-sm text-gray5">5팀, 25명</p>
        </div>
      </section>
    </div>
  )
}
