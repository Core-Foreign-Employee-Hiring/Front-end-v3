'use client'

import { Button } from '@/components/common'
import { useRouter } from 'next/navigation'
import { ModifyProfileType } from '@/types/auth/modify-profile'
import { getNationality, getVisaLabel } from '@/utils/filterList'
import { useTranslation } from 'react-i18next'

interface UserInfoProps {
  userInfo: ModifyProfileType | undefined
}

export default function UserInfo({ userInfo }: UserInfoProps) {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <div className="bg-gray1 tablet:flex-row desktop:flex-row flex w-full flex-col justify-between gap-y-[24px] rounded-[12px] p-5">
      <section className="flex flex-col gap-y-2">
        <p className="kr-title-lg">{userInfo?.name}</p>
        <div className="kr-body-md flex items-center gap-x-2">
          <p>{t(getNationality(userInfo?.nationality))}</p>
          <p>|</p>
          <p>{t(getVisaLabel(userInfo?.visa))}</p>
        </div>
        <p className="kr-body-md text-gray5">{userInfo?.phoneNumber}</p>
        <p className="kr-body-md text-gray5">{userInfo?.email}</p>
        <p className="kr-body-md text-gray5">{userInfo?.birthDate}</p>
      </section>
      <Button
        onClick={() => router.push('/mypage/home/profile')}
        customClassName={'w-[100px]'}
        variant={'outline'}
        size={'md'}
      >
        프로필 수정
      </Button>
    </div>
  )
}
