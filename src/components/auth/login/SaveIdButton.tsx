'use client'

import { CheckIcon, UncheckIcon } from '@/assets/svgComponents'
import { useSaveId } from '@/hooks'
import { useTranslation } from 'react-i18next'

export default function SaveIdButton() {
  const { t } = useTranslation('login')
  const { isIdSaved, handleToggle } = useSaveId()

  return (
    <div className="flex cursor-pointer items-center gap-x-2 select-none" onClick={handleToggle}>
      {isIdSaved ? <CheckIcon width={20} height={20} /> : <UncheckIcon width={20} height={20} />}
      <p className="kr-subtitle-md text-gray5">{t('buttons.save_id')}</p>
    </div>
  )
}
