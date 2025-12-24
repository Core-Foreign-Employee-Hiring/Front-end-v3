'use client'

import { ReactNode } from 'react'

const statusStyleType = {
  default: 'border-gray2 hover:border-main-300 focus:border-main-500 placeholder:text-gray4 text-black',
  filled: 'border-gray3 text-black',
  error: 'border-error text-black',
}

interface TextInputProps {
  textType?: 'textField' | 'textArea'
  inputType?: 'number' | 'text'
  placeholder?: string
  value: string | number
  onChange: () => void
  status?: 'default' | 'filled' | 'error'
  helperText?: string
  buttonElement?: ReactNode
  leftElement?: ReactNode
  rightElement?: ReactNode
}

export default function TextInput({
  textType = 'textField',
  status = 'default',
  buttonElement,
  helperText,
}: TextInputProps) {
  const textFieldBase = 'border p-4 bg-white rounded-[12px] kr-body-md'
  const textAreaBase = 'border py-3 px-4 bg-white rounded-[16px] kr-body-md h-[147px]'
  const statusStyle = statusStyleType[status]
  const textFieldClassName = [textFieldBase, statusStyle].join(' ')
  const textAreaClassName = [textAreaBase, statusStyle].join(' ')

  return textType === 'textField' ? (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-x-2">
        <input className={textFieldClassName} />
        {buttonElement && buttonElement}
      </div>
      {helperText && <p className="kr-badge-md text-error">{helperText}</p>}
    </div>
  ) : (
    <div className="flex flex-col gap-y-2">
      <textarea className={textAreaClassName} />
      {helperText && <p className="kr-badge-md text-error">{helperText}</p>}
    </div>
  )
}
