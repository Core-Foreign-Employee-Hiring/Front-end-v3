import IdField from '@/components/auth/find-auth/password/IdField'
import NameField from '@/components/auth/find-auth/password/NameField'
import EmailField from '@/components/auth/find-auth/password/EmailField'
import PwBottomButton from '@/components/auth/find-auth/password/PwBottomButton'

interface PassWordProcessProps {}

export default function PassWordProcess({}: PassWordProcessProps) {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-5">
        <IdField />
        <NameField />
        <EmailField />
      </div>
      <PwBottomButton step={step} />
    </div>
  )
}
