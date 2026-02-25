'use client'

import { Button } from '@/components/common'
import { patchModifyProfile } from '@/lib/client/mypage'
import { useModifyProfileStore } from '@/store/modifyProfileStore'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

export default function BottomButton() {
  const { t } = useTranslation('my')
  const { modifyProfileData } = useModifyProfileStore((state) => state)
  const router = useRouter()
  return (
    <div className="flex w-full justify-end gap-x-4 py-[20px]">
      <Button
        onClick={() => {
          router.back()
        }}
        customClassName={'w-[180px]'}
        variant={'outline'}
      >
        {t('profile.bottom_buttons.back')}
      </Button>
      <Button
        onClick={async () => {
          const result = await patchModifyProfile(modifyProfileData)
          console.log('프로필 수정 성공', result)
        }}
        customClassName={'w-[180px]'}
      >
        {t('profile.bottom_buttons.submit')}
      </Button>
    </div>
  )
}
