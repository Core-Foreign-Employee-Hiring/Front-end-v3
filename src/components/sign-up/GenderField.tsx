'use client'

import { Button, Label } from '@/components/common'
import { useRegisterStore } from '@/store/registerStore'
import { GenderType } from '@/types/auth/register'

export default function GenderField() {
  const { registerData, updateRegister } = useRegisterStore((state) => state)
  const genderList: { key: GenderType; content: string }[] = [
    { key: 'MALE', content: '남자' },
    { key: 'FEMALE', content: '여자' },
    { key: 'NULL', content: '선택안함' },
  ]
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'성별'} type={'titleSm'} />
      <div className="flex gap-x-3">
        {genderList.map((gender) => (
          <Button
            onClick={() => {
              updateRegister('gender', gender.key === registerData.gender ? null : gender.key)
            }}
            key={gender.key}
            size={'md'}
            variant={registerData.gender === gender.key ? 'primary' : 'outline'}
          >
            {gender.content}
          </Button>
        ))}
      </div>
    </div>
  )
}
