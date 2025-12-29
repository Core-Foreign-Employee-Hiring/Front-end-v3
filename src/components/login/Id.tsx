'use client'

import { useAuthStore } from '@/store/authStore'

import { Label, Spacing, TextInput } from '@/components/common'

export default function Id() {
  const userId = useAuthStore((state) => state.login.userId)
  const setLogin = useAuthStore((state) => state.setLogin)

  return (
    <div className="w-full">
      <Label type={'subtitleLg'} label={'아이디'} />
      <Spacing height={8} />
      <TextInput
        onChange={(e) => {
          setLogin({ userId: e.target.value })
        }}
        value={userId ?? ''}
        placeholder="아아디를 입력해주세요."
      />
    </div>
  )
}
