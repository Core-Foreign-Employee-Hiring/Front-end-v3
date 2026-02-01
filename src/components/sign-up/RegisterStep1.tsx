import IdField from '@/components/sign-up/IdField'
import PasswordField from '@/components/sign-up/PasswordField'
import CheckPasswordField from '@/components/sign-up/CheckPasswordField'
import NameField from '@/components/sign-up/NameField'
import PhoneNumberField from '@/components/sign-up/PhoneNumberField'
import EmailField from '@/components/sign-up/EmailField'
import AddressField from '@/components/sign-up/AddressField'
import Step1BottomButton from '@/components/sign-up/Step1BottomButton'

interface RegisterStep1Props {
  lang: string
}

export default function RegisterStep1({ lang }: RegisterStep1Props) {
  return (
    <div className="flex w-full flex-col gap-y-[24px]">
      <IdField />
      <PasswordField />
      <CheckPasswordField />
      <NameField />
      <PhoneNumberField />
      <EmailField />
      <AddressField />
      <Step1BottomButton />
    </div>
  )
}
