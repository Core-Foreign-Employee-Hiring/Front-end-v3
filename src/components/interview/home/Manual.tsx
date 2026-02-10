import ManualItem from '@/components/interview/home/ManualItem'
import { Label } from '@/components/common'

export default function Manual() {
  return (
    <section>
      <Label label={'사용방법'} type={'subtitleLg'} />

      <div className="desktop:grid-cols-2 tablet:grid-cols-2 grid grid-cols-1 gap-[20px]">
        <ManualItem number={1} title={'질문 설정'} content={'직무와 난이도를 선택해 질문을 구성해요.'} />
        <ManualItem number={2} title={'면접 진행'} content={'실제 면접처럼 음성 또는 텍스트로 질문에 답변해요.'} />
        <ManualItem number={3} title={'AI 분석'} content={'답변 내용을 기반으로 역량을 분석해요.'} />
        <ManualItem
          number={4}
          title={'정밀한 피드백'}
          content={'개선 포인트와 개선 답변을 통해 면접 역량을 다듬을 수 있어요.'}
        />
      </div>
    </section>
  )
}
