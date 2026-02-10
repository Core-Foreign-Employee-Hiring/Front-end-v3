import { Label } from '@/components/common'
import InterviewGuide from '@/components/interview/InterviewGuide'
import Manual from '@/components/interview/home/Manual'
import Comparison from '@/components/interview/home/Comparison'

export default function InterviewHome() {
  return (
    <main className="flex flex-col gap-y-[40px]">
      <div className="desktop:gap-y-[40px] tablet:gap-y-[20px] flex flex-col gap-y-[20px]">
        <div className="flex flex-col gap-y-2">
          <Label label={'KORFIT과 함께하는 실전 면접 준비'} type={'subtitleLg'} />
          <p className="kr-body-md">
            직무별 맞춤 질문으로 실전처럼 연습하고, 면접 역량을 향상시킬 수 있는 AI의 상세한 분석을 받아보세요.
          </p>
        </div>

        <section className="desktop:flex-row tablet:flex-row tablet:gap-x-[20px] desktop:gap-x-[24px] flex flex-col gap-y-[40px]">
          <InterviewGuide
            bgColor={'bg-gray1'}
            title={'진행 가이드'}
            content={
              '공통/직무/역량 질문이 랜덤하게 섞여 출제돼요. 답변 꼬리질문 기능을 키면 심화된 질문과 답을 할 수 있어요. 음성으로 답변하면 텍스트가 자동으로 변환되어 기록돼요. 모든 답변이 끝나면 KORFIT이 5가지 역량을 분석해줍니다.'
            }
          />

          <InterviewGuide
            bgColor={'bg-gray1'}
            title={'이런 질문이 나와요'}
            content={
              '간단한 자기소개를 부탁드려요. 본인의 강점과 약점을 직무와 연관지어 설명해주세요. 한국 기업 문화에서 가장 중요하게 생각하는 것이 무엇인가요? 인사 후 3년 내에 이루고 싶은 목표가 있다면 말씀해주세요.'
            }
          />
        </section>
      </div>

      <Manual />

      <Comparison />
    </main>
  )
}
