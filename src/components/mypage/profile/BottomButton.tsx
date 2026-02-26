'use client'

import { Button } from '@/components/common'
import { patchModifyProfile } from '@/lib/client/mypage'
import { useModifyProfileStore } from '@/store/modifyProfileStore'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/components/common/toast/ToastContext'

export default function BottomButton() {
  const { t } = useTranslation(['my', 'message'])
  const { success, error } = useToast()
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
        {t('my:profile.bottom_buttons.back')}
      </Button>
      <Button
        onClick={async () => {
          const result = await patchModifyProfile(modifyProfileData)
          if (result.success) {
            success(
              t('message:patch_modify_profile.success.title'),
              t('message:patch_modify_profile.success.description')
            )
          } else {
            error(t('message:patch_modify_profile.error.title'), t('message:patch_modify_profile.error.description'))
          }
        }}
        customClassName={'w-[180px]'}
      >
        {t('my:profile.bottom_buttons.submit')}
      </Button>
    </div>
  )
}
