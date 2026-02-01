'use client'

import { Button } from '@/components/common'
import { useRegisterStore } from '@/store/registerStore'

export default function Step1BottomButton() {
  const isStep1FormValid = useRegisterStore((state) => state.isStep1FormValid())
  return <Button state={isStep1FormValid ? 'default' : 'disable'}>다음</Button>
}
