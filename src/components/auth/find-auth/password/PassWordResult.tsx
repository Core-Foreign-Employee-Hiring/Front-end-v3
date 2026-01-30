import PwBottomButton from '@/components/auth/find-auth/password/PwBottomButton'
import PasswordField from '@/components/auth/find-auth/password/PasswordField'
import NewPasswordField from '@/components/auth/find-auth/password/NewPasswordField'

interface PassWordResultProps {
  step: '1' | '2'
}

export default function PassWordResult({ step }: PassWordResultProps) {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-5">
        <PasswordField />
        <NewPasswordField />
      </div>
      <PwBottomButton step={step} />
    </div>
  )
}
