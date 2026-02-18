import { Header, PageLayout } from '@/components/common'

export default async function WithDrawPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  return (
    <main>
      <Header headerType={'dynamic'} title={'회원 탈퇴'} currentLng={lang} />
      <PageLayout>
        <ol className="kr-subtitle-md list-inside list-decimal space-y-[20px]">
          <li>
            탈퇴 즉시 회원정보 삭제
            {/* 내부 중첩 리스트 (불렛 형태) */}
            <ul className="kr-subtitle-sm mt-2 ml-3 list-inside list-disc space-y-1">
              <li>
                탈퇴 즉시 아카이브, 저장된 기록 모두 삭제되며, 삭제된 정보는 복구되지 않습니다. 단, 공공적 성격의
                게시물은 삭제되지 않으므로 탈퇴 전 미리 삭제해주세요.
              </li>
            </ul>
          </li>

          <li>
            이용 정보 일정기간 보관
            <ul className="kr-subtitle-sm mt-2 ml-3 list-inside list-disc space-y-1">
              <li>
                전자상거래 등에서 소비자보호에 관한 법률에 따라 유료 결제에 관한 계약 기록은 5년간 보관됩니다. 부적합
                정보, 이용제한 및 징계에 관한 기록은 일정기간 보관합니다.
              </li>
            </ul>
          </li>
          <div className="flex flex-col gap-y-1">
            <p className="kr-button text-error">해당 서비스는 계정 복구 기능을 지원하지 않습니다.</p>
            <p className="kr-button text-error">탈퇴 진행 후, 유료서비스의 환불 진행은 어렵습니다.</p>
          </div>
          {/*<div className="border-gray2 border-b" />*/}
        </ol>
        {/*<Spacing height={40} />*/}
        {/*<div className="flex flex-col gap-y-2">*/}
        {/*  <Label type={'subtitleMd'} label={'떠나시는 이유를 알려주세요.'} />*/}
        {/*  <TextInput*/}
        {/*    value={''}*/}
        {/*    textType={'textArea'}*/}
        {/*    placeholder={*/}
        {/*      '서비스 탈퇴 사유에 대해 알려주세요.\n' + '고객님의 소중한 피드백을 담아 더 나은 서비스로 보답하겠습니다.'*/}
        {/*    }*/}
        {/*  />*/}
        {/*</div>*/}
      </PageLayout>
    </main>
  )
}
