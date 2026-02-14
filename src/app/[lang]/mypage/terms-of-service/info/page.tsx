import { Header, PageLayout, Spacing } from '@/components/common'
import Footer from '@/components/common/Footer'

export default async function InfoPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  return (
    <main>
      <Header headerType={'dynamic'} title={'개인정보 수집 및 이용 동의'} currentLng={lang} />
      <PageLayout>
        <ol className="kr-body-sm list-inside list-decimal space-y-4">
          <li>
            수집/이용의 목적
            {/* 내부 중첩 리스트 (불렛 형태) */}
            <ul className="kr-body-sm mt-2 ml-3 list-inside list-disc space-y-1">
              <li>회원의 SMS/MMS를 이용하여 뉴스, 이벤트, 소식, 설문, 광고 정보를 전송</li>
            </ul>
          </li>

          <li>
            수집/이용 항목
            <ul className="kr-body-sm mt-2 ml-3 list-inside list-disc space-y-1">
              <li>SMS/MMS</li>
            </ul>
          </li>

          <li>
            보유 기한
            <ul className="kr-body-sm mt-2 ml-3 list-inside list-disc space-y-1">
              <li>
                관계 법령의 규정에 따라 보존할 의무가 있는 경우가 아닌 한,{' '}
                <span className="text-main-500">회원탈퇴 또는 동의 철회 시</span> 까지
              </li>
            </ul>
          </li>

          <li>
            수신동의 거부 철회 방법
            <ul className="kr-body-sm mt-2 ml-3 list-inside list-disc space-y-1">
              <li>
                본 동의는 거부하실 수 있습니다. 다만 거부 시 동의를 통해 제공 가능한 각종 혜택, 이벤트 안내를 받아보실
                수 없습니다.
              </li>
              <li>본 수신동의를 철회하고자 할 경우에는 회원정보 수정 페이지에서 수신여부를 변경하실 수 있습니다.</li>
            </ul>
          </li>
        </ol>
      </PageLayout>
      <Spacing height={300} />
      <Footer />
    </main>
  )
}
