import { Spacing } from '@/components/common'
import Image from 'next/image'

export default function IntroVer1() {
  return (
    <div className="bg-main-50 flex gap-x-[40px] px-[40px] py-[60px]">
      <div className="flex gap-x-[40px]">
        <div className="flex flex-col gap-y-2">
          <h1 className="kr-resume-lg">Nguyen Minh Anh</h1>
          <p className="kr-resume-lg-light">프론트엔드 웹 개발자 (Frontend Engineer)</p>
          <p className="kr-body-md text-gray5">010-7557-9217</p>
          <p className="kr-body-md text-gray5">hske3602@naver.com</p>
          <Spacing height={32} />
          <div className="w-[80px] border-b border-black" />
          <Spacing height={32} />
          <p className="kr-resume-md-light">
            한국에서의 유학과 다양한 팀 프로젝트 경험을 통해 사용자 중심의 웹 서비스를 개발해 왔습니다. React 기반
            프론트엔드 개발을 주로 담당하며, 디자이너·기획자와의 협업 경험이 풍부합니다. 코드 품질과 UI 완성도를 동시에
            고려하는 개발자가 되는 것을 목표로 하고 있습니다.
          </p>
        </div>
        <Image alt={'사진'} src={'/profile.jpg'} className={'shrink-0 rounded-[8px]'} width={184} height={240} />
      </div>
    </div>
  )
}
