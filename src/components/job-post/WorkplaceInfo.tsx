'use client'
import { Gray5LocationIcon } from '@/assets/svgComponents'
import { Label } from '@/components/common'

interface WorkplaceInfoProps {
  zipcode: string
  address1: string
  address2: string
}

export default function WorkplaceInfo({ zipcode, address1, address2 }: WorkplaceInfoProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'근무지 정보'} type={'subtitleLg'} />
      <div className="flex items-center gap-x-2">
        <Gray5LocationIcon width={20} height={20} />
        <p className="kr-body-md text-gray5">{`(${zipcode}) ${address1} ${address2}`}</p>
      </div>
    </div>
  )
}
