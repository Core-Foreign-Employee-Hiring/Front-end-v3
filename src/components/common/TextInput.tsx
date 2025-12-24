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
  placeholder,
}: TextInputProps) {
  const textFieldBase = 'border p-4 bg-white rounded-[12px] kr-body-md flex-1 min-w-0 outline-none transition'
  const textAreaBase =
    'border py-3 px-4 bg-white rounded-[16px] kr-body-md h-[147px] flex-1 min-w-0 outline-none transition'
  const statusStyle = statusStyleType[status]
  const textFieldClassName = [textFieldBase, statusStyle].join(' ')
  const textAreaClassName = [textAreaBase, statusStyle].join(' ')

  return textType === 'textField' ? (
    <div className="flex flex-col gap-y-2">
      <div className="flex w-full gap-x-2">
        <input placeholder={placeholder} className={textFieldClassName} />
        {buttonElement && buttonElement}
      </div>
      {helperText && <p className="kr-badge-md text-error">{helperText}</p>}
    </div>
  ) : (
    <div className="flex w-full flex-col gap-y-2">
      <textarea placeholder={placeholder} className={textAreaClassName} />
      {helperText && <p className="kr-badge-md text-error">{helperText}</p>}
    </div>
  )
}
