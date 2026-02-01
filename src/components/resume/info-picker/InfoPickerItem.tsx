import { CheckIcon, UncheckIcon } from '@/assets/svgComponents'
import { twMerge } from 'tailwind-merge'

interface InfoPickerItemProps {
  content: string
  isSelected: boolean
  onClick: () => void
}

export default function InfoPickerItem({ content, isSelected, onClick }: InfoPickerItemProps) {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        'flex h-[40px] cursor-pointer items-center gap-x-2 rounded-[10px] border px-4 py-2 transition-colors',
        isSelected ? 'border-main-500 bg-main-100 text-main-500' : 'border-gray2 text-gray4 bg-white'
      )}
    >
      {isSelected ? <CheckIcon width={20} height={20} /> : <UncheckIcon width={20} height={20} />}
      <p className="kr-button whitespace-nowrap">{content}</p>
    </div>
  )
}
