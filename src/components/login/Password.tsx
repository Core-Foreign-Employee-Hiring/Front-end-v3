'use client'

import { useAuthStore } from '@/store/authStore'
import { usePasswordVisible } from '@/hooks'

import { Label, Spacing, TextInput } from '@/components/common'

export default function Password() {
  const password = useAuthStore((state) => state.login.password)
  const setLogin = useAuthStore((state) => state.setLogin)

  const { toggleVisibility, VisibilityIcon, inputType } = usePasswordVisible()

  return (
    <div className="w-full">
      <Label label="비밀번호" type="subtitleLg" />
      <Spacing height={8} />
      <TextInput
        inputType={inputType}
        value={password ?? ''}
        onChange={(e) => setLogin({ password: e.target.value })}
        placeholder="비밀번호를 입력해주세요."
        rightElement={
          <VisibilityIcon
            onClick={toggleVisibility}
            className="text-gray4 hover:text-main-500 cursor-pointer transition-colors"
            height={24}
            width={24}
          />
        }
      />
    </div>
  )
}
