import { Answer, Question } from '@/components/interview'
import { Badge, Spacing } from '@/components/common'
import BottomField from '@/components/interview/test/BottomField'

export default function InterviewTestPage() {
  return (
    <main className="w-full">
      <Question question={'신입으로서 회사에 어떻게 기여를 할 수 있나요?'} type={'COMMON'} sequence={1} />
      <Spacing height={20} />

      <Answer answer={'잘 기어할 있어요 ㅠ'} />
      <Spacing height={20} />

      <div className="flex w-full items-center justify-center">
        <Badge bgColor={'bg-gray1'} textColor={'text-gray4'} customClassName={'border border-gray2'}>
          압박 질문 생성중...
        </Badge>
      </div>

      <Spacing height={20} />
      <Question question={'진짜 잘할 수 있나요?'} type={'DEEP'} sequence={2} />

      <Spacing height={20} />
      <Answer answer={'예'} />
      <BottomField />
    </main>
  )
}
