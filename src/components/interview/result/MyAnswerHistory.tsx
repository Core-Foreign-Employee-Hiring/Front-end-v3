import { Badge } from '@/components/common'

export default function MyAnswerHistory() {
  return (
    <div className="bg-gray1 flex flex-col gap-y-[20px] rounded-[12px] p-4">
      <section className="flex flex-col gap-y-3">
        <Badge bgColor={'bg-main-300'} textColor={'text-white'}>
          나의 답변
        </Badge>
        <p className="kr-body-md">
          [질문] 입사 후 1년 내 목표는 무엇인가요? [답변] 재미있게 일하면서 회사에 기여를 하고 싶습니다. [꼬리질문]
          재미있게 일하는 것과 회사에 기여하는 것은 목표라기보다는 좋은 직장 생활의 결과에 가깝습니다. 구체적으로
          '재미있다'는 것이 어떤 의미이고, 그 재미를 통해 회사의 어떤 부분에, 어느 정도 수준으로 기여하겠다는 것인지
          말씀해주시겠어요? [꼬리질문 답변] 재미있다는 건 회사의 분위기를 좋게 이끌어나가겠다는 뜻이고, 회사의 문화를
          긍정적으로 바꾸며 기술을 개발하여 회사에 기여하고 싶습니다.
        </p>
      </section>

      <section className="flex flex-col gap-y-3 rounded-[8px] bg-white p-3">
        <Badge bgColor={'bg-error-light'} textColor={'text-error'}>
          압박 질문
        </Badge>
        <p className="kr-body-md">
          [질문] 입사 후 1년 내 목표는 무엇인가요? [답변] 재미있게 일하면서 회사에 기여를 하고 싶습니다. [꼬리질문]
          재미있게 일하는 것과 회사에 기여하는 것은 목표라기보다는 좋은 직장 생활의 결과에 가깝습니다. 구체적으로
          '재미있다'는 것이 어떤 의미이고, 그 재미를 통해 회사의 어떤 부분에, 어느 정도 수준으로 기여하겠다는 것인지
          말씀해주시겠어요? [꼬리질문 답변] 재미있다는 건 회사의 분위기를 좋게 이끌어나가겠다는 뜻이고, 회사의 문화를
          긍정적으로 바꾸며 기술을 개발하여 회사에 기여하고 싶습니다.
        </p>
        <div className="flex gap-x-3">
          <div className="border-gray5 border-l-[2px] pl-[2px]" />
          <p className="kr-body-md">답변</p>
        </div>
      </section>
    </div>
  )
}
