import { InstagramIcon, KakaoIcon, LogoIcon } from '@/assets/svgComponents'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className="bg-gray1 desktop:px-[40px] desktop:py-[40px] tablet:px-[32px] tablet:py-[40px] tablet:gap-y-[32px] tablet:items-center flex flex-col gap-y-[20px] px-[20px] py-[32px]">
      <div className="desktop:justify-between tablet:justify-between tablet:flex-row desktop:flex-row flex w-full flex-col gap-y-[20px]">
        <section className="tablet:gap-y-[16px] desktop:gap-y-3 flex flex-col gap-y-[20px]">
          <LogoIcon width={90} height={27} />
          <div className="kr-subtitle-md text-gray5 tablet:flex-col desktop:flex-col flex flex-row gap-x-1">
            <p>막막했던 한국 취업·창업 준비,</p>
            <p>KORFIT과 함께 해요.</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <div className="flex items-center gap-x-2">
              <InstagramIcon width={20} height={20} />
              <Link
                className="kr-body-sm text-gray5 underline decoration-1 underline-offset-4"
                href={'https://www.instagram.com/korfit_official/'}
              >
                @korfit_official
              </Link>
            </div>
            <div className="flex items-center gap-x-2">
              <KakaoIcon width={20} height={20} />
              <Link
                className="kr-body-sm text-gray5 underline decoration-1 underline-offset-4"
                href={'https://open.kakao.com/o/gZYRvznh'}
              >
                외국인 유학생 학교 생활 / 취업 정보방
              </Link>
            </div>
          </div>
        </section>

        <section className="tablet:w-[250px] kr-body-sm text-gray4 tablet:gap-y-3 desktop:gap-y-3 flex flex-col gap-y-2">
          <div>대표자명 | 황유림</div>
          <div>사업자 등록번호 | 황유림</div>
          <div>통신판매업신고번호 | 황유림</div>
          <div>주소 | 황유림</div>
          <div>전화번호 | 010-7557-9217</div>
        </section>

        <section className="desktop:w-[250px] tablet:w-[250px] desktop:flex kr-body-sm text-gray4 hidden flex-col gap-y-3">
          <div>고객센터</div>
          <div>010-7557-9217</div>
          <div>hske3602@naver.com</div>
          <div>민원접수</div>
          <div className="">© 2026 KORFIT. All rights reserved</div>
        </section>
      </div>

      <div className="desktop:hidden kr-body-sm text-gray4">© 2026 KORFIT. All rights reserved</div>
    </div>
  )
}
