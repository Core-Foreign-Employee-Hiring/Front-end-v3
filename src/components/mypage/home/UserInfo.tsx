'use client'

import { Button } from '@/components/common'
import { useRouter } from 'next/navigation'

export default function UserInfo() {
  const router = useRouter()
  return (
    <div className="bg-gray1 flex w-full justify-between rounded-[12px] p-5">
      <section className="flex flex-col gap-y-2">
        <p className="kr-title-lg">Bat-Erdene Saruul</p>
        <div className="kr-body-md flex items-center gap-x-2">
          <p>국적</p>
          <p>|</p>
          <p>비자</p>
        </div>
        <p className="kr-body-md text-gray5">010-1234-1234</p>
        <p className="kr-body-md text-gray5">saruul.marketing@gmail.com</p>
        <p className="kr-body-md text-gray5">2002.01.09</p>
      </section>
      <Button
        onClick={() => router.push('/mypage/profile')}
        customClassName={'w-[100px]'}
        variant={'outline'}
        size={'md'}
      >
        프로필 수정
      </Button>
    </div>
  )
}
