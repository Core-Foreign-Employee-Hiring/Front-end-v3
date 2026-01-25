import { Button, TextInput } from '@/components/common'
import { DeleteIcon } from '@/assets/svgComponents'

export default function UrlField() {
  return (
    <div className="flex gap-x-3">
      <TextInput onChange={(e) => {}} value={''} placeholder={'제목입력'} customClassName={'w-[153px] shrink-0'} />
      <TextInput onChange={(e) => {}} value={''} placeholder={'URL 입력'} />
      <Button variant={'outline'} customClassName={'w-[52px]'} size={'lg'}>
        <DeleteIcon width={20} height={20} />
      </Button>
    </div>
  )
}
