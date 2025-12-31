import { Button, Label, Spacing } from '@/components/common'
import { ArrowFowardGray3Icon } from '@/assets/svgComponents'

export default function InterviewIntro() {
  return (
    <div>
      <Label label={'KORFIT과 함께하는 실전 면접 준비'} type={'subtitleLg'} />
      <Spacing height={8} />

      <p className="kr-body-md">
        직무별 맞춤 질문으로 실전처럼 연습하고, 면접 역량을 향상시킬 수 있는 <br /> AI의 상세한 분석을 받아보세요.
      </p>
      <Spacing height={16} />

      <div className="flex gap-x-2">
        <Button
          size={'md'}
          variant={'primary'}
          customClassName={'w-[126px]'}
          rightIcon={<ArrowFowardGray3Icon width={20} height={20} />}
        >
          새 면접 시작
        </Button>

        <Button customClassName={'w-[96px]'} variant={'secondary'} size={'md'}>
          이용가이드
        </Button>
      </div>
    </div>
  )
}
