import { twMerge } from 'tailwind-merge'

interface BottomBoarderProps {
  customClassName?: string
}
export default function BottomBoarder({ customClassName }: BottomBoarderProps) {
  return <div className={`${twMerge('bg-gray1 h-[6px] w-full', customClassName)}>`} />
}
