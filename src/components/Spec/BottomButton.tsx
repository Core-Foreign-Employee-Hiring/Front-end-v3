import { Button } from '@/components/common'

interface BottomButtonProps {
  step?: '1' | '2' | '3' | '4' | '5'
  handlePrev?: () => void
  isPrevButtonActive?: boolean
  handleNext?: () => void
  isNextButtonActive?: boolean
}

export default function BottomButton({
  handlePrev,
  handleNext,
  isNextButtonActive,
  isPrevButtonActive = true,
  step = '1',
}: BottomButtonProps) {
  return (
    <div className="fixed bottom-0 left-0 flex w-full justify-between bg-white px-5 py-5">
      {handlePrev ? (
        <Button
          state={isPrevButtonActive ? 'default' : 'disable'}
          disabled={!isPrevButtonActive}
          onClick={handlePrev}
          customClassName={'w-[180px]'}
          variant={'outline'}
        >
          이전
        </Button>
      ) : (
        <div className="w-[180px]" />
      )}
      {handleNext ? (
        <Button
          state={isNextButtonActive ? 'default' : 'disable'}
          disabled={!isNextButtonActive}
          onClick={handleNext}
          customClassName={'w-[180px]'}
          variant={'primary'}
        >
          {step === '5' ? '제출' : '다음'}
        </Button>
      ) : (
        <div className="w-[180px]" />
      )}
    </div>
  )
}
