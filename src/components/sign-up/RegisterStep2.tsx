import GenderField from '@/components/sign-up/GenderField'
import BirthDateField from '@/components/sign-up/BirthDateField'
import EducationField from '@/components/sign-up/EducationField'
import TermsOfService from '@/components/sign-up/TermsOfService'
import Step2BottomButton from '@/components/sign-up/Step2BottomButton'
import NationalityField from '@/components/sign-up/NationalityField'
import VisaField from '@/components/sign-up/VisaField'
import JobRoleField from '@/components/sign-up/JobRoleField'

interface RegisterStep2Props {
  lang: string
}

export default function RegisterStep2({ lang }: RegisterStep2Props) {
  return (
    <div className="flex w-full flex-col gap-y-[24px]">
      <NationalityField />
      <VisaField />
      <EducationField />
      <JobRoleField />
      <BirthDateField />
      <GenderField />
      <TermsOfService />
      <Step2BottomButton lang={lang} />
    </div>
  )
}
