import { Button } from '@/components/common'

export default function ResumeButtons() {
  return (
    <div className="flex gap-x-[7px]">
      <Button customClassName="w-[60px]" variant={'outline'} size={'sm'}>
        수정
      </Button>
      <Button customClassName="w-[60px]" variant={'outline'} size={'sm'}>
        삭제
      </Button>
      <Button customClassName="w-[110px]" variant={'primary'} size={'sm'}>
        PDF 내보내기
      </Button>
    </div>
  )
}
