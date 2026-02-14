import { Button } from '@/components/common'

export default function BottomActionsButtons() {
  return (
    <div>
      <div className="desktop:hidden tablet:px-[32px] fixed bottom-0 left-0 w-full bg-white px-[20px] py-[20px]">
        <Button>지원하기</Button>
      </div>
    </div>
  )
}
