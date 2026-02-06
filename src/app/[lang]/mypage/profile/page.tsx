import { Label, Spacing } from '@/components/common'
import NameField from '@/components/mypage/profile/NameField'
import PhoneNumberField from '@/components/mypage/profile/PhoneNumberField'
import EmailField from '@/components/mypage/profile/EmailField'
import AddressField from '@/components/mypage/profile/AddressField'
import NationalityField from '@/components/mypage/profile/NationalityField'
import VisaField from '@/components/mypage/profile/VisaField'
import EducationField from '@/components/mypage/profile/EducationField'
import JobRoleField from '@/components/mypage/profile/JobRoleField'
import BirthDateField from '@/components/mypage/profile/BirthDateField'
import GenderField from '@/components/mypage/profile/GenderField'
import TermsOfService from '@/components/mypage/profile/TermsOfService'
import BottomButton from '@/components/mypage/profile/BottomButton'
import { fetchMyPageUserInfo } from '@/lib/server/mypage'
import ProfileStoreInitializer from '@/components/mypage/profile/ProfileStoreInitializer'

export default async function ProfilePage() {
  const result = await fetchMyPageUserInfo()
  console.log('result', result)
  const userInfo = result.data
  return (
    <main className="w-full">
      <ProfileStoreInitializer initialData={userInfo} />
      <Label label={'프로필 수정'} type={'titleMd'} />
      <Spacing height={16} />
      <div className="flex w-full flex-col gap-y-6">
        <NameField />
        <PhoneNumberField />
        <EmailField />
        <AddressField />
        <NationalityField />
        <VisaField />
        <EducationField />
        <JobRoleField />
        <BirthDateField />
        <GenderField />
        <TermsOfService />
        <BottomButton />
      </div>
    </main>
  )
}
