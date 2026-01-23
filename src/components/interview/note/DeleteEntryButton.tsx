import { Button } from '@/components/common'
import { DeleteIcon } from '@/assets/svgComponents'

interface DeleteEntryButtonProps {}
export default function DeleteEntryButton({}: DeleteEntryButtonProps) {
  return (
    <Button
      leftIcon={<DeleteIcon width={20} height={20} />}
      size={'sm'}
      variant={'outline'}
      customClassName={'w-[115px]'}
    >
      질문 삭제
    </Button>
  )
}
