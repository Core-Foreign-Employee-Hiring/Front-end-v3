import { Button, Spacing } from '@/components/common'
import { ImformationIcon, WhiteRightArrowIcon } from '@/assets/svgComponents'

export default function Account() {
  return (
    <div className="flex w-full flex-col">
      <section className="flex items-center justify-between">
        <div className="kr-body-sm text-gray5 flex gap-x-1">
          <p>황유림</p>
          <p>토스뱅크 1000-2185-1683</p>
        </div>
        <Button variant={'outline'} size={'sm'} customClassName={'w-[110px]'}>
          계좌번호 수정
        </Button>
      </section>
      <Spacing height={12} />
      <section className="bg-gray1 border-gray2 flex items-center justify-between rounded-[12px] border px-5 py-4">
        <div className="flex flex-col gap-y-1">
          <p className="kr-body-sm text-gray5">총수익</p>
          <div className="flex items-center gap-x-1">
            <p className="kr-subtitle-md">40,000원</p>
            <ImformationIcon width={20} height={20} />
          </div>
        </div>
        <Button
          customClassName={'w-[110px]'}
          variant={'primary'}
          size={'md'}
          rightIcon={<WhiteRightArrowIcon width={20} height={20} />}
        >
          인출하기
        </Button>
      </section>
    </div>
  )
}
