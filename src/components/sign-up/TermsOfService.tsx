'use client'

import { CheckIcon, UncheckIcon } from '@/assets/svgComponents'
import { BottomBorder } from '@/components/common'
import { useRegisterStore } from '@/store/registerStore'
import { useTranslation } from 'react-i18next'

export default function TermsOfService() {
  const { t } = useTranslation('signup')
  // 스토어에서 상태와 업데이트 함수를 가져옵니다.
  const { registerData, updateRegister } = useRegisterStore()

  // 모든 필수 및 선택 항목이 true인지 확인 (전체 동의 상태 계산)
  const isAllAgreed =
    registerData.over15 &&
    registerData.termsOfServiceAgreement &&
    registerData.personalInfoAgreement &&
    registerData.adInfoAgreementSmsMms &&
    registerData.adInfoAgreementEmail

  // 전체 동의 클릭 핸들러
  const handleAllAgreement = () => {
    const newValue = !isAllAgreed
    updateRegister('over15', newValue)
    updateRegister('termsOfServiceAgreement', newValue)
    updateRegister('personalInfoAgreement', newValue)
    updateRegister('adInfoAgreementSmsMms', newValue)
    updateRegister('adInfoAgreementEmail', newValue)
  }

  return (
    <div className="flex flex-col gap-y-3">
      {/* 전체 동의 */}
      <div className="flex cursor-pointer gap-x-2" onClick={handleAllAgreement}>
        {isAllAgreed ? <CheckIcon width={24} height={24} /> : <UncheckIcon width={24} height={24} />}
        <p className={`kr-subtitle-md ${isAllAgreed ? 'text-black' : 'text-gray5'}`}>
          {t('step2.termsField.allOptions')}
        </p>
      </div>

      <BottomBorder />

      {/* 개별 항목들 */}
      <AgreementItem
        label={t('step2.termsField.over15')}
        checked={registerData.over15 || false}
        onChange={(val) => updateRegister('over15', val)}
      />
      <AgreementItem
        label={t('step2.termsField.termsOfServiceAgreement')}
        checked={registerData.termsOfServiceAgreement || false}
        onChange={(val) => updateRegister('termsOfServiceAgreement', val)}
      />
      <AgreementItem
        label={t('step2.termsField.personalInfoAgreement')}
        checked={registerData.personalInfoAgreement || false}
        onChange={(val) => updateRegister('personalInfoAgreement', val)}
      />
      <AgreementItem
        label={t('step2.termsField.adInfoAgreementSmsMms')}
        checked={registerData.adInfoAgreementSmsMms || false}
        onChange={(val) => updateRegister('adInfoAgreementSmsMms', val)}
      />
      <AgreementItem
        label={t('step2.termsField.adInfoAgreementEmail')}
        checked={registerData.adInfoAgreementEmail || false}
        onChange={(val) => updateRegister('adInfoAgreementEmail', val)}
      />
    </div>
  )
}

/**
 * 코드 중복을 줄이기 위한 내부 아이템 컴포넌트
 */
interface AgreementItemProps {
  label: string
  checked: boolean
  onChange: (value: boolean) => void
}

function AgreementItem({ label, checked, onChange }: AgreementItemProps) {
  return (
    <div className="flex cursor-pointer gap-x-2" onClick={() => onChange(!checked)}>
      {checked ? <CheckIcon width={24} height={24} /> : <UncheckIcon width={24} height={24} />}
      <p className={`kr-subtitle-md ${checked ? 'text-black' : 'text-gray5'}`}>{label}</p>
    </div>
  )
}
