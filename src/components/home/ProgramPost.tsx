'use client'

import { Button, Label } from '@/components/common'
import ProgramCard from '@/components/program/ProgramCard'

export default function ProgramPost() {
  return (
    <div className="flex flex-col gap-y-3 px-[40px]">
      <section className="flex items-end justify-between">
        <div className="flex flex-col gap-y-2">
          <Label type={'titleLg'} label={'프로그램'} />
          <p className="kr-body-md">KORFIT이 준비한 다양한 대외활동</p>
        </div>
        <Button variant={'ghost'} onClick={() => {}} size={'sm'} customClassName={'w-[70px]'}>
          더보기
        </Button>
      </section>

      <section className="grid grid-cols-4 gap-[24px]">
        <ProgramCard />
        <ProgramCard />
        <ProgramCard />
        <ProgramCard />
      </section>
    </div>
  )
}
