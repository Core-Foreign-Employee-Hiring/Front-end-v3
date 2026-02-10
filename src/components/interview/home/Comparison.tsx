import { Label } from '@/components/common'
import ComparisonItem from '@/components/interview/home/ComparisonItem'
import { AudioIcon, LineChartIcon, NoteIcon, PaperClipIcon } from '@/assets/svgComponents'

export default function Comparison() {
  return (
    <section className="flex flex-col gap-y-3">
      <Label type={'subtitleLg'} label={'KORFIT 면접의 차별점'} />

      <div className="desktop:grid-cols-2 tablet:grid-cols-2 grid grid-cols-1 gap-6">
        <ComparisonItem
          title={'실제 면접 흐름을 반영한 질문 구조'}
          content={'공통, 직무, 역량 질문으로 구성되어 있어요.'}
          icon={<PaperClipIcon width={22} height={32} />}
        />
        <ComparisonItem
          title={'역량 기준에 따른 분석 리포트'}
          content={'5대 역량을 기준으로 객관적인 평가를 제공해요.'}
          icon={<LineChartIcon width={32} height={23} />}
        />
        <ComparisonItem
          title={'답변 기록과 노트를 통한 답변 개선'}
          content={'이전 답변과 비교하며 성장 과정을 확인할 수 있어요.'}
          icon={<NoteIcon width={32} height={26} />}
        />
        <ComparisonItem
          title={'구독 기반의 체계적인 면접 훈련'}
          content={'단계별 플랜으로 원하는 목표에 따라 준비가 가능해요.'}
          icon={<AudioIcon width={26} height={32} />}
        />
      </div>
    </section>
  )
}
