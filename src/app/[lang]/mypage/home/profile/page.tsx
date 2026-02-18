import { Header, Label, Loading, PageLayout, Spacing } from '@/components/common'
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
import AuthWatcher from '@/components/auth/AuthWatcher'
import SideBar from '@/components/mypage/SideBar'
import Footer from '@/components/common/Footer'
import NavBar from '@/components/common/NavBar'

interface ProfilePageProps {
  params: Promise<{ lang: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { lang } = await params
  const result = await fetchMyPageUserInfo()
  const userInfo = result.data

  console.log('userInfo', userInfo)

  if (!userInfo) {
    return (
      <div>
        <AuthWatcher results={[result]} />
        <Loading size={'lg'} />
      </div>
    )
  }

  return (
    <main className="w-full">
      <Header headerType={'default'} currentLng={lang} />
      <PageLayout>
        <Label className={'desktop:block hidden'} label={'마이페이지'} type={'titleLg'} />
        <Spacing className={'desktop:block tablet:block hidden'} height={16} />
        <div className="flex gap-x-[32px]">
          <SideBar lang={lang} />
          <div className="w-full">
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
          </div>
        </div>
      </PageLayout>
      <Footer />
      <Spacing height={80} className="desktop:hidden" />
      <NavBar path={`/${lang}/mypage`} lang={lang} />
    </main>
  )
}
