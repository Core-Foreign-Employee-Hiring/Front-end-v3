import { Spacing } from '@/components/common'
import Image from 'next/image'
import { ResumeMemberBasicInfoType } from '@/types/resume'

interface IntroVer1Props {
  profileImageUrl: string | undefined
  introduction: string | undefined
  memberBasicInfo: ResumeMemberBasicInfoType | undefined
}

export default function IntroVer1({ memberBasicInfo, profileImageUrl, introduction }: IntroVer1Props) {
  return (
    <div className="bg-main-50 flex gap-x-[40px] px-[40px] py-[60px]">
      <div className="flex w-full justify-between gap-x-[40px]">
        <div className="flex flex-col gap-y-2">
          <h1 className="kr-resume-lg">{memberBasicInfo?.name}</h1>
          <p className="kr-resume-lg-light">{memberBasicInfo?.jobRole}</p>
          <p className="kr-body-md">
            {memberBasicInfo?.nationality} | {memberBasicInfo?.visa}
          </p>
          <p className="kr-body-md text-gray5">{memberBasicInfo?.phoneNumber}</p>
          <p className="kr-body-md text-gray5">{memberBasicInfo?.email}</p>
          <Spacing height={32} />
          <div className="w-[80px] border-b border-black" />
          <Spacing height={32} />
          <p className="kr-resume-md-light">{introduction}</p>
        </div>
        <Image alt={'사진'} src={profileImageUrl || ''} className={'shrink-0 rounded-[8px]'} width={184} height={240} />
      </div>
    </div>
  )
}
