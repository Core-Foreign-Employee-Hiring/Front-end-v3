'use client'

import { CheckIcon, UncheckIcon } from '@/assets/svgComponents'
import { BottomBorder } from '@/components/common'
import { useModifyProfileStore } from '@/store/modifyProfileStore'

export default function TermsOfService() {
  // 스토어에서 상태와 업데이트 함수를 가져옵니다.
  const { modifyProfileData, updateProfile } = useModifyProfileStore((state) => state)
  // 모든 필수 및 선택 항목이 true인지 확인 (전체 동의 상태 계산)
  const isAllAgreed =
    modifyProfileData.termsOfServiceAgreement &&
    modifyProfileData.personalInfoAgreement &&
    modifyProfileData.adInfoAgreementSmsMms &&
    modifyProfileData.adInfoAgreementEmail

  // 전체 동의 클릭 핸들러
  const handleAllAgreement = () => {
    const newValue = !isAllAgreed
    updateProfile('termsOfServiceAgreement', newValue)
    updateProfile('personalInfoAgreement', newValue)
    updateProfile('adInfoAgreementSmsMms', newValue)
    updateProfile('adInfoAgreementEmail', newValue)
  }

  return (
    <div className="flex flex-col gap-y-3">
      {/* 전체 동의 */}
      <div className="flex cursor-pointer gap-x-2" onClick={handleAllAgreement}>
        {isAllAgreed ? <CheckIcon width={24} height={24} /> : <UncheckIcon width={24} height={24} />}
        <p className={`kr-subtitle-md ${isAllAgreed ? 'text-black' : 'text-gray5'}`}>전체동의</p>
      </div>

      <BottomBorder />

      {/* 개별 항목들 */}
      <AgreementItem
        label="(필수) 서비스 이용약관 동의"
        checked={modifyProfileData.termsOfServiceAgreement || false}
        onChange={(val) => updateProfile('termsOfServiceAgreement', val)}
      />
      <AgreementItem
        label="(필수) 개인정보 수집 및 이용 동의"
        checked={modifyProfileData.personalInfoAgreement || false}
        onChange={(val) => updateProfile('personalInfoAgreement', val)}
      />
      <AgreementItem
        label="(선택) 광고성 정보 수신 동의 (SNS/MMS)"
        checked={modifyProfileData.adInfoAgreementSmsMms || false}
        onChange={(val) => updateProfile('adInfoAgreementSmsMms', val)}
      />
      <AgreementItem
        label="(선택) 광고성 정보 수신 동의 (이메일)"
        checked={modifyProfileData.adInfoAgreementEmail || false}
        onChange={(val) => updateProfile('adInfoAgreementEmail', val)}
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
