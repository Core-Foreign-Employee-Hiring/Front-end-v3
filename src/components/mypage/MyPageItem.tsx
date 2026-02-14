'use client'

import { twMerge } from 'tailwind-merge'
import { useRouter } from 'next/navigation'
import { RightArrowIcon } from '@/assets/svgComponents'

interface MyPageItemProps {
  title: string
  path: string
  textColor?: string
}
export default function MyPageItem({ path, title, textColor }: MyPageItemProps) {
  const router = useRouter()

  return (
    <div
      onClick={() => {
        router.push(path)
      }}
      className="flex w-full cursor-pointer items-center justify-between py-4 pr-5"
    >
      <p className={`${twMerge('kr-button text-black', textColor)}`}>{title}</p>
      <RightArrowIcon width={20} height={20} />
    </div>
  )
}
